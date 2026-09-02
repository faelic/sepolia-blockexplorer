---
target: current BlockScan Spline hero desktop spacing and compact logo
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
timestamp: 2026-08-31T11-03-20Z
slug: prototypes-spline-nft-hero-index-html
---
# BlockScan Spline Hero Critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3/4 | Active navigation, checking state, disabled state, and inline feedback are present, but no useful result transition follows a valid query. |
| 2 | Match System / Real World | 2/4 | “tx hash” assumes familiarity and the NFT search promise does not match accepted formats. |
| 3 | User Control and Freedom | 3/4 | The one-step search is editable and non-trapping, but has no explicit reset action. |
| 4 | Consistency and Standards | 2/4 | The visual system is coherent, but navigation labels and search copy diverge from the documented product language. |
| 5 | Error Prevention | 2/4 | Validation exists only after submission; malformed and empty input can still be submitted. |
| 6 | Recognition Rather Than Recall | 2/4 | The primary action is obvious, but identifier formats are not visible once the placeholder disappears. |
| 7 | Flexibility and Efficiency | 2/4 | Enter-to-submit is efficient, but there are no examples, recent queries, or paste-oriented accelerators. |
| 8 | Aesthetic and Minimalist Design | 3/4 | The palette and protected center are disciplined, but the desktop interface is under-scaled relative to its stage. |
| 9 | Error Recovery | 3/4 | Errors are specific and preserve input, but a valid query still ends at a prototype disclaimer. |
| 10 | Help and Documentation | 1/4 | Specialized inputs lack contextual examples or guidance. |
| **Total** | | **23/40** | **Acceptable, with a strong visual foundation and important hierarchy gaps** |

## Design Specificity Verdict

The token-observatory world is strongly Web3-specific and memorable, but only moderately BlockScan-specific. The local NFT medallions, midnight field, restrained teal structure, and Sidecar Yellow action form a coherent visual world. The identity layer remains interchangeable: if the words “BlockScan” and “Sepolia” disappeared, the hero could belong to many NFT explorers or marketplaces.

The strongest identity opportunity is a compact mark that expresses both “block” and “scan.” The recommended direction is a 2-by-2 modular block form cut by a negative-space scanning aperture or S-shaped channel. It should avoid the generic crypto cube, chain link, magnifying glass, QR code, and Ethereum-diamond tropes.

The deterministic scan returned 0 findings, but it ran in degraded regex mode because its HTML parser modules were unavailable. It could not evaluate custom properties, selector matching, or computed contrast, so this is an undercount rather than a clean bill of health. No false positives were present. Browser overlay injection was blocked by the Browser URL security policy, so no user-visible [Human] overlay is available. Verified production-build captures at 1440 × 900 and 390 × 844, plus four sampled points from the supplied 2880 × 1800 recording, were used as fallback visual evidence.

## Overall Impression

The mobile result is composed and should be frozen. Desktop has a strong scene but a weak optical anchor: the animated tokens establish scale and depth, while the headline, supporting copy, and search read as a small island inside that world. The solution is not to add decorative objects or pull every NFT inward. It is to give the semantic layer more physical presence and move its optical center lower.

## What Is Working

1. The approved 3D scene is disciplined. Token drift and inverse camera motion maintain depth without entering the protected center.
2. The palette has clear roles. Near-black builds atmosphere, teal describes structure and focus, and yellow remains exclusive to the primary action.
3. Mobile has real responsive authorship. Six purpose-placed tokens, stacked controls, a neutral camera, and wider center protection make it materially better than a desktop layout squeezed into a phone.

## Priority Issues

### [P1] The desktop task UI is stranded inside an oversized stage

**Why it matters:** At the 1440 × 900 target, the semantic group is roughly 640px wide and 193px tall, about 21% of viewport height. It finishes near 56% of the viewport, leaving roughly 44% of the central lower field without semantic content. The gap between the header and H1 is also roughly 26% of viewport height. This feels under-scaled rather than intentionally cinematic.

**Fix:** Add a desktop-only composition tier at `min-width: 1100px`. Keep the central axis because it belongs to the approved token corridor, but enlarge the group to roughly 680-720px wide and 250-280px tall. Use an H1 around 56-60px, a search control around 680-720px by 56-60px, and move the visual center from 45.5% toward 48-50%. Reuse the currently blank feedback row for a quiet accepted-format line or three compact examples. Keep all camera, token-motion, and mobile rules unchanged.

