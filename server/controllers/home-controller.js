const mongoose = require('mongoose')
let User = mongoose.model('User')

module.exports = {
  index: (req, res) => {
    if (!req.user) {
      console.log(req.user)
      res.render('home/index')
    } else {
      console.log(req.user)
      let user = req.user
      User.findOne({_id: user._id})
      .populate('projects._id')
      .exec((err, user) => {
        if (err) { console.log(err) } else {
          // console.log(user.projects)
          res.render('home/authenticated', { 'projects': user.projects })
        }
      })
    }
  }
}
