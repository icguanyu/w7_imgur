

const appError = require('../service/appError')
const handleSuccess = require('../service/handleSuccess')
const { ImgurClient } = require('imgur')

const upload = {
  uploadSingleImage: async (req, res, next) => {
    const file = req.files[0]
    if (!file) {
      return appError(400, "你的檔案勒?", next);
    }

    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENT_ID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    })

    const response = await client.upload({
      image: file.buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID // 指定相簿
    })

    handleSuccess(res, {
      size: response.data.size,
      imgUrl: response.data.link
    })
  }
}

module.exports = upload