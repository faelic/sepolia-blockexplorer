import alchemy from './alchemyClient';

export async function getAccountDetails(address) {
  const balance = await alchemy.core.getBalance(address);
  const transactionCount = await alchemy.core.getTransactionCount(address);

  return {
    balance,
    transactionCount,
  };
}
