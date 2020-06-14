const fs = require('fs')
const path = require('path')
const ipAddress = require('ip').address()

function getText() {
  const envKey = process.argv[2] || 'production'
  const envCfg = require(`../config/env-${envKey}`)
  const { outputCfg } = envCfg
  const text = `window.appInfo = ` + JSON.stringify(outputCfg, null, '  ').replace(/\{\{ipAddress\}\}/g, ipAddress)

  return text
}

function syncCfgFile() {
  const text = getText()
  const cfgPath = path.resolve(`./cfg.js`)
  fs.writeFileSync(cfgPath, text, 'utf8')
}

module.exports = {
  getText
}

syncCfgFile()
