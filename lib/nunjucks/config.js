'use strict'

// Configure app to use Nunjucks
const nunjucks = require('nunjucks')
function setup (app) {
  app.set('view engine', 'njk')

  // Setup paths
  const path = require('path')
  const paths = [
    path.resolve(),
    path.resolve('src'),
    path.resolve('src', 'views')
  ]

  // Setup Nunjucks env
  const nunjucksEnvironment = nunjucks.configure(paths, {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true
  })

  // Add filter for date formatting
  const { format } = require('date-fns')
  nunjucksEnvironment.addFilter('formatDate', timestamp => {
    const date = new Date(timestamp)
    return format(date, 'd MMMM yyyy')
  })

  return app
}

module.exports = { setup }
