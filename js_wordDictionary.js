
class WordDictionary {

  constructor() {
    this.root = {}
  }

  addWord(word) {
    let pointer = this.root
    for (let i = 0; i < word.length; ++i){
      const currentChar = word[i]
      if (!pointer[currentChar]) { pointer[currentChar] = {isWord: false} }
      if (i === word.length - 1) { pointer[currentChar].isWord = true }
      pointer = pointer[currentChar]
    }
  }

  search(word, root = this.root) {
    if (word.length === 0) { return false }
    if (word[0] === '.' || word[word.length - 1] === '.') {
      //regexSearch()
    }
    let pointer = root
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

