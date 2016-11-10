let homeController = require('./home-controller')
let usersController = require('./users-controller')
let articlesController = require('./articles-controller')

module.exports = {
  home: homeController,
  about: homeController,
  users: usersController,
  articles: articlesController
}
