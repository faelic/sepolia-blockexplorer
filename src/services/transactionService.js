import alchemy from './alchemyClient';

export async function getTransactionDetails(txHash){

    const transaction = await alchemy.core.getTransaction(txHash);

    if(!transaction){
        throw new Error('Transaction not found.');
    }

    const receipt = await alchemy.core.getTransactionReceipt(txHash);

    return {
        transaction,
        receipt,
    };
}