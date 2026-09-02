const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com';

function getNftBaseUrl() {
  if (process.env.ALCHEMY_NFT_URL) return process.env.ALCHEMY_NFT_URL;
  if (process.env.ALCHEMY_API_KEY) {
    return `${ALCHEMY_SEPOLIA_URL}/nft/v3/${process.env.ALCHEMY_API_KEY}`;
  }
  return '';
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const baseUrl = getNftBaseUrl();
  const { contractAddress, tokenId } = req.query || {};

  if (!baseUrl) {
    res.status(500).json({ error: 'Sepolia NFT API is not configured.' });
    return;
  }

  if (!contractAddress || !tokenId) {
    res.status(400).json({ error: 'Contract address and token ID are required.' });
    return;
  }

  const upstreamUrl = new URL(`${baseUrl}/getNFTMetadata`);
  upstreamUrl.searchParams.set('contractAddress', contractAddress);
  upstreamUrl.searchParams.set('tokenId', tokenId);

  try {
    const upstreamResponse = await fetch(upstreamUrl);
    const payload = await upstreamResponse.text();

    res.status(upstreamResponse.status);
    res.setHeader(
      'content-type',
      upstreamResponse.headers.get('content-type') || 'application/json',
    );
    res.send(payload);
  } catch {
    res.status(502).json({ error: 'Sepolia NFT metadata is temporarily unavailable.' });
  }
};
