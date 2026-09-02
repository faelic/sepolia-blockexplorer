function LoadingState({ rows = 4, label = 'Loading content' }) {
  return (
    <div className="loading-state" role="status" aria-label={label}>
      {Array.from({ length: rows }, (_, index) => (
        <span className="loading-state__row" key={index} aria-hidden="true" />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default LoadingState;
