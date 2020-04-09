const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

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
      // hash: true  // 是否加上 hash，默认是 false
    })
  ]
}