**Suggested command:** `$impeccable layout`

### [P2] The header is a textual billboard rather than a compact identity system

**Why it matters:** The current two-line lockup is roughly 205 × 54px, and its 34.4px wordmark sits too close in scale to the 46.08px headline. It competes with the hero instead of anchoring it. Deleting the text without replacing its visual weight would make the four-pill navigation feel right-heavy.

**Fix:** Replace the visible stack with a 32-36px square “Block Aperture” mark containing a 20-24px glyph. Pair it with a small `Sepolia` network label or badge, not the full uppercase explorer sentence. Use near-white and deep teal for the mark. Keep yellow reserved for Search. Retain `aria-label="BlockScan home"` and an accessible text name. Make the change desktop-specific first, then validate whether the same mark improves mobile without moving its approved layout.

**Suggested command:** `$impeccable distill`

### [P2] The scene communicates NFTs more strongly than the interface communicates exploration

**Why it matters:** The largest medallions are about four to five search-control heights and carry most of the color in the viewport. Users can infer “NFT gallery” before “Sepolia block explorer,” even though the product covers blocks, transactions, wallets, and NFTs.

**Fix:** Do not weaken or rescale the approved scene. Strengthen the HTML plane through the larger headline, stronger supporting-text contrast, taller search control, and a compact identifier-help rail. This restores balance without touching the motion system.

**Suggested command:** `$impeccable bolder`

### [P2] The search promise and accepted inputs do not fully agree

**Why it matters:** The copy says NFTs are searchable, while the classifier accepts block numbers, 40-character wallet addresses, and 64-character transaction hashes. A careful user cannot tell what NFT identifier is valid.

**Fix:** Define the actual NFT query contract. Support contract address plus token ID and display that syntax, or remove NFTs from the central search promise and keep NFT lookup as a separate destination. Replace the valid-query prototype dead end with a believable recognized-identifier preview.

**Suggested command:** `$impeccable clarify`

## Cognitive Load

Moderate, with 2 failures out of 8 checks. The page passes single focus, chunking, grouping, one-at-a-time flow, minimal choices, and progressive disclosure. It fails visual hierarchy because the wordmark and colored tokens compete with the task UI. It fails working-memory support because identifier formats disappear with the placeholder and no examples remain visible.

## Emotional Journey

- Arrival: the spatial scene creates a strong premium peak and the Sepolia cue reassures users that this is testnet.
- Orientation: the centered task is understandable, but NFTs become the dominant story.
- Action: the yellow Search button is clear and the protected center feels safe.
- Outcome: the checking state briefly reassures, then the disconnected-routing message becomes the emotional low point.
- End: the experience currently ends on a large dark runway or a prototype caveat rather than confidence that BlockScan recognized the identifier.

## Persona Red Flags

**Jordan, first-time explorer user:** “tx hash” is unexplained, no example clarifies valid formats, and the NFT promise conflicts with validation. A logo-only header could reduce recognition unless the Sepolia cue and accessible BlockScan name remain.

**Riley, stress tester:** malformed inputs recover reasonably, but the NFT-format contradiction and valid-query dead end are immediately discoverable. Navigation also appears functional in a standalone prototype even where routing is out of scope.

**Casey, distracted mobile user:** the approved mobile composition is strong. Remaining risks are slow Three.js/font loading, horizontally clipped navigation discovery, and input state loss after refresh. These are not reasons to disturb the mobile geometry.

**Devon, Sepolia investigator:** a user arriving with a block number, transaction hash, or wallet address can paste quickly, but receives no route, recognized-type preview, recent history, or network confirmation beside the result.

## Minor Observations

- The reserved feedback line prevents layout shift but looks like missing content in its resting state.
- Inactive navigation reads close to disabled in the recording's dark exposure.
- The external Space Grotesk import can flash fallback metrics in a tightly tuned header.
- PRODUCT.md uses `Account Lookup` and `NFT Lookup`, while the prototype uses `Accounts` and `NFTs`.
- `.impeccable/design.json` is stale relative to DESIGN.md and should be refreshed separately, not as part of this critique.

## Questions to Consider

1. Should the desktop refinement change only the HTML composition, or may it later make small desktop-only token-layout changes after the content hierarchy is corrected?
2. Should the logo be icon-only, or a compact icon plus a small `Sepolia` network label?
3. Should the steady-state line under Search show accepted formats, recent lookups, or remain minimal?
