---
name: BlockScan Spatial NFT Hero Prototype
description: A calm spatial Sepolia token observatory with an immediately usable explorer search.
colors:
  background: "#05070A"
  surface: "#0B0F0F"
  surface-elevated: "#111514"
  text-primary: "#F3F6F2"
  text-secondary: "#909A95"
  brand: "#035352"
  brand-interactive: "#08706D"
  brand-deep: "#024241"
  brand-soft: "rgba(3, 83, 82, 0.20)"
  brand-label: "rgba(243, 232, 188, 0.76)"
  brand-hover: "rgba(8, 112, 109, 0.48)"
  signal: "#F3E8BC"
  signal-hover: "#FFF1C8"
  signal-pressed: "#DED3AA"
  signal-soft: "rgba(243, 232, 188, 0.14)"
  border-subtle: "rgba(144, 154, 149, 0.20)"
  border-active: "rgba(8, 112, 109, 0.68)"
  feedback-danger: "#ffaaa3"
  feedback-success: "#a9c8b7"
  scene-floor: "#070a09"
  grid-major: "#035352"
  grid-minor: "#024241"
  token-body-near: "#071015"
  token-body-mid: "#050b0f"
  token-body-far: "#030609"
  token-rim-near: "#035352"
  token-rim-mid: "#024241"
  token-rim-far: "#023534"
  token-rim-emissive-near: "#035352"
  token-rim-emissive-mid: "#024241"
  token-rim-emissive-far: "#024241"
  token-back-near: "#03070a"
  token-back-mid: "#020507"
  token-back-far: "#010304"
  light-hemisphere: "#9aa39e"
  light-key: "#f0f2ed"
  light-rim: "#035352"
  light-fill: "#59615d"
  light-edge: "#4f6c65"
typography:
  display:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "clamp(3.2rem, 4vw, 3.75rem) desktop"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.038em"
  network:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "normal"
  body:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  network-detail:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.1em"
  navigation:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  field:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  action:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  feedback:
    fontFamily: "Space Grotesk, Avenir Next, Segoe UI, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "normal"
rounded:
  shell: "14px"
  control: "10px"
  utility: "10px"
  pill: "999px"
spacing:
  brand-gap: "0.72rem"
  field-shell-inset: "0.3125rem"
  nav-gap: "0.55rem"
  control-gap: "0.5rem"
  mobile-gutter: "1rem"
  header-top: "1.25rem desktop"
  search-offset: "1.8rem desktop"
  header-gap: "2rem"
  hero-bottom: "4rem"
components:
  brand-identity:
    asset: "/blockscan-aperture.svg"
    markSize: "44px desktop, 40px mobile"
    label: "Sepolia / Testnet"
  nav-pill:
    textColor: "{colors.text-secondary}"
    typography: "{typography.navigation}"
    rounded: "{rounded.pill}"
    padding: "0.62rem 0.92rem"
  nav-pill-active:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.text-primary}"
    typography: "{typography.navigation}"
    rounded: "{rounded.pill}"
    padding: "0.62rem 0.92rem"
  search-field-shell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.shell}"
    padding: "{spacing.field-shell-inset}"
    width: "min(100%, 700px) desktop"
  search-input:
    textColor: "{colors.text-primary}"
    typography: "{typography.field}"
    rounded: "{rounded.control}"
    padding: "0.72rem 0.9rem"
  search-button:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.background}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0 1.1rem"
  search-button-hover:
    backgroundColor: "{colors.signal-hover}"
    textColor: "{colors.background}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0 1.1rem"
---

# Design System: BlockScan Spatial NFT Hero Prototype

## Overview

**Creative North Star: "The Token Observatory"**

This isolated prototype makes BlockScan feel like a calm Sepolia observatory: one uninterrupted near-black environment, a compact technical header, a protected field of centered copy and search, and tangible NFT medallions held at multiple depths around it. The interface is premium and spatial without becoming game-like; the explorer task remains semantic HTML while decorative WebGL supplies atmosphere and physical presence without taking focus or pointer input.

