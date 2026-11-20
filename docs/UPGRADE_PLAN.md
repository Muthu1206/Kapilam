# KAPILAM — Cinematic Immersive Website Upgrade Plan

> **Baseline:** Phase 0 Audit (`docs/PROJECT_AUDIT.md`) & Phase 1 Foundation completed and verified (`tsc`, `eslint`, `next build`).  
> **Approach:** Incremental, non-destructive upgrade building directly on the existing Next.js 16 + Tailwind v4 + R3F + GSAP + Motion foundation.

---

## 1. Pre-Implementation Review

### 1.1 Existing Project & Phase 1 Review
- **Completed Foundation:** `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/config/brand.ts`, `src/config/assets.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/useDeviceQuality.ts`, `LoadingIntro.tsx`, `Navbar.tsx`, `Footer.tsx`, `KapilamLogo.tsx`, `EditorialImage.tsx`, `InstagramIcon.tsx`.
- **HeroSection & HeroScene Status:** Neither `src/components/sections/HeroSection.tsx` nor `src/three/scenes/HeroScene.tsx` exists yet — `#hero` in `src/app/page.tsx` is currently the Phase 1 structural stage ready to be upgraded into the full-screen immersive hero.
- **No Existing Assets Will Be Modified:** All 35 original files in `public/Assets/kapilam/` remain untouched.

### 1.2 Installed GSAP Plugins (`gsap@3.15.1` + `@gsap/react@2.1.2`)
Verified directly in `node_modules/gsap`:
- **Installed & Ready:** `ScrollTrigger`, `SplitText` (with GSAP 3.15 `mask` & `autoSplit` support), `CustomEase`, `Observer`, `ScrollToPlugin`, `Flip`, `DrawSVGPlugin`, `ScrollSmoother`.
- **Scrolling Strategy:** Native scrolling + `ScrollTrigger` + `ScrollToPlugin` (no Lenis added unless explicitly requested later), keeping mobile touch scrolling, anchor navigation, and accessibility rock-solid.

### 1.3 Visual Reference Verification

| Reference | Supplied In Chat | Status On Disk (`public/Assets/kapilam/`) | Role in Upgrade |
| :--- | :--- | :--- | :--- |
| **Reference A (`image.png`)** | Yes | Not in `references/` (composition mood reference only — not needed on disk) | Monumental full-screen stage framing, dramatic spotlight contrast, minimal top chrome, left editorial headline + interactive depth cue. **Zero dragon, neon, or unrelated branding reproduced.** |
| **Reference B (`BTAND2.png`)** | Yes | Present at `public/Assets/kapilam/brand/brand-poster-01.png` | Warm burnt-terracotta palette, directional studio sunlight, artisan hands, traditional Indian pottery & reliefs, editorial warmth. Official Tamil logo remains the untouched `kapilam-logo.png`. |
| **Reference C (`animal-sculptures-01.jpeg`)** | Yes | Present at `public/Assets/kapilam/products/animal-sculptures-01.jpeg` | **Authentic Hero Centrepiece:** Kapilam's hand-sculpted terracotta deer pair (parent & fawn). Presented with layered 3D gallery depth, subtle pointer/touch parallax, warm volumetric lighting, and transparent labeling — **never falsely presented as a 3D mesh**, while architected behind `ModelLoader.tsx` for seamless future `.glb` replacement. |

---

## 2. Upgraded Typography System

Upgrading `src/app/layout.tsx` and `src/app/globals.css` using `next/font/google` (all four fonts verified available in Next.js 16):

| Role | Font Family | CSS Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Display** | `Bodoni_Moda` (400–700, normal & italic) | `--font-bodoni` | Oversized editorial display headlines (`KAPILAM`, section monuments, full-screen quotes) |
| **Secondary Editorial** | `Cormorant_Garamond` (300–600, normal & italic) | `--font-cormorant` | Poetic italic taglines, About Kapilam lead prose, sculptural captions |
| **Body & UI** | `Manrope` (300–600) | `--font-manrope` | Body copy, navigation, eyebrows, subtle gallery metadata |
| **Tamil Supporting Text** | `Noto_Serif_Tamil` (400–600) | `--font-noto-tamil` | Subtle editorial Tamil cultural subtitles/accents (**never** used to recreate or replace the official `kapilam-logo.png` calligraphy) |

---

## 3. Controlled Stage-by-Stage Execution Plan

