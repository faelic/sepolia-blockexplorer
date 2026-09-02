const ALCHEMY_SEPOLIA_URL = 'https://eth-sepolia.g.alchemy.com/v2';

function getRpcUrl() {
  if (process.env.ALCHEMY_RPC_URL) return process.env.ALCHEMY_RPC_URL;
  if (process.env.ALCHEMY_API_KEY) {
    return `${ALCHEMY_SEPOLIA_URL}/${process.env.ALCHEMY_API_KEY}`;
  }
  return '';
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const rpcUrl = getRpcUrl();

  if (!rpcUrl) {
    res.status(500).json({ error: 'Sepolia RPC is not configured.' });
    return;
  }

  try {
    const upstreamResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(req.body || {}),
    });
    const payload = await upstreamResponse.text();

    res.status(upstreamResponse.status);
    res.setHeader(
      'content-type',
      upstreamResponse.headers.get('content-type') || 'application/json',
    );
    res.send(payload);
  } catch {
    res.status(502).json({ error: 'Sepolia RPC is temporarily unavailable.' });
  }
};