The world is restrained rather than spectacular for its own sake. Near-white type and neutral gray copy do the explanatory work, Authentic Teal identifies structure and environment, and Sidecar Yellow is reserved for the primary action. Depth comes from fog, lighting, material response, scale, cropping, and a fading floor instead of a stack of cards. This record documents the shipped standalone experiment only. Its first-viewport composition is prototype guidance, not global law for production BlockScan screens.

**Key Characteristics:**

- One continuous near-black environment, not a split-card blockchain hero.
- A protected center framed by nine depth-layered medallions on desktop and six purpose-placed medallions on mobile.
- An 85/10/5 visual balance: charcoal neutrals dominate, teal identifies structure, and Sidecar Yellow marks the search action.
- Space Grotesk throughout, with compact display tracking and a small two-line network label beside the custom Block Aperture mark.
- Semantic, keyboard-accessible explorer controls above a decorative, non-interactive WebGL scene.
- Calm autonomous token drift plus one inverse-direction camera steering rig on fine-pointer desktops, reduced on tablets and neutralized on mobile or when reduced motion is requested.

**Current verification disposition:** PASS. The Block Aperture and desktop-composition refinement passed the bounded 1440 × 900 and 390 × 844 visual checks, 1100px/1099px/768px breakpoint probes, interaction states, build, locked-file checksum comparison, and horizontal-overflow checks. The earlier independent artwork and motion reviews remain valid because NFT artwork, positions, scales, camera behavior, and motion were not changed.

**Review evidence and artwork provenance:** The current desktop raster is `../../.impeccable/review/block-aperture-desktop-final.jpg` (1440 × 900). The current mobile navigation rasters are `../../.impeccable/review/block-aperture-mobile-nav-closed.jpg` and `../../.impeccable/review/block-aperture-mobile-nav-open.jpg` (both 390 × 844). The approved pointer-motion recording remains `/Users/favour/Documents/blockexplorer/blockexplorer/reference/blockscan_nft_art_polish_final.mov` (1440 × 900, 30fps, 14.566667 seconds) because motion and token layout were locked for this pass. Token faces use nine supplied 512 × 512 local WebPs totaling 76,014 bytes. No NFT API, IPFS gateway, or external artwork host participates in the scene; deterministic `CanvasTexture` generation exists only as the missing-file fallback.

## Colors

The palette is deliberately hierarchical: #05070A and graphite establish space, #F3F6F2 and #909A95 carry information, #035352 identifies BlockScan's structure, and #F3E8BC marks the primary search action. The intended balance is approximately 85% black and charcoal, 10% teal family, and 5% Sidecar Yellow. Supplied token artwork remains color-independent.

### Brand and Signal

- **Authentic Teal** (`colors.brand`): BlockScan's environmental and structural identity for active navigation, the floor grid, token edge catches, and the accent light.
- **Interactive Teal** (`colors.brand-interactive`): the brighter focus and hover edge where the darker brand teal would not provide enough separation.
- **Teal Deep / Soft** (`colors.brand-deep`, `colors.brand-soft`): restrained physical depth and selected-surface tinting.
- **Sidecar Yellow** (`colors.signal`): the primary Search action and the only filled signal surface.
- **Sidecar Yellow Hover / Pressed** (`colors.signal-hover`, `colors.signal-pressed`): the action's hover and tactile states.

### Neutral

- **Midnight Ground** (`colors.background`): the scene background, fog, page ground, and browser theme color.
- **Search Surface** (`colors.surface`): the neutral raised search enclosure.
- **Elevated Surface** (`colors.surface-elevated`): reduced-transparency and hover fallback where additional separation is required.
- **Primary Text** (`colors.text-primary`): headings, the brand, active navigation, and high-priority copy.
- **Secondary Text** (`colors.text-secondary`): supporting copy, placeholder text, inactive navigation, and neutral feedback.
- **Neutral Hairline** (`colors.border-subtle`): resting one-pixel borders.
- **Active Teal Hairline** (`colors.border-active`): selected and focused states only.

