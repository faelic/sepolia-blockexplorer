export const motionSystem = Object.freeze({
  duration: Object.freeze({
    feedback: 0.12,
    control: 0.18,
    exit: 0.16,
    data: 0.3,
    route: 0.36,
    hero: 0.68,
  }),
  distance: Object.freeze({
    control: 4,
    route: 12,
    data: 18,
  }),
  ease: Object.freeze({
    primary: [0.16, 1, 0.3, 1],
    movement: [0.77, 0, 0.175, 1],
    exit: [0.7, 0, 0.84, 0],
  }),
  spring: Object.freeze({
    press: Object.freeze({ type: 'spring', stiffness: 500, damping: 30, mass: 0.6 }),
    swap: Object.freeze({ type: 'spring', stiffness: 460, damping: 30, mass: 0.55 }),
    panel: Object.freeze({ type: 'spring', stiffness: 420, damping: 40, mass: 0.5 }),
    status: Object.freeze({ type: 'spring', stiffness: 400, damping: 32, mass: 0.6 }),
  }),
  navigationLead: 60,
  pendingDelay: 140,
});

export const cssMotionEase = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const numberFlowTiming = Object.freeze({
  duration: motionSystem.duration.data * 1000,
  easing: cssMotionEase,
});
