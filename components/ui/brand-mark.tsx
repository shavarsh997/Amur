import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  preload?: boolean;
};

export function BrandMark({ className = "", preload = false }: BrandMarkProps) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={`shrink-0 object-contain ${className}`}
      height={780}
      preload={preload}
      src="/brand/shinex-mark.png"
      width={850}
    />
  );
}
