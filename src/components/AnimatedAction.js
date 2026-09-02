import { forwardRef, useEffect, useRef } from 'react';

const AnimatedAction = forwardRef(function AnimatedAction({
  as: Component = 'button',
  children,
  className = '',
  icon: Icon,
  iconClassName = '',
  iconPosition = 'start',
  iconSize = 16,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  ...props
}, forwardedRef) {
  const iconRef = useRef(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;

    function syncPreference() {
      reduceMotionRef.current = query.matches;
    }

    syncPreference();
    query.addEventListener?.('change', syncPreference);
    return () => query.removeEventListener?.('change', syncPreference);
  }, []);

  function startAnimation() {
    if (!reduceMotionRef.current) iconRef.current?.startAnimation();
  }

  function stopAnimation() {
    iconRef.current?.stopAnimation();
  }

  const icon = Icon ? (
    <Icon
      ref={iconRef}
      className={`animated-action__icon ${iconClassName}`.trim()}
      size={iconSize}
      aria-hidden="true"
    />
  ) : null;

  return (
    <Component
      ref={forwardedRef}
      className={`animated-action ${className}`.trim()}
      onMouseEnter={(event) => {
        startAnimation();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        stopAnimation();
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        startAnimation();
        onFocus?.(event);
      }}
      onBlur={(event) => {
        stopAnimation();
        onBlur?.(event);
      }}
      {...props}
    >
      {iconPosition === 'start' ? icon : null}
      {children}
      {iconPosition === 'end' ? icon : null}
    </Component>
  );
});

export default AnimatedAction;
