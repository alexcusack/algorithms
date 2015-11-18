export class Trie {
  constructor() {
    this.trie = {}
  }

  add (word) {
    let pointer = this.trie
    word.split('').forEach((letter) => {
      if (!pointer[letter]) { pointer[letter] = {} }
      pointer = pointer[letter]
    })
  }

  isMatch (word) {
    let pointer = this.trie
    for (let i = 0; i < word.length; ++i) {
      if (pointer[word[i]]) {
        pointer = pointer[word[i]]
        if (/* end of word */ i === word.length - 1) { return true }
      }
    }
    return false
  }
}

const thisTrie = new Trie()

// console.log(thisTrie.add('alex'))
// console.log(thisTrie.add('apple'))
// console.log(thisTrie.isMatch('alex'))
// console.log(thisTrie.trie['a'])

