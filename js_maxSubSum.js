
const maxSubArray = (arrayOfInts) => {
  if (arrayOfInts.length === 1) { return arrayOfInts[0] }
  if (arrayOfInts.length < 3) { return max(arrayOfInts[0], arrayOfInts[1]) }
  let first = arrayOfInts[0]
  let second = arrayOfInts[1]
  let curr = (arrayOfInts[0] + arrayOfInts[2])
  for (let i = 3; i < arrayOfInts.length; ++i) {
    const temp = arrayOfInts[i] + max(first, second)
    second = first
    first = curr
    curr = temp
  }
  return max(curr, first)
}

const max = (a, b) => a > b ? a : b

console.log(maxSubArray([3, 7, 2, 10, 3, 2, 7, 10]))
console.log(maxSubArray([10, 2, 3, 7]))
console.log(maxSubArray([3, 2, 5, 10, 7]))
console.log(maxSubArray([0, 1, 2, 3]))
