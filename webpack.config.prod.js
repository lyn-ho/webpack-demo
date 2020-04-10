const webpack = require('webpack')
const merger = require('webpack-merge')
const base = require('./webpack.config.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merger(base, {
  mode: 'production',

  plugins: [
    new OptimizeCssPlugin(),

    new CleanWebpackPlugin(),

    new webpack.DefinePlugin({
      DEV: JSON.stringify('production')
    })
  ]
})
