import type { ComponentProps, ReactNode } from "react";

import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/button-styles";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "default",
  icon,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles(variant, size, className)}
      type={type}
      {...props}
    >
      {icon ? (
        <span aria-hidden="true" className="action-button__icon">
          {icon}
        </span>
      ) : null}
      <span className="action-button__label">{children}</span>
    </button>
  );
}
