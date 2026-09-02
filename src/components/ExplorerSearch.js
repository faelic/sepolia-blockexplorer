import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  classifyExplorerQuery,
  getExplorerQueryFromPathname,
  getExplorerSearchDestination,
} from '../lib/explorerSearch';
import { useNavigationMotion } from '../motion/NavigationMotionContext';
import { motionSystem } from '../motion/motionSystem';
import AnimatedAction from './AnimatedAction';
import { ArrowRightIcon, SearchIcon } from './icons';

const DESTINATION_LABELS = {
  address: 'Address',
  block: 'Block',
  transaction: 'Transaction',
};

function ExplorerSearch({
  id,
  variant = 'hero',
  onNavigate,
  placeholder = 'Block, transaction, or wallet',
  helper = 'Try a block number, 0x wallet, or 0x transaction hash.',
  initialQuery = '',
  inputIcon,
  buttonIcon = SearchIcon,
  buttonIconPosition = 'start',
  submitPresentation = 'text',
  showDestinationPreview = false,
  autoFocus = false,
  deriveQueryFromLocation = true,
}) {
  const history = useHistory();
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const { beginNavigation } = useNavigationMotion();
  const controlsRef = useRef(null);
  const pendingTimerRef = useRef(null);
  const navigationTimerRef = useRef(null);
  const [query, setQuery] = useState(
    () => initialQuery
      || (deriveQueryFromLocation
        ? location.state?.explorerQuery
          || getExplorerQueryFromPathname(location.pathname)
        : ''),
  );
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const previewId = `${id}-preview`;
  const InputIcon = inputIcon;
  const queryResult = classifyExplorerQuery(query);
  const hasQuery = Boolean(query.trim());
  const hasDestination = queryResult.type !== 'invalid';
  const resultDriven = submitPresentation === 'result';
  const iconOnly = submitPresentation === 'icon-only';
  const shouldShowPreview = showDestinationPreview || resultDriven;

  useEffect(() => {
    window.clearTimeout(pendingTimerRef.current);
    window.clearTimeout(navigationTimerRef.current);
    setPending(false);
    setShowPending(false);

    const routeQuery = initialQuery
      || (deriveQueryFromLocation
        ? location.state?.explorerQuery
          || getExplorerQueryFromPathname(location.pathname)
        : '');

    if (routeQuery || !deriveQueryFromLocation || location.pathname === '/') {
      setQuery(routeQuery);
    }

    return () => {
      window.clearTimeout(pendingTimerRef.current);
      window.clearTimeout(navigationTimerRef.current);
    };
  }, [deriveQueryFromLocation, initialQuery, location.key, location.pathname, location.state]);

  function handleSubmit(event) {
    event.preventDefault();
    const result = classifyExplorerQuery(query);

    if (result.type === 'invalid') {
      setError('Enter a block number, transaction hash, or Ethereum address.');
      return;
    }

    const destination = getExplorerSearchDestination(result.query);
    const sourceRect = controlsRef.current?.getBoundingClientRect();
    const shouldAnimate = !reducedMotion
      && sourceRect?.width > 0
      && sourceRect?.height > 0;
    setError('');
    setPending(true);
    if (shouldAnimate) {
      beginNavigation({
        query: result.query,
        type: result.type,
        sourceRect,
      });
    }
    pendingTimerRef.current = window.setTimeout(
      () => setShowPending(true),
      motionSystem.pendingDelay,
    );

    function commitNavigation() {
      history.replace({
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        state: {
          ...location.state,
          ...(location.pathname === '/' ? { explorerQuery: result.query } : {}),
          explorerScrollPosition: {
            left: window.scrollX,
            top: window.scrollY,
          },
        },
      });

      history.push(destination, {
        explorerQuery: result.query,
        explorerSearchType: result.type,
        source: 'explorer-search',
      });
      onNavigate?.();
    }

    if (shouldAnimate) {
      navigationTimerRef.current = window.setTimeout(
        commitNavigation,
        motionSystem.navigationLead,
      );
    } else {
      commitNavigation();
    }
  }

  return (
    <form
      className={`explorer-search explorer-search--${variant}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="sr-only" htmlFor={id}>
        Search the Sepolia explorer
      </label>
      <div
        className={`explorer-search__controls${InputIcon ? ' has-input-icon' : ''}${error ? ' is-invalid' : ''}`}
        ref={controlsRef}
      >
        {InputIcon ? (
          <span className="explorer-search__input-icon" aria-hidden="true">
            <InputIcon size={20} />
          </span>
        ) : null}
        <input
          id={id}
          className="explorer-search__input"
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
          placeholder={placeholder}
          value={query}
          autoFocus={autoFocus}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error
            ? errorId
            : shouldShowPreview && hasQuery
              ? previewId
              : variant === 'hero'
                ? helperId
                : undefined}
          disabled={pending}
          onChange={(event) => {
            setQuery(event.target.value);
            if (error) setError('');
          }}
        />
        {!resultDriven ? (
          <AnimatedAction
            className={`explorer-search__button${iconOnly ? ' explorer-search__button--icon' : ''}`}
            type="submit"
            icon={buttonIcon}
            iconPosition={buttonIconPosition}
            iconSize={iconOnly ? 20 : 16}
            aria-label={iconOnly ? 'Search' : undefined}
            aria-busy={pending || undefined}
            disabled={pending}
          >
            {iconOnly ? <span className="sr-only">Search</span> : <span>Search</span>}
            {showPending ? <span className="explorer-search__pending" aria-hidden="true" /> : null}
          </AnimatedAction>
        ) : null}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {shouldShowPreview && hasQuery ? (
          <motion.div
            className="explorer-search__preview"
            id={previewId}
            key={hasDestination ? 'destination' : 'no-match'}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{
              duration: motionSystem.duration.control,
              ease: motionSystem.ease.primary,
            }}
          >
            {hasDestination ? (
              <AnimatedAction
                className="explorer-search__destination"
                type="submit"
                icon={ArrowRightIcon}
                iconPosition="end"
                iconSize={18}
                aria-label={`Open ${DESTINATION_LABELS[queryResult.type]} ${queryResult.query}`}
                aria-busy={pending || undefined}
                disabled={pending}
              >
                <span className="explorer-search__destination-copy">
                  <span>{DESTINATION_LABELS[queryResult.type]}</span>
                  <code title={queryResult.query}>{queryResult.query}</code>
                </span>
                {showPending ? <span className="explorer-search__pending" aria-hidden="true" /> : null}
              </AnimatedAction>
            ) : (
              <p className="explorer-search__no-match" role="status">
                No matching block, transaction, or address.
              </p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {variant === 'hero' && helper && !error ? (
        <p className="explorer-search__helper" id={helperId}>
          {helper}
        </p>
      ) : null}

      {error ? (
        <motion.p
          className="explorer-search__error"
          id={errorId}
          role="alert"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionSystem.duration.control,
            ease: motionSystem.ease.primary,
          }}
        >
          {error}
        </motion.p>
      ) : null}
    </form>
  );
}

export { getExplorerSearchDestination as getSearchDestination };
export default ExplorerSearch;
