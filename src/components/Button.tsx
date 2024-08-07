import { Button as UIButton } from "@/components/ui/button";
import type React from "react";
import type { ReactNode } from "react";

export interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: "default" | "secondary" | "ghost";
  size: "default" | "sm" | "icon";
  children: ReactNode;
}

export default function Button({
  href,
  variant,
  size,
  children,
  className,
  ...props
}: Props) {
  return href ? (
    <UIButton asChild variant={variant} size={size} className={className}>
      <a href={href} {...props}>
        {children}
      </a>
    </UIButton>
  ) : (
    <UIButton variant={variant} size={size} className={className}>
      {children}
    </UIButton>
  );
}
