class TrieNode {
  end = false;
  children: Record<string, TrieNode> = {};
}

export class Trie {
  root = new TrieNode();

  insert(word: string) {
    let temp = this.root;
    for (let i = 0; i < word.length; ++i) {
      if (temp.children[word[i]]) {
        temp = temp.children[word[i]];
      } else {
        temp.children[word[i]] = new TrieNode();
        temp = temp.children[word[i]];
      }
    }
    temp.end = true;
  }

  check(word: string) {
    if (this.root == null) return false;
    let temp = this.root;
    for (let i = 0; i < word.length; ++i) {
      if (!temp.children[word[i]]) return false;
      temp = temp.children[word[i]];
    }
    return temp.end === true;
  }
}
