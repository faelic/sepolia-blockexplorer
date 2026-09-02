import LiveNumber from './LiveNumber';

function MetricStrip({ items, label = 'Key metrics' }) {
  return (
    <dl className="metric-strip" aria-label={label}>
      {items.map((item) => (
        <div className="metric-strip__item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>
            {typeof item.value === 'number' && item.animate !== false
              ? <LiveNumber value={item.value} format={item.format} />
              : item.value}
          </dd>
          {item.note ? <dd className="metric-strip__note">{item.note}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

export default MetricStrip;
