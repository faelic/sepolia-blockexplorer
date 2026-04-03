import alchemy from './alchemyClient';

export async function getNftMetadata(contractAddress, tokenId) {
  const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId);

  if (!nft) {
    throw new Error('NFT not found.');
  }

  return nft;
}
