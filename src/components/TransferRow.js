import { Link } from 'react-router-dom';

import AnimatedAction from './AnimatedAction';
import { ArrowRightIcon } from './icons';
import truncateValue from '../utils/truncateHash';
import formatTimestamp from '../utils/FormatTimestamp';

function TransferRow({ transfer }) {
  return (
    <AnimatedAction
      as={Link}
      className="transfer-row"
      to={`/tx/${transfer.hash}`}
      icon={ArrowRightIcon}
      iconClassName="row-action-icon"
      iconPosition="end"
      iconSize={16}
    >
      <code>{truncateValue(transfer.hash, 12, 8)}</code>
      <code data-label="From">{transfer.from ? truncateValue(transfer.from) : 'Not available'}</code>
      <span data-label="Asset">{transfer.asset || 'Unknown asset'}</span>
      <span data-label="Value">{transfer.value ?? 'Not available'}</span>
      <span data-label="Age">{transfer.metadata?.blockTimestamp ? formatTimestamp(transfer.metadata.blockTimestamp) : 'Not available'}</span>
    </AnimatedAction>
  );
}

export default TransferRow;
