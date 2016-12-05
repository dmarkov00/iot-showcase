let homeController = require('./home-controller')
let usersController = require('./users-controller')
let aboutController = require('./about-controller')
let projectsController = require('./projects-controller')
let searchController = require('./search-controller')
module.exports = {
  home: homeController,
  users: usersController,
  about: aboutController,
  projects: projectsController,
  search: searchController
}
