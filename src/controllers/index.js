const express = require('express')
const router = express.Router()
const { Photo } = require('../repository')
const upload = require('./upload')
const photoDeleteRouter = require('./delete')

module.exports.router = router

router.use('/photos', express.static('./public/albums'))
router.use('/photos', upload)
router.use(photoDeleteRouter)

router.get('/health', function (req, res) {
  res.json({
    message: 'OK'
  })
})

router.post('/photos/list', function (req, res) {
  Photo.find(function (err, photos) {
    if (err) return console.error(err)
    return res.json({
      message: 'OK',
      documents: photos
    })
  })
})

router.get('/photos/:album/:filename', function (req, res, next) {
  const isNotValid = ['album', 'filename'].every(key => !req.params[key])
  if (isNotValid) next(new Error('Bad request'))
  Photo.findOne({
    album: req.params.album,
    name: req.params.filename
  }, function (err, photos) {
    if (err) return console.error(err)
    return res.json(photos)
  })
})

router.use((req, res, next, err) => {
  console.error(err)

  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!')
})
