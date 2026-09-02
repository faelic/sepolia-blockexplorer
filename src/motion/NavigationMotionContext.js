import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const NavigationMotionContext = createContext({
  transition: null,
  beginNavigation: () => {},
  finishNavigation: () => {},
});

export function NavigationMotionProvider({ children }) {
  const idRef = useRef(0);
  const [transition, setTransition] = useState(null);

  const beginNavigation = useCallback(({ query, type, sourceRect }) => {
    if (!sourceRect || sourceRect.width <= 0 || sourceRect.height <= 0) return;

    idRef.current += 1;
    setTransition({
      id: idRef.current,
      query,
      type,
      source: {
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
      },
    });
  }, []);

  const finishNavigation = useCallback((id) => {
    setTransition((current) => (
      !id || current?.id === id ? null : current
    ));
  }, []);

  const value = useMemo(() => ({
    transition,
    beginNavigation,
    finishNavigation,
  }), [beginNavigation, finishNavigation, transition]);

  return (
    <NavigationMotionContext.Provider value={value}>
      {children}
    </NavigationMotionContext.Provider>
  );
}

export function useNavigationMotion() {
  return useContext(NavigationMotionContext);
}
