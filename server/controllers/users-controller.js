let encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')
const emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let errorMessages = []
module.exports = {
  login: (req, res) => {
    res.render('users/login')
  },
  register: (req, res) => {
    res.render('users/register')
  },
  profile: (req, res) => {
    res.render('users/profile')
  },
  create: (req, res) => {
    let user = req.body

    // validating user input from the form
    if (user.password === '' || user.confirmPassword === '' || user.username === '' || user.email === '') {
      errorMessages.push('All fields are required.')
    } if (!emailRegularExpression.test(user.email)) {
      errorMessages.push("That doesn't appear to be a valid email address.")
    } if (user.password !== user.confirmPassword) {
      errorMessages.push('Passwords do not match.')
    } if (user.password < 4) {
      // TODO: add better validation for password(regex for strong password)
      errorMessages.push('Password too short.')
    } if (user.username < 4) {
      errorMessages.push('Username too short.')
      user.errorMessages = errorMessages
    } if (errorMessages.length === 0) {
      user.salt = encryption.generateSalt()
      user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

      User.create(user).then(user => {
        // if (err) errorMessages.push(err)

        req.logIn(user, (err, user) => {
          if (err) {
            user.errorMessages = err
            res.render('users/register', user)
            return
          }

          res.redirect('/')
        })
      })
    } else {
      return res.render('users/register', user)
    }
  },
  authenticate: (req, res) => { // called on user login request
    let inputUser = req.body

    User.findOne({ email: inputUser.email })
      .then(user => {
        if (user === null || !user.authenticate(inputUser.password)) { // the method authenticate comes from the user model
          res.render('users/login', { globalError: 'Invalid username or password' })
        } else {
          req.logIn(user, (err, user) => { // method comes from passport, it attaches it to the reques object
            if (err) {
              res.render('users/login', {globalError: 'Internal server error'})
              return
            }
            res.redirect('/')
          })
        }
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
