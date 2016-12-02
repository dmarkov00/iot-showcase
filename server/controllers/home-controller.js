const mongoose = require('mongoose')
let User = mongoose.model('User')

module.exports = {
  index: (req, res) => {
    if (!req.user) {
      res.render('home/index')
    } else {
      let user = req.user
      User.findOne({_id: user._id}, 'projects') // select only the projects for the current user
      .populate('projects._id', 'name description creator') // select only the specified fieds
      .exec((err, user) => {
        if (err) { console.log(err) } else {
          console.log(user)
          console.log('--------------')
          
          console.log(user.projects)
          res.render('home/authenticated', { 'projects': user.projects })
        }
      })
    }
  }
}
