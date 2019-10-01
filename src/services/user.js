import User from '../models/user'

export const addUser = user => User.create(user)

export const getUserByUserName = username => User.findByPk(username)
