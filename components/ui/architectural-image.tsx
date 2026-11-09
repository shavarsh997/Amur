import { getImageProps } from "next/image";
import type { CSSProperties } from "react";

export type ArchitecturalPhoto = {
  src: string;
  alt: string;
  focalPoint?: string;
  mobileFocalPoint?: string;
  mobileSrc?: string;
  sizes?: string;
};

/** A server-only, art-directed picture. The browser downloads one matching source. */
export function ArchitecturalImage({
  image,
  sizes,
  eager = false,
  className = "",
}: {
  image: ArchitecturalPhoto;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const shared = {
    alt: image.alt,
    fill: true,
    sizes,
    quality: 75,
    loading: eager ? ("eager" as const) : ("lazy" as const),
    fetchPriority: eager ? ("high" as const) : ("auto" as const),
  };
  const { props } = getImageProps({ ...shared, src: image.src });
  const mobile = image.mobileSrc
    ? getImageProps({ ...shared, src: image.mobileSrc }).props
    : undefined;
  return (
    <picture
      className={`architectural-picture ${className}`}
      style={
        {
          "--image-focus": image.focalPoint ?? "50% 50%",
          "--image-focus-mobile":
            image.mobileFocalPoint ?? image.focalPoint ?? "50% 50%",
        } as CSSProperties
      }
    >
      {mobile ? (
        <source
          media="(max-width: 639px)"
          srcSet={mobile.srcSet}
          sizes={sizes}
        />
      ) : null}
      {/* getImageProps supplies Next.js optimization without a client component. */}
      <img {...props} alt={image.alt} />
    </picture>
  );
}
