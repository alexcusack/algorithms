
const words = ['read', 'red', 'dearest', 'apple', 'rap']
const tiles = 'repeads'

const buildTrie = (words) => {
  const trie = {}
  for (let i = 0; i < words.length; ++i) {
    const word = words[i]
    let pointer = trie
    let path = ""
    for (let j = 0; j < word.length; ++j) {
      const char = word[j]
      path = path.concat(char)
      if (!pointer[char]) {
        pointer[char] = path.length === word.length ? {isWord: true} : {isWord: false}
      }
      pointer = pointer[char]
    }
  }
  return trie
}

const trie = buildTrie(words)
console.log(trie['r'])

// // const findWords = (tiles, trie, tileMap) => {
// //   const tileMap = buildTileMap(tiles)
// //   return tiles.split('').map((tile) => buildWord(tile, trie, tileMap))
// // }

// const buildWord = (tile, trie, tileMap) => {
//   console.log(trie)
//   if (!trie[tile]) { return [tile] }
//   if (trie[tile]) {
//    return trie[tile].isword ? tile.concat(buildWord(tile, trie[tile], tileMap)) : buildWord(tile, trie[tile], tileMap)
//   }
// }

// console.log(buildWord('r', trie, []))

// // const buildTileMap = (tiles) => {
// //   return tiles.split('').reduce((map, currentChar) => {
// //     map[currentChar]
// //     // map[currentChar] ? map[currentChar] += 1 : map[currentChar] = 1
// //     return map
// //   }, {})
// // }