### Stage 1 — Typography Upgrade, Advanced GSAP Engine & Immersive Living Earth Hero
**Scope:**
1. **Typography & Brand Copy Updates:**
   - Add `Bodoni_Moda` and `Noto_Serif_Tamil` alongside `Cormorant_Garamond` and `Manrope` in `layout.tsx` & `globals.css`.
   - Update Hero CTAs in `src/config/brand.ts` to `"Enter the World of Kapilam"` and `"Explore Our Craft"` while preserving all 11 section anchors and exact verbatim About Kapilam text.
2. **Modular GSAP Animation Architecture (`src/animations/`):**
   - `gsap.ts` — Centralized plugin registration (`ScrollTrigger`, `SplitText`, `CustomEase`, `ScrollToPlugin`), custom luxury easing curves (`kapilam.expo`, `kapilam.clay`), `ScrollTrigger.refresh()` debounce helper, and reduced-motion guard.
   - `textAnimations.ts` — GSAP `SplitText` character/word/line masked reveals with clean `revert()` cleanup.
   - `imageAnimations.ts` — Clip-path curtain reveals, subtle scale-settle transitions, and staggered gallery choreography.
   - `parallax.ts` — Smooth scrub-linked depth layers for desktop and gentle touch-safe offsets for mobile.
   - `sceneTransitions.ts` — Background tonal handoffs and seamless section transitions.
   - `horizontalScroll.ts` — Controlled ScrollTrigger horizontal track for Craftsmanship (desktop horizontal scrub, touch-native horizontal rail on mobile so page scroll is never trapped).
   - `scrollAnimations.ts` — Shared section reveal helpers & `useGSAP` context conventions.
   - `heroTimeline.ts` — Synchronized Intro-to-Hero entrance choreography (mask reveal, character stagger, ambient light bloom, CTA settle).
3. **Interactive UI Craft (`src/components/ui/`):**
   - `CustomCursor.tsx` — Refined pointer-only desktop gallery cursor (`pointer: fine` check; never rendered on touch/mobile or reduced-motion).
   - `MagneticButton.tsx` — Subtle magnetic pull on primary CTAs (desktop pointer only; crisp press feedback everywhere).
4. **Immersive 3D Hero (`src/three/` + `src/components/sections/HeroSection.tsx`):**
   - `src/three/materials/ClayMaterial.tsx` — Procedural matte burnt-terracotta PBR material with canvas-generated wheel grooves, mineral speckle, and kiln-fire tonal gradient (disposed cleanly on unmount).
   - `src/three/models/SculptureStage.tsx` — Authentic `animal-sculptures-01.jpeg` mounted as an illuminated museum-grade layered spatial showcase plane inside the 3D space (with floating architectural frame depth, warm rim light, subtle parallax tilt, ground shadow plane, and honest subtle caption; architected to accept a real `.glb` via `ModelLoader.tsx` without layout changes).
   - `src/three/models/ProceduralPot.tsx`, `ProceduralVase.tsx`, `FloatingSculpture.tsx` — Supporting background procedural terracotta silhouettes & floating earth rings creating genuine foreground/midground/background 3D depth around the deer sculpture centerpiece.
   - `src/three/models/ClayParticles.tsx` — Adaptive floating clay dust particles (`220` HIGH / `110` BALANCED / `45` LOW).
   - `src/three/components/LightingRig.tsx` — Dramatic warm studio key spotlight, terracotta bounce fill, atmospheric exponential fog, soft shadows.
   - `src/three/components/CameraController.tsx` — Pointer parallax on desktop, gentle touch-aware drift on mobile, subtle orbit, and scroll-scrubbed camera dolly transitioning out of the hero.
   - `src/three/scenes/HeroScene.tsx` — Dynamically imported (`ssr: false`) R3F Canvas with `useDeviceQuality`, `useReducedMotion`, `IntersectionObserver` pause off-screen, and WebGL-unavailable graceful fallback.
   - `src/components/sections/HeroSection.tsx` — Full-screen composition inspired by Reference A's monumental contrast & Reference B's warm terracotta gallery aura, featuring `KAPILAM`, `"Where Earth Remembers Its Art."`, `"Ancient earth. Timeless craft. Contemporary soul."`, `"Enter the World of Kapilam"`, and `"Explore Our Craft"`.
5. **Upgraded Section 01 (`LoadingIntro.tsx`):**
   - Enhanced clip-path curtain handoff into the Hero so the intro and hero timeline feel like one continuous cinematic shot, while preserving Skip Intro and reduced-motion accessibility.

