export async function getNftMetadata(contractAddress, tokenId) {
  let nft;

  try {
    const params = new URLSearchParams({
      contractAddress,
      tokenId,
    });
    const response = await fetch(`/api/nft-metadata?${params.toString()}`);

    if (!response.ok) {
      throw new Error('NFT metadata could not be loaded.');
    }

    nft = await response.json();
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
