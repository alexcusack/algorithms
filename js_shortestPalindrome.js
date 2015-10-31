
const shortestPalindrome = (inputString) => {
  if (inputString.length === 1) { return inputString }
  let outputString = inputString
  const firstChar = inputString[0]
  let stack = inputString.split('').reduce((stack, currChar) => {
    const lastChar = peek(stack)
    lastChar === currChar ? stack.pop() : stack.push(currChar)
    return stack
  }, [])

  if (/* first letter is first letter */ stack[0] === firstChar) { stack = stack.slice(1) }
  if (/* last letter is first letter */ peek(stack) === firstChar) { stack = stack.slice(0, stack.length - 1) }
  console.log(stack)
  while (peek(stack) === stack[0]){stack = stack.slice(1, stack.length-1) }
  for (let position = 0; position < stack.length; ++position) {
    outputString = stack[position] + outputString
  }
  return outputString
}

const peek = (stack) => { return stack[stack.length - 1] }

;[
  {
    name: 'shortestPalindrome ba',
    input: 'ba',
    expected: 'aba',
  },
  {
    name: 'shortestPalindrome aba',
    input: 'aba',
    expected: 'aba',
  },
  {
    name: 'shortestPalindrome',
    input: 'abc',
    expected: 'cbabc',
  },
  {
    name: 'shortestPalindrome',
    input: 'xyzx',
    expected: 'xzyxyzx',
  },
].forEach((td) => {
  const actual = shortestPalindrome(td.input)
  const pass = actual === td.expected
  if (pass) {
    console.log('passed:', td.name)
  } else {
    console.log('failed:', td.name)
    console.log('actual:', actual)
    console.log('expected:', td.expected)
    process.exit()
  }
})
