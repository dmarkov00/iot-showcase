module.exports = (req, res) => {
  console.log(req.query.q)
  let query = req.query
  console.log(query)
  res.render('search/search', {'query': query})
}
