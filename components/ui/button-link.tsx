import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "light";
};

const variants = {
  primary:
    "bg-[var(--button-primary)] text-[var(--button-text)] hover:bg-[var(--button-primary-hover)] focus-visible:outline-[var(--button-primary)]",
  secondary:
    "border border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)] focus-visible:outline-[var(--button-primary)]",
  light:
    "border border-[var(--border)] bg-white text-[var(--text-primary)] hover:bg-[var(--surface-muted)] focus-visible:outline-[var(--button-primary)]",
} as const;

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
