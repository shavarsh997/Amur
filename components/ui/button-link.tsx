import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "light";
};

const variants = {
  primary:
    "bg-blue-600 text-zinc-950 hover:bg-blue-500 focus-visible:outline-blue-600",
  secondary:
    "border border-zinc-300 bg-white text-zinc-950 hover:border-zinc-950 focus-visible:outline-zinc-950",
  light:
    "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-zinc-950 focus-visible:outline-white",
} as const;

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
