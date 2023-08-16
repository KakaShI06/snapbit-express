const jwt = require('jsonwebtoken')
const userModel = require('../models/userModals')

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.NODE_JWT_SECRET)

      req.user = await userModel.findById(decoded.id).select('-password')

      next()
    } catch (err) {
      console.error('error:', err)
      res.status(401).json({ message: 'Not Authorized' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not Authorized' })
  }
}

module.exports = protect
