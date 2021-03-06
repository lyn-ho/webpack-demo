const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Happypack = require('happypack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const config = require('./public/config')[isDev ? 'dev' : 'build']

module.exports = {

  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:6].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // use: ['cache-loader', 'babel-loader'],
        // use: 'Happypack/loader?id=js',
        use: ['thread-loader', 'cache-loader', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          // 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [require('autoprefixer')]
              }
            }
          },
          'less-loader',
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240, // 10k
            esModule: false,
            name: '[name]_[hash:6].[ext]',
            outputPath: 'assets',
          }
        }],
        exclude: /node_modules/
      },
      // {
      //   test: /.html$/,
      //   use: 'html-withimg-loader'
      // },
    ],

    noParse: /jquery|lodash/,
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
      config: config.template,
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html',
      chunks: ['login']
    }),

    new CopyWebpackPlugin([{
      from: 'public/js/*.js',
      to: path.resolve(__dirname, 'dist', 'js'),
      flatten: true
    }], {
      ignore: ['other.js']
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      _map: ['lodash', 'map']
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),

    // new Happypack({
    //   id: 'js',
    //   use: ['babel-loader']
    // }),

    new HardSourceWebpackPlugin(),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'dll', 'manifest.json')
    }),

  ],

  resolve: {
    modules: ['node_modules']
  },

  externals: {
    'jquery': 'jQuery'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 1,
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1
        },

        common: {
          chunks: 'initial',
          name: 'common',
          minSize: 100,
          minChunks: 3
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
}
