import bcrypt from 'bcrypt'
import config from '../config'
import { authenticate } from '../services/auth'
import { addUser, getUserByUserName } from '../services/user'
import { getAllRoles } from '../services/roles'
import { get, set } from '../middlewares/cache'

export const login = (req, res) => {
  return authenticate(req.body)
    .then(token =>
      res.json({
        token
      })
    )
    .catch(err =>
      res.status(401).json({
        message: err.message
      })
    )
}

export const register = (req, res) => {
  const username = req.body.username

  return getUserByUserName(username || '').then(async exists => {
    if (exists) {
      return res.status(409).json({
        message:
          'Registration failed. User with this username already registered.'
      })
    }

    let roles = get('roles')
    if (!roles) {
      const newRoles = await getAllRoles()
      if (newRoles) {
        set('roles', newRoles)
        roles = newRoles.map(i => i.role)
      } else {
        return res.status(500).json({ message: 'Some issue with roles table' })
      }
    }

    if (!roles.includes(req.body.role)) {
      return res.status(400).json({ message: 'Enter correct role' })
    }

    const user = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, config.saltRounds)
    }
    return addUser(user).then(() => res.status(201).json({ success: true }))
  })
}
