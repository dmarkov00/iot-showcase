const mongoose = require('mongoose')

let videoSchema = mongoose.Schema({
  _projectId: {type: Number, ref: 'User'}
})

let Video = mongoose.model('Image', videoSchema)

module.exports = Video
