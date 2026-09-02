import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import ExplorerSearch from './ExplorerSearch';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function GlobalExplorerSearch({ open, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = returnFocusRef?.current || document.activeElement;
    const appShell = document.querySelector('.app-shell');
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = document.documentElement.clientWidth > 0
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    appShell?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      appShell?.removeAttribute('inert');
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [open, returnFocusRef]);

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) || [],
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (focusable.length === 1) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="global-search"
          data-testid="global-search-backdrop"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.16 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          onKeyDown={handleKeyDown}
        >
          <motion.section
            id="global-search-dialog"
            className="global-search__dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="global-search-title"
            initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.99 }}
            transition={{
              duration: reducedMotion ? 0 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h2 className="sr-only" id="global-search-title">Search BlockScan</h2>
            <ExplorerSearch
              id="global-explorer-search"
              variant="overlay"
              placeholder="Search block, tx hash, or address"
              submitPresentation="result"
              showDestinationPreview
              autoFocus
              deriveQueryFromLocation={false}
              onNavigate={onClose}
            />
            <p className="global-search__hint">
              <span>Enter to open</span>
              <span>Esc to close</span>
            </p>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default GlobalExplorerSearch;
