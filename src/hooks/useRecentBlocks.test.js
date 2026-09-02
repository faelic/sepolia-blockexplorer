import { mergeRecentBlocks } from './useRecentBlocks';

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
