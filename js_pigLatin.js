

const piglatinizeWord = (word) => {
  const capitalized = word[0] === word[0].toUpperCase()
  for (let i = 0; i < word.lenght; ++i) {

  }
}


// ay
// way
// qu goes together
// maintain  punctuation

;[
  {
    name: 'word',
    input: 'input',
    expected: 'expected output',
  },
].forEach((td) => {
  const actual = FN(td.input)
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