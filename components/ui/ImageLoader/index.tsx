import Image from "next/image";

interface ImageLoaderProps {
  alt?: string;
  src: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  isFlat?: boolean;
}

function ImageLoader({
  alt = "img-alt",
  src,
  width = 0,
  height = 0,
  className = "",
  isFlat = false,
  priority = false,
}: ImageLoaderProps) {
  const sizes = width === 0 && height === 0 ? "100vw" : "";
  const defaultClass = isFlat ? "" : "!tw-rounded-xl";

  return (
    <Image
      priority={priority}
      alt={alt}
      src={src}
      width={width}
      height={height}
      sizes={sizes}
      className={`!tw-w-[100%] !tw-h-[100%] ${defaultClass} ${className}`}
    />
  );
}

export default ImageLoader;
