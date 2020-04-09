const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const config = require('./public/config')[isDev ? 'dev' : 'build']

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map', //开发环境下使用

  devServer: {
    port: '3000',  // 默认 8080
    quiet: false,  // 默认不启用
    inline: true,  // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only',  // 终端仅打印 error
    clientLogLevel: 'silent',  // 日志等级
    compress: true  // 是否启用 gzip 压缩
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    // 数组，存放所有 webpack 插件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',  // 打包后的文件名
      minify: {
        removeAttributeQuotes: false,  // 是否删除属性的双引号
        collapseWhitespace: false  // 是否折叠空白
      },
      // hash: true,  // 是否加上 hash，默认是 false
      config: config.template
    })
  ]
}
