import StatePanel from './StatePanel';

function requestSearchFocus() {
  window.dispatchEvent(new CustomEvent('blockscan:focus-explorer-search'));
}

function ResultState({ kind, type, onRetry, detail }) {
  const typeName = type.toLowerCase();

  if (kind === 'not-found') {
    return (
      <StatePanel
        title={`${type} not found`}
        message={`This ${typeName} was not found on Sepolia. Check the identifier or search for another result.`}
        tone="error"
        action={{ label: 'Search again', onClick: requestSearchFocus }}
      />
    );
  }

  return (
    <StatePanel
      title={`Unable to load this ${typeName}`}
      message="Your search is preserved. Check the connection and retry the current result."
      tone="error"
      action={{ label: 'Retry', onClick: onRetry }}
      detail={detail}
    />
  );
}

export default ResultState;
