import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Route, Switch, useLocation } from 'react-router-dom';

import LoadingState from '../components/LoadingState';
import { motionSystem } from '../motion/motionSystem';

const HomePage = lazy(() => import('../pages/HomePage'));
const BlockPage = lazy(() => import('../pages/BlockPage'));
const TransactionPage = lazy(() => import('../pages/TransactionPage'));
const AccountPage = lazy(() => import('../pages/AccountPage'));
const NftPage = lazy(() => import('../pages/NftPage'));
const WatchListPage = lazy(() => import('../pages/WatchListPage'));

function AppRoutes() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        className="route-frame"
        key={location.key}
        initial={reducedMotion ? false : { opacity: 0, y: motionSystem.distance.route }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : {
          opacity: 0,
          y: -6,
          transition: {
            duration: motionSystem.duration.exit,
            ease: motionSystem.ease.exit,
          },
        }}
        transition={reducedMotion ? { duration: 0 } : {
          duration: motionSystem.duration.route,
          ease: motionSystem.ease.primary,
        }}
      >
        <Suspense fallback={<div className="route-loading"><LoadingState rows={3} label="Loading page" /></div>}>
          <Switch location={location}>
            <Route exact path="/" component={HomePage} />
            <Route path="/blocks/:blockId" component={BlockPage} />
            <Route path="/tx/:txHash" component={TransactionPage} />
            <Route path="/accounts/:address?" component={AccountPage} />
            <Route path="/nft" component={NftPage} />
            <Route path="/watchlist" component={WatchListPage} />
          </Switch>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default AppRoutes;
