var nextEventOverlap = require('./calendar.js').nextEventOverlap
;[
  {
    name: "event overlap true",
    input: [{start: 1, end: 3}, {start: 2, end: 4}, ],
    expected: true
  },
  {
    name: "event overlap false",
    input: [{start: 1, end: 2}, {start: 2, end: 3}],
    expected: false
  },
].forEach(function(td){
  var actual = nextEventOverlap(td.input[0], td.input[1])
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:", td.expected)
    console.log("actual:", actual)
    process.exit()
  }
})