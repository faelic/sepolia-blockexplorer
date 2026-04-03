import alchemy from './alchemyClient';

export async function getRecentBlocks(count = 6) {
  const latestBlockNumber = await alchemy.core.getBlockNumber();

  const blockNumbers = Array.from({ length: count }, (_, index) => {
    return latestBlockNumber - index;
  }).filter((blockNumber) => blockNumber >= 0);

  const blocks = await Promise.all(
    blockNumbers.map((blockNumber) => alchemy.core.getBlock(blockNumber))
  );

  return {
    latestBlockNumber,
    blocks,
  };
}
export async function getBlockDetails(blockId) {
  const parsedBlockId = Number(blockId);

  if (!Number.isInteger(parsedBlockId) || parsedBlockId < 0) {
    throw new Error('Invalid block number.');
  }

  const block = await alchemy.core.getBlockWithTransactions(parsedBlockId);

  if (!block) {
    throw new Error('Block not found.');
  }

  return block;
}