**Stage 1 Verification:** `npx tsc --noEmit`, `npm run lint`, `npm run build`, and visual/responsive verification on desktop & mobile viewports.

---

### Stage 2 — AI Editorial Atmosphere Imagery & Advanced Scroll Choreography (Sections 03–11)
**Scope:**
1. **Separated Editorial Atmosphere Assets (`public/Assets/kapilam/editorial/`):**
   - Generate high-resolution, earthy luxury atmospheric visuals (strictly separated in `src/config/assets.ts` as `EDITORIAL_ATMOSPHERE_ASSETS` with `kind: "editorial-atmosphere"` — never mixed with `PRODUCT_ASSETS` inventory):
     1. Hero / Gallery dark warm terracotta atmospheric backdrop
     2. Macro raw clay texture & artisan finger-grooves
     3. Sunlit traditional pottery studio storytelling ambiance
     4. Contemporary luxury interior terracotta accent backdrop
   - Preserve all 25 original `products/` photos for genuine Kapilam works and all 5 `craftsmanship/` photos for authentic process storytelling.
2. **Modular Section Upgrades (`src/components/sections/`):**
   - `BrandIntro.tsx` (Section 03) — Oversized `Bodoni Moda` SplitText reveal ("Every piece of earth carries a story."), background tonal shift from obsidian to warm ivory, and layered parallax image.
   - `AboutSection.tsx` (Section 04) — Editorial two-column composition preserving the exact supplied About Kapilam copy verbatim, highlighted key phrases, clip-path photography reveal, and subtle depth scroll.
   - `CollectionSection.tsx` (Section 05) — Interactive category filtering (`Motion` layout transitions), subtle 3D hover tilt, authentic `@kap_ilam` product showcase (all 25 authentic pieces accessible), lightbox/detail viewer, and zero invented prices/specs.
   - `CraftsmanshipSection.tsx` (Section 06) — Horizontal scroll storytelling (`horizontalScroll.ts`), animated 5-stage clay-to-kiln timeline using the 5 authentic craftsmanship photos + atmospheric studio layer.
   - `SustainabilitySection.tsx` (Section 07) — Lazy-loaded procedural Earth & Clay 3D ambient canvas (`SustainabilityScene.tsx`), organic particles, muted sage & burnt clay tonal transition, honest sustainability copy.
   - `GallerySection.tsx` (Section 08) — Asymmetric masonry exhibition with staggered clip-path image reveals and quiet editorial hover states.
   - `PhilosophySection.tsx` (Section 09) — Full-screen monumental typographic triptych for the 3 brand quotes with scrubbed scale/opacity choreography.
   - `InstagramSection.tsx` (Section 10) — Authentic `@kap_ilam` journal showcase (featuring `brand-story.jpeg` and curated `@kap_ilam` posts) with clearly documented link placeholder.
   - `ContactSection.tsx` (Section 11) — Cinematic closing reveal with Kapilam logo, `@kap_ilam`, honest contact placeholders, and smooth footer entrance.

**Stage 2 Verification:** `npx tsc --noEmit`, `npm run lint`, `npm run build`, ScrollTrigger lifecycle & responsive verification.

---

### Stage 3 — Blender `.glb` Integration System, Mobile Polish & Final Production Audit
**Scope:**
1. **Future Blender `.glb` Architecture (`src/three/components/ModelLoader.tsx`):**
   - Reusable Drei `useGLTF` loader with `<Suspense>`, React Error Boundary, geometry/material auto-normalization, and automatic fallback to the procedural / spatial sculpture stage.
   - Manifest-driven switching in `src/config/assets.ts` (`terracotta-pot.glb`, `pottery-vase.glb`, `elephant-sculpture.glb`, `decorative-sculpture.glb`, plus `deer-sculpture.glb` slot for the hero centerpiece).
   - Clear developer drop-in guide (`docs/GLB_INTEGRATION_GUIDE.md`).
2. **Mobile, Reduced-Motion & Performance Audit:**
   - Verify `HIGH` / `BALANCED` / `LOW` profiles, touch scroll responsiveness, zero horizontal overflow, WebGL context cleanup, and `prefers-reduced-motion` graceful static elegance.
   - Final production checks (`tsc`, `eslint`, `next build`, live desktop + mobile inspection) and Vercel deployment readiness confirmation.
