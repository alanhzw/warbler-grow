/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-03-11 15:49:05
 * @LastEditTime: 2022-03-11 15:56:34
 * @FilePath: \test-cli-0174\bin\npminstall.js
 */

const npmInstall = require('npminstall');
const path = require('path');
const userHome = require('user-home');

npmInstall({
  root: path.resolve(userHome, '.hzw-cli-dev'), // 模块路径
  storeDir: path.resolve(userHome, '', 'node_modules'),
  register: 'https://registry.npmjs.org',
  pkgs: [
    {
      name: 'warbler-js',
      version: '',
    },
  ],
});
