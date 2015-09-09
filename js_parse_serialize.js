// 1. // f('a=1&c=2') => {a: 1, b: 2}
// 2. // f('a=1&b[c]=2') => {a: 1, b: { c: 2}}

// input: string
// output: Object (map)
var parseString = function(stringOfParams){
  if (stringOfParams.length === 0) { return {} }
  return stringOfParams.split('&').reduce(function(hashMap, currentStrPair){
    var key = currentStrPair[0]
    if (currentStrPair.length === 3){
      hashMap[key] = Math.floor(currentStrPair[2])
    } else {
      hashMap[key] = parseString(/*get key out of [] */ currentStrPair.slice(2)[0]
                      + /* concat rest of string */ currentStrPair.slice(4))
    }
    return hashMap
  }, {})
}




// input: hashmap
// output: string
var serialize = function(hashMap, path) {
  if (path){log("----", "")}
  // log("map:", hashMap)
  // log("path:", path)
  var serializedString = ""
  var firstPair = true
  for (key in hashMap){
    var value = hashMap[key]
    log("string:", serializedString)
    log("path:", path)
    if (path) {key = path.concat("[" + key + "]")}
    log("key:", key)
    if (/* not last k,v pair */ !firstPair ) { serializedString = serializedString.concat("&") }
    if (/* value not an object */ typeof(value) !== 'object' ) { serializedString = serializedString.concat(key + '=' + value) }
    else {
      serializedString = serializedString.concat(serialize(value, key))
    }
    firstPair = false /* appends '&' on next iteration */
  }
  return serializedString
}



var loggedItems = []

var log = function(name, itemToLog){
  loggedItems.push([name, itemToLog])
}
//parse test
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
    process.exit()
  }
})

console.log('')
console.log('full loop test:', serialize(parseString('a=1&b[c][d]=4')) === 'a=1&b[c][d]=4')
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
   {
    name: 'doubly nested k,v string',
    input: {
      a: 1,
      b: {
        c: {
          d: 4 //
        },
        e: 5
      }
    },
    expected: "a=1&b[c][d]=4&b[e]=5",
  },
].forEach(function(td){
  loggedItems = []
  var actual = serialize(td.input)
  var pass = actual === td.expected
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed", td.name)
    console.log("actual:  ", actual)
    console.log("expected:", td.expected)
    loggedItems.forEach(function(pair){
      console.log(pair[0], pair[1])
    })
    process.exit()
  }
})