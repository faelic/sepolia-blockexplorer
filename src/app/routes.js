import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import BlockPage from '../pages/BlockPage';
import TransactionPage from '../pages/TransactionPage';
import AccountPage from '../pages/AccountPage';
import NftPage from '../pages/NftPage';
import WatchListPage from '../pages/WatchListPage';



function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/blocks/:blockId" component={BlockPage} />
      <Route path="/tx/:txHash" component={TransactionPage} />
      <Route path="/accounts/:address?" component={AccountPage} />
      <Route path="/nft" component={NftPage} />
      <Route path="/watchlist" component={WatchListPage} />
    </Switch>
  );
}

export default AppRoutes;
