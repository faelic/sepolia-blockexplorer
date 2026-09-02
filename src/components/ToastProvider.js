import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { motionSystem } from '../motion/motionSystem';
import StatusBadge from './StatusBadge';

const ToastContext = createContext(null);
let toastSeed = 0;

function ToastItem({ toast, onDismiss }) {
  const reducedMotion = useReducedMotion();
  const timerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const startTimer = useCallback(() => {
    window.clearTimeout(timerRef.current);
    if (paused || !toast.duration || toast.duration <= 0) return;
    timerRef.current = window.setTimeout(() => onDismiss(toast.id), toast.duration);
  }, [onDismiss, paused, toast.duration, toast.id]);

  useEffect(() => {
    startTimer();
    return () => window.clearTimeout(timerRef.current);
  }, [startTimer]);

  function resumeIfFocusLeft(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  }

  return (
    <motion.li
      layout
      className="toast-stack__item"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 18, scale: 0.98 }}
      transition={reducedMotion
        ? { duration: motionSystem.duration.feedback }
        : motionSystem.spring.panel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={resumeIfFocusLeft}
    >
      <div className="toast-stack__surface">
        <StatusBadge status={toast.status || 'neutral'} pulse={toast.status === 'loading'}>
          {toast.title}
        </StatusBadge>
        {toast.description ? <p>{toast.description}</p> : null}
        <div className="toast-stack__actions">
          {toast.action ? (
            <button type="button" onClick={() => toast.action.onClick(toast.id)}>
              {toast.action.label}
            </button>
          ) : null}
          <button type="button" onClick={() => onDismiss(toast.id)}>Dismiss</button>
        </div>
      </div>
    </motion.li>
  );
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((input) => {
    const toast = {
      duration: 4200,
      status: 'neutral',
      ...input,
      id: input.id || `toast-${Date.now()}-${toastSeed += 1}`,
    };
    setToasts((current) => [...current, toast].slice(-3));
    return toast.id;
  }, []);

  const updateToast = useCallback((id, patch) => {
    setToasts((current) => current.map((toast) => (
      toast.id === id ? { ...toast, ...patch, id } : toast
    )));
  }, []);

  const value = useMemo(() => ({
    showToast,
    updateToast,
    dismissToast,
  }), [dismissToast, showToast, updateToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' ? createPortal(
        <ol className="toast-stack" aria-live="polite" aria-atomic="false">
          <AnimatePresence>
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
            ))}
          </AnimatePresence>
        </ol>,
        document.body,
      ) : null}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider.');
  return context;
}

export { ToastProvider, useToast };
