import dictionary from './dictionary.txt?raw';
import { Trie } from './Trie';

const trie = new Trie();
dictionary.split('\n').forEach(word => trie.insert(word));

export function wordExists(word: string): boolean {
  return trie.check(word);
}

export function findWords(tokens: string[]): string[] {
  const uniqueTokens = tokens.filter(Boolean);
  let combinations: string[] = [];

  for (let i = 1; i <= 4; i++) {
    combinations = [...combinations, ...generateCombinations(uniqueTokens, i)];
  }

  // return combinations;
  return combinations.sort();
}

function generateCombinations(tokens: string[], length: number): string[] {
  if (length === 1) {
    return tokens;
  }

  let combinations: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const remainingTokens = tokens.slice(i + 1);
    const remainingCombinations = generateCombinations(remainingTokens, length - 1);
    combinations = [...combinations, ...remainingCombinations.map(c => token + c)];
  }

  return combinations;
}
