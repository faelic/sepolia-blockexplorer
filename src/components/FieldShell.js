import { useEffect, useRef } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';

// Validation behavior adapted from beUI's Input (MIT), restyled for BlockScan.
function FieldShell({
  children,
  error = '',
  errorId,
  errorClassName = '',
  className = '',
  reserveMessageSpace = true,
}) {
  const fieldRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!error || !fieldRef.current || reducedMotion) return undefined;
    const controls = animate(
      fieldRef.current,
      { x: [0, -4, 4, -2, 2, 0] },
      { duration: 0.32, ease: motionSystem.ease.movement },
    );
    return () => controls.stop();
  }, [error, reducedMotion]);

  return (
    <div className={`field-shell ${className}`.trim()}>
      <div className="field-shell__control" ref={fieldRef}>{children}</div>
      <div className={reserveMessageSpace ? 'field-shell__message-space' : 'field-shell__message-space is-collapsed'}>
        <AnimatePresence>
          {error ? (
            <motion.p
              className={errorClassName}
              id={errorId}
              role="alert"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
              transition={{ duration: motionSystem.duration.control, ease: motionSystem.ease.primary }}
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FieldShell;
