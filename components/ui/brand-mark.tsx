import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  eager?: boolean;
  alt?: string;
  variant?: "full" | "symbol";
};

export function BrandMark({
  className = "",
  eager = false,
  alt = "SHINEX",
  variant = "full",
}: BrandMarkProps) {
  const asset =
    variant === "symbol"
      ? { src: "/brand/shinex-symbol.png", width: 720, height: 720 }
      : { src: "/brand/shinex-logo.png", width: 1250, height: 380 };

  return (
    <Image
      alt={alt}
      className={`shrink-0 object-contain ${className}`}
      height={asset.height}
      loading={eager ? "eager" : "lazy"}
      sizes={variant === "symbol" ? "44px" : "120px"}
      src={asset.src}
      width={asset.width}
    />
  );
}
