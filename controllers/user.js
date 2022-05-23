const bcrypt = require('bcryptjs')
const validator = require('validator')
const User = require('../models/m_user')
const appError = require('../service/appError')
const generateJWT = require('../service/generateJWT');




const user = {
  get: async (req, res) => {
    let users = await User.find()
    res.status(200).json({ users })
  },
  sign_up: async (req, res, next) => {
    // 先進行各種可預期的自訂錯誤阻擋
    let { name, email, password, confirmPassword, sex, note } = req.body
    let isExisted = await User.findOne({ email: email })   // user重複

    if (!name || !email || !password || !confirmPassword) {
      return appError(400, '請留意必填欄位', next)
    }
    if (password !== confirmPassword) {
      return appError(400, '密碼確認不一致', next)
    }
    if (!validator.isEmail(email)) {
      return appError(400, '信箱格式錯誤', next)
    }
    if (!validator.isLength(password, { min: 6 })) {
      return appError(400, '密碼至少6個字元', next)
    }
    if (isExisted !== null) {
      return appError(400, 'Email已被註冊', next)
    }

    // bcrypt加密
    password = await bcrypt.hash(password, 12)
    const newUser = await User.create({ email, password, name, sex, note })
    generateJWT(newUser, res) // res
  },
  sign_in: async (req, res, next) => {
    // 先進行各種可預期的自訂錯誤阻擋
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!email || !password) {
      return appError(400, '請留意必填欄位', next)
    }
    if (user == null) {
      return appError(400, '查無此人，此Email尚未註冊', next)
    }
    const auth = await bcrypt.compare(password, user.password) // 傳入的 與 user的
    if (!auth) {
      return appError(400, '密碼錯誤', next)
    }
    generateJWT(user, res) // res
  },
  updatePassword: async (req, res, next) => {
    let { newPassword, newPasswordConfirm } = req.body
    if (!newPassword || !newPasswordConfirm) {
      return appError(400, '請留意必填欄位', next)
    }
    if (newPassword !== newPasswordConfirm) {
      return appError(400, '新密碼確認不一致', next)
    }
    // 新密碼加密
    newPassword = await bcrypt.hash(newPassword, 12);
    // req.user 來自中介 isAuth 給的
    const user = await User.findByIdAndUpdate(req.user.id, {
      password: newPassword
    });
    generateJWT(user, res)
  },
  profile: async (req, res, next) => {
    // 已在 middleware isAuth 取得 user (req.user)
    res.status(200).json({
      status: 'success',
      user: req.user
    });
  }

}

module.exports = user