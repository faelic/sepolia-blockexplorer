import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';

// Interaction pattern adapted from beUI's Action Swap (MIT).
function ActionSwap({ value, announce = true, className = '' }) {
  const reducedMotion = useReducedMotion();

  return (
    <span className={`action-swap ${className}`.trim()}>
      {announce ? <span className="sr-only" aria-live="polite">{value}</span> : null}
      <AnimatePresence mode="popLayout">
        <motion.span
          className="action-swap__value"
          key={value}
          aria-hidden={announce ? 'true' : undefined}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
          transition={reducedMotion
            ? { duration: motionSystem.duration.feedback }
            : motionSystem.spring.swap}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default ActionSwap;
