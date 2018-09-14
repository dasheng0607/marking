'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  SET_DOT:'"https://interface.mama100.cn/statistics/api/add"',
  HOST_API: '"http://swissewx.mama100.cn"',
  SWISSE: '"http://swissewx.mama100.cn"', //授权地址，打包到生产的时候要改为 http://www.swisse-china.com.cn
  LOGIN: '"http://swissewx.mama100.cn/swisse-wmall/center/myAccount/add_customer.html"' //登录注册地址，打包到生产的时候要改为http://www.swisse-china.com.cn/swisse-wmall/center/myAccount/add_customer.html
})
