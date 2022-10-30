const config = require('../../webpack.config')
const webpack = require('webpack')

const compiler = webpack(config)

function buildWebpack () {
  compiler.run((err, res) => {
    if (err) throw err
  })
}

module.exports = buildWebpack
