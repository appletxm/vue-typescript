const envDev = require('./env-development')
const envProd = require('./env-production')
const envMock = require('./env-mock')
const envTest = require('./env-test')
const envPre = require('./env-pre')

module.exports = {
  development: envDev,
  production: envProd,
  test: envTest,
  mock: envMock,
  pre: envPre
}
