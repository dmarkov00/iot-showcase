const mongoose = require('mongoose')
const Video = mongoose.model('Video')
const Image = mongoose.model('Image')

let projectSchema = mongoose.Schema({
  name: {type: String, required: true},
  stars: {type: Number},
  gitRepository: {type: String},
  videos: [Video],
  images: [Image],
  description: {type: String}

})

let Project = mongoose.model('Project', projectSchema)

module.exports = Project
