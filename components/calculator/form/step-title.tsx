export function StepTitle({
  number,
  title,
  description,
}: {
  number?: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      {number ? (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-accent)]">
          {number}
        </p>
      ) : null}
      <h2 className="text-xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );
}
