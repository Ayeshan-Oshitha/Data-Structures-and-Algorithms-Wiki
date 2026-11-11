// Trie

class NodeClass {
  constructor() {
    this.isEndOfWord = false;
    this.map = new Map();
  }
}

class TrieClass {
  constructor() {
    this.root = new NodeClass();
  }

  insert(word) {
    let temp = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      if (!temp.map.has(letter)) {
        temp.map.set(letter, new NodeClass());
      }
      temp = temp.map.get(letter);
    }
    temp.isEndOfWord = true;
    return;
  }

  search(word) {
    let temp = this.root;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      temp = temp.map.get(letter);
      if (!temp) {
        return false;
      }
    }
    return temp.isEndOfWord;
  }

  startsWith(prefix) {
    let temp = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const letter = prefix[i];
      temp = temp.map.get(letter);
      if (!temp) {
        return false;
      }
    }
    return true; // whole path exists: some word starts like this
  }
}
