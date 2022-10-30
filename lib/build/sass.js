const sass = require('node-sass')
const fs = require('fs-jetpack')

async function buildSass () {
  const result = sass.renderSync({
    file: 'src/sass/app.scss',
    outputStyle: 'compressed'
  })
  fs.write('dist/css/style.css', result.css)
}

module.exports = buildSass
