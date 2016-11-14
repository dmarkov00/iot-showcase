const controllers = require('../controllers')
const auth = require('../config/auth')
module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/about', controllers.about)

  // User routes

  // routes that return user views
  app.get('/users/login', controllers.users.login)
  app.get('/users/register', controllers.users.register)
  app.get('/users/profile', controllers.users.profile)

  app.post('/users/login', controllers.users.authenticate)
  app.post('/users/register', controllers.users.create)
  app.post('/users/logout', controllers.users.logout)

  // Project routes

  // routes that return project views
  app.get('/projects/add', auth.isAuthenticated, controllers.projects.add)
  app.get('/projects/edit', auth.isAuthenticated, controllers.projects.edit)
  app.get('/projects/statistics', auth.isAuthenticated, controllers.projects.statistics)

  app.all('*', (req, res) => {
    res.render('errors/error.pug')
    res.end()
  })
}
