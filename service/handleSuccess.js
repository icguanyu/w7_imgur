const handleSuccess = (res, data) => {
  res.status(200).json({
    status: 'success',
    data: data
  })
}

module.exports = handleSuccess