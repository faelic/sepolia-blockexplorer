---
name: BlockScan
description: A centered real-data Explorer Mosaic that makes Sepolia search the calm center of a wider onchain world.
colors:
  void-black: "#050505"
  lifted-canvas: "#090909"
  observatory-surface: "#0d0d0d"
  elevated-surface: "#141414"
  strong-surface: "#1b1b1b"
  primary-text: "#f4f4f4"
  secondary-text: "#a3a3a3"
  tertiary-text: "#7d7d7d"
  brand-accent: "#3b6bff"
  brand-accent-soft: "rgba(59, 107, 255, 0.14)"
  brand-accent-line: "rgba(59, 107, 255, 0.34)"
  interactive-white: "#f4f4f4"
  interactive-inverse: "#080808"
  subtle-line: "rgba(255, 255, 255, 0.1)"
  faint-line: "rgba(255, 255, 255, 0.06)"
  strong-line: "rgba(255, 255, 255, 0.18)"
  track-primary: "rgba(255, 255, 255, 0.095)"
  track-secondary: "rgba(255, 255, 255, 0.052)"
  track-primary-strong: "rgba(255, 255, 255, 0.14)"
  track-secondary-strong: "rgba(255, 255, 255, 0.078)"
  status-success: "#78d2a8"
  status-amber: "#d9b36b"
  status-red: "#ff8f86"
