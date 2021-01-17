const Path = require('path')
const FS = require('fs')
const Files = []

const db = require('../src/repository')

function ThroughDirectory (Directory) {
  FS.readdirSync(Directory).forEach(File => {
    const Absolute = Path.join(Directory, File)
    if (FS.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute)
    else return Files.push(Absolute)
  })
}

ThroughDirectory('./public/albums')
console.log(Files)
const photos = Files.map(file => {
  const names = file.split('\\')
  return {
    album: names[2],
    name: names[3],
    path: `/albums/${names[2]}/${names[3]}`,
    raw: `http://localhost:8888/photos/${names[2]}/${names[3]}`
  }
})
console.log(photos)

db.connect(async () => {
  await db.Photo.deleteMany({})
  photos.forEach(photo => {
    new db.Photo(photo).save(function (err, photo) {
      if (err) return console.error(err)
      console.log(photo)
    })
  })
})
