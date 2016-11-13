const mongoose = require('mongoose')
// const Video = mongoose.model('Video')
// const Image = mongoose.model('Image')
// const User = mongoose.model('User')

let projectSchema = mongoose.Schema({
  _creatorId: {type: Number, ref: 'User'},
  name: {type: String, required: true},
  stars: {type: Number},
  gitRepository: {type: String},
  videos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}],
  images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
  description: {type: String},
  contributors: [{type: Number, ref: 'User'}]

})

let Project = mongoose.model('Project', projectSchema)

module.exports = Project
