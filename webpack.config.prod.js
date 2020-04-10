const webpack = require('webpack')
const { smart } = require('webpack-merge')
const base = require('./webpack.config.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const smp = new SpeedMeasurePlugin()

const config = smart(base, {
  mode: 'production',

  devtool: 'source-map',

  plugins: [
    new OptimizeCssPlugin(),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**']
    }),

    new webpack.DefinePlugin({
      DEV: JSON.stringify('production')
    }),

    new BundleAnalyzerPlugin,
  ]
})

module.exports = smp.wrap(config)
