import truncateValue from '../utils/truncateHash';

function NftMetadataCard({ nft }) {
  const imageUrl =
    nft.media && nft.media[0] ? nft.media[0].gateway : '';

  return (
    <section className="nft-metadata-card">
      <div className="nft-metadata-card__header">
        <p className="nft-metadata-card__eyebrow">NFT Metadata</p>
        <h2>{nft.title || 'Untitled NFT'}</h2>
        <p>{nft.description || 'No description available.'}</p>
      </div>

      {imageUrl ? (
        <div className="nft-metadata-card__image-wrap">
          <img
            className="nft-metadata-card__image"
            src={imageUrl}
            alt={nft.title || 'NFT preview'}
          />
        </div>
      ) : null}

      <div className="transaction-details">
        <article className="detail-card">
          <p className="detail-card__label">Contract Address</p>
          <h3 className="detail-card__value">{nft.contract.address}</h3>
          <p className="detail-card__hint">{truncateValue(nft.contract.address)}</p>
        </article>

        <article className="detail-card">
          <p className="detail-card__label">Token ID</p>
          <h3 className="detail-card__value">{nft.tokenId}</h3>
        </article>

        <article className="detail-card">
          <p className="detail-card__label">Token Type</p>
          <h3 className="detail-card__value">{nft.tokenType || 'Not available'}</h3>
        </article>

        <article className="detail-card">
          <p className="detail-card__label">Collection</p>
          <h3 className="detail-card__value">
            {nft.contract.openSea?.collectionName || 'Not available'}
          </h3>
        </article>
      </div>
    </section>
  );
}

export default NftMetadataCard;
