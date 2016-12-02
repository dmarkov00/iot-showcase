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
    // console.log(req.files)

    Project.create({
      creator: {
        _id: req.user._id,
        username: req.user.username
      },
      name: project.name,
      description: project.description
    }).then(savedProject => { // adding reference to the user with the newly created project
      User.update({_id: req.user._id}, // select which user to update
        {$push: {projects: { _id: savedProject._id }}}, // what to update $push is for not overwriting the previous entries
        (err) => {
          if (err) {
            console.log(err)
            res.render('errors/error') // TODO: pass error object
          } else {
            res.redirect('/')
          }
        })
    }, (err) => {
      if (err) {
        console.log('problem with inserting into projects')
      }
    })
  },
  details: (req, res) => {
    let projectName = req.params.name
    let creatorName = req.params.creator
    Project.findOne({'name': projectName, 'creator.username': creatorName})
      .exec((err, project) => {
        if (err) {
          console.log(err)
        }
        console.log(project)
        res.render('projects/details', project)
      })
  // may not pass the whole project object
  // pass just the params and query for the whole object
  }
}
