var eventBuilder = require('./calendar').eventBuilder

;[
  {
    name: "create event block Test 1",
    input: {start: 0, end: 1 },
    expected: {top: 0, left: 0, width: 600, height: 1},
  },
  {
    name: "create event block Test 2",
    input: {start: 1, end: 2 },
    expected: {top: 1, left: 0, width: 600, height: 1},
  },
].forEach(function(td){
  var actual = eventBuilder(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log('passed', td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    process.exit(1)
  }
})