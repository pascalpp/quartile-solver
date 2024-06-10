import { describe, it, expect } from 'vitest';
import { findCombinations } from './find-words';

describe('#findCombinations', () => {
  it("should find all combinations of ['a', 'b']", () => {
    const input = ['a', 'b'];
    const expected = ['a', 'b', 'ab', 'ba'].sort();
    const actual = findCombinations(input).sort();
    expect(actual).toEqual(expected);
  });

  it("should find all combinations of ['a', 'b', 'c']", () => {
    const input = ['a', 'b', 'c'];
    const expected = [
      'a',
      'ab',
      'ac',
      'abc',
      'acb',
      'b',
      'ba',
      'bc',
      'bac',
      'bca',
      'c',
      'ca',
      'cb',
      'cab',
      'cba'
    ].sort();
    const actual = findCombinations(input).sort();
    expect(actual).toEqual(expected);
  });
});
