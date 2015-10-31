const permutationsOfString = (string, permutations = [], usedChars = []) => {
  const charArr = string.split('')
  for (let i = 0; i < charArr.length; ++i) {
    const character = charArr.splice(i, 1) // get single char from rest
    usedChars.push(character)
    if (/* when empty */ charArr.length === 0) { permutations.push(usedChars.join('')) }
    permutationsOfString(charArr.join(''), permutations, usedChars)
    charArr.splice(i, 0, character)
    usedChars.pop()
  }
  return permutations
}


// function combinations(str) {
//     var fn = function(active, rest, a) {
//         if (!active && !rest)
//             return;
//         if (!rest) {
//             a.push(active);
//         } else {
//             fn(active + rest[0], rest.slice(1), a);
//             fn(active, rest.slice(1), a);
//         }
//         return a;
//     }
//     return fn("", str, []);
// }


;[
//   {
//     name: 'test name',
//     input: 'input',
//     expected: 'expected output',
//   },
  {
    name: 'generateTable, empty input:',
    input: 'abc',
    expected: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'],
  },
].forEach((td) => {
  const actual = permutationsOfString(td.input)// get just the table, remove row key
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
