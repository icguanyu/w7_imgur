const appError = require('../service/appError')
const jwt = require('jsonwebtoken');
const User = require('../models/m_user')

const isAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(appError(401, '請先登入', next));
  }

  try {
    // 驗證token
    // const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
          reject(err)
        } else {
          resolve(payload)
        }
      })
    })
    const currentUser = await User.findById(decoded.id);

    req.user = currentUser; // 將 user 放回 req
    next()
  } catch (error) {
    if (error.message == 'invalid signature') {
      return next(appError(401, '憑證過期，請重新登入', next));
    }
    next(error)
  }


}
module.exports = isAuth