const webpack = require('webpack')
const { smart } = require('webpack-merge')
const base = require('./webpack.config.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()

const config = smart(base, {
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    new OptimizeCssPlugin(),

    new CleanWebpackPlugin(),

    new webpack.DefinePlugin({
      DEV: JSON.stringify('production')
    })
  ]
})

module.exports = smp.wrap(config)
