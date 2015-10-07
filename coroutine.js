import fs from 'fs'
import Promise from 'bluebird'

global.Promise = Promise
Promise.promisifyAll(fs)

const readData = () => {
  return fs.readFileAsync('data.txt', 'utf8')
    .then((contents) => fs.readFileAsync(contents.trim(), 'utf8'))
}

const readData = Promise.coroutine(function * () {
  const contents = yield fs.readFileAsync('data.txt', 'utf8')
  return yield fs.readFileAsync(contents.trim(), 'utf8')
})

readData().then((contents) => { console.log(contents.toUpperCase()) })
