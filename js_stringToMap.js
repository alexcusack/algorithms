// 1. // f('a=1&c=2') => {a: 1, b: 2}
// 2. // f('a=1&b[c]=2') => {a: 1, b: { c: 2}}

// input: string
// output: Object (map)
var parseString = function(stringOfParams){
  if (stringOfParams.length === 0) { return {} }
  return stringOfParams.split('&').reduce(function(hashMap, currentPair){
    var key = currentPair[0]
    if (currentPair.length === 3){
      hashMap[key] = Math.floor(currentPair[2])
    } else {
      hashMap[key] = parseString(/*get key out of [] */ currentPair.slice(2)[0]
                          + /* add rest of string */ currentPair.slice(4))
    }
    return hashMap
  }, {})
}


// input: map
// output: string
var seralize = function(hashMap, nestedKey) {
  var seralizedString = ""
  var count = 0
  for (key in hashMap){
    var value = hashMap[key]
    if (nestedKey) {key = "[" + key + "]"}
    if (/* multiple k,v pairs */ count > 0) { seralizedString = seralizedString.concat("&") }
    if (/* value not an object */ value.constructor() === '' || value.constructor() === 0 ) { seralizedString = seralizedString.concat(key + '=' + value) }
    else {
      nestedKey = true /* set nestedKey to true, concat nestedKey keys with [key] */
      seralizedString = seralizedString.concat(key).concat(seralize(value, nestedKey))
      nestedKey = false /* reset nestedKey to false */
    }
    ++count
  }
  return seralizedString
}


;[
  {
    name: 'empty string',
    input: "",
    expected: {},
  },
  {
    name: 'single k,v string',
    input: "a=1",
    expected: {a: 1},
  },
  {
    name: 'Double k,v string',
    input: "a=1&c=2",
    expected: {a: 1, c: 2}
  },
  {
    name: 'nested k,v string',
    input: "a=1&b[c]=2",
    expected: {a: 1, b: { c: 2}}
  },
  {
    name: 'large nested k,v string',
    input: "a=1&b[c]=2&d=4",
    expected: {a: 1, b: { c: 2}, d: 4}
  },
   {
    name: 'doubly nested k,v string',
    input: "a=1&b[c][d]=4",
    expected: {a: 1, b: { c: {d: 4}}}
  },
].forEach(function(td){
  var actual = parseString(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    // process.exit()
  }
})

console.log('')
console.log('full loop test:', seralize(parseString('a=1&b[c][d]=4')) === 'a=1&b[c][d]=4')
console.log('')

console.log('serialize tests')

;[
  {
    name: 'empty object',
    input: {},
    expected: "",
  },
  {
    name: 'single k,v pair',
    input: {a: 1},
    expected: "a=1",
  },
  {
    name: 'Double k,v pair',
    input: {a: 1, c: 2},
    expected: "a=1&c=2",
  },
  {
    name: 'nested k,v string',
    input: {a: 1, b: { c: 2}},
    expected: "a=1&b[c]=2",
  },
  {
    name: 'large nested k,v string',
    input: {a: 1, b: { c: 2}, d: 4},
    expected: "a=1&b[c]=2&d=4",
  },
   {
    name: 'doubly nested k,v string',
    input: {a: 1, b: { c: {d: 4}}},
    expected: "a=1&b[c][d]=4",
  },
].forEach(function(td){
  var actual = seralize(td.input)
  var pass = actual === td.expected
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed", td.name)
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})