import NumberFlow from '@number-flow/react';
import { useEffect, useRef } from 'react';

import { numberFlowTiming } from '../motion/motionSystem';

const INTEGER_FORMAT = {
  maximumFractionDigits: 0,
};

function LiveNumber({
  value,
  className = '',
  format = INTEGER_FORMAT,
  prefix,
  suffix,
}) {
  const hasRenderedRef = useRef(false);
  const isNumber = Number.isFinite(value);

  useEffect(() => {
    if (isNumber) hasRenderedRef.current = true;
  }, [isNumber, value]);

  if (!isNumber) return value;

  return (
    <NumberFlow
      className={className}
      value={value}
      locales="en-US"
      format={format}
      prefix={prefix}
      suffix={suffix}
      animated={hasRenderedRef.current}
      respectMotionPreference
      transformTiming={numberFlowTiming}
      spinTiming={numberFlowTiming}
      opacityTiming={numberFlowTiming}
    />
  );
}

export default LiveNumber;
