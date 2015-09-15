var sortEventsByStart = require("./calendar.js").sortEventsByStart

;[
  {
    name: "Sort Events 1",
    input: [{start: 2, end: 3}, {start: 1, end: 2}],
    expected: [{ start: 1, end: 2 }, { start: 2, end: 3 }]
  },
  {
    name: "Sort events, even starts",
    input: [{start: 1, end: 2}, {start: 1, end: 2}],
    expected: [{ start: 1, end: 2 }, { start: 1, end: 2 }]
  },
].forEach(function(td){
  var actual = sortEventsByStart(td.input)
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