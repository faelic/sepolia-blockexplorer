import { motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';

const TYPE_MARKS = {
  block: 'BLK',
  transaction: 'TX',
  address: 'ADDR',
};

function ResultHeader({ type, identifier, description }) {
  const reducedMotion = useReducedMotion();
  const typeKey = type.toLowerCase();

  return (
    <motion.header
      className={`result-identity result-identity--${typeKey}`}
      key={`${typeKey}-${identifier}`}
      initial={reducedMotion ? false : {
        opacity: 0,
        x: -motionSystem.distance.route,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={reducedMotion ? { duration: 0 } : {
        duration: motionSystem.duration.route,
        ease: motionSystem.ease.primary,
      }}
    >
      <span className="result-identity__mark" aria-hidden="true">
        {TYPE_MARKS[typeKey] || type.slice(0, 3).toUpperCase()}
      </span>
      <div className="result-identity__copy">
        <h1 tabIndex="-1" data-route-heading data-result-type={typeKey}>
          <code>{identifier}</code>
        </h1>
        <p className="result-identity__description">{description}</p>
      </div>
    </motion.header>
  );
}

export default ResultHeader;
