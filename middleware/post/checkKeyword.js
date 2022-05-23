const appError = require('../../service/appError')
const checkKeyword = (req, res, next) => {
  if (req.query.q) {
    next()
  } else {
    appError(400, '請輸入關鍵字?q=xxx', next)
  }
}


module.exports = checkKeyword