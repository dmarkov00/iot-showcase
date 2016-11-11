const controllers = require('../controllers')
const auth = require('../config/auth')
module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/yourprojects', controllers.yourProjects.all)

  app.get('/users/register', controllers.users.register)

  app.get('/users/login', (req, res) => {
    res.render('users/login')
  })
  app.post('/users/login', controllers.users.authenticate)

  app.get('/users/profile', (req, res) => {
    res.render('users/profile')
  })

  app.post('/users/create', controllers.users.create)
  app.post('/users/logout', controllers.users.logout)

  app.get('/articles/create', auth.isAuthenticated, controllers.articles.create)

  app.all('*', (req, res) => {
    res.render('errors/error.pug')
    res.end()
  })
}
