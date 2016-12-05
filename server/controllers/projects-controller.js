let mongoose = require('mongoose')
let Project = mongoose.model('Project')
let User = mongoose.model('User')
module.exports = {
  add: (req, res) => {
    res.render('projects/add')
  },
  edit: (req, res) => {
    let user = req.user

    User.findOne({_id: user._id}, 'projects contributesTo') // selects only the projects and contributesTo for the current user
      .populate('projects._id', 'name description creator') // selects only the specified fieds
      .exec((err, user) => {
        if (err) { console.log(err) } else {
          // console.log(user)
          res.render('projects/edit', { 'projects': user.projects })
        }
      })
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
        console.log(err + ' problem with inserting into projects')
      }
    })
  },
  remove: (req, res) => {
    let projectName = req.params.name

    Project.find({ 'name': projectName, 'creator._id': req.user._id })
      .exec((err, project) => {
        if (err) {
          console.log(err)
        }
        console.log(project)
        User.update({_id: req.user._id},
          {$pull: {projects: { _id: project._id }}},
          (err) => {
            if (err) {
              console.log(err)
              res.render('errors/error') // TODO: pass error object
            } else {
              res.redirect('/projects/edit')
            }
          })
      })

    Project.remove({ 'name': projectName, 'creator._id': req.user._id })
      .exec((err, result) => {
        if (err) {
          console.log(err)
        }
        res.redirect('/projects/edit')
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
  }
}
