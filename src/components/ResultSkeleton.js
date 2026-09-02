function ResultSkeleton({ label = 'Loading result details', lead = false, rows = 4 }) {
  return (
    <div className="result-skeleton" role="status" aria-label={label}>
      {lead ? <span className="result-skeleton__lead" aria-hidden="true" /> : null}
      <span className="result-skeleton__metrics" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => <i key={index} />)}
      </span>
      <span className="result-skeleton__details" aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => <i key={index} />)}
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default ResultSkeleton;

