import truncateValue from '../utils/truncateHash';
import CopyableValue from './CopyableValue';

function NftMetadataCard({ nft }) {
  const imageUrl =
    nft.media?.[0]?.gateway || nft.media?.[0]?.thumbnail || nft.raw?.metadata?.image || '';
  const contractAddress = nft.contract?.address || 'Not available';

  return (
    <section className="nft-metadata-card">
      <div className={`nft-metadata-card__image-wrap${imageUrl ? '' : ' is-empty'}`}>
        {imageUrl ? (
          <img
            className="nft-metadata-card__image"
            src={imageUrl}
            alt={nft.title || 'NFT preview'}
          />
        ) : <span>No media preview</span>}
      </div>

      <div className="nft-metadata-card__content">
        <div className="nft-metadata-card__header">
          <span>NFT metadata</span>
          <h2>{nft.title || 'Untitled NFT'}</h2>
          <p>{nft.description || 'No description is available for this token.'}</p>
        </div>

        <dl className="nft-metadata-list">
          <div><dt>Contract</dt><dd title={contractAddress}>{truncateValue(contractAddress)}</dd></div>
          <div><dt>Token ID</dt><dd>{nft.tokenId ?? 'Not available'}</dd></div>
          <div><dt>Token type</dt><dd>{nft.tokenType || 'Not available'}</dd></div>
          <div><dt>Collection</dt><dd>{nft.contract?.openSea?.collectionName || 'Not available'}</dd></div>
        </dl>
        {contractAddress !== 'Not available' ? (
          <CopyableValue value={contractAddress} label="contract address" compact />
        ) : null}
      </div>
    </section>
  );
}

export default NftMetadataCard;
