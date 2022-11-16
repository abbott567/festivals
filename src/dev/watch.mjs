import colours from 'colors'
import watch from 'node-watch'
import compileCSS from '../build/sass.mjs'
import compileJS from '../build/client-js.mjs'

function watchSass () {
  console.log(colours.yellow('Watching src/app/sass for changes'))
  watch('src/app/sass', { recursive: true }, (evt, name) => {
    console.log(colours.yellow(`${name} changed.`))
    compileCSS()
  })
}

function watchFrontendJS () {
  console.log(colours.yellow('Watching src/app/client for changes'))
  watch('src/app/client', { recursive: true }, (evt, name) => {
    console.log(colours.yellow(`${name} changed.`))
    compileJS()
  })
}

function watchAll () {
  watchSass()
  watchFrontendJS()
}

export default watchAll
