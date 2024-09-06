const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY

const signToken = (payload) => {
  return jwt.sign(payload, secretKey)
}

const verifiedToken = (token) => {
  return jwt.verify(token, secretKey)
}

module.exports = { signToken, verifiedToken }