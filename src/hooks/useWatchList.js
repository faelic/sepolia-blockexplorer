import { useEffect, useState } from 'react';

const STORAGE_KEY = 'blockexplorer_watchlist';

function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const savedWatchlist = localStorage.getItem(STORAGE_KEY);
      const parsedWatchlist = savedWatchlist ? JSON.parse(savedWatchlist) : [];
      return Array.isArray(parsedWatchlist) ? parsedWatchlist : [];
    } catch (error) {
      return [];
    }
  });

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

  function insertIntoWatchlist(address, index) {
    setWatchlist((currentWatchlist) => {
      if (currentWatchlist.includes(address)) return currentWatchlist;
      const next = [...currentWatchlist];
      const safeIndex = Math.max(0, Math.min(index, next.length));
      next.splice(safeIndex, 0, address);
      return next;
    });
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    insertIntoWatchlist,
  };
}

export default useWatchlist;
