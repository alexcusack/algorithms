import { Trie } from './trie'

const dictionary = new Trie()
;['reads', 'banana', 'car', 'apple', 'retry', 'bananagrams'].forEach((word) => dictionary.add(word))

// GameBoards could used to create any type of game (Scrabble, Chess, Checkers, etc), with the game itself
// being defined by the tile type
class GameBords {
  constructor (boardSize, boardCell = 0) {
    this.board = this._buildBoard(boardSize, boardCell)
  }

  _buildBoard (boardSize, BoardCell) {
    const boardMatrix = []
    for (let i = 0; i < boardSize; ++i) {
      const boardRow = []
      for (let j = 0; j < boardSize; ++j) {
        boardRow.push(BoardCell === 0 ? BoardCell : new BoardCell())
      }
      boardMatrix.push(boardRow)
    }
    return boardMatrix
  }
}

class ScrabbleTile {
  constructor () {
    this.letter = undefined // default to undefined until letter is placed
  }
}

class ScrabbleGame extends GameBords {
  constructor (size = 15) {
    super(size, ScrabbleTile)
  }

  placeWord (word, startRow, startColumn, direction) {
    if (this._playableWord(word, startRow, startColumn, direction)) {
      this._playWord(word, startRow, startColumn, direction)
      return { valid: true, points: this._scoreWord(word) }
    }
    return { valid: false, points: 0 }
  }

  _scoreWord (word) {
    return word.length
  }

  _playWord (word, startRow, startColumn, direction) {
    for (let i = 0; i < word.length; ++i) {
      this.board[startRow][startColumn].letter = word[i]
      direction === 'RIGHT'
        ? this.board[++startRow][startColumn]
        : this.board[startRow][++startColumn]
    }
  }

  _playableWord (word, startRow, startColumn, direction) {
    if (!this._isValidWord(word)) { return false }
    let nextRowPostion = startRow
    let nextColumnPosition = startColumn
    let nextTile = this.board[nextRowPostion][nextColumnPosition]
    for (let i = 0; i < word.length; ++i) {
      if (!!nextTile.letter && !(nextTile.letter === word[i])) { return false }
      nextTile = direction === 'RIGHT'
        ? this.board[++nextRowPostion][nextColumnPosition]
        : this.board[nextRowPostion][++nextColumnPosition]
    }
    return true
  }

  _isValidWord (word) {
    return dictionary.isMatch(word)
  }

}

const thisGame = new ScrabbleGame()

;[
  {
    name: 'play valid word',
    input: ['reads', 7, 7, 'RIGHT'],
    expected: { valid: true, points: 5 },
  },
  {
    name: 'play valid word, with invalid overlap',
    input: ['apple', 7, 7, 'RIGHT'],
    expected: { valid: false, points: 0 },
  },
  {
    name: 'play invalid word',
    input: ['not', 1, 1, 'RIGHT'],
    expected: { valid: false, points: 0 },
  },
  {
    name: 'play valid overlapping word',
    input: ['retry', 7, 7, 'DOWN'],
    expected: { valid: true, points: 5 },
  },
  {
    name: 'play valid overlap with end of word',
    input: ['banana', 8, 0, 'DOWN'],
    expected: { valid: true, points: 6 },
  },
].forEach((td) => {
  const actual = thisGame.placeWord(...td.input)
  const pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass) {
    console.log('passed:', td.name)
  } else {
    console.log('failed:', td.name)
    console.log('actual:', actual)
    console.log('expected:', td.expected)
    process.exit()
  }
})
