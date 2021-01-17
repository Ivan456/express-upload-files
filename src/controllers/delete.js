const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()
const { Photo } = require('../repository')

module.exports = router

async function deletePhoto ({ album, filename }) {
  const targetPath = path.join(
    __dirname,
    `../../public/albums/${
      album
    }/${
      filename
    }`
  )

  await fs.unlink(targetPath)
  await Photo.deleteOne({
    album: album,
    name: filename
  })
}

router.delete('/photos/:album/:filename', function (req, res, next) {
  const isNotValid = ['album', 'filename'].every(key => !req.params[key])
  if (isNotValid) next(new Error('Bad request'))
  deletePhoto({
    filename: req.params.filename,
    album: req.params.album.toLowerCase()
  })
    .then(() => res.json({
      message: 'OK'
    }))
    .catch(next)
})

router.delete('/photos', function (req, res, next) {
  const promises = []
  req.body.forEach(({ documents, album }) => {
    if (!documents || !album) next(new Error('Bad request'))
    documents.split(',').forEach(filename => {
      promises.push(deletePhoto({
        filename: filename.trim(),
        album: album.toLowerCase()
      }))
    })
  })
  Promise.all(promises)
    .then(() => res.json({
      message: 'OK'
    }))
    .catch(next)
})
