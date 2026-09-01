const degrees = (value) => (value * Math.PI) / 180;

export const TOKEN_LAYOUT = [
  {
    id: 'left-foreground',
    depth: 'near',
    artwork: 0,
    position: [-4.82, -1.5, 1.35],
    rotation: [degrees(11), degrees(31), degrees(-5)],
    scale: 0.82,
    phase: 0.25,
    floatSpeed: 0.72,
    floatAmplitude: 0.1,
    horizontalDrift: 0.055,
    depthDrift: 0.05,
    rotationAmplitude: [degrees(4.5), degrees(7), degrees(4)],
    rotationSpeed: [0.72, 0.56, 0.65],
    mobile: { position: [-1.2, -2.65, 1.1], scale: 0.34, visible: true },
  },
  {
    id: 'right-foreground',
    depth: 'near',
    artwork: 1,
    position: [4.86, -0.98, 1.08],
    rotation: [degrees(-10), degrees(-32), degrees(5)],
    scale: 0.78,
    phase: 1.52,
    floatSpeed: 0.64,
    floatAmplitude: 0.11,
    horizontalDrift: 0.06,
    depthDrift: 0.055,
    rotationAmplitude: [degrees(5), degrees(7.5), degrees(4)],
    rotationSpeed: [0.58, 0.52, 0.61],
    mobile: { position: [1.2, -2.62, 0.92], scale: 0.33, visible: true },
  },
  {
    id: 'upper-left-mid',
    depth: 'mid',
    artwork: 2,
    position: [-4.5, 2.28, -0.95],
    rotation: [degrees(-7), degrees(29), degrees(8)],
    scale: 0.61,
    phase: 2.36,
    floatSpeed: 0.82,
    floatAmplitude: 0.085,
    horizontalDrift: 0.045,
    depthDrift: 0.04,
    rotationAmplitude: [degrees(4), degrees(7), degrees(3)],
    rotationSpeed: [0.66, 0.76, 0.54],
    mobile: { position: [-1.25, 1.55, -1.1], scale: 0.3, visible: true },
  },
  {
    id: 'upper-right-mid',
    depth: 'mid',
    artwork: 3,
    position: [4.58, 2.02, -1.75],
    rotation: [degrees(11), degrees(-31), degrees(-7)],
    scale: 0.56,
    phase: 3.74,
    floatSpeed: 0.68,
    floatAmplitude: 0.075,
    horizontalDrift: 0.04,
    depthDrift: 0.035,
    rotationAmplitude: [degrees(4.5), degrees(7), degrees(3.5)],
    rotationSpeed: [0.83, 0.59, 0.7],
    mobile: { position: [1.25, 1.5, -1.85], scale: 0.29, visible: true },
  },
  {
    id: 'top-center-far',
    depth: 'far',
    artwork: 4,
    position: [0.58, 3.32, -4.9],
    rotation: [degrees(7), degrees(25), degrees(4)],
    scale: 0.43,
    phase: 4.42,
    floatSpeed: 0.54,
    floatAmplitude: 0.05,
    horizontalDrift: 0.02,
    depthDrift: 0.02,
    rotationAmplitude: [degrees(3), degrees(5.5), degrees(2.5)],
    rotationSpeed: [0.54, 0.49, 0.62],
    mobile: { position: [0.2, 4.75, -4.4], scale: 0.27, visible: false },
  },
  {
    id: 'lower-left-mid',
    depth: 'mid',
    artwork: 5,
    position: [-3.45, -2.64, -0.35],
    rotation: [degrees(-12), degrees(32), degrees(-6)],
    scale: 0.58,
    phase: 5.28,
    floatSpeed: 0.76,
    floatAmplitude: 0.095,
    horizontalDrift: 0.05,
    depthDrift: 0.045,
    rotationAmplitude: [degrees(5), degrees(7.5), degrees(4)],
    rotationSpeed: [0.61, 0.69, 0.57],
    mobile: { position: [0, 1.65, -0.55], scale: 0.24, visible: true },
  },
  {
    id: 'lower-right-mid',
    depth: 'mid',
    artwork: 6,
    position: [3.52, -2.7, -1.45],
    rotation: [degrees(9), degrees(-30), degrees(9)],
    scale: 0.52,
    phase: 0.92,
    floatSpeed: 0.9,
    floatAmplitude: 0.085,
    horizontalDrift: 0.045,
    depthDrift: 0.04,
    rotationAmplitude: [degrees(4), degrees(7), degrees(3.5)],
    rotationSpeed: [0.78, 0.64, 0.73],
    mobile: { position: [1.2, -3.34, -1.45], scale: 0.32, visible: false },
  },
  {
    id: 'far-left-edge',
    depth: 'far',
    artwork: 7,
    position: [-6.35, 0.48, -4.15],
    rotation: [degrees(6), degrees(24), degrees(-9)],
    scale: 0.44,
    phase: 2.82,
    floatSpeed: 0.6,
    floatAmplitude: 0.06,
    horizontalDrift: 0.025,
    depthDrift: 0.025,
    rotationAmplitude: [degrees(3), degrees(6), degrees(2.5)],
    rotationSpeed: [0.52, 0.58, 0.48],
    mobile: { position: [-2.28, 0.42, -3.6], scale: 0.28, visible: false },
  },
  {
    id: 'far-right-edge',
    depth: 'far',
    artwork: 8,
    position: [6.4, 0.96, -4.65],
    rotation: [degrees(-9), degrees(-26), degrees(7)],
    scale: 0.41,
    phase: 4.96,
    floatSpeed: 0.7,
    floatAmplitude: 0.055,
    horizontalDrift: 0.025,
    depthDrift: 0.025,
    rotationAmplitude: [degrees(3.5), degrees(6.5), degrees(3)],
    rotationSpeed: [0.68, 0.55, 0.6],
    mobile: { position: [0, -3.25, -1.8], scale: 0.28, visible: true },
  },
];

function setBaseTransform(token, position, scale, viewportScale, visible) {
  const motion = token.userData.motion;
  motion.basePosition.x = position[0] * viewportScale.x;
  motion.basePosition.y = position[1] * viewportScale.y;
  motion.basePosition.z = position[2];
  motion.baseScale = scale * viewportScale.scale;
  token.visible = visible;
  token.position.set(motion.basePosition.x, motion.basePosition.y, motion.basePosition.z);
  token.scale.setScalar(motion.baseScale);
}

export function applyResponsiveLayout(tokens, viewportWidth) {
  const isMobile = viewportWidth <= 767;
  const isTablet = viewportWidth > 767 && viewportWidth < 1100;

  tokens.forEach((token, index) => {
    const config = TOKEN_LAYOUT[index];

    if (isMobile) {
      setBaseTransform(
        token,
        config.mobile.position,
        config.mobile.scale,
        { x: 1, y: 1, scale: 1 },
        config.mobile.visible,
      );
      return;
    }

    setBaseTransform(
      token,
      config.position,
      config.scale,
      isTablet ? { x: 0.82, y: 0.94, scale: 0.86 } : { x: 1, y: 1, scale: 1 },
      true,
    );
  });

  return isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
}
