import { Link } from 'react-router-dom';

import AnimatedAction from './AnimatedAction';
import { ArrowRightIcon } from './icons';

function StatePanel({ title, message, tone = 'neutral', action, detail }) {
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
      <span className="state-panel__mark" aria-hidden="true">
        <span />
      </span>
      <div className="state-panel__content">
        <h2>{title}</h2>
        <p>{message}</p>
        {detail ? (
          <details className="state-panel__detail">
            <summary>Technical details</summary>
            <code>{detail}</code>
          </details>
        ) : null}
      </div>
      {actionContent}
    </section>
  );
}

export default StatePanel;
