const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
  {
    blog: {
      type: String,
      required: true,
    },
    user : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('BlogPost', blogSchema)
