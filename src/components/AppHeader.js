import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import AnimatedAction from './AnimatedAction';
import Brand from './Brand';
import GlobalExplorerSearch from './GlobalExplorerSearch';
import {
  BookmarkIcon,
  GalleryThumbnailsIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  WalletIcon,
} from './icons';

function AppHeader() {
  const location = useLocation();
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const searchTriggerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [overHero, setOverHero] = useState(location.pathname === '/');
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);

    if (!isHome) {
      setOverHero(false);
      return undefined;
    }

    let frameId;
    let observer;

    function connectToHero() {
      const heroCopy = document.querySelector('#home-hero-copy');

      if (!heroCopy) {
        frameId = window.requestAnimationFrame(connectToHero);
        return;
      }

      setOverHero(true);
      observer = new IntersectionObserver(
        ([entry]) => setOverHero(entry.isIntersecting),
        { rootMargin: '-80px 0px -42% 0px', threshold: 0.05 },
      );
      observer.observe(heroCopy);
    }

    connectToHero();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, [isHome, location.pathname]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function focusExplorerSearch() {
      setSearchOpen(true);
      setMenuOpen(false);
    }

    window.addEventListener('blockscan:focus-explorer-search', focusExplorerSearch);
    return () => window.removeEventListener(
      'blockscan:focus-explorer-search',
      focusExplorerSearch,
    );
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return undefined;

    const query = window.matchMedia('(max-width: 900px)');

    function syncNavigation() {
      navRef.current?.toggleAttribute('inert', query.matches && !menuOpen);
    }

    syncNavigation();
    query.addEventListener?.('change', syncNavigation);
    return () => query.removeEventListener?.('change', syncNavigation);
  }, [menuOpen]);

  const headerClassName = [
    'app-header',
    isHome && overHero ? 'is-over-hero' : 'is-solid',
    menuOpen ? 'has-open-menu' : '',
    searchOpen ? 'has-open-search' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClassName} ref={headerRef}>
        <div className="app-header__inner">
          <Brand />

          <nav
            id="primary-navigation"
            className={`app-nav${menuOpen ? ' is-open' : ''}`}
            ref={navRef}
            aria-label="Primary navigation"
          >
            <AnimatedAction
              as={NavLink}
              exact
              activeClassName="is-active"
              icon={HomeIcon}
              iconSize={18}
              to="/"
            >
              Home
            </AnimatedAction>
            <AnimatedAction
              as={NavLink}
              activeClassName="is-active"
              icon={WalletIcon}
              iconSize={18}
              to="/accounts"
            >
              Accounts
            </AnimatedAction>
            <AnimatedAction
              as={NavLink}
              activeClassName="is-active"
              icon={GalleryThumbnailsIcon}
              iconSize={18}
              to="/nft"
            >
              NFTs
            </AnimatedAction>
            <AnimatedAction
              as={NavLink}
              activeClassName="is-active"
              icon={BookmarkIcon}
              iconSize={18}
              to="/watchlist"
            >
              Watchlist
            </AnimatedAction>
          </nav>

          <span className="app-header__network" aria-label="Ethereum Sepolia testnet">
            <i aria-hidden="true" />
            <span aria-hidden="true">Sepolia testnet</span>
          </span>

          <div className="app-header__actions">
            <AnimatedAction
              ref={searchTriggerRef}
              className="header-action search-toggle"
              type="button"
              icon={SearchIcon}
              iconSize={18}
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              aria-controls="global-search-dialog"
              onClick={() => {
                setSearchOpen(true);
                setMenuOpen(false);
              }}
            >
              Search
            </AnimatedAction>
            <AnimatedAction
              className="header-action nav-toggle"
              type="button"
              icon={MenuIcon}
              iconSize={18}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              onClick={() => {
                setMenuOpen((value) => !value);
                setSearchOpen(false);
              }}
            >
              Menu
            </AnimatedAction>
          </div>
        </div>
      </header>
      <GlobalExplorerSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        returnFocusRef={searchTriggerRef}
      />
    </>
  );
}

export default AppHeader;
