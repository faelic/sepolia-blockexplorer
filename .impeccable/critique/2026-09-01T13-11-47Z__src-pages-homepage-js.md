---
target: /Users/favour/Documents/blockexplorer/blockexplorer/src/pages/HomePage.js
total_score: 21
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 5
timestamp: 2026-09-01T13-11-47Z
slug: src-pages-homepage-js
---
# BlockScan product and interface critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 2/4 | Good loading and result states, but the network snapshot freezes and a saved wallet immediately disappears. |
| 2 | Match between system and real world | 3/4 | Explorer language is sound; the NFT-arcade and broad-market framing distort the core mental model. |
| 3 | User control and freedom | 2/4 | Navigation is clear, but result sets have no paging/filtering/export and destructive removal has no undo. |
| 4 | Consistency and standards | 2/4 | The hero, market terminal, and operational explorer feel like three adjacent products. |
| 5 | Error prevention | 2/4 | Search validation is solid; storage hydration, clipboard failure, and destructive removal are not safely handled. |
| 6 | Recognition rather than recall | 3/4 | Labels, examples, copy actions, and route context are strong. |
| 7 | Flexibility and efficiency of use | 2/4 | There are no shortcuts, recent searches, pagination, filters, export, or advanced query paths. |
| 8 | Aesthetic and minimalist design | 2/4 | Clean surfaces are undermined by a dominant Market Pulse that pushes core Sepolia activity below the fold. |
| 9 | Error recognition and recovery | 2/4 | Retry states exist, but false save confirmation and silent clipboard failure lack recovery. |
| 10 | Help and documentation | 1/4 | The interface does not explain gas, token units, methods, logs, provenance, or advanced inspection. |
| **Total** |  | **21/40** | **Acceptable, but significant improvement is required.** |

## Design Specificity Verdict

**Authored, but authored toward the wrong metaphor.** The Home viewport is memorable, but arbitrary pixel-avatar tokens communicate an NFT arcade more than a calm Sepolia observatory. Remove the word “Sepolia” and the hero could advertise an NFT marketplace or Web3 game. Operational routes then become a competent but category-interchangeable dark dashboard and do not contain a signature chain-inspection behavior.

The automated detector returned zero findings. That is a useful false-negative signal: the consequential problems are runtime freshness, state persistence, semantic selection, accessibility, product hierarchy, and data interpretation rather than simple static anti-patterns.

## Overall Impression

This looks like a talented visual frontend engineer who has not yet demonstrated senior product judgment. The app earns attention with craft, then spends trust on the wrong things: WebGL spectacle and a broad market terminal are deeper than the actual explorer workflows. As a sole senior-level portfolio artifact, it is not yet hireable.

## What Is Working

- Search is central, semantic, keyboard-native, understandable, and strict about accepted query types.
- Result pages use a sensible inspection sequence: identity, status, summary, precise fields, and related rows.
- The implementation contains real engineering care: reduced-motion branches, global focus styles, explicit loading/error/empty states, lazy market code, offscreen WebGL pausing, resource disposal, and 25 passing tests.
- The palette, warm primary action, restrained easing, and copy affordances feel deliberate rather than template-generated.

## Cognitive Load

Four of eight checks fail in the Home/market sequence: there is no single focus, visual hierarchy favors market prices over Sepolia activity, focus-preview and pinned-selection create two competing market state models, and the full market instrument arrives before the core network content. Grouping and route-level chunking are otherwise clear.

## Emotional Journey

The opening creates curiosity but not trust. Search restores confidence; the transaction success state is the strongest reassurance moment. Market Pulse breaks the explorer narrative and its cross-asset chart morphs briefly damage data credibility. Operational routes recover calm, then the false Watchlist confirmation destroys trust. The demo ends on spectacle rather than a convincing completed workflow.

## Priority Issues

### P0 — The Watchlist lies

The recording confirms “Address saved to watchlist,” then immediately shows an empty Watchlist. Each route creates an isolated hook instance initialized with an empty array, and its write effect can overwrite storage before hydration completes.

**Best option:** Use a shared store/context, lazy-initialize synchronously from local storage, normalize address casing, expose hydration state, add undo, and test save → navigate → reload.

### P1 — The homepage tells the wrong product story

The first frame says NFT game/demo rather than serious chain explorer. Market Pulse then receives more space and interaction depth than live Sepolia activity.

**Best option:** Hand the hero directly into Live Sepolia Activity. Replace Market Pulse with block cadence, gas utilization, transaction throughput, deployments, or token-transfer activity. If broad prices remain, demote or collapse them below explorer content.

