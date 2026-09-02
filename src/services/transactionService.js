import alchemy from './alchemyClient';

export async function getTransactionDetails(txHash){

    const transaction = await alchemy.core.getTransaction(txHash);

    if(!transaction){
        const error = new Error('Transaction not found.');
        error.code = 'NOT_FOUND';
        throw error;
    }

    const receipt = await alchemy.core.getTransactionReceipt(txHash);

    return {
        transaction,
        receipt,
    };
}
