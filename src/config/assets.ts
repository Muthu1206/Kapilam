export type AssetKind =
  | "logo"
  | "authentic-photo"
  | "brand-visual"
  | "instagram-post";

export type ProductCategoryId =
  | "all"
  | "terracotta-pottery"
  | "decorative-sculptures"
  | "planters"
  | "home-decor"
  | "artistic-pieces";

export interface ImageAsset {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  kind: AssetKind;
  /**
   * True when the original untouched asset contains the dark @kap_ilam Instagram
   * header bar across the top ~10% of the frame. Used to apply non-destructive
   * CSS framing in editorial gallery cards while leaving original files untouched.
   */
  hasInstagramHeader?: boolean;
  caption?: string;
}

export interface ProductAsset extends ImageAsset {
  category: Exclude<ProductCategoryId, "all">;
  seriesLabel: string;
}

export interface GlbModelAsset {
  id: "terracotta-pot" | "pottery-vase" | "elephant-sculpture" | "decorative-sculpture";
  label: string;
  /**
   * Exact path under public/Assets/kapilam/models/ (matching on-disk casing).
   * Flip `available` to `true` once the corresponding Blender .glb file is added.
   */
  src: string;
  available: boolean;
}

/**
 * NOTE ON CASE-SENSITIVITY:
 * The asset root on disk is `public/Assets/kapilam/` (uppercase "A").
 * Every URL below matches exact on-disk casing for Linux/Vercel deployments.
 */
export const LOGO_ASSETS = {
  primary: {
    id: "kapilam-logo-png",
    src: "/Assets/kapilam/logo/kapilam-logo.png",
    width: 1080,
    height: 1063,
    alt: "Kapilam original Tamil calligraphy logo (கபிலம்)",
    kind: "logo",
  },
  archivalOriginal: {
    id: "kapilam-logo-original",
    src: "/Assets/kapilam/logo/kapilam-logo-original.jpg.jpeg",
    width: 1080,
    height: 1063,
    alt: "Kapilam original Tamil calligraphy logo (கபிலம்)",
    kind: "logo",
  },
} as const satisfies Record<string, ImageAsset>;

export const BRAND_VISUALS = {
  posterArtisan: {
    id: "brand-poster-01",
    src: "/Assets/kapilam/brand/brand-poster-01.png",
    width: 1672,
    height: 941,
    alt: "Kapilam brand poster — Shaped by Hands. Inspired by Earth.",
    kind: "brand-visual",
    caption: "Brand visual — Shaped by Hands. Inspired by Earth.",
  },
  studioVessel: {
    id: "brand-poster-02",
    src: "/Assets/kapilam/brand/brand-poster-02.jpg",
    width: 1536,
    height: 1024,
    alt: "Minimalist terracotta vessel resting on raw stone in moody gallery lighting",
    kind: "brand-visual",
    caption: "Editorial mood study",
  },
  instagramStoryPost: {
    id: "brand-story",
    src: "/Assets/kapilam/brand/brand-story.jpeg",
    width: 962,
    height: 1310,
    alt: "Original @kap_ilam Instagram post sharing the Kapilam story",
    kind: "instagram-post",
    hasInstagramHeader: true,
    caption: "From @kap_ilam — The story behind the name Kapilam",
  },
} as const satisfies Record<string, ImageAsset>;

/** Authentic Kapilam terracotta deer-sculpture photograph — the hero's primary subject. */
export const ASSET_HERO_SCULPTURE: ImageAsset = {
  id: "animal-sculptures-01",
  src: "/Assets/kapilam/products/animal-sculptures-01.jpeg",
  width: 1034,
  height: 1290,
  alt: "Pair of hand-sculpted Kapilam terracotta deer figures standing in shallow rainwater",
  kind: "authentic-photo",
};

export const CRAFTSMANSHIP_ASSETS: readonly ImageAsset[] = [
  {
    id: "pottery-making",
    src: "/Assets/kapilam/craftsmanship/pottery-making.jpeg",
    width: 1080,
    height: 1436,
    alt: "Artisan hands wet with clay shaping a vessel on the potter's wheel",
    kind: "authentic-photo",
    caption: "At the Wheel — Clay Awakening",
  },
  {
    id: "clay-pots",
    src: "/Assets/kapilam/craftsmanship/clay-pots.jpeg",
    width: 899,
    height: 1600,
    alt: "Rows of freshly thrown clay pots drying beside a traditional potter's wheel",
    kind: "authentic-photo",
    caption: "Sun & Patience — Drying Before Fire",
  },
  {
    id: "artisan-work-01",
    src: "/Assets/kapilam/craftsmanship/artisan-work-01.jpeg",
    width: 1036,
    height: 1307,
    alt: "Sculpted terracotta hand beside the artist's own hand",
    kind: "authentic-photo",
    caption: "Memory in Form — Sculpting by Hand",
  },
  {
    id: "artisan-work-03",
    src: "/Assets/kapilam/craftsmanship/artisan-work-03.jpeg",
    width: 1080,
    height: 1356,
    alt: "Close-up of hand-sculpted raw clay palm with natural surface creases",
    kind: "authentic-photo",
    caption: "Every Line a Signature",
  },
  {
    id: "artisan-work-02",
    src: "/Assets/kapilam/craftsmanship/artisan-work-02.jpeg",
    width: 1080,
    height: 1466,
    alt: "Three terracotta hand sculptures showing stages of clay drying and firing",
    kind: "authentic-photo",
    caption: "The Progress — Raw Earth to Terracotta",
  },
];

