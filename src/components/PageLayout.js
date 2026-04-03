import React from 'react';
import { NavLink } from 'react-router-dom';

import SearchBar from './SearchBar';

function PageLayout({ children }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="brand-block">
          <p className="brand-block__eyebrow">Sepolia Testnet Explorer</p>
            <NavLink exact className="brand-block__title" to="/">
              ChainScope
            </NavLink>
          </div>

          <nav className="app-nav" aria-label="Primary">
            <NavLink exact activeClassName="is-active" to="/">
              Home
            </NavLink>
            <NavLink activeClassName="is-active" to="/accounts">
              Account Lookup
            </NavLink>
            <NavLink activeClassName="is-active" to="/nft">
              NFT Lookup
            </NavLink>
            <NavLink activeClassName="is-active" to="/watchlist">
              Watchlist
            </NavLink>

          </nav>
        </div>

        <div className="hero-panel">
          <div className="hero-panel__copy">
            <p className="hero-panel__label">Sepolia Explorer</p>
            <h1>Explore blocks, transactions, wallets, and NFTs.</h1>
            <p>
              Track recent chain activity, inspect transaction status, look up
              wallet balances, and query NFT metadata from one interface.
            </p>
          </div>

          <SearchBar />
        </div>
      </header>

      <main className="app-main">{children}</main>
    </div>
  );
}

export default PageLayout;
