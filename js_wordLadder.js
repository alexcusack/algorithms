
const findPathToWord = (start, end, wordList) => {
  if (start === end) { return 1 }
  if (oneCharOrLessDifference(start, end)) { return 2 }
  wordList.add(end)
  // let wordList = creatMapFromWordList(wordList)
  const queue = [start]
  let depth = 1
  while (queue.length > 0) {
    ++depth
    let count = queue.length
    while (count--) {
      const currentWord = queue.shift()
      if (oneCharOrLessDifference(currentWord, end)) { return depth }
      for (let i = 0; i < currentWord.length; ++i) {
        for (let j = 'a'.charCodeAt(); j <= 'z'.charCodeAt(); ++j) {
          const nextLetter = String.fromCharCode(j)
          const testWord = replaceCharInWord(currentWord, nextLetter, i)
          if (wordList.has(testWord) && testWord !== currentWord) {
            if (oneCharOrLessDifference(testWord, end)) { return ++depth }
            queue.push(testWord)
            wordList.delete(testWord)
          }
        }
      }
    }
  }
  return 0
}

const replaceCharInWord = (originalWord, nextLetter, indexToChange) => {
  return originalWord.slice(0, indexToChange).concat(nextLetter, originalWord.slice(indexToChange + 1, originalWord.length))
}

// const wordIsInWordList = (wordMap, testWord) => {
//   return wordMap[testWord]
// }

// const creatMapFromWordList = (wordList) => {
//   return wordList.reduce((map, word) => {
//     map[word] = true; return map
//   }, {})
// }

// const deleteWordFromWordList = (wordList, word) => {
//   return creatMapFromWordList(wordList.filter((listWord) => listWord !== word))
// }

const oneCharOrLessDifference = (wordA, wordB) => {
  if (wordA.length !== wordB.length) { return false }
  let differnce = 0
  for (let i = 0; i < wordA.length; ++i) {
    if (wordA[i] !== wordB[i]) { ++differnce }
    if (differnce > 1) { return false }
  }
  return true
}

const wordList = ['hot', 'dot', 'dog', 'lot', 'log']
// console.log(findPathToWord('hot', 'dog', ['hot', 'dog']))
console.log(findPathToWord('hit', 'cog', new Set(wordList)))