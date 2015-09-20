var moveZeroes = function(nums) {
  var length = nums.length
  var zeros = []
  var count = 0
  for (var i = 0; i < nums.length; ++i){
    if (nums[i] !== 0){
      nums[count++] = nums[i]
    }
  }

  while (count < length){
    nums[count++] = 0
  }
  return nums
};

;[
 {
    name: "test 1",
    input: [0,1],
    expected: [1,0]
  },
   {
    name: "small",
    input: [0,1,0,2,0],
    expected: [1,2,0,0,0]
  },
].forEach(function(td){
  var actual = moveZeroes(td.input)
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