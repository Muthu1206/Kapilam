# KAPILAM — Project Audit & Technical Architecture (Phase 0)

> **Audit Date:** 2026-11-21  
> **Workspace:** `d:\projects\kapilam`  
> **Status:** Suitable for Phase 1 development — all required core frameworks, 3D libraries, animation engines, and authentic brand/product visual assets are already present.

---

## 1. Current Project Status

The repository is a freshly scaffolded **Next.js 16.4.6** App Router project using **React 19.3.0**, **TypeScript 5** (`strict: true`), and **Tailwind CSS 4.3.3** (via `@tailwindcss/turbopack`).

- `src/app/` currently contains only the default `create-next-app` starter files (`layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`).
- `next.config.ts` has Next.js 16 defaults enabled: `cacheComponents: true`, `partialPrefetching: true`, and Turbopack CSS loader rules for `@tailwindcss/turbopack`.
- `npx tsc --noEmit` passes cleanly on the starter baseline with zero TypeScript errors.
- `public/Assets/kapilam/` already contains **35 image assets** across `logo/`, `brand/`, `craftsmanship/`, and `products/`, plus empty `models/` and `references/` directories prepared for future uploads.
- Default starter SVGs (`public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) remain untouched in `public/` (non-destructive rule).

---

## 2. Existing Dependencies

### Production Dependencies (`package.json`)

| Package | Version | Role | Status |
| :--- | :--- | :--- | :--- |
| `next` | `16.4.6` | App Router framework, image & font optimization | Installed |
| `react` / `react-dom` | `19.3.0` | UI runtime | Installed |
| `three` | `^0.187.0` | Core WebGL / 3D rendering engine | Installed |
| `@react-three/fiber` | `^9.8.2` | React 19-compatible Three.js renderer | Installed |
| `@react-three/drei` | `^10.7.9` | R3F helpers (`useGLTF`, `Environment`, `ContactShadows`, etc.) | Installed |
| `gsap` | `^3.15.1` | Timeline & ScrollTrigger choreography | Installed |
| `@gsap/react` | `^2.1.2` | React-safe GSAP context (`useGSAP`) and cleanup | Installed |
| `motion` | `^14.14.0` | Micro-interactions, nav transitions, UI choreography | Installed |
| `lucide-react` | `^1.77.0` | Minimalist editorial iconography (note: brand icons such as `Instagram` were removed in v1.x; custom SVG icon `src/components/ui/InstagramIcon.tsx` used) | Installed |

### Development Dependencies (`package.json`)

| Package | Version | Role | Status |
| :--- | :--- | :--- | :--- |
| `tailwindcss` | `4.3.3` | Utility-first styling (`@import "tailwindcss"`, `@theme inline`) | Installed |
| `@tailwindcss/turbopack` | `4.3.3` | Turbopack Tailwind CSS 4 loader | Installed |
| `typescript` | `^5` | Strict static typing | Installed |
| `@types/node`, `@types/react`, `@types/react-dom` | `^20` / `^19` | Type definitions | Installed |
| `eslint` / `eslint-config-next` | `^9` / `16.4.6` | Core Web Vitals & TypeScript linting | Installed |

> **TypeScript Note (`@types/three`):** `@types/three` is currently installed transitively in `node_modules/@types/three` (pulled in by `@react-three/fiber` / `@react-three/drei`), though not explicitly declared in `devDependencies`. Under npm hoisting this resolves cleanly; adding `@types/three` explicitly to `devDependencies` can be considered later if migrating to strict package managers such as pnpm.

**All required libraries (Three.js, R3F, Drei, GSAP, Motion, Lucide React, Tailwind CSS) are already installed. No additional package installations are required to begin Phase 1.**

---

## 3. Asset Inventory

> **CRITICAL CASE-SENSITIVITY FINDING (Windows vs. Vercel/Linux):**  
> On disk, the asset root directory is `public/Assets/kapilam/` (uppercase **`A`** in `Assets`), two product files start with uppercase **`C`** (`Calendar-art-01.jpeg`, `Calendar-art-02.jpeg`), and one logo has a double extension (`kapilam-logo-original.jpg.jpeg`). Because Vercel deploys on case-sensitive Linux filesystems, **every URL path in `src/config/assets.ts` MUST match exact on-disk casing (`/Assets/kapilam/...`)** without altering or renaming original files.

### 3.1 Original KAPILAM Logo (`public/Assets/kapilam/logo/`)

| File | Dimensions | Size | Visual Audit & Usage Notes |
| :--- | :--- | :--- | :--- |
| `kapilam-logo.png` | `1080×1063` | `813.6 KB` | Circular dark terracotta textured medallion featuring the white Tamil calligraphy wordmark **"கபிலம்"** (Kapilam), centered on a soft blurred gray square background. **Primary logo source** (lossless PNG). |
| `kapilam-logo-original.jpg.jpeg` | `1080×1063` | `141.7 KB` | Identical circular medallion artwork in compressed JPEG format (double extension `.jpg.jpeg`). Preserved untouched as archival original. |

**Logo Rendering Rule:** Never recreate, trace, stretch, or distort the Tamil wordmark. Render the original image inside a clean circular container (`rounded-full overflow-hidden`) with uniform `object-cover` framing so the blurred square corners outside the circular badge are neatly clipped while preserving exact logo geometry.

### 3.2 Brand Visuals (`public/Assets/kapilam/brand/`)

| File | Dimensions | Size | Type | Visual Audit & Usage Notes |
| :--- | :--- | :--- | :--- | :--- |
| `brand-poster-01.png` | `1672×941` | `2,258.0 KB` | Brand Concept Visual | Wide editorial visual of potter's hands throwing clay on a wheel with terracotta sculptures (horse, bird, elephant & tree reliefs), Tamil "கபிலம்" wordmark, and "Shaped by Hands. Inspired by Earth." Large file (2.2 MB) — serve via `next/image` optimization. |
| `brand-poster-02.jpg` | `1536×1024` | `78.0 KB` | Editorial Studio Visual | Minimalist burnt terracotta vessel on a raw stone plinth with dried wheat against a moody charcoal plaster wall. Ideal editorial backdrop/parallax anchor (not misrepresented as SKU inventory). |
| `brand-story.jpeg` | `962×1310` | `380.4 KB` | Authentic `@kap_ilam` Instagram Post | Screenshot of the `@kap_ilam` About Kapilam post (includes dark Instagram header bar at top ~10%, brand story text, and aged handmade terracotta vessel). |

### 3.3 Craftsmanship Photography (`public/Assets/kapilam/craftsmanship/`)

All 5 files are authentic process/studio photographs with **no Instagram top header bar**:

| File | Dimensions | Size | Visual Notes |
| :--- | :--- | :--- | :--- |
| `artisan-work-01.jpeg` | `1036×1307` | `338.8 KB` | Clay-sculpted hand beside the maker's real hand — evocative artisan study. |
| `artisan-work-02.jpeg` | `1080×1466` | `453.1 KB` | Three stages of hand-sculpted terracotta hands with subtle caption "The progress" at bottom. |
| `artisan-work-03.jpeg` | `1080×1356` | `232.6 KB` | Close-up of sculpted raw clay hand resting on stone floor. |
| `clay-pots.jpeg` | `899×1600` | `144.9 KB` | Rows of freshly thrown unfired clay pots drying beside a traditional potter's wheel (subtle bottom-right quote overlay). |
| `pottery-making.jpeg` | `1080×1436` | `222.2 KB` | Clay-covered hands shaping a vessel on a spinning wheel. |

### 3.4 Authentic Product Photography (`public/Assets/kapilam/products/`)

**25 authentic `@kap_ilam` product photographs** are available across 6 filename groups. Visual inspection revealed that **10 product files** include the dark `@kap_ilam` Instagram post header bar across the top ~10% of the frame, while **15 product files** are clean full-frame photographs:

| Group | Files | Count | Instagram Top Bar Detected | Clean Full-Frame Files |
| :--- | :--- | :--- | :--- | :--- |
| **Animal Sculptures** | `animal-sculptures-01..03.jpeg` | 3 | `03` | `01`, `02` |
| **Calendar Art (Terracotta Reliefs)** | `Calendar-art-01..02.jpeg` | 2 | `01` | `02` |
| **Clay Planters** | `clay-planters.jpeg` | 1 | `clay-planters.jpeg` | — |
| **Miniatures & Relief Magnets** | `miniatures-01..06.jpeg` | 6 | `01`, `02` | `03`, `04`, `05`, `06` |
| **Pottery Collection** | `pottery-collection-01..05.jpeg` | 5 | `03` (`02` has Instagram Story caption text) | `01`, `02`, `04`, `05` |
| **Terracotta Art & Wall Reliefs** | `terracotta-art-01..08.jpeg` | 8 | `01`, `03`, `04`, `06` | `02`, `05`, `07`, `08` |

> **Non-Destructive Presentation Strategy:** Original files will never be edited or overwritten. Each entry in `src/config/assets.ts` carries a `hasInstagramHeader: boolean` flag so gallery frames can cleanly crop out the top ~11% bar via CSS framing (`object-cover` + calibrated vertical position) in the Collection and Visual Gallery, while Instagram screenshots can be featured naturally in the `@kap_ilam` Instagram section.

---

## 4. Missing Assets

| Category | Expected / Needed Asset | Current Status | Handling Plan |
| :--- | :--- | :--- | :--- |
| **3D Models (`.glb`)** | `terracotta-pot.glb`, `pottery-vase.glb`, `elephant-sculpture.glb`, `decorative-sculpture.glb` in `public/Assets/kapilam/models/` | Directory exists, **0 files** | Build procedural Three.js geometry & clay materials now; architect `ModelLoader.tsx` with Drei `useGLTF` and `available: false` manifest flags so `.glb` files can drop in cleanly in Phase 5 without broken fetches. |
| **Transparent Vector / Cutout Logo** | Transparent SVG or transparent-background PNG of the Tamil **"கபிலம்"** calligraphy wordmark | Not supplied (current PNG/JPG are circular badges with blurred square corners) | Frame the original PNG inside a clean circular medallion mask without modifying or recreating the Tamil glyphs. Recommend supplying a transparent vector/PNG cutout later if open placement on light linen backgrounds is desired. |
| **Direct Contact Details** | Verified email, phone number, studio location, and confirmed Instagram profile URL | Not supplied (only handle `@kap_ilam` is provided) | Display `@kap_ilam` and clearly marked contact placeholders; **never invent email addresses, phone numbers, or street addresses**. |
| **Reference Screenshots** | `public/Assets/kapilam/references/` | Directory exists, **0 files** | Proceed using the earthy luxury design system and brand posters (`brand-poster-01.png`, `brand-poster-02.jpg`) as visual direction. |
| **Dedicated Landscape Hero / Sustainability Photos** | High-res clean widescreen photographs of clay soil / kiln firing / planters without Instagram chrome | Most product photos are 3:4 / 4:5 portrait | Combine procedural 3D scenes (Hero & Sustainability) with thoughtfully composed portrait/editorial grid ratios that respect each photo's native aspect ratio. |

---

## 5. Proposed Source Code Architecture

```text
src/
  app/
    layout.tsx              # RootLayout: Cormorant Garamond + Manrope fonts, SEO metadata, base theme
    page.tsx                # Semantic 11-section page composition (Server Component shell + Client islands)
    globals.css             # Tailwind v4 @theme tokens, earthy luxury palette, grain texture, smooth utilities

  config/
    brand.ts                # Brand identity, verbatim About Kapilam copy, quotes, navigation, placeholders
    assets.ts               # Exact case-sensitive asset registry (/Assets/kapilam/...), dimensions, metadata, GLB manifest

  hooks/
    useReducedMotion.ts     # Hydration-safe prefers-reduced-motion observer
    useDeviceQuality.ts     # Adaptive HIGH / BALANCED / LOW GPU & viewport quality profiler

  animations/
    gsap.ts                 # Centralized GSAP + ScrollTrigger registration & cleanup helpers
    scrollAnimations.ts     # Reusable ScrollTrigger choreography builders
    transitions.ts          # Shared Motion easing curves and micro-interaction variants

  components/
    layout/
      LoadingIntro.tsx      # Section 01: Original Tamil logo medallion, clay dust, light sweep, Skip Intro
      Navbar.tsx            # Minimal gallery-grade floating nav + responsive mobile drawer
      Footer.tsx            # Closing brand signature, @kap_ilam, honest contact placeholder

    sections/
      HeroSection.tsx       # Section 02: Full-screen 3D Hero stage + editorial display typography & CTAs
      BrandIntro.tsx        # Section 03: "Every piece of earth carries a story." progressive reveal + parallax
      AboutSection.tsx      # Section 04: Two-column editorial About Kapilam (exact verbatim copy)
      CollectionSection.tsx # Section 05: Curated Collection with category filter, 3D tilt, authentic photos
      CraftsmanshipSection.tsx # Section 06: Horizontal scroll storytelling & clay-making process timeline
      SustainabilitySection.tsx # Section 07: Earth & Sustainability with procedural 3D earth scene
      GallerySection.tsx    # Section 08: Asymmetric masonry editorial gallery
      PhilosophySection.tsx # Section 09: Full-screen typographic triptych for the 3 brand quotes
      InstagramSection.tsx  # Section 10: @kap_ilam editorial showcase & connection placeholder
      ContactSection.tsx    # Section 11: Luxury inquiry placeholder & closing transition

    ui/
      KapilamLogo.tsx       # Non-distorted circular medallion renderer for original Tamil logo
      EditorialImage.tsx    # next/image wrapper handling Instagram-header framing & reveal states
      AnimatedText.tsx      # Line/word editorial text reveal
      Reveal.tsx            # Scroll-safe entrance wrapper

  three/
    scenes/
      HeroScene.tsx         # Lazy-loaded full-screen R3F Hero canvas + WebGL fallback
      SustainabilityScene.tsx # Lazy-loaded Earth & Clay procedural 3D ambient stage
    models/
      ProceduralPot.tsx     # LatheGeometry traditional Indian matka / terracotta vessel with organic displacement
      ProceduralVase.tsx    # Sculpted amphora silhouette with subtle throwing rings
      FloatingSculpture.tsx # Organic clay shards, rings & sculptural forms in slow orbital drift
      ClayParticles.tsx     # Instanced / Points warm terracotta dust motes
    materials/
      ClayMaterial.tsx      # Procedural matte terracotta PBR + canvas bump/roughness maps (throwing grooves + mineral grain)
    components/
      LightingRig.tsx       # Warm key spotlight, rim terracotta bounce, soft fill & contact shadows
      CameraController.tsx  # Mouse parallax (desktop), touch drag/tilt (mobile), GSAP ScrollTrigger camera choreography
      ModelLoader.tsx       # Future Blender .glb loader (useGLTF + Suspense + ErrorBoundary -> procedural fallback)
```

---

## 6. 3D Implementation Strategy

1. **Procedural Pottery Geometry (Phases 2 & 3):**
   - Construct authentic Indian terracotta silhouettes (rounded matka belly, flared neck lip, wheel-thrown foot ring, elongated amphora vase) using `THREE.LatheGeometry` with bespoke spline profiles (`THREE.SplineCurve`) and subtle deterministic radial/vertical organic displacement so vessels feel hand-thrown rather than CAD-sterile.
   - Add floating terracotta rings, kiln pebbles, and organic sculpted forms (`FloatingSculpture.tsx`) to establish foreground/midground/background gallery depth.
2. **Procedural Clay Material (`ClayMaterial.tsx`):**
   - Generate lightweight offscreen `<canvas>` procedural normal/bump and roughness/color-variation textures once (memoized and properly disposed on unmount): fine horizontal potter's wheel striations, micro-mineral speckle, subtle kiln-fire darkening near the base, high matte roughness (`0.82–0.94`), zero plastic specular glare.
   - Keep shader complexity restrained (`MeshStandardMaterial` enhanced with procedural maps or minimal `onBeforeCompile` tinting) for rock-solid mobile GPU performance.
3. **Future Blender `.glb` Swappability (Phase 5):**
   - Every hero/featured 3D slot renders through a shared `ArtifactModel` / `ModelLoader` contract: `{ id, glbPath?, fallback: ReactNode, scale, position, rotation }`.
   - When real `.glb` files are placed into `public/Assets/kapilam/models/` and flipped to `available: true` in `src/config/assets.ts`, `useGLTF` loads them inside `<Suspense>` + a React Error Boundary with automatic fallback to the procedural sculpture if a file fails to load.
4. **Memory Hygiene:**
   - Explicitly `.dispose()` all procedural geometries, procedural canvas textures, and materials on unmount.
   - Lazy-load 3D canvases via `next/dynamic({ ssr: false })` and pause/unmount off-screen WebGL rendering when scrolled out of view (`frameloop` control or `IntersectionObserver`).

---

## 7. Mobile Performance Strategy

Mobile gets the **full 3D gallery experience** via adaptive quality tiers (`useDeviceQuality`):

| Parameter | `HIGH` (Desktop GPU) | `BALANCED` (Laptop / Modern Mobile) | `LOW` (Low-RAM / Older Mobile / Save-Data) |
| :--- | :--- | :--- | :--- |
| Canvas DPR | `[1, 2]` | `[1, 1.5]` | `[1, 1]` |
| Pottery Lathe Segments | `72 × 48` | `48 × 32` | `32 × 20` |
| Clay Dust Particles | `220` | `110` | `45` |
| Shadows | Soft PCF + ContactShadows | Baked/low-res ContactShadows | Disabled (ambient occlusion shading via material) |
| Antialiasing | `true` | `true` | `false` |
| Interaction | Smooth pointer parallax + scroll | Gentle touch drag + scroll (never hijacks vertical page scroll) | Subtle autonomous drift + scroll |

- **WebGL Unavailable Fallback:** If WebGL context creation fails or is blocked, gracefully render a curated static studio composition (`brand-poster-02.jpg` + subtle CSS warmth) behind the Hero typography with zero runtime errors.
- **Reduced Motion (`prefers-reduced-motion: reduce`):** Instant/gentle opacity transitions, zero continuous orbital camera motion, static well-composed 3D pottery hero lighting, and disabled scroll pinning that could feel disorienting.

---

## 8. Risks & Recommendations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **Case-sensitive asset paths on Vercel (`Assets` vs `assets`, `Calendar-art-*`)** | 404 images in production Linux builds | Centralize all paths in `src/config/assets.ts` using exact on-disk casing and verify every URL during build checks. |
| **Instagram headers baked into 11 source images** | Breaks luxury art-gallery polish if displayed raw | Non-destructively flag `hasInstagramHeader: true` in `src/config/assets.ts` and apply calibrated CSS framing in editorial gallery tiles while keeping original files untouched. |
| **Large unoptimized PNG (`brand-poster-01.png`, 2.26 MB)** | Slow LCP on mobile connections | Always render through `next/image` with explicit `sizes`, WebP/AVIF negotiation, and lazy loading below the fold. |
| **GSAP ScrollTrigger + Motion animation conflicts** | Jittery transforms or layout thrashing | Strict separation of responsibilities: GSAP owns scroll-linked timelines, pinning, and 3D camera progress; Motion owns interactive UI transitions (nav drawer, filter tabs, button feedback). Never animate the same DOM property with both engines simultaneously. |
| **Next.js 16 `cacheComponents: true` + Client 3D/Browser APIs** | Hydration mismatch if `window`/`matchMedia` read during render | Keep `page.tsx` as a clean Server Component shell; isolate all browser APIs, R3F canvases, GSAP, and Motion inside `'use client'` boundaries with hydration-safe initial state. |
| **Parent directory Git workspace warning** | `d:\projects` has a parent `.git` with unrelated submodules | Keep all Kapilam changes strictly scoped inside `d:\projects\kapilam`. |

---

## 9. Recommended Implementation Sequence

1. **Phase 0 (Completed):** Repository inspection, dependency check, full visual asset audit, and creation of `docs/PROJECT_AUDIT.md`.
2. **Phase 1 (Immediate Next):** Design system (`globals.css`, typography, color tokens), `src/config/brand.ts` & `src/config/assets.ts`, device quality & reduced-motion hooks, `LoadingIntro` (Section 01), `Navbar`, `Footer`, and responsive semantic page foundation for all 11 sections.
3. **Phase 2:** Immersive Procedural 3D Hero (`HeroScene`, `ProceduralPot`, `ProceduralVase`, `FloatingSculpture`, `ClayParticles`, `ClayMaterial`, `LightingRig`, `CameraController`) + WebGL fallback.
4. **Phase 3:** Full build-out and GSAP/Motion choreography for Sections 03–11 (`BrandIntro`, `AboutSection`, `CollectionSection`, `CraftsmanshipSection`, `SustainabilitySection` with Earth 3D scene, `GallerySection`, `PhilosophySection`, `InstagramSection`, `ContactSection`).
5. **Phase 4:** Mobile performance tuning, quality profile verification, touch ergonomics, reduced-motion verification, and GPU resource disposal audit.
6. **Phase 5:** Blender `.glb` integration architecture (`ModelLoader.tsx`, manifest contract, graceful fallbacks, developer guide for dropping in `.glb` files).
7. **Phase 6:** Full production build (`next build`), lint/type checks, console & hydration audit, and Vercel deployment readiness report.
