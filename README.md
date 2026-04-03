# ChainScope Explorer

ChainScope is a Sepolia based Ethereum block explorer I built with React and the Alchemy SDK.
It helps users inspect blocks, transactions, wallet activity, NFT metadata, and saved watchlists from one interface.
The project was built as a hands on blockchain learning exercise focused on understanding how to fetch and present on-chain data.
Instead of cloning a full Etherscan like product, the goal however was to build a clean, modern explorer that makes blockchain data easier to understand.

## Overview

I designed ChainScope to help users explore blockchain activity through a polished interface while learning how to work with Alchemy's SDK and Ethereum data structures.

## Built With

- React
- React Router
- Alchemy SDK
- CSS

## Features

- Recent Sepolia block activity on the home page
- Clickable block list with block details
- Transaction detail pages with status tracking
- Wallet lookup by address
- Wallet watchlist saved in local storage
- Incoming transfer history for wallet addresses
- NFT metadata lookup by contract address and token ID
- Global search for block numbers, transaction hashes, and wallet addresses
- Responsive explorer UI with a custom dashboard style layout

## Pages

### Home
- Shows the latest block number
- Displays recent Sepolia blocks
- Lets users drill into block details

### Block Details
- Displays block metadata
- Shows block hash, miner, timestamp, gas used, gas limit, and transaction count
- Lists the first 10 transactions in the selected block

### Transaction Details
- Displays transaction data and receipt data
- Shows pending, mined success, or mined failed status
- Includes sender, receiver, value, gas limit, gas price, and gas used

### Account Lookup
- Lets users search for a wallet address
- Shows wallet balance and nonce
- Displays incoming transfer activity
- Allows addresses to be saved to a watchlist

### Watchlist
- Displays saved wallet addresses
- Allows quick navigation back to saved accounts
- Supports removing saved wallets

### NFT Lookup
- Fetches NFT metadata using a contract address and token ID
- Shows NFT title, description, image, token type, collection info, and contract details

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your environment variable

Create a `.env` file in the project root and add:

```bash
REACT_APP_ALCHEMY_API_KEY=your_alchemy_api_key_here
```

This project is configured to use the Sepolia testnet.

### 3. Start the development server

```bash
npm start
```

### 4. Build for production

```bash
npm run build
```

## Notes

- This project uses the Ethereum Sepolia testnet, not Ethereum mainnet.
- The API key is loaded from `.env` and should not be committed.
- Wallet watchlist data is stored locally in the browser using local storage.

## Learning Goal

This project was built as part of my blockchain development growth and it focuses on learning how to:
- fetch blockchain data
- structure a React app feature by feature
- work with Alchemy SDK methods
- display blockchain data in a readable way

## Future improvements i'm looking to add

- Better formatting for gas and token values
- Pagination for large transaction lists
- Relative live updating timestamps
- More advanced wallet activity analytics
- Additional NFT insights and pricing data
