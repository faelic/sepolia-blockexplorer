# BlockScan spatial NFT hero prototype

This directory is a standalone experiment. It does not import from or modify the production React application.

## Run it

```bash
cd prototypes/spline-nft-hero
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

Append `?debug=1` to the local URL for a small read-only tuning summary.

## Brand and hero hierarchy

The prototype uses a compact semantic token layer in `src/styles.css`:

- Background `#05070A`, surface `#0B0F0F`, elevated surface `#111514`
- Primary text `#F3F6F2`, secondary and placeholder text `#909A95`
- Authentic Teal `#035352`, interactive teal `#08706D`, deep teal `#024241`
- Sidecar Yellow `#F3E8BC`, hover `#FFF1C8`, pressed `#DED3AA`
- Neutral border `rgba(144, 154, 149, 0.20)` and soft teal focus ring `rgba(3, 83, 82, 0.20)`

The intended visual balance is approximately 85% black and charcoal, 10% teal family, and 5% Sidecar Yellow. Teal owns structure and environment; yellow owns the primary action. Supplied NFT artwork is never recolored or tinted.

The visible hero copy is intentionally limited to “Explore Sepolia.”, “Search blocks, transactions, and wallets from one place.”, the “Paste a block, wallet, or transaction” placeholder, Search, and one persistent accepted-format line. Navigation reads Home, Accounts, NFTs, and Watchlist.

The visible brand is the custom `/blockscan-aperture.svg` mark beside compact `Sepolia` and `Testnet` context. The mark replaces the former two-line BlockScan wordmark while the link retains `aria-label="BlockScan home"`. The same SVG is the prototype favicon.

At 1440 × 900 the H1 resolves to 57.6px from `clamp(3.2rem, 4vw, 3.75rem)` with 1.05 line-height. The supporting copy is 16px with a 560px maximum width. The overall group is 720px wide, lifted by 5.5svh, and measures 720 × 222.9px from y 325 to 548. Search is 700 × 58px with a 102 × 48px button. Below 1100px the earlier tablet scale remains. At 390 × 844, the brand and labelled Menu control share one 44px row, Menu opens an anchored panel with all four destinations, the H1 remains 35.1px, the search stacks, the format hint remains one line, and there is no horizontal overflow.

## NFT artwork configuration

Artwork is configured in `src/config/nfts.js`. The shipped slot mapping is fixed:

- 1 Pixel Toad: `/nfts/01-pixel-toad.webp`
- 2 Pixel Owl: `/nfts/02-pixel-owl.webp`
- 3 Blockhead: `/nfts/03-blockhead.webp`
- 4 Green Goblin: `/nfts/04-green-goblin.webp`
- 5 Neon Runner: `/nfts/05-neon-runner.webp`
- 6 Sketch Avatar: `/nfts/06-sketch-avatar.webp`
- 7 Red Hood: `/nfts/07-red-hood.webp`
- 8 Bitmap: `/nfts/08-bitmap.webp`
- 9 Space Penguin: `/nfts/09-space-penguin.webp`

All nine files are local 512 × 512 WebPs totaling 76,014 bytes. The scene makes no NFT API, IPFS, or external artwork request.

The texture loader applies sRGB color space, `flipY = false`, linear mipmap minification, linear magnification, generated mipmaps, and renderer-aware anisotropy capped at 8. The deterministic 512 × 512 `CanvasTexture` generator is used only if a configured local image is missing or fails to load.

## Scene architecture

- `src/scene/createScene.js` loads `/models/blockscan_nft_token_standard.glb` exactly once and owns the neutral camera setup, renderer, near-black fog, five-light rig, narrowed floor/grid, responsive opacity, render-loop delta cap, visibility pausing, and cleanup.
- `src/scene/createToken.js` clones the loaded scene and gives every token depth-specific cloned front, body, rim/rear-rim, and back materials; the front also receives its unique artwork texture.
- `src/scene/tokenLayout.js` owns the nine-token XYZ composition, depth tiers, three-quarter rotations, scales, autonomous local drift/rotation tuning, tablet multipliers, and mobile positions/visibility.
- `src/scene/motion.js` applies autonomous token drift and rotation and maps normalized fine-pointer input to one rotation-only camera rig. It does not translate the camera or apply pointer movement to individual tokens.
- `src/utils/textures.js` owns local texture loading and fallback generation; `src/config/nfts.js` owns exact artwork paths and labels plus fallback palettes and motifs; `src/styles.css` owns HTML-layer palette, layout, controls, breakpoints, and accessibility preferences.
- The canvas is decorative and uses no pointer events. Header, copy, search, feedback, and navigation remain semantic HTML.

## Camera-motion refinement

Hero-relative pointer coordinates are normalized to [-1, 1] and mapped negatively so the apparent world travels opposite the pointer. Desktop steering caps the single camera rig at 2.65° yaw (reduced from 3.2°) and 1.9° pitch with exponential damping λ = 5.5 (softened from 7). Tablet uses 1.82° yaw (reduced from 2.2°), 1.35° pitch, and λ = 5.8 (softened from 7.4). Motion updates cap `dt` at 0.033 seconds, and camera position is restored to its base value every frame, so there is no camera translation. The architecture remains one inverse, rotation-only camera rig; tokens never receive pointer translation or rotation.

Tokens respond autonomously only: local drift amplitudes span X 0.02–0.06, Y 0.05–0.11, and Z 0.02–0.055. Rotation amplitudes span X 3–5°, Y 5.5–7.5°, and Z 2.5–4°, with periods of 7.57–12.08 seconds on X, 8.27–12.82 seconds on Y, and 8.61–13.09 seconds on Z. The largest absolute Y angle is 39.5°.

Desktop shows all nine tokens at the approved original desktop positions and scales. Mobile shows exactly slots 1, 2, 3, 4, 6, and 9; slots 5, 7, and 8 are hidden. Mobile retains 42% autonomous token motion, disables camera steering, and snaps the camera to neutral. `prefers-reduced-motion` freezes token drift and rotation, ignores pointer input, and restores the neutral camera; rendering also pauses when the page or hero is not visible.

Token fronts use the local artwork as both color and emissive maps with white tint, metalness 0, roughness 0.78, and emissive intensity 0.14 near, 0.16 mid, or 0.18 far. Body metalness/roughness remain 0.68/0.44. Rim metalness/roughness remain 0.66/0.42, with #035352/#024241 depth colors and near/mid/far emissive intensity 0.065/0.05/0.04. Back values remain 0.64/0.50. Light intensities remain hemisphere 0.44, key 3.45, rim 5.1, fill 3.0, and edge 1.55; their colors are now neutral-led with one #035352 rim light. The grid uses #035352 and #024241 at opacity 0.08 desktop, 0.06 tablet, and 0.045 mobile.

Current evidence is `../../.impeccable/review/block-aperture-desktop-final.jpg` at 1440 × 900, plus `../../.impeccable/review/block-aperture-mobile-nav-closed.jpg` and `../../.impeccable/review/block-aperture-mobile-nav-open.jpg` at 390 × 844. The approved motion evidence remains `/Users/favour/Documents/blockexplorer/blockexplorer/reference/blockscan_nft_art_polish_final.mov` because this pass deliberately leaves all motion and token-layout configuration unchanged.

The prototype also lowers DPR and floor/grid opacity on mobile and preserves the central content exclusion zone. It remains a standalone experiment with production routing intentionally disconnected.
