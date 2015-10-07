// text editor that periodically saves as you type and saves the timestamps
// so you could effectively replay the state of the document

// Callbacks
// promises
// coretouines
import diffHrTime from 'diff-hrtime'
import fs from 'fs'
// const start = process.hrtime()

// fs.readFile('data.txt', 'utf8', (err, contents) => {
//   if (err) { throw err }
//   const readCallback = process.hrtime()
//   console.log('start/end diff', diffHrTime(start, end))
//   console.log('start/read diff', diffHrTime(end, readCallback))
//   console.log(contents.toLowerCase())
// })

// const end = process.hrtime()
// console.log('after read file', end)

const readData = (callback) => {
  fs.readFile('data.txt', 'utf8', (err, contents) => {
    if (err) { callback(err); return }
    fs.readFile(contents.trim(), 'utf8', callback)
  })
}

readData((err, contents) => {
  if (err) { throw err }
  console.log(contents.toUpperCase())
})
