

const addOperators = (numbers, target) => {
  // double nesting with final filter passed a reducing function
  const scenerios = []
  let grouping = 1
  const operators = ['+', '-', '*']
  for (let i = 0; i < numbers.length - 1; ++i){
    operators.forEach((operator) => scenerios.push([numbers[i].concat(operator, numbers[i + 1])]))
  }
  return scenerios
}

const getAllCominbationrs = (string, size = 1) => {
  for (let i = 0; )
}



;[
  {
    name: 'two digits',
    input: ['12', 3],
    expected: ['1+2', '1*2', '1-2', '12'],
  },
].forEach((td) => {
  const actual = addOperators(td.input[0], td.input[1])
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