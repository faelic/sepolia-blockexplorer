import { AssetTransfersCategory } from 'alchemy-sdk';

import alchemy from './alchemyClient';

export async function getAddressTransfers(address) {
  const response = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    toAddress: address,
    category: [
      AssetTransfersCategory.EXTERNAL,
      AssetTransfersCategory.ERC20,
      AssetTransfersCategory.ERC721,
      AssetTransfersCategory.ERC1155,
    ],
    withMetadata: true,
    excludeZeroValue: true,
    maxCount: '0x14',
  });

  return response.transfers;
}
