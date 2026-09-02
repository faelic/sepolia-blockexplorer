import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';

const VALID_STATUSES = new Set([
  'neutral',
  'info',
  'loading',
  'success',
  'warning',
  'danger',
]);

function StatusGlyph({ status }) {
  if (status === 'success') {
    return <path d="m5 12 4 4L19 7" />;
  }
  if (status === 'danger') {
    return <><path d="M7 7l10 10" /><path d="M17 7 7 17" /></>;
  }
  if (status === 'warning') {
    return <><path d="M12 4 3.5 19h17L12 4Z" /><path d="M12 9v4" /><path d="M12 16h.01" /></>;
  }
  if (status === 'info') {
    return <><circle cx="12" cy="12" r="8" /><path d="M12 11v5" /><path d="M12 8h.01" /></>;
  }
  return <circle cx="12" cy="12" r="5" />;
}

function StatusBadge({ status = 'neutral', children, pulse = false, className = '' }) {
  const reducedMotion = useReducedMotion();
  const safeStatus = VALID_STATUSES.has(status) ? status : 'neutral';

  return (
    <span
      className={`status-badge status-badge--${safeStatus}${pulse ? ' is-pulsing' : ''} ${className}`.trim()}
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        <motion.svg
          className="status-badge__icon"
          key={safeStatus}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -3, scale: 0.94 }}
          transition={reducedMotion
            ? { duration: motionSystem.duration.feedback }
            : motionSystem.spring.status}
        >
          <StatusGlyph status={safeStatus} />
        </motion.svg>
      </AnimatePresence>
      <span>{children}</span>
    </span>
  );
}

export default StatusBadge;
