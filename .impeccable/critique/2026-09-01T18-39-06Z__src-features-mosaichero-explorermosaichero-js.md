---
target: Explorer Mosaic Hero reference comparison
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-09-01T18-39-06Z
slug: src-features-mosaichero-explorermosaichero-js
---
# Explorer Mosaic Hero — measured reference comparison

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3/4 | Search states are clear, but the decorative live evidence is often unreadable. |
| 2 | Match System / Real World | 3/4 | Explorer terminology is appropriate; “tx hash” assumes prior knowledge. |
| 3 | User Control and Freedom | 3/4 | Navigation and search provide a simple, reversible path. |
| 4 | Consistency and Standards | 3/4 | Tokens are cohesive, but card angles and content budgets are inconsistent. |
| 5 | Error Prevention | 3/4 | Query validation is strong; the mobile placeholder loses useful guidance. |
| 6 | Recognition Rather Than Recall | 3/4 | Primary actions are labeled; environmental data is too clipped or faint to support recognition. |
| 7 | Flexibility and Efficiency | 2/4 | Enter-to-search works, but there are no recent searches or accelerators. |
| 8 | Aesthetic and Minimalist Design | 2/4 | The center is focused, but dead space and non-legible card fragments undermine the wall. |
| 9 | Error Recovery | 2/4 | Inline validation exists, but recovery remains visually secondary. |
| 10 | Help and Documentation | 1/4 | The hero provides no contextual help beyond its copy and placeholder. |
| **Total** | | **25/40** | **Acceptable; significant geometry and data-legibility work remains.** |

## Design Specificity Verdict

The concept is authored for BlockScan, but the geometry is category-generic. Real Sepolia entities, selected NFT assets, mono typography, teal, and Sidecar Yellow are product-specific. Structurally, however, the shipped result is still the familiar “crypto cards floating in black space.” The reference's distinctive idea is a continuous, inhabited onchain wall surrounding one search aperture.

The deterministic scan returned zero findings. That is a false-negative boundary of static linting, not proof that the composition is correct: it cannot evaluate transformed runtime rectangles, text `scrollWidth`, optical seams, or whether a tile intersects the viewport.

No reliable browser overlay was available because the browser surface exposed read-only evaluation but no script-injection path. Evidence instead came from a fresh 1440×900 browser capture, DOM rectangles, computed styles, console logs, supplied screenshots, recording, and source inspection.

## Overall Impression

The user's diagnosis is correct. The prior pass improved hierarchy but solved the wrong layer. It treated the scene as 17 independently positioned cards with a dark center, while both references construct one dense planar field whose cards share seams, axes, and a surface. The biggest opportunity is to replace guessed independent coordinates with a measured wall constraint system.

## What Is Working

- The search remains unmistakably primary, with disciplined teal/yellow contrast and correct semantics.
- The material is product-specific: six approved NFTs, four coins, and real Sepolia entities create a credible content palette.
- The horizon is already positioned correctly: approximately 85% of hero height versus approximately 84% in the primary reference.

## Priority Issues

### [P1] The scene is not a continuous wall

**Why it matters:** The reference relies on Gestalt continuity. Its top band spans almost the full width with roughly 5–15px seams. The shipped top band contains an approximately 200px rupture between Transaction A and Address A. Source geometry confirms a 13%-of-plane gap from x=44% to x=57%, roughly 191px before transform at 1440px—about 13 times a normal seam. Vertical holes reach approximately 62px and 106px. All 17 nominal tile rectangles occupy only 39.81% of the plane.

**Fix:** Build a reference-coordinate wall canvas based on the 1672×941 target. Define a small number of shared row and column seam lines, a continuous top lintel, near-continuous side rails, and one intentional central aperture. Keep ordinary gaps around 8–14px. The center must be created by luminance suppression, not by deleting structural geometry.

**Suggested command:** `$impeccable layout`

### [P1] Coin values and charts are broken by construction

**Why it matters:** A precision product cannot ellipsize prices. Browser measurements show every coin fails: ETH has 96px available for 116px of text, SOL 71px for 77px, BTC 88px for 129px, and LINK 88px for 90px. The 190×42 sparkline is squeezed into 68–87px and stretched to 52px with `preserveAspectRatio="none"`, changing its apparent slopes.

