
const findMaxTrips = (arrayofInts) => {
  let max = 0
  for (let i = 0; i < arrayofInts.length; ++i) {
    for (let j = i + 1; j < arrayofInts.length; ++j) {
      for (let k = j + 1; k < arrayofInts.length; ++k) {
        const tripletSum = arrayofInts[i] + arrayofInts[j] + arrayofInts[k]
        max = max > tripletSum ? max : tripletSum
      }
    }
  }
  return max
}

;[
  {
    name: 'test name',
    input: [1, 2, 3, 4, 45],
    expected: 52,
  },
  {
    name: 'test name',
    input: [7, 1, 2, 8, 3],
    expected: 18,
  },
].forEach((td) => {
  const actual = findMaxTrips(td.input)
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

