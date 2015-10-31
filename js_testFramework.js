// ;[
//   {
//     name: 'test name',
//     input: 'input',
//     expected: 'expected output',
//   },
// ].forEach((td) => {
//   const actual = FN(td.input)
//   const pass = JSON.stringify(actual) === JSON.stringify(td.expected)
//   if (pass) {
//     console.log('passed:', td.name)
//   } else {
//     console.log('failed:', td.name)
//     console.log('actual:', actual)
//     console.log('expected:', td.expected)
//     process.exit()
//   }
// })

const convertStringToDictionary = (string) => {
  let key = ''
  let isKey = false
  let isValue = true
  const stack = []
// [ '{', '"', 'K', '1', '"', ':', '"', 'v', '1', '"', '}' ]
// { : stack = [] // isKey = true
// " : stack = []
// k : stack = [K]
// 1 : stack = [K,1]
// " : stack = [], key = 'k1', isKey = false
// : : stack = [], isValue = true
// " : stack = []
// v : stack = [v]
// 1 : stack = [v,1]
//
}

;[
  {
    name: 'test name',
    input: "{\"K1\":\"v1\"}",
    expected: 'expected output',
  },
].forEach((td) => {
  const actual = convertStringToDictionary(td.input)
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



// console.log("{\"k\":{\"k1a\":\"v1a\",\"k2a\":\"v2a\"}}")
// console.log(convertStringToDictionary("{\"k\":{\"k1a\":\"v1a\",\"k2a\":\"v2a\"}}"))

// let input = "{\"k1\":\"v1\",\"k2:{},\":\"v2\"}"
// let out = convertStringToDictionary(input)
// console.log(input)
// console.log('-->')
// console.log(out)

// input = "{}"
// out = convertStringToDictionary(input)
// console.log(input)
// console.log('-->')
// console.log(out)


// input = "{\"K1\":\"v1\"}"
// out = convertStringToDictionary(input)
// console.log(input)
// console.log('-->')
// console.log(out)

// input = "{\"k\":{}}"


// input = "{\"k\":{\"k1a\":\"v1a\",\"k2a\":\"v2a\"}}"

// // when { next char is key
// // push key to stack,
// // if next char is a value, pop stack to set key,value
// // if { recurse
// // } return from recursion
