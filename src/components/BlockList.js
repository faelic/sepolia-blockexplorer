import BlockRow from './BlockRow';

function BlockList({ blocks }) {
  return (
    <section className="block-list">
      <div className="block-list__header">
        <p className="block-list__eyebrow">Recent Blocks</p>
        <h2>Latest activity on Sepolia</h2>
      </div>

      <div className="block-list__items">
        {blocks.map((block) => (
          <BlockRow key={block.number} block={block} />
        ))}
      </div>
    </section>
  );
}

export default BlockList;
