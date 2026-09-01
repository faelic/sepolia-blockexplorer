import './styles.css';

import { createScene } from './scene/createScene.js';

const hero = document.querySelector('#spatial-hero');
const sceneLayer = document.querySelector('#scene-layer');
const sceneStatus = document.querySelector('#scene-status');
const searchForm = document.querySelector('#prototype-search');
const searchInput = document.querySelector('#explorer-query');
const searchFeedback = document.querySelector('#search-feedback');
const searchButton = searchForm.querySelector('button');
const defaultSearchMessage = searchFeedback.dataset.defaultMessage;
const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');
const mobileNavigationQuery = window.matchMedia('(max-width: 767px)');

document.documentElement.classList.add('has-js');

function setNavigationOpen(isOpen, { restoreFocus = false } = {}) {
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute(
    'aria-label',
    isOpen ? 'Close navigation menu' : 'Open navigation menu',
  );
  primaryNavigation.classList.toggle('is-open', isOpen);
  primaryNavigation.toggleAttribute('inert', mobileNavigationQuery.matches && !isOpen);

  if (restoreFocus) navToggle.focus();
}

navToggle.addEventListener('click', () => {
  const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
  setNavigationOpen(willOpen);
});

primaryNavigation.addEventListener('click', (event) => {
  if (mobileNavigationQuery.matches && event.target.closest('a')) {
    setNavigationOpen(false);
  }
});

document.addEventListener('click', (event) => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen && !siteHeader.contains(event.target)) setNavigationOpen(false);
});

document.addEventListener('keydown', (event) => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen && event.key === 'Escape') setNavigationOpen(false, { restoreFocus: true });
});

mobileNavigationQuery.addEventListener('change', (event) => {
  if (!event.matches) setNavigationOpen(false);
});

setNavigationOpen(false);

function classifyQuery(query) {
  if (/^\d+$/.test(query)) return 'block number';
  if (/^0x[a-fA-F0-9]{40}$/.test(query)) return 'wallet address';
  if (/^0x[a-fA-F0-9]{64}$/.test(query)) return 'transaction hash';
  return null;
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  const queryType = classifyQuery(query);

  searchFeedback.className = 'search-form__feedback';

  if (!query) {
    searchFeedback.textContent = 'Enter a block number, transaction hash, or wallet address.';
    searchFeedback.classList.add('is-error');
    searchInput.setAttribute('aria-invalid', 'true');
    searchInput.focus();
    return;
  }

  if (!queryType) {
    searchFeedback.textContent = 'Use a block number, 0x wallet address, or 0x transaction hash.';
    searchFeedback.classList.add('is-error');
    searchInput.setAttribute('aria-invalid', 'true');
    searchInput.focus();
    return;
  }

  searchInput.removeAttribute('aria-invalid');
  searchButton.disabled = true;
  searchButton.textContent = 'Checking';
  searchFeedback.textContent = 'Checking identifier.';

  window.setTimeout(() => {
    searchFeedback.textContent = `Valid ${queryType}. Production routing is intentionally disconnected in this prototype.`;
    searchFeedback.classList.add('is-success');
    searchButton.disabled = false;
    searchButton.textContent = 'Search';
  }, 420);
});

searchInput.addEventListener('input', () => {
  searchInput.removeAttribute('aria-invalid');
  searchFeedback.className = 'search-form__feedback';
  searchFeedback.textContent = defaultSearchMessage;
});

if (new URLSearchParams(window.location.search).get('debug') === '1') {
  const debugPanel = document.createElement('output');
  debugPanel.className = 'debug-panel';
  debugPanel.textContent = 'FOV 42 | tokens 9 | DPR capped | damping enabled';
  hero.append(debugPanel);
}

let disposeScene = null;

createScene({
  container: sceneLayer,
  hero,
  onReady({ profile }) {
    hero.classList.add('is-ready');
    sceneStatus.textContent = `Decorative NFT token scene ready in ${profile} mode.`;
  },
  onFailure() {
    hero.classList.add('scene-failed');
    sceneStatus.textContent = 'The decorative NFT scene could not load. Explorer search remains available.';
  },
}).then((dispose) => {
  disposeScene = dispose;
});

window.addEventListener('pagehide', () => disposeScene?.(), { once: true });
