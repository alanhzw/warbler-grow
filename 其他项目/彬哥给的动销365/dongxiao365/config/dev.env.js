'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // TODO: 开发环境接口地址写到这里
  // 线上
     // API_ROOT: '"//corpapi.sfa365.cn"'
     API_ROOT: '"//tcorpapi.sfa365.cn"'
     // API_ROOT:  '"//192.168.1.8:9191"'
});



