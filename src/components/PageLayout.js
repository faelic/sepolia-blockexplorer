import { useLocation } from 'react-router-dom';

import AppHeader from './AppHeader';
import RouteEffects from './RouteEffects';
import SearchTransitionOverlay from './SearchTransitionOverlay';
import { ToastProvider } from './ToastProvider';
import { NavigationMotionProvider } from '../motion/NavigationMotionContext';

function PageLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <ToastProvider>
      <NavigationMotionProvider>
        <div className={`app-shell${isHome ? ' app-shell--home' : ''}`}>
          <AppHeader />
          <RouteEffects />
          <main className={`app-main${isHome ? ' app-main--home' : ''}`}>
            {children}
          </main>
          <SearchTransitionOverlay />
        </div>
      </NavigationMotionProvider>
    </ToastProvider>
  );
}

export default PageLayout;
