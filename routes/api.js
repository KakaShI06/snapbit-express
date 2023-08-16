const express = require('express')
const router = express.Router()

const blogPost = require('../models/blogs')

router.get('/snapbit', (req, res) => {
  res.status(200).json({ success: true, message: 'Snapbit is up and running' })
})

router.post('/snapbit', (req, res) => {
  res.status(200).json({ success: true, message: `Response Running` })
})

router.get('/get/blogs', async (req, res) => {
  const blogs = await blogPost.find()
  res.status(200).json(blogs)
})

router.post('/create/blogs', async (req, res) => {
  if (!req?.body?.blog) {
    res.status(400).json({ success: false, message: 'Cannot find blog' })
    // throw new Error('Please Add Blog')
  }

  const blogs = await blogPost.create({
    blog: req.body.blog,
    user: req.body.user ? req.body.user : 'ujjval.priyadarshi',
  })
  res.status(200).json(blogs)
})

router.put('/update/blogs', async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ success: false, message: 'Please Specify your ID' })
  }

  if (!req.body.blog) {
    res
      .status(400)
      .json({ success: false, message: 'Please write something to edit blog' })
  }

  const blog = {
    blog: req.body.blog,
  }

  blogPost
    .findOneAndUpdate({ _id: req.body.id }, blog, { new: true })
    .then((updatedDocument) => {
      if (updatedDocument) {
        res
          .status(200)
          .json({ success: true, message: 'Successfully found and Updated' })
      } else {
        res
          .status(404)
          .json({ success: false, message: 'Cannot find a blog post' })
      }
    })
    .catch((error) => {
      console.error('Error in updating document:', error)
      res
        .status(500)
        .json({ success: false, message: 'Error in updating the blog post' })
    })
})

router.delete('/delete/blogs', async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ success: false, message: 'Please Specify your ID' })
  }

  blogPost
    .findOneAndDelete({ _id: req.body.id })
    .then((deletedDocument) => {
      if (deletedDocument) {
        res
          .status(200)
          .json({ success: true, message: 'Successfully found and Deleted' })
      } else {
        res
          .status(404)
          .json({ success: false, message: 'Cannot find a blog post' })
      }
    })
    .catch((error) => {
      console.error('Error deleting document:', error)
      res
        .status(500)
        .json({ success: false, message: 'Error in deleting the blog post' })
    })
})

module.exports = router
