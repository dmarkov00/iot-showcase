const mongoose = require('mongoose')

let imageSchema = mongoose.Schema({
  _uploaderId: {type: Number, ref: 'User'},
  _projectId: {type: Number, ref: 'Project'},
  url: {type: String, required: true, unique: true},
  name: {type: String},
  extension: {},
  dateUploaded: { type: Date, default: new Date() }

})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image
