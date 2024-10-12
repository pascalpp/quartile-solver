import collins from '$lib/twl.txt?raw';
const dict = collins
  .split('\n')
  .filter(item => item.length > 3)
  .sort();

interface SpellingBeeWords {
  pangrams: string[];
  other: string[];
}

export function getSpellingBeeWords(letters: string): SpellingBeeWords {
  if (letters.length < 7) {
    return { pangrams: [], other: [] };
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
