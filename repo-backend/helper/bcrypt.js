const bcrypt = require('bcryptjs')

const passwordHash = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

const compare = (password, hashed) => {
  return bcrypt.compareSync(password, hashed)
}

module.exports = { passwordHash, compare }