export const PRODUCT_CATEGORIES: readonly {
  id: ProductCategoryId;
  label: string;
}[] = [
  { id: "all", label: "All Works" },
  { id: "terracotta-pottery", label: "Terracotta Pottery" },
  { id: "decorative-sculptures", label: "Decorative Sculptures" },
  { id: "planters", label: "Planters" },
  { id: "home-decor", label: "Home Decor" },
  { id: "artistic-pieces", label: "Handmade Artistic Pieces" },
];

export const PRODUCT_ASSETS: readonly ProductAsset[] = [
  // Terracotta Pottery
  {
    id: "pottery-collection-01",
    src: "/Assets/kapilam/products/pottery-collection-01.jpeg",
    width: 1000,
    height: 1259,
    alt: "Handcrafted terracotta vessels arranged before a carved tree relief plaque",
    kind: "authentic-photo",
    category: "terracotta-pottery",
    seriesLabel: "Terracotta Pottery",
  },
  {
    id: "pottery-collection-04",
    src: "/Assets/kapilam/products/pottery-collection-04.jpeg",
    width: 997,
    height: 1241,
    alt: "Handmade Kapilam earthenware pottery piece",
    kind: "authentic-photo",
    category: "terracotta-pottery",
    seriesLabel: "Terracotta Pottery",
  },
  {
    id: "pottery-collection-05",
    src: "/Assets/kapilam/products/pottery-collection-05.jpeg",
    width: 906,
    height: 1600,
    alt: "Traditional hand-thrown terracotta pottery silhouette",
    kind: "authentic-photo",
    category: "terracotta-pottery",
    seriesLabel: "Terracotta Pottery",
  },
  {
    id: "pottery-collection-02",
    src: "/Assets/kapilam/products/pottery-collection-02.jpeg",
    width: 903,
    height: 1599,
    alt: "Natural dark Kapilam pot nestled among kiln-ready terracotta vessels",
    kind: "authentic-photo",
    category: "terracotta-pottery",
    seriesLabel: "Terracotta Pottery",
  },
  {
    id: "pottery-collection-03",
    src: "/Assets/kapilam/products/pottery-collection-03.jpeg",
    width: 952,
    height: 1300,
    alt: "Handmade pottery study from @kap_ilam",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "terracotta-pottery",
    seriesLabel: "Terracotta Pottery",
  },

  // Decorative Sculptures
  {
    id: "animal-sculptures-01",
    src: "/Assets/kapilam/products/animal-sculptures-01.jpeg",
    width: 1034,
    height: 1290,
    alt: "Pair of hand-sculpted terracotta animal figures standing in shallow rainwater",
    kind: "authentic-photo",
    category: "decorative-sculptures",
    seriesLabel: "Decorative Sculptures",
  },
  {
    id: "animal-sculptures-02",
    src: "/Assets/kapilam/products/animal-sculptures-02.jpeg",
    width: 1052,
    height: 1330,
    alt: "Handmade terracotta animal sculpture by Kapilam",
    kind: "authentic-photo",
    category: "decorative-sculptures",
    seriesLabel: "Decorative Sculptures",
  },
  {
    id: "animal-sculptures-03",
    src: "/Assets/kapilam/products/animal-sculptures-03.jpeg",
    width: 952,
    height: 1309,
    alt: "Terracotta animal sculpture featured on @kap_ilam",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "decorative-sculptures",
    seriesLabel: "Decorative Sculptures",
  },

  // Planters
  {
    id: "clay-planters",
    src: "/Assets/kapilam/products/clay-planters.jpeg",
    width: 941,
    height: 1302,
    alt: "Trio of handcrafted dark terracotta clay planters with indoor greenery",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "planters",
    seriesLabel: "Planters",
  },

  // Home Decor (Relief Wall Plaques & Calendars)
  {
    id: "terracotta-art-05",
    src: "/Assets/kapilam/products/terracotta-art-05.jpeg",
    width: 1025,
    height: 1274,
    alt: "Three carved terracotta animal relief wall plaques with hooks on natural linen",
    kind: "authentic-photo",
    category: "home-decor",
    seriesLabel: "Home Decor",
  },
  {
    id: "Calendar-art-02",
    src: "/Assets/kapilam/products/Calendar-art-02.jpeg",
    width: 1080,
    height: 1328,
    alt: "Handcrafted terracotta wall relief calendar art",
    kind: "authentic-photo",
    category: "home-decor",
    seriesLabel: "Home Decor",
  },
  {
    id: "Calendar-art-01",
    src: "/Assets/kapilam/products/Calendar-art-01.jpeg",
    width: 952,
    height: 1315,
    alt: "Carved terracotta elephant relief plaque with hanging paper calendar",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "home-decor",
    seriesLabel: "Home Decor",
  },
  {
    id: "terracotta-art-01",
    src: "/Assets/kapilam/products/terracotta-art-01.jpeg",
    width: 949,
    height: 1310,
    alt: "Carved terracotta mythical lion relief tile",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "home-decor",
    seriesLabel: "Home Decor",
  },
  {
    id: "terracotta-art-02",
    src: "/Assets/kapilam/products/terracotta-art-02.jpeg",
    width: 1061,
    height: 1322,
    alt: "Hand-carved terracotta relief artwork by Kapilam",
    kind: "authentic-photo",
    category: "home-decor",
    seriesLabel: "Home Decor",
  },
  {
    id: "terracotta-art-07",
    src: "/Assets/kapilam/products/terracotta-art-07.jpeg",
    width: 1080,
    height: 1219,
    alt: "Handmade terracotta decorative wall relief",
    kind: "authentic-photo",
    category: "home-decor",
    seriesLabel: "Home Decor",
  },
  {
    id: "terracotta-art-08",
    src: "/Assets/kapilam/products/terracotta-art-08.jpeg",
    width: 1004,
    height: 1255,
    alt: "Hand-sculpted dark terracotta decorative piece",
    kind: "authentic-photo",
    category: "home-decor",
    seriesLabel: "Home Decor",
  },

  // Handmade Artistic Pieces & Miniatures
  {
    id: "miniatures-04",
    src: "/Assets/kapilam/products/miniatures-04.jpeg",
    width: 1080,
    height: 1339,
    alt: "Set of dark terracotta miniature relief plaques and tiny vessels on raw linen",
    kind: "authentic-photo",
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "miniatures-03",
    src: "/Assets/kapilam/products/miniatures-03.jpeg",
    width: 1080,
    height: 1244,
    alt: "Handmade dark clay miniature reliefs",
    kind: "authentic-photo",
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "miniatures-05",
    src: "/Assets/kapilam/products/miniatures-05.jpeg",
    width: 1080,
    height: 1348,
    alt: "Detailed miniature terracotta crafts by Kapilam",
    kind: "authentic-photo",
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "miniatures-06",
    src: "/Assets/kapilam/products/miniatures-06.jpeg",
    width: 981,
    height: 1238,
    alt: "Artisan miniature clay sculptures",
    kind: "authentic-photo",
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "miniatures-01",
    src: "/Assets/kapilam/products/miniatures-01.jpeg",
    width: 948,
    height: 1305,
    alt: "Handcrafted dark terracotta miniature magnet reliefs",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "miniatures-02",
    src: "/Assets/kapilam/products/miniatures-02.jpeg",
    width: 995,
    height: 1343,
    alt: "Handmade miniature terracotta relief pieces",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "terracotta-art-03",
    src: "/Assets/kapilam/products/terracotta-art-03.jpeg",
    width: 941,
    height: 1316,
    alt: "Artisanal terracotta wall artwork from @kap_ilam",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "terracotta-art-04",
    src: "/Assets/kapilam/products/terracotta-art-04.jpeg",
    width: 952,
    height: 1323,
    alt: "Handmade terracotta artistic relief from @kap_ilam",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
  {
    id: "terracotta-art-06",
    src: "/Assets/kapilam/products/terracotta-art-06.jpeg",
    width: 958,
    height: 1318,
    alt: "Hand-shaped terracotta craft featured on @kap_ilam",
    kind: "instagram-post",
    hasInstagramHeader: true,
    category: "artistic-pieces",
    seriesLabel: "Handmade Artistic Pieces",
  },
];

/**
 * Future Blender .glb asset manifest.
 * Do not flip `available` to true until the corresponding .glb exists on disk.
 */
export const FUTURE_GLB_MODELS: readonly GlbModelAsset[] = [
  {
    id: "terracotta-pot",
    label: "Signature Terracotta Pot",
    src: "/Assets/kapilam/models/terracotta-pot.glb",
    available: false,
  },
  {
    id: "pottery-vase",
    label: "Wheel-Thrown Pottery Vase",
    src: "/Assets/kapilam/models/pottery-vase.glb",
    available: false,
  },
  {
    id: "elephant-sculpture",
    label: "Terracotta Elephant Sculpture",
    src: "/Assets/kapilam/models/elephant-sculpture.glb",
    available: false,
  },
  {
    id: "decorative-sculpture",
    label: "Decorative Terracotta Sculpture",
    src: "/Assets/kapilam/models/decorative-sculpture.glb",
    available: false,
  },
];
