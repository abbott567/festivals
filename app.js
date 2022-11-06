require('dotenv').config()

// Core dependencies
const express = require('express')
const path = require('path')

// Build dist
// -- Sass
const buildSass = require('./lib/build/sass')
buildSass()
// -- Webpack
const buildWebpack = require('./lib/build/webpack')
buildWebpack()

// Application
const app = express()

// Express Middleware
// -- Static routes
app.use(express.static('dist'))
// -- Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true, strict: true }))
// -- Cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// -- Sessions
const sessions = require('express-session')
app.use(sessions({
  secret: 'something',
  saveUninitialized: true,
  cookie: { maxAge: (1000 * 60 * 60 * 24) },
  resave: false
}))

// Configure Nunjucks
const nunjucks = require(path.resolve('lib/nunjucks/config'))
nunjucks.setup(app)

// Routing
const routes = require(path.resolve('lib/routes/pages'))
const autoRoutes = require(path.resolve('lib/routes/auto'))

// Error Handler
if (process.env.NODE_ENV !== 'production') {
  const errorhandler = require('errorhandler')
  app.use(errorhandler())
}

// Middlewares
const events = require('./lib/data/events')
app.use((req, res, next) => {
  if (req.session.data === undefined) req.session.data = {}
  res.locals.body = req.body
  res.locals.events = events
  res.locals.data = req.session.data
  res.locals.env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
  next()
})

// Use routes
app.use(routes)
app.use(autoRoutes)

// Start server
const serverStart = require(path.resolve('lib/server/start'))
serverStart(app)

module.exports = app
