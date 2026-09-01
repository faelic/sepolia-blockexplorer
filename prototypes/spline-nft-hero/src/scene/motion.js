const degrees = (value) => (value * Math.PI) / 180;

const DESKTOP_SETTINGS = {
  damping: 5.5,
  floatScale: 1,
  maxYaw: degrees(2.65),
  maxPitch: degrees(1.9),
};

const TABLET_SETTINGS = {
  damping: 5.8,
  floatScale: 0.78,
  maxYaw: degrees(1.82),
  maxPitch: degrees(1.35),
};

const MOBILE_SETTINGS = {
  damping: 6.4,
  floatScale: 0.42,
  maxYaw: 0,
  maxPitch: 0,
};

export function createMotionController({ hero, camera, tokens }) {
  const pointer = { targetX: 0, targetY: 0 };
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(pointer: fine)');
  const baseCameraPosition = camera.position.clone();
  camera.rotation.reorder('YXZ');
  const baseCameraRotation = camera.rotation.clone();
  let settings = DESKTOP_SETTINGS;
  let reducedMotion = reducedMotionQuery.matches;
  let currentYaw = 0;
  let currentPitch = 0;

  function onPointerMove(event) {
    if (reducedMotion || !finePointerQuery.matches || settings.maxYaw === 0) return;
    const bounds = hero.getBoundingClientRect();
    pointer.targetX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    pointer.targetY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
  }

  function resetPointer() {
    pointer.targetX = 0;
    pointer.targetY = 0;
  }

  function onReducedMotionChange(event) {
    reducedMotion = event.matches;
    resetPointer();
    if (reducedMotion) {
      currentYaw = 0;
      currentPitch = 0;
      camera.position.copy(baseCameraPosition);
      camera.rotation.copy(baseCameraRotation);
    }
  }

  hero.addEventListener('pointermove', onPointerMove, { passive: true });
  hero.addEventListener('pointerleave', resetPointer, { passive: true });
  reducedMotionQuery.addEventListener('change', onReducedMotionChange);

  return {
    setViewport(profile) {
      settings = profile === 'mobile'
        ? MOBILE_SETTINGS
        : profile === 'tablet'
          ? TABLET_SETTINGS
          : DESKTOP_SETTINGS;
      if (settings.maxYaw === 0) {
        resetPointer();
        currentYaw = 0;
        currentPitch = 0;
        camera.position.copy(baseCameraPosition);
        camera.rotation.copy(baseCameraRotation);
      }
    },

    update(elapsed, deltaTime) {
      const safeDeltaTime = Math.min(deltaTime, 0.033);
      const alpha = 1 - Math.exp(-settings.damping * safeDeltaTime);
      const motionEnabled = reducedMotion ? 0 : 1;
      const floatScale = settings.floatScale * motionEnabled;
      const targetYaw = -pointer.targetX * settings.maxYaw * motionEnabled;
      const targetPitch = -pointer.targetY * settings.maxPitch * motionEnabled;

      currentYaw += (targetYaw - currentYaw) * alpha;
      currentPitch += (targetPitch - currentPitch) * alpha;
      camera.position.copy(baseCameraPosition);
      camera.rotation.set(
        baseCameraRotation.x + currentPitch,
        baseCameraRotation.y + currentYaw,
        baseCameraRotation.z,
        'YXZ',
      );

      tokens.forEach((token) => {
        if (!token.visible) return;

        const motion = token.userData.motion;
        const slowTime = elapsed * motion.floatSpeed;
        const verticalFloat = Math.sin(slowTime + motion.phase) * motion.floatAmplitude * floatScale;
        const horizontalFloat = Math.cos(slowTime * 0.72 + motion.phase * 1.2) * motion.horizontalDrift * floatScale;

        token.position.x = motion.basePosition.x + horizontalFloat;
        token.position.y = motion.basePosition.y + verticalFloat;
        token.position.z = motion.basePosition.z
          + Math.sin(slowTime * 0.54 + motion.phase) * motion.depthDrift * floatScale;

        token.rotation.x = motion.baseRotation.x
          + Math.sin(elapsed * motion.rotationSpeed[0] + motion.phase) * motion.rotationAmplitude[0] * floatScale;
        token.rotation.y = motion.baseRotation.y
          + Math.cos(elapsed * motion.rotationSpeed[1] + motion.phase * 0.8) * motion.rotationAmplitude[1] * floatScale;
        token.rotation.z = motion.baseRotation.z
          + Math.sin(elapsed * motion.rotationSpeed[2] + motion.phase * 1.3) * motion.rotationAmplitude[2] * floatScale;

        token.scale.setScalar(motion.baseScale);
      });
    },

    dispose() {
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', resetPointer);
      reducedMotionQuery.removeEventListener('change', onReducedMotionChange);
    },
  };
}
