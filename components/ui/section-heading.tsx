type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto items-center text-center" : "items-start";
  const titleColor = inverted ? "text-white" : "text-zinc-950";
  const bodyColor = inverted ? "text-zinc-300" : "text-zinc-600";

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
        {eyebrow}
      </p>
      <h2
        className={`text-pretty text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-base leading-7 sm:text-lg ${bodyColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
