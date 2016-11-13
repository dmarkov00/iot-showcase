const mongoose = require('mongoose')

let imageSchema = mongoose.Schema({
  _uploaderId: {type: Number, ref: 'User'},
  _projectId: {type: Number, ref: 'Project'},
  name: {type: String}

})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image
