export type ButtonVariant = "primary" | "secondary" | "light";
export type ButtonSize = "default" | "compact";

const variants = {
  primary:
    "border-transparent bg-[var(--button-primary)] text-[var(--button-text)] hover:bg-[var(--button-primary-hover)]",
  secondary:
    "border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]",
  light:
    "border-[var(--border)] bg-white text-[var(--text-primary)] hover:bg-[var(--surface-muted)]",
} as const;

const sizes = {
  default: "min-h-12 px-5 py-3",
  compact: "min-h-11 px-4 py-2.5",
} as const;

export function buttonStyles(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string
) {
  return `action-button inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-xl border text-center text-sm font-semibold leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-copper)] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;
}
