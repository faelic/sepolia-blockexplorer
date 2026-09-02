import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function ConfirmDialog({
  open,
  eyebrow,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onCancel,
  onConfirm,
  returnFocus,
}) {
  const panelRef = useRef(null);
  const cancelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const appShell = document.querySelector('.app-shell');
    const previousOverflow = document.body.style.overflow;
    appShell?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => cancelRef.current?.focus());

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) || []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      appShell?.removeAttribute('inert');
      if (returnFocus?.isConnected) returnFocus.focus();
    };
  }, [onCancel, open, returnFocus]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="confirm-dialog"
          data-testid="confirm-dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.2, ease: motionSystem.ease.primary }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onCancel();
          }}
        >
          <motion.section
            className="confirm-dialog__panel"
            ref={panelRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
            transition={reducedMotion ? { duration: 0.12 } : motionSystem.spring.panel}
          >
            <button className="confirm-dialog__close" type="button" onClick={onCancel} aria-label="Close dialog">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            {eyebrow ? <p className="confirm-dialog__eyebrow">{eyebrow}</p> : null}
            <h2 id={titleId}>{title}</h2>
            <div className="confirm-dialog__description" id={descriptionId}>{description}</div>
            <div className="confirm-dialog__actions">
              <button ref={cancelRef} type="button" onClick={onCancel}>{cancelLabel}</button>
              <button className="is-destructive" type="button" onClick={onConfirm}>{confirmLabel}</button>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default ConfirmDialog;
