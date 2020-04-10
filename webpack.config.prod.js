const merger = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merger(base, {
  mode: 'production'
})
