import { motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';

function ResultContent({ identity, state, children }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="result-content"
      key={`${identity}-${state}`}
      initial={reducedMotion ? false : {
        opacity: 0,
        y: motionSystem.distance.control,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : {
        duration: motionSystem.duration.data,
        delay: state === 'loading' ? 0 : 0.055,
        ease: motionSystem.ease.primary,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ResultContent;
