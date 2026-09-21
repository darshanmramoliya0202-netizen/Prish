import Image, { type ImageProps } from "next/image";
import { sitePhoto } from "@/content/photos";

/**
 * Editorial photograph by id (public/photos/site/<id>.jpg via `photos:prep`). Renders
 * nothing when the file has not been supplied, so every slot in the site is optional and
 * there is never a placeholder. Ids and briefs live in docs/photo-brief.md.
 */
export function SitePhoto({
  id,
  alt,
  className = "",
  fill = false,
  sizes,
  priority = false,
  quality = 80,
  ...rest
}: {
  id: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
} & Omit<
  ImageProps,
  "src" | "alt" | "fill" | "width" | "height" | "sizes" | "priority" | "quality"
>) {
  const photo = sitePhoto(id);
  if (!photo) return null;
  return fill ? (
    <Image
      src={photo.src}
      alt={alt}
      fill
      sizes={sizes ?? "100vw"}
      priority={priority}
      quality={quality}
      className={className}
      {...rest}
    />
  ) : (
    <Image
      src={photo.src}
      alt={alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
      priority={priority}
      quality={quality}
      className={className}
      {...rest}
    />
  );
}

/** true when the photo has been supplied (for layout decisions in server components) */
export function hasSitePhoto(id: string): boolean {
  return sitePhoto(id) !== null;
}
