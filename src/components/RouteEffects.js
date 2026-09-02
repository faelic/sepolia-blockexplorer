import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const scrollPositions = new Map();

function getRouteAnnouncement(pathname) {
  if (/^\/blocks\//.test(pathname)) return 'Block result loaded.';
  if (/^\/tx\//.test(pathname)) return 'Transaction result loaded.';
  if (/^\/accounts\//.test(pathname)) return 'Address result loaded.';
  if (pathname === '/') return 'BlockScan home loaded.';
  return '';
}

function RouteEffects() {
  const history = useHistory();
  const location = useLocation();
  const explorerScrollPosition = location.state?.explorerScrollPosition;
  const announcement = useMemo(
    () => getRouteAnnouncement(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => () => {
    scrollPositions.set(location.key, {
      left: window.scrollX,
      top: window.scrollY,
    });
  }, [location.key]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    if (history.action === 'PUSH') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      root.style.scrollBehavior = previousScrollBehavior;
      return undefined;
    }

    if (history.action !== 'POP') {
      root.style.scrollBehavior = previousScrollBehavior;
      return undefined;
    }

    const position = explorerScrollPosition
      || scrollPositions.get(location.key);

    if (!position) {
      root.style.scrollBehavior = previousScrollBehavior;
      return undefined;
    }

    window.scrollTo({
      top: position.top,
      left: position.left,
      behavior: 'auto',
    });
    root.style.scrollBehavior = previousScrollBehavior;

    return undefined;
  }, [explorerScrollPosition, history.action, location.key]);

  useEffect(() => {
    if (history.action !== 'PUSH') return undefined;

    const frameId = window.requestAnimationFrame(() => {
      document.querySelector('[data-route-heading]')?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [history.action, location.key]);

  return (
    <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {announcement}
    </span>
  );
}

export default RouteEffects;
