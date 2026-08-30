const RESPONSIVE_WIDTHS = [480, 768, 1024, 1440] as const;
const FILE_PROXY_PREFIX = "/api/public/arquivo/";

function supportsResponsiveVariants(src: string) {
  return src.startsWith(FILE_PROXY_PREFIX) && /\.(?:jpe?g|png|webp)(?:\?|$)/i.test(src);
}

function withWidth(src: string, width: number) {
  return `${src}${src.includes("?") ? "&" : "?"}width=${width}`;
}

export function responsiveImageProps(src: string, sizes: string) {
  if (!supportsResponsiveVariants(src)) return { src, sizes };

  return {
    src,
    srcSet: RESPONSIVE_WIDTHS.map((width) => `${withWidth(src, width)} ${width}w`).join(", "),
    sizes,
  };
}

