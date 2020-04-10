const webpack = require('webpack')
const { smart } = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const base = require('./webpack.config.base')

const smp = new SpeedMeasurePlugin()

const config = smart(base, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map', //开发环境下使用

  devServer: {
    port: '3000',  // 默认 8080
    hot: true,
    quiet: false,  // 默认不启用
    inline: true,  // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only',  // 终端仅打印 error
    // clientLogLevel: 'silent',  // 日志等级
    // compress: true,  // 是否启用 gzip 压缩
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      DEV: JSON.stringify('development')
    })
  ]
})

module.exports = smp.wrap(config)
