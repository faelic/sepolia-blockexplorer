import alchemy from './alchemyClient';

export async function getNftMetadata(contractAddress, tokenId) {
  let nft;

  try {
    nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
  } catch (error) {
    throw new Error('NFT metadata could not be loaded. Confirm the contract and token ID, then try again.');
  }

  if (!nft) {
    throw new Error('NFT not found.');
  }

  return {
    ...nft,
    media: Array.isArray(nft.media) ? nft.media : [],
    contract: {
      ...(nft.contract || {}),
      address: nft.contract?.address || contractAddress,
      openSea: nft.contract?.openSea || {},
    },
  };
}
