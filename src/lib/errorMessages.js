export const NETWORK_ERROR_MESSAGE =
  'BlockScan could not reach Sepolia right now. Check your connection, then try again.';

export const NETWORK_ACTIVITY_ERROR_MESSAGE =
  'Live Sepolia activity is temporarily paused. Check your connection, then retry the feed.';

export const NFT_ERROR_MESSAGE =
  'BlockScan could not load this token metadata. Check your connection or try the lookup again.';

export const TRANSFERS_ERROR_MESSAGE =
  'The address summary loaded, but incoming transfers are temporarily unavailable.';

export function getErrorDetail(error) {
  if (!error) return '';
  if (error instanceof Error) return error.message;
  return String(error);
}
