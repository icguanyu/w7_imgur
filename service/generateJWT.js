
const jwt = require('jsonwebtoken');
const handleSuccess = require('../service/handleSuccess')


const generateJWT = (user, res) => {
  const { _id, name, sex, note } = user
  const token = jwt.sign({ id: _id, name, sex, note }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY
  });
  user.password = undefined; //防呆
  handleSuccess(res, { token, name, sex, note })
}


module.exports = generateJWT