import { act, renderHook, waitFor } from '@testing-library/react';

import {
  getBlockSummaries,
  getLatestBlockNumber,
  getRecentBlocks,
} from '../services/blockService';
import useRecentBlocks, { mergeRecentBlocks } from './useRecentBlocks';

jest.mock('../services/blockService', () => ({
  getBlockSummaries: jest.fn(),
  getLatestBlockNumber: jest.fn(),
  getRecentBlocks: jest.fn(),
}));

function block(number) {
  return { number };
}

describe('mergeRecentBlocks', () => {
  test('keeps new blocks newest-first and removes repeated block numbers', () => {
    const current = [block(104), block(103), block(102), block(101)];
    const incoming = [block(106), block(105), block(104), block(104)];

    expect(mergeRecentBlocks(current, incoming).map(({ number }) => number)).toEqual([
      106,
      105,
      104,
      103,
      102,
      101,
    ]);
  });

  test('does not fabricate positions when a repeated poll returns no new block', () => {
    const current = [block(106), block(105), block(104)];

    expect(mergeRecentBlocks(current, [block(106)])).toEqual(current);
  });

  test('honors a smaller display limit', () => {
    expect(
      mergeRecentBlocks([block(3), block(2)], [block(5), block(4)], 3)
        .map(({ number }) => number),
    ).toEqual([5, 4, 3]);
  });
});

describe('useRecentBlocks', () => {
  beforeEach(() => {
    getBlockSummaries.mockReset();
    getLatestBlockNumber.mockReset();
    getRecentBlocks.mockReset();
  });

  test('keeps provider errors out of the user-facing feed message', async () => {
    getRecentBlocks.mockRejectedValue(
      new Error('missing response (requestBody="{\\"method\\":\\"eth_blockNumber\\"}")'),
    );

    const { result } = renderHook(() => useRecentBlocks());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(
      'Live Sepolia activity is temporarily paused. Check your connection, then retry the feed.',
    );
    expect(result.current.error).not.toMatch(/eth_blockNumber|requestBody|alchemy/i);
    expect(result.current.errorDetail).toMatch(/eth_blockNumber/);
  });

  test('retries the live feed after an initial network failure', async () => {
    getRecentBlocks
      .mockRejectedValueOnce(new Error('Network unavailable.'))
      .mockResolvedValueOnce({ latestBlockNumber: 12, blocks: [block(12)] });

    const { result } = renderHook(() => useRecentBlocks());

    await waitFor(() => expect(result.current.error).toMatch(/temporarily paused/i));

    act(() => result.current.retry());

    await waitFor(() => expect(result.current.blocks).toEqual([block(12)]));
    expect(result.current.error).toBe('');
    expect(getRecentBlocks).toHaveBeenCalledTimes(2);
  });
});
