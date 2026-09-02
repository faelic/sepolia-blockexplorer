const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const clientPort = Number(process.env.CLIENT_PORT || 3001);
const serverPort = Number(process.env.PORT || 3000);

function loadEnvFile() {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');

      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        resolve(body);
      }
    });
    req.on('error', reject);
  });
}

function createApiResponse(res) {
  return {
    setHeader: (...args) => res.setHeader(...args),
    status(code) {
      res.statusCode = code;
      return this;
    },
    json(payload) {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(payload));
    },
    send(payload) {
      res.end(payload);
    },
  };
}

async function handleApi(req, res) {
  const requestUrl = new URL(req.url, `http://localhost:${serverPort}`);
  const apiReq = req;
  apiReq.query = Object.fromEntries(requestUrl.searchParams.entries());
  apiReq.body = await collectBody(req);

  if (requestUrl.pathname === '/api/sepolia-rpc') {
    const handler = require('../api/sepolia-rpc');
    await handler(apiReq, createApiResponse(res));
    return;
  }

  if (requestUrl.pathname === '/api/nft-metadata') {
    const handler = require('../api/nft-metadata');
    await handler(apiReq, createApiResponse(res));
    return;
  }

  res.statusCode = 404;
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ error: 'API route not found.' }));
}

function proxyToClient(req, res) {
  const proxyReq = http.request(
    {
      hostname: '127.0.0.1',
      port: clientPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res);
    },
  );

  proxyReq.on('error', () => {
    res.statusCode = 502;
    res.setHeader('content-type', 'text/plain');
    res.end('The React dev server is still starting. Refresh in a moment.');
  });

  req.pipe(proxyReq);
}

loadEnvFile();

const client = spawn(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'start:client'],
  {
    cwd: rootDir,
    env: {
      ...process.env,
      BROWSER: 'none',
      PORT: String(clientPort),
    },
    stdio: 'inherit',
  },
);

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    handleApi(req, res).catch(() => {
      res.statusCode = 500;
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ error: 'Local API route failed.' }));
    });
    return;
  }

  proxyToClient(req, res);
});

server.listen(serverPort, () => {
  console.log(`BlockScan local app: http://localhost:${serverPort}`);
  console.log(`React dev server: http://localhost:${clientPort}`);
});

function shutdown() {
  server.close();
  client.kill();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
