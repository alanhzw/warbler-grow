//引用express框架
const express = require("express");

//创建注册页面路由 一级路由
const home = express.Router();

//渲染系统主页模板
home.get("/homepage",require("./home/homepage"));

//渲染商品详情页面

home.get("/details",require("./home/details"));

//将路由对象作为模块成员进行导出
module.exports = home;