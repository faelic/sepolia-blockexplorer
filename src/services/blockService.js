import alchemy from './alchemyClient';

export async function getLatestBlockNumber() {
  return alchemy.core.getBlockNumber();
}

export async function getBlockSummaries(blockNumbers) {
  return Promise.all(
    blockNumbers.map((blockNumber) => alchemy.core.getBlock(blockNumber)),
  );
}

export async function getRecentBlocks(count = 6) {
  const latestBlockNumber = await getLatestBlockNumber();

  const blockNumbers = Array.from({ length: count }, (_, index) => {
    return latestBlockNumber - index;
  }).filter((blockNumber) => blockNumber >= 0);

  const blocks = await getBlockSummaries(blockNumbers);

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
    const error = new Error('Block not found.');
    error.code = 'NOT_FOUND';
    throw error;
  }

  return block;
}
