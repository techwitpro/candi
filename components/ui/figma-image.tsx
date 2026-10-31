import Image, { type ImageProps } from "next/image";

type FigmaImageProps = Omit<ImageProps, "fill"> & {
  fit?: "cover" | "contain";
};

export function FigmaImage({
  className = "",
  fit = "cover",
  alt,
  style,
  ...props
}: FigmaImageProps) {
  return (
    <Image
      alt={alt}
      fill
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      style={style}
      sizes="(max-width: 1440px) 100vw, 1440px"
      {...props}
    />
  );
}
