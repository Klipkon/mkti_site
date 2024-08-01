import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useToast } from "@/components/ui/use-toast";
import type { IContactData } from "@/types/contactForm.ts";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import * as Yup from "yup";
import { Checkbox } from "./ui/checkbox.tsx";
import { Separator } from "./ui/separator.tsx";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy aders email!")
    .required("Aby otrzymać wiadomość zwrotną podaj swój adres email!"),
  message: Yup.string()
    .min(1)
    .max(1000)
    .required("Napisz proszę w jakiej sprawie się kontaktujesz!"),
  allowToSendMarketingInfo: Yup.boolean()
    .oneOf([true], "Zgoda jest wymagana!")
    .required(),
});

interface Props {
  form: IContactData["attributes"]["form"];
}

export function ContactForm({ form }: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [token, setToken] = useState<string>("");
  const { toast } = useToast();

  const {
    checkboxLabel,
    emailLabel,
    emailPlaceholder,
    messageLabel,
    messagePlaceholder,
  } = form;

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    await executeRecaptcha("Submit").then((token) => setToken(token));
  }, [executeRecaptcha]);

  useEffect(() => {
    const skeleton = document.querySelector("#formSkeleton");
    if (skeleton) skeleton.remove();
  }, []);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  async function onSumbmit(
    values: Yup.InferType<typeof FormSchema>,
    actions: FormikHelpers<Yup.InferType<typeof FormSchema>>
  ) {
    await handleReCaptchaVerify();
    fetch(import.meta.env.PUBLIC_STRAPI_URL + "/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        message: values.message,
        allowToSendMarketingInfo: values.allowToSendMarketingInfo,
        token: token,
      }),
    }).then((res) => {
      if (res.ok) {
        actions.resetForm();
        toast({ title: "Sukces!", description: "Wiadomość została wysłana!" });
      } else if (res.status === 400) {
        toast({
          title: "Błąd",
          description: "Nie udało się wysłać wiadomości!",
          variant: "destructive",
        });

        res.json().then((data: { path: string[]; message: string }[]) => {
          for (let i = 0; i < data.length; i++) {
            actions.setErrors({ [data[i].path[0]]: data[i].message });
          }
        });
      } else {
        toast({
          title: "Błąd",
          description: "Nie udało się wysłać wiadomości!",
          variant: "destructive",
        });
      }
    });
    actions.setSubmitting(false);
  }

  return (
    <Formik
      validationSchema={FormSchema}
      validateOnBlur={false}
      initialValues={{
        email: "",
        message: "",
        allowToSendMarketingInfo: false,
      }}
      onSubmit={onSumbmit}
    >
      {({ errors, touched, isSubmitting, values, setFieldValue }) => (
        <Form
          className="w-full flex flex-col items-start justify-center gap-8"
          id="contactForm"
        >
          <div className="w-full">
            <Label>{emailLabel}</Label>
            <Field
              name="email"
              type="email"
              as={Input}
              placeholder={emailPlaceholder}
            />
            {errors.email && touched.email ? (
              <span className="block pt-1 text-sm text-red-500">
                {errors.email}
              </span>
            ) : null}
          </div>
          <div className="w-full">
            <Label>{messageLabel}</Label>
            <Field
              name="message"
              as={Textarea}
              placeholder={messagePlaceholder}
            />
            {errors.message && touched.message ? (
              <span className="block pt-1 text-sm text-red-500">
                {errors.message}
              </span>
            ) : null}
          </div>
          <div>
            <div className="flex items-start justify-start gap-2">
              <Field
                name="allowToSendMarketingInfo"
                component={Checkbox}
                onCheckedChange={() =>
                  setFieldValue(
                    "allowToSendMarketingInfo",
                    !values.allowToSendMarketingInfo
                  )
                }
                id="allowToSendMarketingInfo"
                checked={values.allowToSendMarketingInfo}
                type="checkbox"
              />
              <Label className="leading-5" htmlFor="allowToSendMarketingInfo">
                {checkboxLabel}
              </Label>
            </div>
            {errors.allowToSendMarketingInfo &&
            touched.allowToSendMarketingInfo ? (
              <span className="block pt-1 text-sm text-red-500">
                {errors.allowToSendMarketingInfo}
              </span>
            ) : null}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            variant="default"
            size="default"
          >
            {isSubmitting ? "Wysyłanie" : "Wyślij"}
          </Button>
          <Separator className="my-2" />
          <p className="text-center text-xs">
            This site is protected by reCAPTCHA and the Google
            <a
              href="https://policies.google.com/privacy"
              className="text-primary"
            >
              &nbsp;Privacy Policy
            </a>
            &nbsp;and&nbsp;
            <a
              href="https://policies.google.com/terms"
              className="text-primary"
            >
              Terms of Service
            </a>
            &nbsp;apply
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default function FormWrapper(props: Props) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.PUBLIC_GOOGLE_RECAPTCHA_SECRET}
    >
      <ContactForm {...props} />
    </GoogleReCaptchaProvider>
  );
}
