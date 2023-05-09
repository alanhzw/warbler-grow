'use strict';

const Mongodb = require('@pick-star/cli-mongodb');

const { mongodbDbName, mongodbUrl } = require('../../config/db');

// 生成封装的 mongodb 实例 ,用来操作数据库
function mongo() {
  return new Mongodb(mongodbUrl, mongodbDbName);
}

module.exports = mongo;
