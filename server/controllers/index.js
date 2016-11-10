let homeController = require('./home-controller')
let usersController = require('./users-controller')
let articlesController = require('./articles-controller')
let yourProjectsController = require('./yourprojects-controller')

module.exports = {
  home: homeController,
  yourProjects: yourProjectsController,
  users: usersController,
  articles: articlesController
}
