
const TrieNode = () => {
  const trie = {}
  for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); ++i){
    trie[String.fromCharCode(i)] = {isWord: false}
  }
  return trie
}

class Trie {

  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    if (!word || word.length === 0) { return false }
    if (word.length === 1) { this.root[word].isWord = true}
    let pointer = this.root[word[0]]
    for (let i = 1; i < word.length; ++i){
      const currentChar = word[i]
      if (!pointer[currentChar]) { pointer[currentChar] = {isWord: false} }
      if (i === word.length - 1) { pointer[currentChar].isWord = true }
      pointer = pointer[currentChar]
    }
  }

  search(word) {
    if (word.length === 0) { return false }
    let pointer = this.root
    for (let i = 0; i < word.length; ++i){
      pointer = pointer[word[i]]
      if (!pointer) { return false }
    }
    return pointer.isWord === true
  }

  startsWith(word) {
    if (!word || word.length === 0) { return false }
    const endOfPath = word.split('').reduce((pointer, currentChar) => {
      return pointer[currentChar] ? pointer[currentChar] : {}
    }, this.root)
    return !!endOfPath && (Object.keys(endOfPath).length > 1 || !!endOfPath.isWord)
  }

}
