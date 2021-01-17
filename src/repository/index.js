const mongoose = require('mongoose')
const db = mongoose.connection
const { connectionString } = require('../../config')
const Photo = require('./Photo')

module.exports.Photo = Photo
module.exports.connect = (cb) => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('Connected to DB!')

    cb()
  })
}