### P1 — “Live” data is not live

Recent blocks load once, relative ages never advance, and there is no polling, visibility refresh, manual refresh, or retry. A failure can still leave the hero saying “Network live” with zero transactions.

**Best option:** Add a query cache with cancellation and visibility-aware polling; derive status from last successful freshness; tick relative time; show provider attribution, stale/offline status, last update, and retry; retain partial results when one block request fails.

### P1 — Motion falsifies data

Keyboard focus or hover previews a new asset while the previously pinned asset still says Selected. Recharts morphs between unrelated asset histories and briefly draws prices that never existed. The recording also contains severe tearing around 0:32.

**Best option:** Keep focus and selection semantics aligned. Key charts by symbol and range, crossfade asset changes in 120–160 ms, and reserve line drawing for initial entrance or same-asset range changes. Re-record after isolating the tearing with GPU/WebGL enabled and disabled.

### P1 — Core explorer depth is shallow

Transaction pages show raw gas integers without useful units or total fee and omit decoded calldata, logs, internal calls, token transfers, confirmations, and timestamp. Block pages silently show the first ten transactions. Transfers are capped at twenty and display raw decimals, “Unknown asset,” and “Not available.”

**Best option:** Build a compact Transaction Intelligence workspace with Overview / Token transfers / Logs / Trace tabs, decoded method and parameters, Gwei/ETH formatting, confirmations, timestamp, contract context, cursor pagination, filters, sorting, export, and normalized token metadata.

### P1 — Accessibility exists in code but fails in behavior

Tertiary text measures roughly 3.6–4.0:1 and is used at 9–12 px. Several mobile controls are 40 px. New result headings are announced generically but not focused. Market visual selection and `aria-pressed` can disagree.

**Best option:** Raise contrast, keep metadata at least 11–12 px, enforce 44 px mobile targets, move focus to route headings, announce copy/watchlist outcomes, and keep visual, keyboard, and ARIA selection states identical.

### P2 — WebGL is thoughtful but overfunded

The scene caps DPR, pauses offscreen, and disposes correctly. However, reduced motion still runs the render loop, renderer construction occurs before guarded loading, the scene shares the Home route’s import path, and mobile loads every token asset before hiding some.

**Best option:** Capability-gate and dynamically import after search is interactive, render a static frame under reduced motion, load the mobile token set only, catch context creation/loss, and enforce LCP/INP/GPU budgets.

### P2 — Operational layouts are too large and too empty

Oversized block numbers and hashes add drama where density is needed. Account and NFT lookup routes leave large dead zones, and visual maturity drops after Home.

**Best option:** Use a compact sticky identity bar with a safely truncated identifier, copy, and status. Increase desktop density and add examples, recent searches, provenance, and contextual next actions to empty workspaces.

## Persona Red Flags

- **Power user:** no shortcut, recent queries, pagination, filters, export, decoded data, or advanced navigation.
- **Accessibility-dependent user:** low-contrast small labels, 40 px controls, incomplete focus management, and visual/ARIA selection disagreement.
- **Mobile user:** 820 px minimum hero, front-loaded WebGL assets, decorative overlap, and a freshness metric removed below 430 px.

## What Would Make This Hiring-Grade

Build one deeply finished Transaction Intelligence path instead of another visual module: keyboard-first search; decoded calldata, event logs, token transfers, internal trace, human-readable gas and confirmations; URL-addressable tabs and filters; pagination and export; truthful stale/offline/provider states; reliable Watchlist persistence with undo and cross-tab synchronization; and Playwright coverage plus explicit accessibility/performance budgets.

## First-20-Seconds Rejection Trigger

The opening metaphor. Floating pixel-avatar coins followed by a dominant Market Pulse make BlockScan read as an NFT/crypto-dashboard demo rather than a trustworthy Sepolia explorer. The immediate inference is that visual wow was prioritized before the user’s job.

## Minor Observations

- The documented cinematic handoff appears as a normal section cut in the running app.
- The header emphasizes “Sepolia Testnet” more than the BlockScan product name.
- The hero loading state is dark enough to look like missing content.
- Broad market data triggers several parallel first-load requests while recent blocks and the WebGL scene also initialize.

## Questions to Consider

- If Market Pulse disappeared, would BlockScan become a clearer and more valuable explorer?
- What could the spatial hero reveal about the current Sepolia chain that a static illustration cannot?
- Why should users trust any confirmation after a saved wallet immediately disappears?
- Would you trust a price chart that animates through values that never existed?
