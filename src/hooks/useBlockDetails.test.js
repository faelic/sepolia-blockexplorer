import { act, renderHook, waitFor } from '@testing-library/react';

import { getBlockDetails } from '../services/blockService';
import useBlockDetails from './useBlockDetails';

jest.mock('../services/blockService', () => ({
  getBlockDetails: jest.fn(),
}));

describe('useBlockDetails', () => {
  beforeEach(() => {
    getBlockDetails.mockReset();
  });

  test('distinguishes a not-found result from a network failure', async () => {
    const error = new Error('Block not found.');
    error.code = 'NOT_FOUND';
    getBlockDetails.mockRejectedValue(error);

    const { result } = renderHook(() => useBlockDetails('999999999'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.errorType).toBe('not-found');
  });

  test('retries the current result without navigating', async () => {
    const block = { number: 25870000, transactions: [] };
    getBlockDetails
      .mockRejectedValueOnce(new Error('Connection failed.'))
      .mockResolvedValueOnce(block);

    const { result } = renderHook(() => useBlockDetails('25870000'));

    await waitFor(() => expect(result.current.errorType).toBe('network'));

    act(() => result.current.retry());

    await waitFor(() => expect(result.current.block).toBe(block));
    expect(getBlockDetails).toHaveBeenCalledTimes(2);
  });

  test('does not let an older response replace a newer search', async () => {
    let resolveFirst;
    let resolveSecond;
    const firstRequest = new Promise((resolve) => { resolveFirst = resolve; });
    const secondRequest = new Promise((resolve) => { resolveSecond = resolve; });
    getBlockDetails
      .mockReturnValueOnce(firstRequest)
      .mockReturnValueOnce(secondRequest);

    const { result, rerender } = renderHook(
      ({ blockId }) => useBlockDetails(blockId),
      { initialProps: { blockId: '25870000' } },
    );

    rerender({ blockId: '25870001' });

    await act(async () => {
      resolveSecond({ number: 25870001, transactions: [] });
      await secondRequest;
    });
    await waitFor(() => expect(result.current.block?.number).toBe(25870001));

    await act(async () => {
      resolveFirst({ number: 25870000, transactions: [] });
      await firstRequest;
    });

    expect(result.current.block?.number).toBe(25870001);
  });
});
