import { cloneElement, isValidElement, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';

function Tooltip({ content, children, side = 'top', delay = 100 }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const wrapperRef = useRef(null);
  const timerRef = useRef(null);
  const id = useId();
  const reducedMotion = useReducedMotion();

  function measure() {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const positions = {
      top: { top: rect.top - 8, left: rect.left + rect.width / 2 },
      bottom: { top: rect.bottom + 8, left: rect.left + rect.width / 2 },
      left: { top: rect.top + rect.height / 2, left: rect.left - 8 },
      right: { top: rect.top + rect.height / 2, left: rect.right + 8 },
    };
    setPosition(positions[side] || positions.top);
  }

  function show(immediate = false) {
    window.clearTimeout(timerRef.current);
    measure();
    timerRef.current = window.setTimeout(() => setOpen(true), immediate ? 0 : delay);
  }

  function hide() {
    window.clearTimeout(timerRef.current);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    function sync() { measure(); }
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, true);
    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync, true);
    };
  });

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const child = isValidElement(children)
    ? cloneElement(children, { 'aria-describedby': open ? id : undefined })
    : children;

  return (
    <span
      className="tooltip-anchor"
      ref={wrapperRef}
      onMouseEnter={() => {
        if (window.matchMedia?.('(hover: hover)').matches) show();
      }}
      onMouseLeave={hide}
      onFocusCapture={() => show(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) hide();
      }}
    >
      {child}
      {typeof document !== 'undefined' ? createPortal(
        <AnimatePresence>
          {open && position ? (
            <motion.span
              className={`tooltip tooltip--${side}`}
              id={id}
              role="tooltip"
              style={position}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionSystem.duration.feedback, ease: motionSystem.ease.primary }}
            >
              {content}
            </motion.span>
          ) : null}
        </AnimatePresence>,
        document.body,
      ) : null}
    </span>
  );
}

export default Tooltip;
