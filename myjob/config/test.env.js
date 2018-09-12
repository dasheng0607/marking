'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  SET_DOT:'"https://interface.mama100.cn/statistics/api/add"',
  HOST_API: '"http://swissewx.mama100.cn"'
})
