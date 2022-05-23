const appError = require('../service/appError')
const handleSuccess = require('../service/handleSuccess')

const Post = require('../models/m_post')
const User = require('../models/m_user')

const posts = {
  search: async (req, res) => {
    const keyword = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    const posts = await Post.find(keyword)
    handleSuccess(res, { keyword: req.query.q, posts })

  },
  getData: async (req, res) => {
    const timeSort = req.query.timeSort == 'asc' ? 1 : -1
    const keyword = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    // asc 遞增(由小到大，由舊到新) createdAt ; 
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    let posts = await Post.find(keyword).populate({
      path: 'user',
      select: 'name photo'
    }).sort({ 'createdAt': timeSort })
    handleSuccess(res, { posts })
  },
  createPost: async (req, res, next) => {
    const data = req.body
    if (!data.user || !data.content) {
      return appError(400, '請留意必填欄位。', next)
    }
    // 自定義可預期 => appError -> app.use(err,...)
    // 捕捉未定義 => handleErrorAsync -> app.use(err,...)
    const newPost = await Post.create(
      {
        user: data.user,
        content: data.content,
        type: data.type,
        tags: data.tags,
        image: data.image
      }
    )
    handleSuccess(res, { newPost })
  },
  updatePost: async (req, res, next) => {
    const id = req.params.id
    const data = req.body

    if (!data.content) {
      return appError(400, '請確認必填欄位', next)
    }
    const post = await Post.findByIdAndUpdate(id, data, { new: true })
    // new:true 返回更新後的資料
    if (post !== null) {
      res.status(200).json({ post })
    } else {
      appError(400, '文章不存在', next)
    }

  },
  likePost: async (req, res) => {
    const id = req.params.id
    const { userId } = req.body
    const { likes } = await Post.findOne({ "_id": id })

    if (likes.includes(userId)) {
      await Post.findByIdAndUpdate(id, { $pull: { "likes": userId } })
      handleSuccess(res, { message: '已收回讚!' })
    } else {
      await Post.findByIdAndUpdate(id, { $addToSet: { "likes": userId } })
      handleSuccess(res, { message: '按讚成功!' })
    }
  },
  deletePost: async (req, res) => {
    const id = req.params.id
    const post = await Post.findByIdAndDelete(id)
    if (post !== null) {
      handleSuccess(res, { message: '刪除成功!' })
    } else {
      appError(400, '找不到文章', next)
    }
  }
}

module.exports = posts