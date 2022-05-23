const handleErrorAsync = function (func) {
  // func = async
  // async 本身就是一個 promise
  return function (req, res, next) {
    func(req, res, next).catch(err => {
      return next(err)
    })
  }
}
// mongoose 捕捉必填欄位 (捕捉未定義 catch)
module.exports = handleErrorAsync