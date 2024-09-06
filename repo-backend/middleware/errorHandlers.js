const errorHandler = (error, req, res, next) => {
  let status = 500
  let message = 'Internal Server Error'
  console.log(error);

  if (error.name === 'SequelizeValidationError') {
    status = 400
    message = error.errors[0].message
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    status = 400
    message = error.errors[0].message
  }

  if (error.name === 'SequelizeDatabaseError' || error.name === 'SequelizeForeignKeyConstraintError') {
    status = 400
    message = 'Invalid or wrong input (400)'
  }

  if (error.name === 'InvalidLogin') {
    message = 'Please insert your username, email or password (400)'
    status = 400
  }

  if (error.name === 'LoginError') {
    message = 'Invalid or wrong username, email or password (401)'
    status = 401
  }

  if (error.name === 'Unauthorized' || error.name === 'JsonWebTokenError') {
    message = 'Please login first (401)'
    status = 401
  }

  if (error.name === 'Forbidden') {
    message = 'Access denied (403)'
    status = 403
  }

  if (error.name === 'NotFound') {
    status = 404
    message = `Not found (404)`
  }

  res.status(status).json({
    message
  })
}

module.exports = errorHandler