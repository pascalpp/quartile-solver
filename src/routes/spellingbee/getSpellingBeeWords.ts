import collinsRaw from '$lib/collins.txt?raw';
import twlRaw from '$lib/twl.txt?raw';
import sowpodsRaw from '$lib/sowpods.txt?raw';
import americanRaw from '$lib/american-english.txt?raw';

export enum Dictionary {
  collins,
  sowpods,
  twl,
  american
}

const dictionaries = new Map<Dictionary, string[]>([
  [Dictionary.collins, getDict(collinsRaw)],
  [Dictionary.sowpods, getDict(sowpodsRaw)],
  [Dictionary.twl, getDict(twlRaw)],
  [Dictionary.american, getDict(americanRaw)]
]);

interface SpellingBeeWords {
  pangrams: string[];
  other: string[];
}

export function getSpellingBeeWords(
  letters: string,
  dictionary: Dictionary = Dictionary.american
): SpellingBeeWords | null {
  const dict = dictionaries.get(dictionary);
  if (letters.length < 7 || !dict) {
    return null;
  }

  const required = letters.slice(0, 1);
  const matchRegex = new RegExp(`^[${letters}]+$`, 'i');
  const requiredRegex = new RegExp(required, 'i');
  const allRegex = letters.split('').map(char => new RegExp(char, 'i'));

  const matches = dict
    .filter(item => matchRegex.test(item))
    .filter(item => requiredRegex.test(item));

  const pangrams = matches.filter(item => allRegex.every(regex => regex.test(item)));
  const other = matches.filter(item => !pangrams.includes(item));

  return { pangrams, other };
}

function getDict(raw: string): string[] {
  return raw
    .split('\n')
    .filter(item => item.length > 3)
    .sort();
}