**Fix:** Give the price a guaranteed full-width row or a measured minimum content track. Do not use ellipsis. Use container-aware typography and test the longest formatted value. Place charts in a consistent right/bottom field with shared insets and baseline, and preserve their aspect ratio.

**Suggested command:** `$impeccable layout` and `$impeccable typeset`

### [P2] Perspective is applied to cards, not perceived as one surface

**Why it matters:** The global `rotateZ(-1.6deg)` is combined with independent rotations from -1.8deg to +1.8deg, producing net angles from about -3.4deg to +0.2deg. Separate 13px radii and large individual shadows further detach the panels. The reference derives depth from collective axes and repeated seams.

**Fix:** Put perspective and dominant rotation on the wall or row strips. Reduce independent card rotation to tiny exceptions, remove most per-card elevation, tighten radii, and introduce a subdued shared backing plane. Keep only one or two intentional overlaps.

**Suggested command:** `$impeccable layout`

### [P2] The veil erases the very boundaries needed to explain the wall

**Why it matters:** Borders start at alpha .28 but sit below a 66–99% black center veil. Their effective contrast falls to roughly .095 at the veil's 66% region and .011 under 96% darkness. The center is calm, but the wall's seam skeleton disappears.

**Fix:** Separate tile content attenuation from boundary rendering. Keep artwork/data below the veil, but draw a restrained seam/border pass above it and below hero content. The central aperture should retain architectural edges while suppressing imagery and values.

**Suggested command:** `$impeccable polish`

### [P2] Breakpoint cropping is not content-aware

**Why it matters:** At 1440px, Block C has 0% viewport intersection even though 17 tiles exist in the DOM. At wide sizes semantic prices lose leading or trailing digits; at 390px the placeholder itself truncates. Cropping card shells can imply continuation, but cropping the only meaningful number looks broken.

**Fix:** Define independent measured crop contracts at 1920, 1440/1366, tablet, and 390. Art may crop; prices, labels, and the search hint may not. Add visual assertions for viewport intersection and `scrollWidth <= clientWidth` on semantic values.

**Suggested command:** `$impeccable adapt`

## Cognitive Load

Two of eight checks fail: chunking and grouping. The 17 cards are perceived as unrelated islands instead of one environmental group. Choice load remains low because the scene is decorative and Search is the only primary action. The problem is visual Gestalt load, not too many controls.

## Emotional Journey

Arrival is calm and the warm Search action creates a clear peak. Trust drops as soon as the eye samples the environment: truncated prices and faint disconnected panels turn “live evidence” into mockup fragments. The scroll into “Sepolia, in sequence” is restrained and credible, but the lower hero dissolves into empty black before that payoff.

## Persona Red Flags

**Alex, power explorer:** Ellipsized prices and faint block/address context look unreliable. The hero uses live-looking data that cannot be read precisely.

**Jordan, first-time explorer:** “tx hash” is unexplained, and mobile truncates the only input example. Brightening inert NFTs may also imply clickability despite the default cursor.

**Sam, low-vision/keyboard user:** The decorative wall is correctly hidden from assistive technology, but 8–10px low-alpha technical text under multiple overlays is effectively unavailable visually.

**Casey, mobile user:** The fixed button, icon, and padding consume too much of the search control; the explanatory placeholder clips and the wall collapses into disconnected corner fragments.

## Minor Observations

- `data-importance` is emitted but unused, so the documented large/medium/small NFT hierarchy is not enforced by CSS.
- Six NFT sources are each rendered twice, creating 12 eager image elements. Transfer caching helps, but decode/compositing surfaces are duplicated.
- CSS reduced-motion disables wall/NFT motion, but Motion-powered `DataValue` updates still animate for 180ms.
- The live page had no horizontal overflow and produced zero console errors or warnings.

## Questions to Consider

1. Should the next pass preserve the current 17 content items while rebuilding only their geometry, or also remap which exact tile occupies each measured reference rectangle?
2. Should the wall optimize for strict fidelity to the primary BlockScan reference or use the Netflix reference only for density/seam principles?
3. Is the center meant to be an architectural aperture in a continuous wall, or an intentionally empty canvas with two separate wings?
4. Should NFT hover remain ambient only, or should non-interactive art become completely static once the wall is denser?
