const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userModel = require('../models/userModals')
const protect = require('../middleware/authMiddleware')

function generateToken(id) {
  return jwt.sign({ id }, process.env.NODE_JWT_SECRET, {
    expiresIn: '30d',
  })
}

router.get('/getAllUsers', protect, async (req, res) => {
  const users = await userModel.find()
  res.status(200).json(users)
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}

  const user = await userModel.findOne({ email })

  const comparedPassword = await bcrypt.compare(password, user.password)

  if (user && comparedPassword) {
    res.json({
      success: true,
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  }

  res.status(500).json({ message: 'Invalid Credentials', success: false })
})

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body || {}
  if (!name || !email || !password) {
    res.status(500).json({ success: false, message: 'All filled all field' })
  }

  const userExist = await userModel.findOne({ email })

  if (userExist) {
    res.status(500).json({ success: false, message: 'User Already Exists' })
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)

  const user = await userModel.create({
    name,
    email,
    password: hashedPass,
  })

  if (user) {
    res.status(200).json({
      message: 'User is successfully registered',
      success: true,
      name: user.name,
      id: user._id,
      token: generateToken(user._id),
    })
  }

  res.status(500).json({
    message: 'User Creating is failed! Please try again later!',
    success: false,
  })
})

module.exports = router
