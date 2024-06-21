import { describe, it, expect } from 'vitest';
import { findCombinations } from './findCombinations';

describe('#findCombinations', () => {
  it("should find all combinations of ['a', 'b']", () => {
    const input = ['a', 'b'];
    const expected = ['a', 'b', 'ab', 'ba'].sort();
    const actual = findCombinations(input).sort();
    console.log(actual.length);
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
    console.log(actual.length);
    expect(actual).toEqual(expected);
  });

  it("should find all combinations of ['a', 'b', 'c', 'd']", () => {
    const input = ['a', 'b', 'c', 'd'];
    const expected = [
      'a',
      'ab',
      'abc',
      'abcd',
      'abd',
      'abdc',
      'ac',
      'acb',
      'acbd',
      'acd',
      'acdb',
      'ad',
      'adb',
      'adbc',
      'adc',
      'adcb',
      'b',
      'ba',
      'bac',
      'bacd',
      'bad',
      'badc',
      'bc',
      'bca',
      'bcad',
      'bcd',
      'bcda',
      'bd',
      'bda',
      'bdac',
      'bdc',
      'bdca',
      'c',
      'ca',
      'cab',
      'cabd',
      'cad',
      'cadb',
      'cb',
      'cba',
      'cbad',
      'cbd',
      'cbda',
      'cd',
      'cda',
      'cdab',
      'cdb',
      'cdba',
      'd',
      'da',
      'dab',
      'dabc',
      'dac',
      'dacb',
      'db',
      'dba',
      'dbac',
      'dbc',
      'dbca',
      'dc',
      'dca',
      'dcab',
      'dcb',
      'dcba'
    ].sort();
    const actual = findCombinations(input).sort();
    console.log(actual.length);
    expect(actual).toEqual(expected);
  });

  it("should find all combinations of ['a', 'b', 'c', 'd']", () => {
    const input = 'abcdefghijklmnopqrst'.split('');
    const actual = findCombinations(input).sort();
    console.log(actual.length);
  });
});
