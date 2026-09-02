import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

import AnimatedAction from './AnimatedAction';
import { ArrowRightIcon } from './icons';
import { motionSystem } from '../motion/motionSystem';
import formatTimestamp from '../utils/FormatTimestamp';
import truncateValue from '../utils/truncateHash';

const MotionAnimatedAction = motion.create(AnimatedAction);

function BlockRow({ block, incoming = false }) {
  return (
    <MotionAnimatedAction
      as={Link}
      className="block-row"
      to={`/blocks/${block.number}`}
      icon={ArrowRightIcon}
      iconClassName="row-action-icon"
      iconPosition="end"
      iconSize={16}
      layout="position"
      initial={incoming ? { opacity: 0, y: -18, scale: 0.985 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: motionSystem.duration.data,
        ease: motionSystem.ease.primary,
        layout: {
          duration: motionSystem.duration.data,
          ease: motionSystem.ease.primary,
        },
      }}
    >
      <strong>{block.number}</strong>
      <span data-label="Transactions">{block.transactions.length}</span>
      <code data-label="Miner">{truncateValue(block.miner)}</code>
      <span data-label="Age">{formatTimestamp(block.timestamp)}</span>
    </MotionAnimatedAction>
  );
}

export default BlockRow;
