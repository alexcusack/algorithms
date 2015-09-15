
;[
  {
    name: "no event",
    input: [],
    expected: [],
  },
  {
    name: "single event",
    input: [{start: 0, end: 1 }],
    expected: [{top: 0, left: 0, width: 600, height: 1}],
  },
   {
    name: "two overlapping events",
    input: [
            {start: 0, end: 2 },
            {start: 1, end: 3 }
            ],
    expected: [
              {top: 0, left: 0, width: 299, height: 2},
              {top: 1, left: 300, width: 299, height: 2}
              ],
  },
  {
    name: "mixed overlapping",
    input: [
            {start: 0, end: 3 },
            {start: 2, end: 4 },
            {start: 4, end: 5 }
           ],
    expected: [
               {top: 0, left: 0, width: 299, height: 3},
               {top: 2, left: 300, width: 299, height: 2},
               {top: 4, left: 0, width: 600, height: 1}
              ],
  },
    {
    name: "4 overlapping events",
    input: [
            {start: 0, end: 2 },
            {start: 0, end: 2 },
            {start: 0, end: 2 },
            {start: 0, end: 2 },
           ],
    expected: [
               {top: 0, left: 0,   width: 149, height: 2},
               {top: 0, left: 150, width: 149, height: 2},
               {top: 0, left: 300, width: 149, height: 2},
               {top: 0, left: 450, width: 149, height: 2},
              ],
  },
  {
    name: "multiple overlapping events",
    input: [
            {start: 0, end: 2 },
            {start: 1, end: 3 },
            {start: 2, end: 4 }
           ],
    expected: [
               {top: 0, left: 0, width: 299, height: 2},
               {top: 1, left: 300, width: 299, height: 2},
               {top: 2, left: 0, width: 299, height: 2}
              ],
  },
  {
    name: "multiple overlapping events in varied order with non overlapping",
    input: [
            {start: 0, end: 2 },
            {start: 1, end: 3 },
            {start: 2, end: 4 },
            {start: 5, end: 7 },
            {start: 7, end: 9},
            {start: 8, end: 10},
           ],
    expected: [
               {top: 0, left: 0, width: 299, height: 2},
               {top: 1, left: 300, width: 299, height: 2},
               {top: 2, left: 0, width: 299, height: 2},
               {top: 5, left: 0, width: 600, height: 2},
               {top: 7, left: 0, width: 299, height: 2},
               {top: 8, left: 300, width: 299, height: 2},
              ],
  },

  {
    name: "Facebook case, prior event overlap",
    input: [
            {start: 30, end: 150},
            {start: 540, end: 600},
            {start: 560, end: 620},
            {start: 610, end: 670},
            ],
    expected: [
               {top: 30, left: 0, width: 600, height: 120},
               {top: 540, left: 0, width: 299, height: 60},
               {top: 560, left: 300, width: 299, height: 60},
               {top: 610, left: 0, width: 299, height: 60},
              ],
  },

].forEach(function(td){
  loggedItems = []
  var actual = layOutDay(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log("failed:", td.name)
    console.log("expected:" )
    console.log(td.expected)
    console.log("actual:")
    console.log(actual)
    loggedItems.forEach(( [label, item]) => console.log(label, item))
    process.exit()
  }
})