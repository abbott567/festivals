import compileCSS from './sass.mjs'
import buildClientJS from './client-js.mjs'

function runBuild () {
  compileCSS()
  buildClientJS()
}

export default runBuild()
