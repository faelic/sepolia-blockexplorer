import { useEffect, useState } from 'react';

import AnimatedAction from './AnimatedAction';
import ActionSwap from './ActionSwap';
import Tooltip from './Tooltip';
import { useToast } from './ToastProvider';
import { CopyIcon } from './icons';

function CopyableValue({ value, label = 'value', compact = false }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

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
      showToast({
        status: 'danger',
        title: 'Copy failed',
        description: 'Your browser could not copy this value. Select it and copy manually.',
      });
    }
  }

  const copyButton = (
    <AnimatedAction
      type="button"
      icon={CopyIcon}
      iconSize={14}
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
    >
      <ActionSwap value={copied ? 'Copied' : 'Copy'} />
    </AnimatedAction>
  );

  return (
    <span className={`copyable-value${compact ? ' copyable-value--compact' : ''}`}>
      <code title={String(value)}>{value}</code>
      {compact ? <Tooltip content={`Copy ${label}`}>{copyButton}</Tooltip> : copyButton}
    </span>
  );
}

export default CopyableValue;
