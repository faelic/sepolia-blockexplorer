const FEATURED_TOKENS = [
  { asset: 'usdt.svg', label: 'USDT' },
  { asset: 'bnb.svg', label: 'BNB' },
  { asset: 'usdc.svg', label: 'USDC' },
  { asset: 'link.svg', label: 'LINK' },
  { asset: 'shib.svg', label: 'SHIB' },
  { asset: 'weth.svg', label: 'WETH' },
  { asset: 'steth.svg', label: 'stETH' },
];

function TokenGroup({ duplicate = false }) {
  return (
    <ul
      className="token-marquee__group"
      aria-hidden={duplicate ? 'true' : undefined}
      aria-label={duplicate ? undefined : 'Featured tokens'}
      tabIndex={duplicate ? undefined : 0}
    >
      {FEATURED_TOKENS.map(({ asset, label }) => (
        <li className="token-marquee__item" key={`${duplicate ? 'duplicate' : 'primary'}-${label}`}>
          <img
            className="token-marquee__logo"
            src={`/token-icons/${asset}`}
            alt=""
            decoding="async"
          />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

function CryptoTokenMarquee() {
  return (
    <div className="token-marquee">
      <div className="token-marquee__track">
        <TokenGroup />
        <TokenGroup duplicate />
      </div>
    </div>
  );
}

export default CryptoTokenMarquee;
