import { Trie } from './Trie';
import { findCombinations } from './findCombinations';

export class Dictionary {
  trie;

  constructor(wordList: string) {
    this.trie = new Trie(wordList);
    this.checkWord = this.checkWord.bind(this);
  }

  findWords(tokens: string[] = []): string[] {
    const combinations = findCombinations(tokens);
    return combinations.filter(this.checkWord).sort();
  }

  checkWord(word: string): boolean {
    return this.trie.check(word);
  }
}
