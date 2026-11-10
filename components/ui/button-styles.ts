export type ButtonVariant = "primary" | "secondary" | "outline" | "light";
export type ButtonSize = "default" | "compact";

const sizes = {
  default: "min-h-13 px-6 py-3.5",
  compact: "min-h-11 px-4 py-2.5",
} as const;

export function buttonStyles(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string
) {
  return `action-button action-button--${variant === "light" ? "outline" : variant} inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-control border text-center text-sm font-semibold leading-5 ${sizes[size]} ${className}`;
}
