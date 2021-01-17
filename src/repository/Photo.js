const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  album: String,
  name: String,
  path: String,
  raw: String
})
photoSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

photoSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Photo', photoSchema)
