const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入您的名字']
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      select: false
    },
    sex: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not supported',
      }
    },
    note: String,
    photo: String,
    password: {
      type: String,
      required: [true, '請輸入密碼，至少8碼'],
      minlength: 8,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    collection: 'user',
  }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
