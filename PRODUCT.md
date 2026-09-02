# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People inspecting the Ethereum Sepolia testnet who need to find blocks, transactions, wallet activity, balances, and NFT metadata from one explorer interface.

## Product Purpose

BlockScan is a Sepolia blockchain explorer. It helps users follow recent chain activity and move from a block number, transaction hash, or Ethereum address to the relevant explorer detail view.

## Positioning

BlockScan combines core Sepolia inspection with wallet and NFT lookup workflows in one focused, dark-first interface. Its Home identity is the Explorer Mosaic: a centered search instrument surrounded by a subdued, provenance-backed field of real NFT art, captured market data, and real Sepolia activity.

## Operating Context

Users arrive with a block number, transaction hash, Ethereum address, or NFT lookup task. Primary navigation is labeled Home, Accounts, NFTs, and Watchlist. Home moves directly from the Explorer Mosaic Hero into the existing Live Network Activity section. Market Pulse remains absent because the previously approved redesign removed it; Live Network Activity and Recent Blocks were not redesigned by the mosaic replacement.

## Capabilities and Constraints

- Search accepts block numbers, 40-character hexadecimal Ethereum addresses, and 64-character hexadecimal transaction hashes through the existing classifier and Search → Result routing.
- The current application uses React 18.3 with the React DOM `createRoot` entry point, React Router 5, Motion for interface transitions, and Create React App.
- The Home hero is a static-first HTML/CSS Explorer Mosaic with 17 desktop tiles: six NFT artworks, four coin-price tiles, three Sepolia blocks, two transaction hashes, and two addresses. Density reduces to 12 tiles on tablet and eight on mobile.
- The exact local hero artworks are Nouns Noun #1, CrypToadz #1442, mfers #8478, Chain Runners #5527, Moonbirds #7932, and Blitmap #484. Their contract/token pairs were verified against the supplied manifest before conversion to local WebP files under `public/hero/nfts/`; visitors never fetch NFT art or metadata at runtime.
- `src/data/hero-fallback.json`, captured at `2026-09-01T16:23:02.966Z` from the Alchemy Prices API and Ethereum Sepolia JSON-RPC, makes the complete mosaic available before any live request succeeds.
- After hydration, ETH, BTC, SOL, and LINK current prices receive one quiet, shared-promise revalidation. Failure leaves the committed snapshot unchanged; there is no timer, skeleton, blank card, or hero error state.
- Home calls `useRecentBlocks` once. The same recent-block result feeds the mosaic and Live Network Activity, so the hero adds no block, transaction, or address polling of its own.
- The natural hero handoff uses a supported CSS Scroll Timeline. Fine-pointer hover is limited to decorative NFT reveal and a tiny coin response; reduced motion disables the handoff transforms and hover scaling.
- The previous procedural Three.js hero remains preserved under `src/features/spatialHero/` for possible future storytelling use, but it is not rendered on Home.
- The application uses the Alchemy free tier for portfolio-scale Sepolia reads. Transaction tracing and other unsupported PAYG-only workflows are not part of the default experience.
- Market Pulse and detailed market interfaces are intentionally outside the shipped Home experience.

## Brand Commitments

- Product name: BlockScan.
- Network identity: Sepolia Testnet Explorer.
- The approved identity uses Void Black, Observatory Surface, muted Authentic and Interactive Teal, warm-white Manrope Variable interface type, and IBM Plex Mono for exact chain values.
- Sidecar Yellow is the single dominant Home search action; it does not become a general decorative accent.
- Existing primary navigation labels remain Home, Accounts, NFTs, and Watchlist.
- Product language is concise, technical, and functional. The Home copy is fixed to “See Sepolia as it happens.” and “Search blocks, transactions, and addresses instantly.”
- Motion stays quiet and explanatory; it must not imply interactivity on decorative data or interpolate invented values.

## Evidence on Hand

- Current implementation under `src/features/mosaicHero/`, `src/hooks/useHeroMosaicData.js`, `src/services/heroPriceService.js`, and `src/pages/HomePage.js`.
- Committed captured data in `src/data/hero-fallback.json`.
- Verified local artwork and provenance notes under `public/hero/nfts/`.
- The pinned Explorer Mosaic replacement brief supplied with the implementation.
- Previous Three.js implementation preserved under `src/features/spatialHero/` as historical capability, not current visual authority.

## Product Principles

- Keep explorer search immediately understandable, centered, and reachable.
- Let the mosaic establish breadth and credibility without visually outranking the headline or search.
- Use only provenance-backed artwork and real captured or returned values, even when content is decorative.
- Make first paint complete without network success; live revalidation must be silent, stable, and optional.
- Reuse shared network data rather than multiplying polls or per-tile requests.
- Keep decorative artwork non-navigational and avoid implying collection partnership, endorsement, or sponsorship.
- Preserve natural page scrolling and hand directly into Live Network Activity.
- Validate accessibility, responsive density, performance, and search regressions before production integration.

## Accessibility & Inclusion

The mosaic environment is decorative and hidden from assistive technology. The semantic interface remains the global navigation, heading, supporting text, and labeled search form. Enter and mobile Search/Go submit; validation errors are announced; focus remains visible. Decorative NFT artwork is not focusable or clickable, touch layouts do not simulate hover, and `prefers-reduced-motion` removes scroll-handoff movement and hover scaling.
