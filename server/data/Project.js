const mongoose = require('mongoose')

// let imageSchema = require('./Image').schema
// let videoSchema = require('./Video').schema

// let userSchema = require('./User')

let projectSchema = mongoose.Schema({
  creator: {
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: {type: String}
  },  // ObjectId, Number, String, and Buffer are valid for use as refs.
  name: {type: String, required: true},
  stars: {type: Number},
  gitRepository: {type: String},
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  description: {type: String},
  contributors: [String] // array of usernames

})

let Project = mongoose.model('Project', projectSchema)

module.exports = Project
