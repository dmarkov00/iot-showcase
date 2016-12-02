const fs = require('fs')
const path = require('path')
const imagesDir = path.join(__dirname, '../../private')

module.exports = {
  createDir: (path, dirName) => {
    fs.mkdirSync(imagesDir + path + dirName)
  }
}
