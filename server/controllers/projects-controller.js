let mongoose = require('mongoose')
let Project = mongoose.model('Project')
let User = mongoose.model('User')
module.exports = {
  add: (req, res) => {
    res.render('projects/add')
  },
  edit: (req, res) => {
    res.render('projects/edit')
  },
  statistics: (req, res) => {
    res.render('projects/statistics')
  },
  create: (req, res) => {
    let project = req.body

    Project.create({
      creator: {
        _id: req.user._id,
        username: req.user.username
      },
      name: project.name,
      description: project.description
    }).then(savedProject => {
      User.update({_id: req.user._id},
        {$push: {projects: { _id: savedProject._id }}},
        (err) => {
          if (err) {
            console.log(err)
            res.render('errors/error')
          } else { res.render('home/index') }
        })
    }, (err) => {
      if (err) {
        console.log('problem with inserting into projects')
      }
    })
  }
}