### Feedback

- **Error Coral** (`colors.feedback-danger`): invalid or missing search input feedback only.
- **Success Mint** (`colors.feedback-success`): valid-query confirmation only.

### Scene Materials and Light

- **Near / Mid / Far Token Shells** (`colors.token-body-*`, `colors.token-rim-*`, `colors.token-back-*`): depth-tier graphite materials darken with distance. Near rims retain the clearest Authentic Teal catch, mid rims recede, and far rims are almost absorbed by the ground.
- **Perspective Floor and Grid** (`colors.scene-floor`, `colors.grid-major`, `colors.grid-minor`): a low-contrast spatial datum that fades below the action.
- **Hemisphere, Key, Rim, Fill, and Edge Light** (`colors.light-hemisphere`, `colors.light-key`, `colors.light-rim`, `colors.light-fill`, `colors.light-edge`): neutral light remains dominant while one restrained Authentic Teal rim light reveals the brand edge.

**The Teal Structure, Yellow Signal Rule.** Authentic Teal identifies structure, selection, focus, and physical edge light. Sidecar Yellow is reserved for the primary action. Neither color is used to tint supplied NFT artwork.

**The Midnight Ground Is Continuous Rule.** Header, content, search, token field, and floor share one #05070A-led environment; do not interrupt this prototype with a contrasting hero card or boxed scene.

## Typography

**Display Font:** Space Grotesk (with Avenir Next, Segoe UI, and sans-serif fallbacks)

**Body Font:** Space Grotesk (with Avenir Next, Segoe UI, and sans-serif fallbacks)

**Label Font:** Space Grotesk (with Avenir Next, Segoe UI, and sans-serif fallbacks)

**Character:** The single-family system is direct, technical, and quiet. Controlled negative tracking gives the desktop hero statement authority, while the Block Aperture mark carries identity without a competing wordmark. The only uppercase instrument label is the small `Testnet` network detail.

### Hierarchy

- **Display** (700, `clamp(3.2rem, 4vw, 3.75rem)`, 1.05 line-height, -0.038em on desktop): the one-line “Explore Sepolia.” statement inside a 720px measure. It resolves to 57.6px and measures 409.2 × 60.5px at 1440px. Tablet retains the earlier `clamp(2.4rem, 5vw, 3rem)` scale, and mobile remains `clamp(2rem, 9vw, 2.35rem)` at 35.1px.
- **Network** (600, 0.875rem, 1.05 line-height): the visible `Sepolia` label beside the custom mark. Mobile uses 0.8rem.
- **Network Detail** (500, 0.625rem, 1.1 line-height, 0.1em, uppercase): the visible `Testnet` context. Mobile uses 0.58rem.
- **Body** (400, 1rem desktop, 1.55 line-height): one concise supporting sentence within a 560px desktop measure. Tablet retains 0.9375rem and mobile uses 0.875rem.
- **Navigation** (400, 0.92rem): quiet desktop pill labels; mobile uses a 0.82rem Menu control and 0.875rem panel links with 44px minimum targets.
- **Field** (400, 0.9375rem): search entry and placeholder; mobile uses 0.875rem and centered alignment.
- **Action** (700, 1rem): the Search button's concise command.
- **Feedback** (400, 0.84rem, 1.35 line-height): search status; mobile uses 0.77rem.

**The Instrument Label Rule.** Uppercase and wide tracking belong to short network or context labels only; headings, navigation, actions, and explanatory prose remain natural case.

## Layout

The prototype is a full-viewport (`100svh`) layered grid. A semantic content plane sits above an absolute WebGL canvas and atmosphere veil. At 1100px and wider, the desktop header uses a 1380px maximum inner width, 1.25rem top padding, and responsive horizontal gutters up to 3.75rem. The central group is capped at 720px, supporting copy at 560px, and search at 700px. It is lifted by 5.5svh, producing a measured 720 × 222.9px group from y 325 to 548 in the 1440 × 900 verification viewport. The larger semantic mass and lower optical placement use the approved center corridor without changing any NFT position or scale. Below 1100px, the earlier 640px/610px tablet hierarchy remains in place. The hierarchy contains only the H1, one supporting sentence, search, and the reserved accepted-format/status line.

