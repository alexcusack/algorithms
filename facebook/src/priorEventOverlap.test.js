var priorEventOverlap = require('./calendar.js').priorEventOverlap
;[
  {
    name: "prior event overlap true",
    input: [{start: 1, end: 3}, {start: 2, end: 3}, ],
    expected: true
  },
  {
    name: "prior event overlap fail case",
    input: [{start: 1, end: 2},
            {start: 2, end: 3},
            ],
    expected: false
  },

].forEach(function(td){
  var actual = priorEventOverlap(td.input[1], td.input[0])
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
