const BLOCK_NUMBER_PATTERN = /^\d+$/;
const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;
const TRANSACTION_HASH_PATTERN = /^0x[a-fA-F0-9]{64}$/;

export function classifyExplorerQuery(value) {
  const query = String(value ?? '').trim();

  if (
    BLOCK_NUMBER_PATTERN.test(query)
    && Number.isSafeInteger(Number(query))
  ) {
    return { type: 'block', query };
  }

  if (TRANSACTION_HASH_PATTERN.test(query)) {
    return { type: 'transaction', query };
  }

  if (ADDRESS_PATTERN.test(query)) {
    return { type: 'address', query };
  }

  return { type: 'invalid', query };
}

export function getExplorerSearchDestination(value) {
  const result = classifyExplorerQuery(value);

  if (result.type === 'block') return `/blocks/${result.query}`;
  if (result.type === 'transaction') return `/tx/${result.query}`;
  if (result.type === 'address') return `/accounts/${result.query}`;
  return null;
}

export function getExplorerQueryFromPathname(pathname) {
  const match = pathname.match(/^\/(?:blocks|tx|accounts)\/([^/]+)$/);
  if (!match) return '';

  try {
    return decodeURIComponent(match[1]);
  } catch (error) {
    return match[1];
  }
}

export function isExplorerAddress(value) {
  return classifyExplorerQuery(value).type === 'address';
}
