import Sequelize from 'sequelize'
import { db } from '../database/database'

const modelDefinition = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  role: {
    type: Sequelize.TEXT
  }
}

const modelOptions = {
  timestamps: false,
  freezeTableName: true
}

const Roles = db.define('roles', modelDefinition, modelOptions)

export default Roles
