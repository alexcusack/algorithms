// I want you to implement `fibs` in `for (let fib of fibs()) { console.log(fib); if (fib > 100) break }`
// where `fibs` is a generator that returns an iterator that produces sequential fibonacci numbers
// also, `fibs` should allocate two ints of memory, there shouldn’t be an array inside it or any recursion
// so basically, I want you to combine an implementation of the fibonacci series computer using dynamic programming
// (which is sometimes described as “recursion backwards”) with es6 generators

function * fibs () {
  let twoPrevious = 0
  let onePrevious = 1
  yield twoPrevious
  yield onePrevious
  while (true) {
    yield onePrevious + twoPrevious
    onePrevious = twoPrevious + onePrevious
    twoPrevious = onePrevious - twoPrevious
  }
}

const fibonacci = () => {
  for (let fib of fibs()) {
    console.log(fib)
    if (fib > 100) { break }
  }
}

fibonacci()

