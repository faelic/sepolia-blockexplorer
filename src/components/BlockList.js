import { useEffect, useRef } from 'react';
import { LayoutGroup } from 'motion/react';

import BlockRow from './BlockRow';

function BlockList({ blocks }) {
  const previousLatestRef = useRef(blocks[0]?.number ?? null);
  const incomingBlock = previousLatestRef.current !== null
    && blocks[0]?.number !== previousLatestRef.current
    ? blocks[0]?.number
    : null;

  useEffect(() => {
    previousLatestRef.current = blocks[0]?.number ?? null;
  }, [blocks]);

  return (
    <section className="block-list">
      <header className="data-section-heading">
        <div>
          <h2>Recent blocks</h2>
          <p>Newest first · updates while this page is visible</p>
        </div>
        <span>{blocks.length} observed</span>
      </header>

      <LayoutGroup id="live-blocks">
        <div className="data-list block-list__items">
          <div className="data-list__columns data-list__columns--blocks" aria-hidden="true">
            <span>Block</span><span>Transactions</span><span>Miner</span><span>Age</span><span />
          </div>
          {blocks.map((block, index) => (
            <BlockRow
              key={block.number}
              block={block}
              incoming={block.number === incomingBlock}
              index={index}
            />
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}

export default BlockList;