typography:
  display:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(60px, 4.45vw, 64px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(44px, 5vw, 72px)"
    fontWeight: 520
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "21px"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  hero-support:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "clamp(18px, 1.35vw, 20px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope Variable, Manrope, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  mosaic-metric:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "clamp(18px, 1.55vw, 24px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.05em"
rounded:
  artwork-label: "7px"
  control: "10px"
  action: "11px"
  tile: "13px"
  panel: "14px"
  search: "15px"
spacing:
  compact: "10px"
  tile-gap-min: "12px"
  base: "16px"
  tile-gap-max: "19px"
  copy-gap: "22px"
  section: "28px"
  layout: "36px"
components:
  hero-search-action:
    backgroundColor: "{colors.elevated-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.action}"
    padding: "0 19px"
    width: "120px"
    height: "50px"
  hero-search-input:
    backgroundColor: "{colors.observatory-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.search}"
    padding: "0 22px"
    height: "64px"
  mosaic-tile:
    backgroundColor: "{colors.observatory-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.tile}"
    padding: "24px"
  operational-panel:
    backgroundColor: "{colors.observatory-surface}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.panel}"
    padding: "27px"
---

# Design System: BlockScan

## Overview

**Creative North Star: "The Explorer Mosaic"**

BlockScan opens as a centered precision search surrounded by a subdued wall of real onchain context. The mosaic establishes breadth—verified NFT artwork, captured coin prices, Sepolia blocks, transaction hashes, and addresses—while a dark exclusion zone keeps the headline and search unmistakably dominant. It is theatrical in composition but technical in content.

The system is static-first, honest, and quiet. Local artwork and a committed real-data snapshot make the first frame complete without waiting for Alchemy; later values update without reshuffling the art direction. Native scrolling hands the mosaic directly into the existing Live Network Activity section. Market Pulse remains absent under the previously approved product redesign, and the preserved Three.js hero is no longer rendered.

**Key Characteristics:**

- A centered headline, concise support line, and single dominant search action.
- A real-data mosaic with fixed positions, a calm central exclusion zone, and intentional edge cropping.
- Seventeen desktop tiles, twelve tablet tiles, and eight mobile tiles rather than one squeezed universal grid.
- Interface chrome is near-monochrome; blue is reserved for Sepolia/network orientation, while other color is reserved for semantic status and identity-bearing content.
- Complete first paint from local WebPs and a committed snapshot, followed by quiet shared-data updates.
- Decorative motion is fine-pointer-only, scroll-native, reduced-motion-safe, and subordinate to search.

## Colors

The interface palette is black, charcoal, warm white, and neutral grey. Sepolia blue is used sparingly for network identity and route orientation; other color is exceptional and communicates status or preserves the identity of token logos and source imagery.

### Primary

- **Interactive White:** Primary actions, active navigation, focus, and high-priority links.
- **Sepolia Blue:** The hero “Sepolia” word, the network identity dot, and the active navigation underline only.
- **Charcoal Surfaces:** Layering and control separation without tinted panels.
- **Neutral Lines:** Structure, routes, tracks, list dividers, and control boundaries.

### Tertiary

- **Status Success:** Confirmed successful execution or saved-state feedback only.
- **Status Amber:** Pending or cautionary states only.
- **Status Red:** Validation, failed execution, and destructive text only.

### Neutral

- **Void Black:** The full-page and hero field.
- **Observatory Surface:** Mosaic tiles and the translucent search base.
- **Elevated Surface:** Search focus and compact secondary controls.
- **Primary Text:** The hero headline, search input, and essential values.
- **Supporting Copy:** The fixed Home support sentence.
- **Secondary Text:** Operational descriptions and subdued metadata.
- **Tertiary Text:** Low-priority labels, timestamps, and table headings.
- **Placeholder Text:** The hero's visible query hint.

### Named Rules

**The Restrained Brand Rule.** Sepolia blue may mark network identity and active wayfinding, but controls, links, data rows, diagrams, decoration, and surfaces stay neutral.

**The Color Must Mean Something Rule.** Green confirms success, amber signals pending or caution, and red signals failure, validation, or destructive action. Token logos and content imagery keep their source colors.

## Typography

**Display Font:** Manrope Variable with Manrope and sans-serif fallbacks  
**Body Font:** Manrope Variable with Manrope and sans-serif fallbacks  
**Label/Mono Font:** IBM Plex Mono with ui-monospace and monospace fallbacks

**Character:** Manrope is compact, confident, neutral, and premium at the center of the theatrical field. IBM Plex Mono distinguishes hashes, addresses, block numbers, prices, and captured technical values without turning the whole page into a terminal.

### Hierarchy

- **Display** (800, `clamp(60px, 4.45vw, 64px)`, 1.04): Exactly “See Sepolia as it happens.” with an 840px maximum width; mobile becomes `clamp(42px, 12vw, 50px)`.
- **Headline** (520, `clamp(44px, 5vw, 72px)`, 0.98): Existing operational page and Live Network Activity introductions.
- **Title** (650, 21px, 1.2): Data-section headings and compact state titles.
- **Hero Support** (400, `clamp(18px, 1.35vw, 20px)`, 1.5): Exactly “Search blocks, transactions, and addresses instantly.” with a 620px maximum width.
- **Body** (400, 16px, 1.65): Explanations and route descriptions, held near a 68ch reading measure.
- **Label** (700, 10px, 0.1em): Uppercase tile kinds and compact technical labels.
- **Mono** (500, 11px, 1.4): Hashes, addresses, block numbers, prices, changes, timestamps, and query-transition text.

### Named Rules

**The Center Speaks Once Rule.** Keep the hero to its exact headline, one support sentence, and search; add no eyebrow, chips, prompts, or second CTA.

**The Data Keeps Its Cadence Rule.** Use IBM Plex Mono and tabular numerals for exact or changing values; keep explanations and navigation in Manrope.

## Layout

The Home hero occupies one natural viewport (`min-height: 100svh`) with no pinning or extended scroll stage. Content is centered at 49% of the hero height, constrained to 840px, and layered above a strong radial exclusion zone. The search is 780px maximum width. The Home header expands to a 1560px maximum inner width with responsive outer breathing room while preserving the existing BlockScan navigation.

Desktop uses an art-directed five-column by four-row plane with 17 logical tiles: six NFT artworks, four coin tiles, three blocks, two transactions, and two addresses. The plane intentionally exceeds the viewport (`clamp(1440px, 112vw, 1780px)` by `clamp(650px, 88svh, 810px)`), uses a 12px to 19px gap, and holds a dark central vertical opening. Edge tiles crop naturally instead of fitting into a tidy dashboard.

At 1100px, the plane becomes four columns and keeps 12 selected tiles: five NFTs, three coins, two blocks, one transaction, and one address. At 767px, it becomes a three-by-three plane and keeps eight tiles: three NFTs, two coins, one block, one transaction, and one address. Mobile tiles lose pointer interaction, the search remains one line at 100% content width, and the central darkness expands. At 360px, the action narrows without changing the copy or introducing overflow.

Live Network Activity follows immediately after the hero in normal document flow and retains its existing metric strip, recent-block list, states, spacing, and data behavior. Market Pulse is not part of this Home sequence.

### Named Rules

**The Search Owns the Center Rule.** No bright artwork, large price, or interactive tile may enter the central headline-and-search exclusion zone.

**The Density Steps Down Rule.** Curate 17/12/8 tiles across desktop/tablet/mobile; never squeeze the desktop wall into a smaller viewport.

## Elevation & Depth

Depth comes from one gently receding mosaic plane, subdued imagery, the central veil, and layered edge/bottom fades. Desktop perspective is 1480px and the plane uses `rotateX(6deg) rotateZ(-2deg) scale(1.08)`; tablet and mobile reduce the distortion. Individual tiles never parallax or tilt toward the pointer.

### Shadow Vocabulary

- **Mosaic Tile Ambient** (`0 12px 32px rgba(0, 0, 0, 0.22)`): A restrained separation between overlapping dark tiles.
- **Hero Search Ambient** (`0 18px 56px rgba(0, 0, 0, 0.30)`): Keeps the functional search clear of the environmental wall.
- **Search Focus Ring** (`0 0 0 3px rgba(244, 244, 244, 0.14)`): A neutral focus layer paired with a stronger warm-white border.

### Named Rules

**The Plane Creates Depth Rule.** Treat the mosaic as one receding wall; never replace its calm perspective with per-tile parallax, floating motion, or heavy glass effects.

## Shapes

The mosaic uses compact 13px tile corners, the main search uses 15px corners, and its action uses 11px corners. Mobile tiles tighten to 10px. Artwork labels use small 7px corners, while block, route, and address marks alternate between compact squares and circles. One-pixel neutral borders define geometry; there are no oversized pills, composer bubbles, or decorative curves.

## Components

### Search Action

- **Copy:** Exactly “Search,” paired with the existing arrow icon.
- **Shape:** 120px by 50px on desktop with 11px corners; 104px by 44px on mobile.
- **Color:** Elevated charcoal with warm-white iconography; hover strengthens the neutral border and surface.
- **State:** Active moves down one pixel. Focus remains visible through the surrounding neutral search focus treatment. There is no gradient, glow, scale, or decorative color.

### Explorer Search

- **Placeholder:** Exactly “Search block, tx hash, or address.”
- **Surface:** 780px maximum width, 64px height, 15px corners, a one-pixel warm-white border at 25% opacity, and a restrained four-pixel backdrop blur.
- **Input:** Single-line, 17px Manrope, Primary Text, Placeholder Text, and 22px horizontal padding.
- **Focus:** Stronger warm-white border with a restrained neutral ring over Elevated Surface.
- **Behavior:** Reuses the existing block/transaction/address classifier, route transition, Enter submission, mobile Search/Go behavior, accessible label, and alerting validation error.

### Navigation

The existing BlockScan header remains the only global navigation: BlockScan, Home, Accounts, NFTs, Watchlist, and Sepolia testnet. It stays transparent and quiet over the mosaic, with broader Home-specific outer margins. Mobile disclosure, keyboard behavior, and operational-route search remain unchanged.

### Mosaic Environment

The environment is decorative and `aria-hidden`. Its fixed configuration keeps each content type in an art-directed slot; live values may change, but ETH, BTC, SOL, LINK, artwork, and chain-data categories never shuffle. A 1480px perspective, subtle whole-plane tilt, central veil, edge fade, and neutral atmosphere create the theatrical field without a flattened hero image.

### NFT Artwork Tiles

Use exactly these verified local WebPs:

- **Nouns — Noun #1:** `/hero/nfts/noun-1.webp`
- **CrypToadz — #1442:** `/hero/nfts/cryptoadz-1442.webp`
- **mfers — #8478:** `/hero/nfts/mfer-8478.webp`
- **Chain Runners — #5527:** `/hero/nfts/chain-runner-5527.webp`
- **Moonbirds — #7932:** `/hero/nfts/moonbird-7932.webp`
- **Blitmap — #484:** `/hero/nfts/blitmap-484.webp`

The files were sourced through the Alchemy NFT API during asset preparation and verified by contract plus token ID before local conversion. Runtime never requests NFT media or metadata. The first three prominent images are high-priority; every image reserves dimensions and uses intentional `object-fit: cover` positioning.

At rest, NFT imagery uses brightness 0.62 and saturation 0.72 under a 62% overlay. Only `(hover: hover) and (pointer: fine)` may reveal it over 240ms: tile opacity rises to 0.94, the image approaches 0.98 brightness/saturation, overlay opacity falls to 0.12, and the tile lifts two pixels with a 1.015 scale. The cursor stays default; there is no click, route, modal, marketplace link, or keyboard focus.

### Coin and Chain Data Tiles

Coin tiles show only ETH, BTC, SOL, and LINK symbol, captured/current USD price, 24-hour change, and a tiny inline SVG sparkline. Coin hover may slightly strengthen the border and sparkline over 170ms; block, transaction, and address tiles remain static. Three block slots show block number and transaction count, two transaction slots show a truncated real hash and block number, and two address slots show a truncated real address with “Seen in recent activity.”

All data tiles use IBM Plex Mono, tabular numerals, deterministic truncation, overflow containment, and stable grid positions. Real value changes crossfade and settle from two pixels over 180ms; they never replay the hero or roll fabricated intermediate values.

### Static-First Data Layer

`src/data/hero-fallback.json` is the complete committed snapshot, captured at `2026-09-01T16:23:02.966Z` from the Alchemy Prices API and Ethereum Sepolia JSON-RPC. It contains the four coin series, three blocks, two transaction hashes, and two addresses required by the mosaic. This snapshot renders immediately, without a loading state or deployment-time network dependency.

After hydration, one memoized request revalidates all four current prices together. On success, only real prices and derived 24-hour changes update; on failure, the snapshot remains untouched and no error appears in the decorative hero. The Home route's single `useRecentBlocks` instance supplies both the mosaic and Live Network Activity; the mosaic performs no duplicate block, transaction, or address polling.

### Natural Scroll Handoff

Where CSS Scroll Timeline is supported, the environment attenuates only across 70svh–100svh: opacity 1→0.48, Y 0→-12px, and scale 1→0.98. Content attenuates later across 85svh–100svh: opacity 1→0.86 and Y 0→-5px. The hero stays in normal flow, no JavaScript scroll listener is required, and no intermediate stage appears before Live Network Activity. Reduced motion removes both animations.

## Do's and Don'ts

### Do:

- **Do** preserve the exact headline, support sentence, placeholder, and Search label.
- **Do** keep the complete first frame available from local WebPs and the committed real-data snapshot.
- **Do** reuse the single Home `useRecentBlocks` feed and the one-shot four-symbol price request.
- **Do** keep the mosaic decorative, hidden from assistive technology, and visually subordinate to semantic search.
- **Do** keep the old Three.js source preserved but unrendered while the Explorer Mosaic is the approved Home hero.
- **Do** hand directly into the unchanged Live Network Activity section through native scrolling.

### Don't:

- **Don't** restore Market Pulse; it remains absent under the approved redesign.
- **Don't** fetch NFT artwork at runtime, substitute the six locked selections, or imply collection endorsement.
- **Don't** invent prices, changes, block numbers, hashes, addresses, or freshness claims.
- **Don't** add duplicate polling, per-coin requests, loading skeletons, shimmers, spinners, or hero error banners.
- **Don't** add AI-composer controls, prompt chips, another CTA, wallet connection, or NFT search to the hero field.
- **Don't** add per-tile parallax, pointer tilt, touch hover simulation, bounce, or scroll motion that survives reduced motion.
