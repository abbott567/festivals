import buildSass from '../build/sass.mjs'
import compileJS from '../build/client-js.mjs'
import watch from '../dev/watch.mjs'
import browserSync from '../dev/browser-sync.mjs'
import nodemon from '../dev/nodemon.mjs'

function runDev () {
  buildSass()
  compileJS()
  watch()
  browserSync()
  nodemon()
}

runDev()
