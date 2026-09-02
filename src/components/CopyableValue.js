import { useEffect, useState } from 'react';

import AnimatedAction from './AnimatedAction';
import { CopyIcon } from './icons';

function CopyableValue({ value, label = 'value', compact = false }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
    } catch (error) {
      setCopied(false);
    }
  }

  return (
    <span className={`copyable-value${compact ? ' copyable-value--compact' : ''}`}>
      <code title={String(value)}>{value}</code>
      <AnimatedAction
        type="button"
        icon={CopyIcon}
        iconSize={14}
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
      >
        {copied ? 'Copied' : 'Copy'}
      </AnimatedAction>
    </span>
  );
}

export default CopyableValue;
