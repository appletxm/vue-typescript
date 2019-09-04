var path = require('path')
var HtmlWebPlugin = require('html-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

module.exports = {
  getEnvCfg: function (envKeyWord) {
    let envCfg, envFilePath

    if (envKeyWord === 'development') {
      envCfg = 'env-development'
    } else if (envKeyWord === 'mock') {
      envCfg = 'env-mock'
    } else if (envKeyWord === 'test') {
      envCfg = 'env-test'
    } else {
      if ((process.argv)[3] && ((process.argv)[3] === 'test' || (process.argv)[3] === 'current-branch')) {
        envCfg = 'env-test'
      } else if ((process.argv)[3] && (process.argv)[3] === 'pre') {
        envCfg = 'env-pre'
      } else {
        envCfg = 'env-production'
      }
    }

    envFilePath = path.join(__dirname, './' + envCfg + '.js')
    return envFilePath
  },

  getOutPutConfig: function (envKeyWord, webpack, webpackConfig) {
    var appJs = path.resolve('./src/js/index.js')
    var indexJs = path.resolve('./src/js/pages/portal-home/index.js')
    var loginJs = path.resolve('./src/js/pages/login/index.js')
    var errorJs = path.resolve('./src/js/pages/portal-error/index.js')

    if (envKeyWord === 'development' || envKeyWord === 'mock') {
      webpackConfig.entry.app = [hotMiddlewareScript, appJs]
      webpackConfig.entry.index = [hotMiddlewareScript, indexJs]
      webpackConfig.entry.login = [hotMiddlewareScript, loginJs]
      webpackConfig.entry.error = [hotMiddlewareScript, errorJs]
      webpackConfig.devtool = 'source-map'
    } else {
      webpackConfig.entry.app = [appJs]
      webpackConfig.entry.index = [indexJs]
      webpackConfig.entry.login = [loginJs]
      webpackConfig.entry.error = [errorJs]
      webpackConfig.devtool = 'cheap-source-map'
    }

    return webpackConfig
  },

  getPluginConfig: function (envKeyWord, webpack, webpackConfig) {
    var vendorPath, cssPath

    if (envKeyWord === 'development' || envKeyWord === 'mock') {
      vendorPath = 'js/vendor.js'
      cssPath = 'css/app.[hash:7].css'
      webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    } else {
      vendorPath = 'js/vendor.min.[hash:7].js'
      cssPath = 'css/app.min.[hash:7].css'
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      )
    }

    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: vendorPath,
        minChunks: Infinity
      }),
      new CopyPlugin([{
        from: path.join(__dirname, '../src/assets'),
        to: path.join(__dirname, '../dist/assets')
      }]),
      new ExtractTextPlugin(cssPath)
    )

    return webpackConfig
  },

  getHtmlWebPluginConfig: function (env, webpackConfig) {
    var baseConfig = {
      favicon: '',
      inject: 'body',
      publicPath: env.publicPath,
      libFiles: {
        css: env['css'],
        js: env['js']
      }
    }
    webpackConfig.plugins.push(
      new HtmlWebPlugin(Object.assign(baseConfig, {
        title: '我的富运通',
        filename: path.join(__dirname, '../dist/', 'app.html'),
        template: path.join(__dirname, '../src/', 'index.ejs'),
        chunks: ['vendor', 'app'],
        needViewPort: false
      })),

      new HtmlWebPlugin(Object.assign(baseConfig, {
        title: '富运通',
        filename: path.join(__dirname, '../dist/', 'index.html'),
        template: path.join(__dirname, '../src/', 'index.ejs'),
        chunks: ['vendor', 'index'],
        needViewPort: true
      })),

      new HtmlWebPlugin(Object.assign(baseConfig, {
        title: '用户登录',
        filename: path.join(__dirname, '../dist/', 'login.html'),
        template: path.join(__dirname, '../src/', 'index.ejs'),
        chunks: ['vendor', 'login'],
        needViewPort: true
      }))
    )

    return webpackConfig
  }
}
