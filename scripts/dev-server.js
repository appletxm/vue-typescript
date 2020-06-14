const express = require('express')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const httpProxyMiddleware = require('http-proxy-middleware')
const envConfig = require('../config/env')
const webpackConfig = require('../config/webpack.config')
const serverRouter = require('./server-router')
const app = express()
const compiler = webpack(webpackConfig)
const envKey = process.argv[2] || 'development'
const envCfg = envConfig[envKey]
const host = envCfg['host']
const port = envCfg['port']
const proxyTarget = envCfg['proxy']
const ipAddress = require('ip').address()
const defaultIp = '0.0.0.0'

// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

process.env.NODE_ENV = envKey
console.info('****current mode****', envKey)

const middleWare = webpackDevMiddleware(compiler, {
  // Notice: public path should be the same with webpack config
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  noInfo: true,
  stats: 'errors-only'
})
app.use(middleWare)
app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname + '/../dist'))
app.use('*', serverRouter['*'])

const apiConfig = envCfg['api'] ? envCfg['api'] : ['/user/*', '/menu/*', '/config/*', '/codeType/*', '/userRoleRel/*', '/role/*', '/code/*']

// single file
// app.use(['*/oss/uploadFile'], upload.single('file'), function (req, res) {
//   serverRouter['uploadSingleFile'](req, res)
// })

app.use(apiConfig, function (req, res) {
  if (proxyTarget && proxyTarget['needOpen'] === true) {
    httpProxyMiddleware({target: proxyTarget['url'], changeOrigin: true})(req, res)
  } else {
    serverRouter['/api'](req, res) // only mock data hint here
  }
})

app.use(['/*assets/images/*'], function (req, res) {
  serverRouter['image'](req, res, compiler)
})

app.use('/*.html', function (req, res) {
  serverRouter['html'](req, res, compiler)
})

app.use('*.js', function (req, res) {
  serverRouter['js'](req, res, compiler)
})

app.use('/', function (req, res) {
  serverRouter['/'](req, res, compiler)
})

app.listen(port, defaultIp, function () {
  const localUrl = `http://localhost:${port}`
  const ipUrl = `http://${ipAddress}:${port}`
  console.info(`${chalk.magenta('dev server started at: ')}`)
  console.info(`loclhost: ${chalk.blue(localUrl)}`)
  console.info(`ip: ${chalk.blue(ipUrl)}`)
})
