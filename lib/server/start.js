'use strict'

const http = require('http')
const path = require('path')
const serverPort = require(path.resolve('lib/server/port'))
const serverErrorHandler = require(path.resolve('lib/server/port'))

const port = serverPort(process.env.PORT)

module.exports = function serverStart (app) {
  const server = http.createServer(app)
  serverErrorHandler(server)
  server.listen(port)
  console.log(`Listening on http://localhost:${port}`)
  return server
}
