import jwt from 'jsonwebtoken'
import config from '../config'

export const checkAuth = (req, res, next) => {
  const token = req.headers.Authorization
  if (!token) {
    return res
      .status(403)
      .send({ auth: false, message: 'Bearer token missing.' })
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
    req.user = {
      username: decoded.username,
      role: decoded.role
    }
    next()
  })
}

export const checkAuthorization = roles => {
  return (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: 'Bearer token missing.' })
    }

    token = token.slice(7, token.length)

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' })
      }
      if (roles.indexOf(decoded.role) > -1) {
        return next()
      }

      return res
        .status(401)
        .json({ error: 'You are not authorized for this operation' })
    })
  }
}
