import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLocation } from 'react-router-dom';

import { useNavigationMotion } from '../motion/NavigationMotionContext';
import { motionSystem } from '../motion/motionSystem';

function clampScale(value) {
  return Math.max(0.55, Math.min(value, 2.1));
}

function SearchTransitionOverlay() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const { transition, finishNavigation } = useNavigationMotion();
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!transition || !reducedMotion) return undefined;
    finishNavigation(transition.id);
    return undefined;
  }, [finishNavigation, reducedMotion, transition]);

  useLayoutEffect(() => {
    if (!transition || reducedMotion) return undefined;

    let frameId = 0;
    let attempts = 0;

    function measureTarget() {
      const heading = document.querySelector('[data-route-heading]');
      if (!heading && attempts < 70) {
        attempts += 1;
        frameId = window.requestAnimationFrame(measureTarget);
        return;
      }

      if (!heading) {
        finishNavigation(transition.id);
        return;
      }

      const rect = heading.getBoundingClientRect();
      setTarget({
        x: rect.left - transition.source.left,
        y: rect.top - transition.source.top,
        scaleX: clampScale(rect.width / transition.source.width),
        scaleY: clampScale(rect.height / transition.source.height),
      });
    }

    frameId = window.requestAnimationFrame(measureTarget);
    return () => window.cancelAnimationFrame(frameId);
  }, [finishNavigation, location.key, reducedMotion, transition]);

  useEffect(() => {
    setTarget(null);
  }, [transition?.id]);

  return (
    <AnimatePresence>
      {transition && !reducedMotion ? (
        <motion.div
          className="search-transition"
          key={transition.id}
          aria-hidden="true"
          style={{
            left: transition.source.left,
            top: transition.source.top,
            width: transition.source.width,
            height: transition.source.height,
          }}
          initial={{ opacity: 0.94, x: 0, y: 0, scaleX: 1, scaleY: 1 }}
          animate={target ? {
            opacity: [0.94, 0.94, 0],
            x: target.x,
            y: target.y,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
          } : { opacity: 0.94 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: motionSystem.duration.route,
            ease: motionSystem.ease.primary,
            times: [0, 0.68, 1],
          }}
          onAnimationComplete={() => {
            if (target) finishNavigation(transition.id);
          }}
        >
          <span className="search-transition__beam" />
          <span className="search-transition__query">
            <span>{transition.type}</span>
            <code>{transition.query}</code>
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default SearchTransitionOverlay;
