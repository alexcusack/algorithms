import fs from 'fs'
import Promise from 'bluebird'

global.Promise = Promise
Promise.promisifyAll(fs)

const readData = () => {
  return fs.readFileAsync('data.txt', 'utf8')
    .then((contents) => fs.readFileAsync(contents.trim(), 'utf8'))
}

readData().then((contents) => { console.log(contents.toUpperCase()) })
