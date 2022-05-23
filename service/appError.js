const appError = (code, message, next) => {
  const err = new Error(message)
  err.statusCode = code
  err.isOperational = true
  next(err)
}

module.exports = appError