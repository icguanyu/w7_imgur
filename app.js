const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const resError = require('./service/resError')

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');

require('./connection')

const app = express();

process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  // 須放在最上面
  console.error('程式出現重大錯誤 Uncaughted Exception！')
  console.error(err);
  process.exit(1);
});

// 有使用到非同步 但未處理 catch 時 
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);
});



app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/post', postsRouter);
app.use('/user', userRouter)
app.use('/upload', uploadRouter)


app.use(function (req, res, next) {
  res.status(404).json({
    status: "false",
    message: "您的路由不存在"
  })
})



app.use(function (err, req, res, next) {
  const env = process.env.NODE_ENV // 再透過 resError 針對 開發(dev) 與 上線(prod) 環境作區別
  err.statusCode = err.statusCode || 500

  if (env === 'dev') {
    return resError.dev(err, res)
  }
  return resError.prod(err, res)
})

module.exports = app;
