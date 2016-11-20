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

    console.log(project)
    Project.create({
      creator: {
        _id: req.user._id,
        username: req.user.username
      },
      name: project.name,
      description: project.description
    }).then(savedProject => {
      console.log(savedProject._id)
      console.log(req.user._id)
      User.update({_id: req.user._id},
        { projects: {
          _id: savedProject._id }
        },
        (err) => {
          console.log(err)
        }

      )
    })
  }
}
