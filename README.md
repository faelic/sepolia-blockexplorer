# BlockScan

BlockScan is a focused Ethereum Sepolia explorer for blocks, transactions,
wallets, NFTs, and saved wallet watchlists. It keeps the usual explorer workflow
fast and readable: search a block number, transaction hash, or wallet address,
then move directly into the matching detail page.

Live app: [blockscan-seven.vercel.app](https://blockscan-seven.vercel.app/)

Repository: [github.com/faelic/sepolia-blockexplorer](https://github.com/faelic/sepolia-blockexplorer)

## Highlights

- Global explorer search for block numbers, transaction hashes, and Ethereum addresses.
- Recent Sepolia block feed with quick navigation into block details.
- Block detail pages with gas, miner, timestamp, and included transactions.
- Transaction detail pages with receipt-aware status states.
- Account lookup with balance, nonce, incoming transfers, copy actions, and saved-wallet support.
- NFT metadata lookup by contract address and token ID.
- Browser-persisted watchlist with removal confirmation and undo.
- Local API proxy for Sepolia RPC and NFT metadata so the Alchemy key stays server-side.
- Dark, near-monochrome interface with restrained Sepolia blue, animated local icons, toasts, tooltips, and reduced-motion support.

## Tech Stack

- React 18
- React Router 5
- Create React App
- Alchemy SDK
- `motion/react`
- `@number-flow/react`
- Plain CSS with project-level design tokens
- Vercel-compatible API routes

## How It Works

The React app talks to Alchemy through local and production API routes instead of
placing the Alchemy key in browser code.

- `/api/sepolia-rpc` proxies Ethereum Sepolia JSON-RPC requests.
- `/api/nft-metadata` proxies Alchemy NFT metadata requests.
- `src/services/alchemyClient.js` defaults to `/api/sepolia-rpc`.
- `scripts/dev-server.js` runs the React dev server behind the same local API shape.

The main routes are:

- `/` - Home search, featured token marquee, and recent network activity.
- `/blocks/:blockId` - Block details.
- `/tx/:txHash` - Transaction details.
- `/accounts/:address?` - Account lookup and account details.
- `/nft` - NFT metadata lookup.
- `/watchlist` - Locally saved wallets.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Then add your Alchemy key:

```bash
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

Start the app with the live API proxy:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run dev` starts two local processes:

- the public local app at `http://localhost:3000`;
- the internal React dev server at `http://localhost:3001`.

Use `http://localhost:3000` when testing live Sepolia data locally. Running
`npm start` by itself skips the local API proxy and is only useful for purely
client-side UI checks.

## Environment Variables

| Name | Required | Used by | Description |
| --- | --- | --- | --- |
| `ALCHEMY_API_KEY` | Yes | Local proxy and Vercel API routes | Builds the Sepolia RPC and NFT API URLs server-side. |
| `ALCHEMY_RPC_URL` | No | `/api/sepolia-rpc` | Overrides the default Sepolia RPC URL. |
| `ALCHEMY_NFT_URL` | No | `/api/nft-metadata` | Overrides the default Sepolia NFT API base URL. |
| `REACT_APP_ALCHEMY_RPC_URL` | No | Browser app | Overrides the client RPC endpoint. Leave unset for the private proxy flow. |
| `PORT` | No | Local proxy | Defaults to `3000`. |
| `CLIENT_PORT` | No | React dev server | Defaults to `3001`. |

Do not commit `.env` or expose real Alchemy keys in client-side variables.

## Scripts

```bash
npm run dev
```

Runs the local app with the private API proxy.

```bash
npm start
```

Runs only the React development server.

```bash
npm test -- --watchAll=false
```

Runs the full test suite once.

```bash
npm run build
```

Creates a production build in `build/`.

## Project Structure

```text
api/                    Vercel-compatible API proxy routes
scripts/dev-server.js   Local API proxy plus React dev server
src/app/                Route definitions
src/components/         Shared UI, search, feedback, and layout components
src/features/homeHero/  Home hero, token marquee, and track background
src/hooks/              Data-fetching and watchlist hooks
src/lib/                Search classification and utilities
src/pages/              Route-level pages
src/services/           Alchemy-backed data services
src/motion/             Motion tokens and navigation transition context
public/token-icons/     Local featured-token SVG assets
```

## Testing and Quality

The test suite covers search classification and navigation, header search,
hero/marquee behavior, color-system constraints, wallet removal confirmation,
feedback motion primitives, account/block hooks, and result states.

Before shipping, run:

```bash
npm test -- --watchAll=false
npm run build
```

For UI polish work, also run the project interface detector against changed UI
files:

```bash
node /Users/favour/.agents/skills/impeccable/scripts/detect.mjs --json <changed-files>
```

## Deployment

The project is deployed on Vercel. To deploy the latest committed changes:

1. Set `ALCHEMY_API_KEY` in the Vercel project environment variables.
2. Commit the local changes.
3. Push to the branch connected to Vercel.
4. Let Vercel build and publish the deployment.

Because API routes live in `api/`, Vercel serves the same `/api/sepolia-rpc` and
`/api/nft-metadata` endpoints used by the local proxy.

## Security Notes

- Keep Alchemy credentials server-side through `ALCHEMY_API_KEY`.
- Do not use `REACT_APP_` variables for secrets; Create React App embeds those
  values into browser bundles.
- `.env` and common local environment files are ignored by Git.
- User watchlists are saved only in the browser under local storage.

## Third-Party Attribution

Some local feedback patterns were adapted from BE UI and rewritten for this
project's JavaScript, CSS-token, and `motion/react` architecture. See
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
