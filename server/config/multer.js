const multer = require('multer')

module.exports = {
  upload: (req, res, next) => {
    let upload = multer({ dest: 'uploads/' })
    upload.any()
    console.log(req.files)
    console.log(req.body)
    
    next()
  }
}
