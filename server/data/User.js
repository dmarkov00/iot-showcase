const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')
let requiredValidationMessage = '{PATH} is reqired'

let userSchema = mongoose.Schema({
  email: {type: String, requiredValidationMessage, unique: true},
  username: { type: String, required: requiredValidationMessage, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  profilePicture: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    if (encryption.generateHashedPassword(this.salt, password) ===
      this.hashedPass) { return true } else { return false }
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length === 0) {
      let salt = encryption.generateSalt()
      let hashedPass = encryption.generateHashedPassword(salt, 'Admin12')

      User.create({
        username: 'Admin',
        firstName: 'Admin',
        lastName: 'Baby',
        salt: salt,
        hashedPass: hashedPass,
        roles: ['Admin']

      })
    }
  })
}
