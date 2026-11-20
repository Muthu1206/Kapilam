import Image from "next/image";
import { LOGO_ASSETS } from "@/config/assets";

interface KapilamLogoProps {
  size?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Renders the original KAPILAM Tamil calligraphy medallion without altering,
 * stretching, or recreating the artwork. A clean circular mask frames the
 * terracotta emblem while hiding the blurred outer corners of the source file.
 */
export function KapilamLogo({
  size = 44,
  priority = false,
  className = "",
}: KapilamLogoProps) {
  const logo = LOGO_ASSETS.primary;

  return (
    <span
      style={{ width: size, height: size }}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-deep-kapilam ring-1 ring-sandstone/35 shadow-[0_8px_28px_rgba(24,19,17,0.45)] ${className}`}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        sizes={`${size}px`}
        priority={priority}
        className="h-full w-full scale-[1.11] object-cover object-center select-none"
      />
    </span>
  );
}
