const siteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Anshul Kumar",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-GB",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  },
  // Used as the default description meta property and webmanifest description
  description: "Everything related to scalable app developement",
  // HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
  lang: "en-GB",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_GB",
  // Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
  title: "Scalable Hacker"
};
const menuLinks = [
  {
    path: "/",
    title: "Home",
    icon: "hugeicons:home-12"
  },
  // {
  // 	path: "/about/",
  // 	title: "About",
  // 	icon: "solar:archive-bold"
  // },
  {
    path: "/posts/",
    title: "Blog",
    icon: "hugeicons:archive-03"
  },
  {
    path: "/notes/",
    title: "Notes",
    icon: "hugeicons:note-02"
  },
  {
    path: "/tags/",
    title: "Tags",
    icon: "hugeicons:tag-02"
  }
];

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position",
  "background"
];

export { DEFAULT_OUTPUT_FORMAT as D, VALID_INPUT_FORMATS as V, VALID_SUPPORTED_FORMATS as a, DEFAULT_HASH_PROPS as b, menuLinks as m, siteConfig as s };
//# sourceMappingURL=consts_yq49tbae.mjs.map
