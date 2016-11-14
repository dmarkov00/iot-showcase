module.exports = {
  add: (req, res) => {
    res.render('projects/add')
  },
  edit: (req, res) => {
    res.render('projects/edit')
  },
  statistics: (req, res) => {
    res.render('projects/statistics')
  }
}