Nine tokens use explicit x/y/z positions, three-quarter base rotations, reduced scales, and asynchronous phases. The approved desktop composition was not moved or rescaled during the artwork polish: slot 1 is `(-4.82, -1.5, 1.35)` at 0.82, slot 2 `(4.86, -0.98, 1.08)` at 0.78, slot 3 `(-4.5, 2.28, -0.95)` at 0.61, slot 4 `(4.58, 2.02, -1.75)` at 0.56, slot 5 `(0.58, 3.32, -4.9)` at 0.43, slot 6 `(-3.45, -2.64, -0.35)` at 0.58, slot 7 `(3.52, -2.7, -1.45)` at 0.52, slot 8 `(-6.35, 0.48, -4.15)` at 0.44, and slot 9 `(6.4, 0.96, -4.65)` at 0.41. Large foreground tokens crop at the left and right edges, mid-depth tokens form the upper and lower frame, a far token punctuates the top, and the center remains clear for recognition, scope, and search. A narrowed 28 × 42 floor and 26 × 26 grid sit around y -2.87 and z -6, then disappear into fog and the lower black falloff.

Tablet behavior starts below 1100px: x positions compress to 82%, y positions to 94%, and token scale to 86%. Mobile starts at 767px and below: the brand and a labelled Menu control share one 44px row, while a compact anchored panel progressively discloses Home, Accounts, NFTs, and Watchlist. Home remains visibly selected and the full desktop pill navigation is unchanged. The search control stacks into one column, the central lift relaxes to 0.8svh, and the atmosphere's center veil widens from 46% to 95%. Exactly six tokens remain visible: slot 1 Pixel Toad at `(-1.2, -2.65, 1.1)` scale 0.34, slot 2 Pixel Owl at `(1.2, -2.62, 0.92)` scale 0.33, slot 3 Blockhead at `(-1.25, 1.55, -1.1)` scale 0.30, slot 4 Green Goblin at `(1.25, 1.5, -1.85)` scale 0.29, slot 6 Sketch Avatar at `(0, 1.65, -0.55)` scale 0.24, and slot 9 Space Penguin at `(0, -3.25, -1.8)` scale 0.28. Slots 5, 7, and 8 are hidden. Camera steering is disabled and snapped to neutral, and the visible objects frame rather than obstruct the copy and controls.

**The Protected Center Rule.** Within this prototype hero, no token, grid line, or decorative highlight may compromise the legibility or operability of the centered recognition → scope → search sequence.

**The Cropped Foreground Rule.** Edge cropping belongs to the largest near tokens, where it communicates depth; do not crop the brand, navigation, copy, search enclosure, or small far tokens.

## Elevation & Depth

Depth is a hybrid of restrained UI elevation and physical WebGL staging. The HTML layer uses one ambient search shadow (`0 18px 48px rgba(2, 3, 3, 0.34)`), strengthening to `rgba(2, 3, 3, 0.4)` with a three-pixel Authentic Teal focus ring. Display type uses a low-opacity `0 10px 45px rgba(2, 3, 3, 0.38)` shadow only to stay readable over the scene. Navigation remains unshadowed.

