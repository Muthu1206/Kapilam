import Image from "next/image";
import type { ImageAsset } from "@/config/assets";

interface EditorialImageProps {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
  /**
   * When true (default), assets that originated as Instagram post screenshots
   * are framed non-destructively via CSS so the top Instagram header bar sits
   * outside the visible viewport while preserving the untouched original file.
   */
  cropInstagramHeader?: boolean;
}

export function EditorialImage({
  asset,
  sizes,
  priority = false,
  className = "",
  cropInstagramHeader = true,
}: EditorialImageProps) {
  const shouldCropTop = Boolean(asset.hasInstagramHeader && cropInstagramHeader);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-charcoal ${className}`}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={
          shouldCropTop
            ? "object-cover object-bottom scale-[1.14] origin-bottom transition-transform duration-700 ease-out"
            : "object-cover object-center transition-transform duration-700 ease-out"
        }
      />
    </div>
  );
}
