const controllers = require('../controllers')
const auth = require('../config/auth')
module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/about', controllers.about)

  // User routes
  app.get('/users/profile', (req, res) => {
    res.render('users/profile')
  })

  app.get('/users/login', (req, res) => {
    res.render('users/login')
  })
  app.post('/users/login', controllers.users.authenticate)

  app.get('/users/register', controllers.users.register)

  app.post('/users/create', controllers.users.create)
  app.post('/users/logout', controllers.users.logout)

  app.get('/articles/create', auth.isAuthenticated, controllers.articles.create)

  // Project routes

  // routes that return project views
  app.get('/projects/add', controllers.projects.add)
  app.get('/projects/edit', controllers.projects.edit)
  app.get('/projects/statistics', controllers.projects.statistics)

  app.all('*', (req, res) => {
    res.render('errors/error.pug')
    res.end()
  })
}
