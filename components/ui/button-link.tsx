import Link from "next/link";
import type { ComponentProps } from "react";
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button-styles";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles(variant, size, className)} {...props}>
      <span className="action-button__label">{children}</span>
    </Link>
  );
}
