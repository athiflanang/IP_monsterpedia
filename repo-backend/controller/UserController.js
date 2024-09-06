const { compare } = require('../helper/bcrypt')
const { User } = require('../models')
const { signToken, verifiedToken } = require('../helper/jwt')
const { where } = require('sequelize')
const { OAuth2Client } = require('google-auth-library');


class UserController {
  static async login(req, res, next) {
    try {
      const { username, email, password } = req.body
      if (!username || !email || !password) throw { name: "InvalidLogin" }

      const loginUser = await User.findOne({
        where: {
          username,
          email
        }
      })

      if (!loginUser) throw { name: 'LoginError' }
      if (!compare(password, loginUser.password)) throw { name: 'LoginError' }

      const payload = {
        id: loginUser.id,
        email: loginUser.email,
        role: loginUser.role
      }

      const access_token = signToken(payload)
      res.status(200).json({
        message: "Success login",
        access_token
      })
    } catch (error) {
      next(error)
    }
  }

  static async googleAuth(req, res, next) {
    try {
      const { token } = req.headers
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_LOGIN_KEY
      })

      const payload = ticket.getPayload()
      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: {
          username: payload.email
        },
        defaults: {
          username: payload.email,
          email: payload.email,
          password: "password_google"
        },
        hooks: false
      })

      const access_token = signToken({
        id: user.id,
        username: user.username,
        email: user.email
      })

      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController