const { User } = require("../models")

const authorization = async (req, res, next) => {
  try {
    const { userId, role } = req.loginInfo

    if (role === "staff") {
      const findUser = await User.findByPk(userId)

      if (!findUser) {
        throw { name: `Forbidden` }
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authorization