The scene uses a 42° perspective camera at `(0, 0.24, 10)`, exponential #05070A fog at density 0.047, ACES filmic tone mapping, and exposure 1.06. It deliberately disables cast and receive shadows. Physical depth instead comes from position, reduced scale, occlusion, a neutral-led five-light rig, and depth-tier material response. Every token clone receives its own cloned front, body, rim/rear-rim, and back materials. Front faces use the supplied local artwork as both map and emissive map, white tint, metalness 0, roughness 0.78, and restrained emissive intensity 0.14 near, 0.16 mid, or 0.18 far. Body metalness/roughness remain 0.68/0.44, rim values remain 0.66/0.42 with teal emissive intensity 0.065 near, 0.05 mid, and 0.04 far, and back values remain 0.64/0.50. The five-light intensities remain hemisphere 0.44, key 3.45, rim 5.1, fill 3.0, and edge 1.55; only their color bias changed. The graphite floor uses metalness 0.08, roughness 0.94, and opacity 0.18 desktop or 0.12 mobile; the #035352/#024241 grid uses opacity 0.08 desktop, 0.06 tablet, and 0.045 mobile.

### Shadow Vocabulary

- **Search Ambient** (`0 18px 48px rgba(2, 3, 3, 0.34)`): the only resting container shadow.
- **Search Focus** (`0 18px 48px rgba(2, 3, 3, 0.4), 0 0 0 3px rgba(3, 83, 82, 0.20)`): focus-within reinforcement without lifting the control.
- **Display Legibility** (`0 10px 45px rgba(2, 3, 3, 0.38)`): soft separation for the headline over moving depth.

Motion is slow and inertial. Each token has asynchronous local XYZ drift: cosine-driven X amplitudes span 0.02–0.06, sine-driven Y amplitudes span 0.05–0.11, and slower Z amplitudes span 0.02–0.055. Bounded autonomous rotation amplitudes span 3–5° on X, 5.5–7.5° on Y, and 2.5–4° on Z; periods span 7.57–12.08 seconds on X, 8.27–12.82 seconds on Y, and 8.61–13.09 seconds on Z. The exact Y limits are: slot 1 31° ± 7° (11.22s, max 38°), slot 2 -32° ± 7.5° (12.08s, max 39.5°), slot 3 29° ± 7° (8.27s, max 36°), slot 4 -31° ± 7° (10.65s, max 38°), slot 5 25° ± 5.5° (12.82s, max 30.5°), slot 6 32° ± 7.5° (9.11s, max 39.5°), slot 7 -30° ± 7° (9.82s, max 37°), slot 8 24° ± 6° (10.83s, max 30°), and slot 9 -26° ± 6.5° (11.42s, max 32.5°). Pointer input never changes an individual token's position or rotation. The scene fades in over 1.1s and header/copy enter over 900ms with the copy delayed 90ms, using `cubic-bezier(0.16, 1, 0.3, 1)`. Interface state changes use 180ms.

On fine pointers, hero-relative pointer coordinates are normalized to [-1, 1] and drive one rotation-only camera rig. Desktop yaw was reduced from 3.2° to 2.65° while pitch remains 1.9°; damping λ was softened from 7 to 5.5. Tablet yaw was reduced from 2.2° to 1.82° while pitch remains 1.35°; damping λ was softened from 7.4 to 5.8 and autonomous token motion remains at 78%. Negative pointer mapping makes the apparent world response travel opposite the pointer. Damping uses `1 - exp(-λdt)` with `dt` capped at 0.033 seconds. The base camera position is copied back every frame, so the rig rotates without translating. Mobile sets both steering caps to zero, clears accumulated input, and snaps camera position and rotation to neutral while autonomous token motion continues at 42%. `prefers-reduced-motion` ignores pointer input, freezes token drift and autonomous rotation, and restores the neutral camera immediately; scene rendering also pauses when the page or hero is not visible.

**The Physical Depth Rule.** Create hierarchy with material, scale, fog, and occlusion; do not simulate spatial richness by multiplying UI cards or heavy drop shadows.

**The Calm Motion Rule.** Motion should be felt as suspended inertia, never watched as a loop. Pointer input may steer only the single camera rig; mobile and reduced-motion contexts preserve the neutral composition without pointer-dependent behavior.

## Shapes

The HTML shape language is compact and gently softened: the search enclosure uses a 14px radius, its input and button use 10px, and navigation uses full 999px pills. Resting UI borders use one-pixel neutral hairlines; teal appears only on active, hovered, and focused edges. Focus uses a separate three-pixel outline with a four-pixel offset or the search shell's internal ring. There are no rectangular content cards in the hero.

