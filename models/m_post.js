const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user", // user 為 collection 名稱
      required: [true, 'user Id 未瑱寫']
    },
    tags: [
      {
        type: String,
        required: [true, '標籤(tags)未填寫'],
      }
    ],
    type: {
      type: String,
      required: [true, '文章類型(type)未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: true
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    likes: [{ type: String }],
    comments: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'post'
  })

const Post = mongoose.model('post', postSchema)

module.exports = Post