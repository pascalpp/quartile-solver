import { browser } from '$app/environment';
// import dictionary from './american-english.txt?raw';
import dictionary from './dictionary.txt?raw';
import { Trie } from './Trie';

declare global {
  interface Window {
    Trie: typeof Trie;
    trie: Trie;
  }
}

const trie = new Trie();
dictionary
  .toLowerCase()
  .split('\n')
  .forEach(word => trie.insert(word));

if (browser) {
  window.Trie = Trie;
  window.trie = trie;
}

export function wordExists(word: string): boolean {
  return trie.check(word);
}

export function findWords(tokens: string[]): string[] {
  return findCombinations(tokens).filter(wordExists).sort();
}

export function findCombinations(tokens: string[]): string[] {
  const uniqueTokens = tokens.filter(Boolean);
  let combinations: string[] = [];

  for (let i = 1; i <= 4; i++) {
    combinations = [...combinations, ...generateCombinations(uniqueTokens, i)];
  }

  return combinations;
}

function generateCombinations(tokens: string[], length: number): string[] {
  if (length === 1) {
    return tokens;
  }

  let combinations: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const remainingTokens = tokens.filter(t => t !== token);
    const remainingCombinations = generateCombinations(remainingTokens, length - 1);
    combinations = [...combinations, ...remainingCombinations.map(c => token + c)];
  }

  return combinations;
}