The signature scene shape is the thick, circular medallion. Its dark metal body, restrained teal rim, front artwork plane, and visible back make it feel fabricated rather than drawn. Small rotations expose thickness; large near tokens crop against the viewport while far tokens remain complete. Individual artwork motifs may use rings, waves, slashes, blocks, portrait geometry, or nodes, but the circular shell keeps the field coherent.

**The Soft Utility, Hard Object Rule.** HTML controls use quiet rounded geometry for usability; WebGL medallions carry the tangible object character. Do not blur the two into glossy game controls.

## Components

### Block Aperture Identity

- **Structure:** the reusable `/blockscan-aperture.svg` mark uses four near-white modular corner blocks around one Interactive Teal scan beam on a #0B0F0F rounded square. It renders at 44px desktop and 40px mobile. `Sepolia` and `Testnet` sit beside it as compact network context instead of a visible BlockScan wordmark.
- **Behavior:** the identity links directly to the prototype search and retains the accessible name “BlockScan home.” The empty image alternative prevents the decorative mark from duplicating that name. Hover lifts the mark by one pixel; press returns it by one pixel and scales it to 0.985.

### Navigation

- **Shape:** 999px pills with neutral one-pixel hairlines and 0.62rem × 0.92rem padding.
- **Default:** transparent ground with secondary text.
- **Hover / Active:** the border strengthens, a translucent dark fill appears, and text becomes near-white. Active Home also carries `aria-current="page"`.
- **Press / Focus:** active press moves down one pixel; keyboard focus uses the shared three-pixel Interactive Teal outline. Mobile pills keep a 44px minimum height and live in a horizontal scroller rather than wrapping.

### Search Field

- **Shell:** a 700px maximum-width #0B0F0F chamber, exactly 58px tall on desktop, with a 14px radius, one-pixel neutral hairline, 0.3125rem inset, 0.5rem control gap, and the ambient search shadow. Tablet retains 610 × 52px.
- **Input:** transparent, borderless, 10px radius, near-white text, #909A95 placeholder, Interactive Teal caret, and 1rem desktop inline padding.
- **Button:** Sidecar Yellow with #05070A ink, 10px radius, bold label, 102 × 48px desktop size, #FFF1C8 hover, and #DED3AA pressed fill.
- **Hover / Press:** the button brightens; press translates one pixel and scales to 0.985.
- **Focus:** focus-within changes the shell border to #08706D and adds a three-pixel rgba(3, 83, 82, 0.20) ring; the input itself remains outline-free because the shell owns the state.
- **Mobile:** controls stack, the input becomes centered at 0.89rem, and the button spans the shell with a 46px minimum height.

### Search Feedback

- **Placement:** a reserved line below the search shell prevents layout jump and carries the resting accepted-format example: “Try 25869494, a 0x wallet, or a 0x transaction hash.” It remains one line at 390px and wider.
- **States:** neutral feedback uses secondary text, checking names the in-progress identifier check, invalid input uses Error Coral, and valid input uses Success Mint. Empty or malformed queries set `aria-invalid`, explain the accepted format, and return focus to the field. Typing again clears the invalid state and restores the accepted-format example.

### NFT Token Field

