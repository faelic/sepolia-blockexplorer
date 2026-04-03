import truncateValue from '../utils/truncateHash';
import formatTimestamp from '../utils/FormatTimestamp';

function TransferRow({ transfer }) {
  return (
    <article className="transfer-row">
      <div className="transfer-row__main">
        <p className="transfer-row__label">Transaction Hash</p>
        <h3 className="transfer-row__value">{truncateValue(transfer.hash, 12, 8)}</h3>
      </div>

      <div className="transfer-row__meta">
        <p>From: {transfer.from ? truncateValue(transfer.from) : 'Not available'}</p>
        <p>To: {transfer.to ? truncateValue(transfer.to) : 'Not available'}</p>
        <p>Asset: {transfer.asset || 'Unknown asset'}</p>
        <p>Value: {transfer.value ?? 'Not available'}</p>
        <p>
          Timestamp:{' '}
          {transfer.metadata?.blockTimestamp
            ? formatTimestamp(transfer.metadata.blockTimestamp)
            : 'Not available'}
        </p>
      </div>
    </article>
  );
}

export default TransferRow;
