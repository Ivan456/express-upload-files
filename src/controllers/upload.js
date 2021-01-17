const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { Photo } = require('../repository')
const router = express.Router()

const upload = multer({
  dest: 'public/albums'
})

router.put('/',
  upload.single('documents' /* name attribute of <file> element in your form */),
  (req, res, next) => {
    if (!req.body.album) next(new Error('Bad request'))
    next()
  },
  (req, res, next) => {
    const tempPath = path.join(
      __dirname,
      '../../',
      req.file.path
    )
    const album = req.body.album.toLowerCase()
    const filename = req.file.filename + '.' + req.file.originalname.split('.')[1]
    const targetPath = path.join(
      __dirname,
      `../../public/albums/${
        album
      }/${
        filename
      }`
    )

    fs.rename(tempPath, targetPath, err => {
      if (err) return next(err)
      const photo = {
        album,
        name: filename,
        path: `/albums/${album}/${
          filename
        }`,
        raw: `http://localhost:8888/photos/${album}/${
          filename
        }`
      }
      new Photo(photo).save(function (err, photo) {
        if (err) return next(err)
      })
      res
        .status(200)
        .json({
          message: 'OK',
          data: [photo]
        })
    })
  }
)

module.exports = router
