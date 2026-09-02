import { Link } from 'react-router-dom';

import AnimatedAction from './AnimatedAction';
import { ArrowRightIcon } from './icons';

function StatePanel({ title, message, tone = 'neutral', action }) {
  const actionContent = action?.to ? (
    <AnimatedAction
      as={Link}
      className="state-panel__action"
      to={action.to}
      icon={ArrowRightIcon}
      iconPosition="end"
      iconSize={15}
    >
      {action.label}
    </AnimatedAction>
  ) : action ? (
    <AnimatedAction
      className="state-panel__action"
      type="button"
      icon={ArrowRightIcon}
      iconPosition="end"
      iconSize={15}
      onClick={action.onClick}
    >
      {action.label}
    </AnimatedAction>
  ) : null;

  return (
    <section className={`state-panel state-panel--${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
      {actionContent}
    </section>
  );
}

export default StatePanel;
