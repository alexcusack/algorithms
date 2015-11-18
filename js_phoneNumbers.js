const digit_map = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
}

const word = (numbers) => {
  let result = digit_map[numbers[0].toString()].split('')
  for (let i = 1; i < numbers.length; ++i) {
    const letters = digit_map[numbers[i].toString()]
    const queue = result
    result = []
    while (queue.length > 0) {
      // for each result, add each of the j
      const prefix = queue.shift()
      letters.split('').forEach((letter) => result.push(prefix.concat(letter)))
    }
  }
  return result
}

console.log(word('4234'))



const depthFirstSearch = (node) => {
  // if leaf, check and return
  // if branch, spit to head and rest.
  // return search head then search rest
}


const findBreadthFirst = (node) => {
  // if leaf, make it branch and place in queue
  // if branch,
}
