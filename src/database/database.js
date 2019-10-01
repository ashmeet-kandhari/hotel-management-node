import Sequelize from 'sequelize'
import config from '../config'

export const db = new Sequelize(config.dbConnectionString, {
  dialect: config.dialect,
  logging: false
})

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
