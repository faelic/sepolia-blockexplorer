# BlockScan

BlockScan is a modern Ethereum Sepolia block explorer built with React and the Alchemy SDK.
The application helps users inspect blockchain activity through a clean and responsive interface for exploring blocks, transactions, wallet activity, NFT metadata, and persistent wallet watchlists.

Rather than replicating a full Etherscan-style platform, the goal of BlockScan was to design a more approachable and visually structured explorer focused on readability, usability, and real-time blockchain data visualization.

---

## Live Demo

Live Demo: https://blockscan-seven.vercel.app/

---


## Engineering Focus

This project focuses on:

* Real-time blockchain data visualization
* Frontend architecture and reusable UI systems
* API and RPC integration workflows
* Responsive dashboard interface design
* Blockchain data formatting and readability
* State-driven UI rendering and navigation flows

---

## Tech Stack

### Frontend

* React
* React Router
* JavaScript
* CSS

### Blockchain & Data

* Alchemy SDK
* Ethereum Sepolia Network

---

## Core Features

* Real-time Sepolia block activity dashboard
* Clickable block explorer with detailed block inspection
* Transaction detail pages with transaction receipt and status tracking
* Wallet lookup by Ethereum address
* Persistent wallet watchlist using browser local storage
* Incoming transfer history visualization
* NFT metadata lookup using contract address and token ID
* Unified search workflow for:

  * block numbers
  * transaction hashes
  * wallet addresses
* Responsive dashboard UI optimized for desktop and mobile layouts

---

## Application Pages

### Home Dashboard

* Displays latest Sepolia block activity
* Shows recent blocks with quick navigation into block details
* Provides a high-level overview of blockchain activity

### Block Details

Displays:

* block hash
* miner address
* timestamp
* gas used
* gas limit
* transaction count

Also includes the first 10 transactions within the selected block.

### Transaction Details

Displays:

* transaction status
* sender and receiver addresses
* transaction value
* gas limit
* gas price
* gas used
* receipt information

Supports:

* pending transactions
* successful mined transactions
* failed transactions

### Account Lookup

Allows users to:

* search wallet addresses
* view wallet balances
* inspect nonce values
* explore incoming transfer history
* save wallet addresses to a persistent watchlist

### Watchlist

* Displays saved wallet addresses
* Enables quick navigation back to tracked accounts
* Supports watchlist management and removal

### NFT Lookup

Fetches and displays NFT metadata using:

* contract address
* token ID

Displays:

* NFT title
* description
* collection information
* token type
* contract details
* NFT image preview

---

## Architecture Notes

The application was structured feature-by-feature to keep components modular and maintainable.

Frontend workflows were designed around:

* reusable UI patterns
* route-driven navigation
* isolated data-fetching logic
* scalable blockchain visualization systems
* responsive dashboard layouts

The project also focuses on presenting complex blockchain data in a way that feels easier to navigate and understand for users exploring Ethereum activity.

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
REACT_APP_ALCHEMY_API_KEY=your_alchemy_api_key_here
```

The application is configured to use the Ethereum Sepolia testnet.

### 3. Start Development Server

```bash
npm start
```

### 4. Build for Production

```bash
npm run build
```

---

## Notes

* This project uses the Ethereum Sepolia testnet.
* Environment variables are loaded from `.env`.
* Wallet watchlist data is persisted using browser local storage.
* Blockchain data is fetched using the Alchemy SDK and Ethereum RPC workflows.

---

## Future Improvements

Planned improvements include:

* Advanced transaction filtering
* Pagination for large transaction datasets
* Relative live-updating timestamps
* Enhanced wallet activity analytics
* Better gas and token value formatting
* Additional NFT collection insights
* Improved search intelligence and query handling

---
