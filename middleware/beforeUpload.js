const multer = require('multer')
const path = require('path')

const beforeUpload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024 // 3MB
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() // 抓出附檔名
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb(new Error('檔案格式錯誤！'))
    }

    cb(null, true)
  }
}).any()

module.exports = beforeUpload