- **Structure:** one local `/models/blockscan_nft_token_standard.glb` is loaded exactly once and cloned into nine logical medallions. Every mesh material in every clone is cloned; each front receives its unique artwork texture, while body, rim/rear-rim, and back receive near/mid/far graphite values without shared-material leakage.
- **Artwork:** the slot mapping is exact: 1 Pixel Toad `/nfts/01-pixel-toad.webp`, 2 Pixel Owl `/nfts/02-pixel-owl.webp`, 3 Blockhead `/nfts/03-blockhead.webp`, 4 Green Goblin `/nfts/04-green-goblin.webp`, 5 Neon Runner `/nfts/05-neon-runner.webp`, 6 Sketch Avatar `/nfts/06-sketch-avatar.webp`, 7 Red Hood `/nfts/07-red-hood.webp`, 8 Bitmap `/nfts/08-bitmap.webp`, and 9 Space Penguin `/nfts/09-space-penguin.webp`. All nine are local 512 × 512 WebPs with a combined payload of 76,014 bytes.
- **Texture handling:** loaded artwork uses sRGB color space, `flipY = false`, linear mipmap minification, linear magnification, generated mipmaps, and renderer-aware anisotropy capped at 8. The deterministic 512 × 512 `CanvasTexture` generator is a fallback only when a configured local file is missing or fails to load.
- **Composition:** desktop shows all nine depth-ranked tokens. Mobile shows slots 1, 2, 3, 4, 6, and 9, with slots 5, 7, and 8 hidden. The canvas is decorative, `aria-hidden`, removed from the tab order, and unable to intercept pointer input.
- **Failure:** scene loading may fail without blocking the explorer; semantic search remains readable and the live region reports the fallback.

### Tuning Control Locations

- **Composition and responsive visibility:** `src/scene/tokenLayout.js` owns all token x/y/z positions, three-quarter base rotations, scales, depth tiers, phases, local XYZ drift amplitudes/speeds, autonomous rotation amplitudes/speeds, tablet multipliers, and mobile overrides.
- **Autonomous motion and camera steering:** `src/scene/motion.js` owns desktop/tablet/mobile motion scales, normalized fine-pointer input, inverse camera yaw/pitch targets, exponential damping and its 0.033-second `dt` cap, camera-neutral resets, local token drift/rotation application, and reduced-motion behavior. It does not translate the camera or apply pointer motion to tokens.
- **Camera, renderer, atmosphere, and grid:** `src/scene/createScene.js` owns FOV, neutral camera origin/orientation, fog, tone-mapping exposure, DPR caps, lighting, floor/grid geometry, colors, opacities, resize profiles, the render-loop delta cap, visibility pausing, and disposal.
- **Clone materials:** `src/scene/createToken.js` owns base metalness/roughness plus the near/mid/far body, rim, rim-emission, back, and artwork-tint tiers, and performs per-clone material cloning.
- **Token faces:** `src/utils/textures.js` owns local image loading, sRGB/UV/mipmap/anisotropy handling, and deterministic CanvasTexture fallbacks; `src/config/nfts.js` owns the exact local WebP paths, labels, fallback palettes, and fallback motif selection.
- **HTML presentation:** `src/styles.css` owns the near-black CSS palette, typography, semantic-layer spacing, search/nav states, atmosphere veils, CSS breakpoints, entry motion, and accessibility preferences.

## Do's and Don'ts

### Do:

- **Do** preserve the uninterrupted near-black environment and the protected center when iterating on this prototype.
- **Do** keep the Sepolia identity, explorer scope, and search action understandable before the scene is noticed.
- **Do** use Authentic Teal for structure and Sidecar Yellow for the primary action; keep the 85/10/5 balance visibly intact.
- **Do** keep decorative WebGL inert, hidden from assistive technology, and safely disposable when the page is hidden or left.
- **Do** preserve the supplied local WebP mapping, its 76,014-byte payload, and fallback-only CanvasTexture behavior.
- **Do** verify both the 1440 × 900 and 390 × 844 compositions after scene or responsive changes.

### Don't:

- **Don't** turn this prototype into a split-card hero, a dashboard collage, or a game-like neon spectacle.
- **Don't** place medallions, highlights, or floor detail through the central copy and search exclusion zone.
- **Don't** introduce another interface accent because the supplied token faces contain warm hues.
- **Don't** enable camera steering on mobile, add per-token pointer parallax or rotation at any viewport, or ignore `prefers-reduced-motion` and `prefers-reduced-transparency`.
- **Don't** replace the supplied local artwork with generated placeholders unless a configured file genuinely fails to load.
- **Don't** apply this page-specific token composition as global production BlockScan guidance without a separate approval and integration review.
