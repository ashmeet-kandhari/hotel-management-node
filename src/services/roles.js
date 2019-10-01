import Roles from '../models/roles'

export const getAllRoles = () =>
  Roles.findAll({ attributes: ['role'], raw: true })
