function summaryRanges(array){
  if (array.length === 0){return []}
  var start = array[0]
  var previousEl = start /* init to base */
  var ranges = []
  for (var i = 1; i < array.length; ++i){
    if (/* current number not consecutive? */ (array[i]-1) !== previousEl){
      /* single number range ? */
        previousEl === start ? ranges.push(previousEl.toString())
          : ranges.push(start.toString() + '->' + previousEl.toString() )
      /* reset to build new range */
      start = array[i]
    }
    previousEl = array[i]
  }
  /* concat last range multi range ? */
  previousEl !== start ? ranges.push(start.toString() + "->" + previousEl.toString())
    : ranges.push(start.toString())
  return ranges
}




;[
 {
    name: "test 0",
    input: [-1],
    expected: ["-1"]
  },
 {
    name: "test 1",
    input: [0,1],
    expected: ["0->1"]
  },
   {
    name: "test 2",
    input: [0,1,3,4,5,],
    expected: ["0->1", "3->5"]
  },
  {
    name: "test 3",
    input: [1,3],
    expected: ["1", "3"]
  },
].forEach(function(td){
  var actual = summaryRanges(td.input)
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected) // no nesting so this is 'fine'
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})