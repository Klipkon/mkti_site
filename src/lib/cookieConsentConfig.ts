import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom right",
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
      services: {
        Recaptcha: {
          label:
            '<a href="https://policies.google.com/terms?hl=en-GB" target="_blank">Google Recaptcha</a>',
        },
      },
    },
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            console.log("ga4 accepted");
            // TODO: load ga4
          },
          onReject: () => {
            console.log("ga4 rejected");
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: "pl",
    autoDetect: "browser",
    translations: {
      pl: {
        consentModal: {
          title: "Witaj, czas na ciasteczka!",
          description:
            "Nasza strona korzysta z plików cookie w celu zapewnienia prawidłowego działania, analizy ruchu.",
          acceptAllBtn: "Akceptuj wszystkie",
          acceptNecessaryBtn: "Odrzuć wszystkie",
          showPreferencesBtn: "Zarządzaj preferencjami",
          footer:
            '<a href="#link">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>',
        },
        preferencesModal: {
          title: "Zarządzanie Ciasteczkami",
          acceptAllBtn: "Akceptuj wszystkie",
          acceptNecessaryBtn: "Odrzuć wszystkie",
          savePreferencesBtn: "Zapisz ustawienia",
          closeIconLabel: "Zamknij okno",
          serviceCounterLabel: "Usługa|Usługi",
          sections: [
            {
              title:
                'Niezbędne ciasteczka <span class="pm__badge">Zawsze włączone</span>',
              description:
                "Ciasteczka potrzebne do funkcjonowania strony. Pomagają odliftrowywać spam w formularzach.",
              linkedCategory: "necessary",
            },
            {
              title: "Ciasteczka analityczne",
              description:
                "Ciasteczka które pomagają nam zbierać dane analityczne. Dzięki nim wiemy jak z naszych produktów korzystają użytkownicy i jak je rozwijać. Ciasteczka te są opcionalne.",
              linkedCategory: "analytics",
            },
          ],
        },
      },
    },
  },
};
