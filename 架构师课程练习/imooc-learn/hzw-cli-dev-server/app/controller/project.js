'use strict';

const Controller = require('egg').Controller;

const mongo = require('../utils/mongodb')();

class ProjectController extends Controller {
  async getTemplate() {
    const { ctx } = this;
    // 查询 template 集合的数据
    const data = await mongo.query('template');
    ctx.body = data;
  }
}

module.exports = ProjectController;
