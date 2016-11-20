const mongoose = require('mongoose')

let videoSchema = mongoose.Schema({
  _uploaderId: {type: Number, ref: 'User'},
  _projectId: {type: Number, ref: 'Project'},
  name: {type: String}
})

let Video = mongoose.model('Video', videoSchema)

module.exports = Video
