const webpack = require('webpack')
const merger = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = merger(base, {
  mode: 'development',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      DEV: JSON.stringify('development')
    })
  ]
})
