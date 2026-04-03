import { useEffect, useState } from 'react';

const STORAGE_KEY = 'blockexplorer_watchlist';

function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem(STORAGE_KEY);

    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(address) {
    const alreadyExists = watchlist.includes(address);

    if (alreadyExists) {
      return 'exists';
    }

    setWatchlist((currentWatchlist) => [...currentWatchlist, address]);
    return 'added';
  }

  function removeFromWatchlist(address) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((savedAddress) => savedAddress !== address)
    );
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  };
}

export default useWatchlist;
