
const resError = {
  // production error response (正式)
  prod: (err, res) => {
    if (err.isOperational) { // 若是可預期的
      res.status(err.statusCode).json({
        message: err.message,
      });
    } else { // 若是其他不可預期的
      res.status(500).json({
        message: '系統發生不可預期錯誤，請稍後嘗試。若經常出現此訊息，請恰系統管理員',
      });
    }

  },
  // development error response
  dev: (err, res) => {
    console.log('(resError.js)');
    res.status(err.statusCode).json({
      message: err.message,
      // stack: err.stack　// dev用 若有需要可顯示 stack
    });
  }
}

module.exports = resError