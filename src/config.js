const port = 7557
const dbConnectionString =
  'postgres://username:password@localhost:5432/hotel_management'
const dialect = 'postgres'
const saltRounds = 2
const jwtSecret = 'yo-its-a-secret'
const tokenExpireTime = '6h'

const config = {
  port,
  dbConnectionString,
  dialect,
  saltRounds,
  jwtSecret,
  tokenExpireTime
}

export default config
