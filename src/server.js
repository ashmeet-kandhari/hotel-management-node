import app from './app'
import '@babel/polyfill'
import config from './config'

async function main () {
  const port = process.env.PORT || config.port || 7557
  app.listen(port)
  console.log('server run on ' + port)
}

main()
