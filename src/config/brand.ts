export interface NavItem {
  label: string;
  href: string;
  sectionNumber: string;
}

export const BRAND = {
  name: "KAPILAM",
  tamilName: "கபிலம்",
  instagramHandle: "@kap_ilam",
  /**
   * Real Instagram profile URL has not yet been confirmed in supplied project config.
   * Set NEXT_PUBLIC_KAPILAM_INSTAGRAM_URL in .env.local (or update this constant once confirmed).
   */
  instagramUrl: process.env.NEXT_PUBLIC_KAPILAM_INSTAGRAM_URL ?? null,
  tagline: "Where Earth Remembers Its Art.",
  heroSupporting: "Ancient earth. Timeless craft. Contemporary soul.",
  introStatement: "Every piece of earth carries a story.",
  heroCtas: {
    primary: { label: "Enter the World of Kapilam", href: "#about" },
    secondary: { label: "Explore Our Craft", href: "#craftsmanship" },
  },
  philosophyQuotes: [
    "Not Made by Machines. Made by Memories.",
    "Every Imperfection Holds a Story.",
    "Shaped by Hands. Inspired by Earth.",
  ] as const,
  aboutParagraphs: [
    "Rooted in the ancient soil of India, Kapilam draws its name from the rich, dark brown hue of terracotta, a color that whispers stories of the past, of tradition, and of warmth. The timeless craft of Indian pottery and terracotta is brought to life through the hands of traditional artisans and shaped with a contemporary soul.",
    "It is a journey back to childhood, when fingers first met clay, and every grain of sand held the potential for a story, a world, a dream.",
    "Working with traditional potters, Kapilam also strives to promote the most sustainable and eco-friendly products, supporting their community and craftsmanship. Each curve, each imperfection, is a mark of a maker's soul and of my own deep passion for sculpting life out of earth.",
  ] as const,
  aboutHighlights: [
    "rich, dark brown hue of terracotta",
    "hands of traditional artisans",
    "shaped with a contemporary soul",
    "sculpting life out of earth",
  ] as const,
  sustainabilityCopy: {
    eyebrow: "Earth & Sustainability",
    heading: "Born of Soil. Returned to Harmony.",
    body: "Working alongside traditional potters, Kapilam honors natural clay, hand-shaped forms, and mindful creation—supporting artisan communities and eco-friendly craft without shortcuts.",
  },
  contactPlaceholder: {
    eyebrow: "Connect With Kapilam",
    heading: "Commission, Collaborate, or Inquire",
    note: "Direct studio email, phone, and workshop address will be published here once confirmed. Until then, follow our journey and reach us on Instagram at @kap_ilam.",
    fields: [
      { label: "Instagram", value: "@kap_ilam" },
      { label: "Studio Email", value: "Coming soon — placeholder" },
      { label: "Workshop Location", value: "India — details coming soon" },
    ],
  },
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Story", href: "#about", sectionNumber: "04" },
  { label: "Collection", href: "#collection", sectionNumber: "05" },
  { label: "Craft", href: "#craftsmanship", sectionNumber: "06" },
  { label: "Earth", href: "#sustainability", sectionNumber: "07" },
  { label: "Gallery", href: "#gallery", sectionNumber: "08" },
  { label: "Contact", href: "#contact", sectionNumber: "11" },
];
