import { Link } from 'react-router-dom';

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="BlockScan home, Sepolia testnet">
      <img
        className="brand__mark"
        src="/blockscan-aperture.svg"
        alt=""
        width="40"
        height="40"
        aria-hidden="true"
      />
      <span className="brand__network" aria-hidden="true">
        <span>BlockScan</span>
        <small>Sepolia explorer</small>
      </span>
    </Link>
  );
}

export default Brand;
