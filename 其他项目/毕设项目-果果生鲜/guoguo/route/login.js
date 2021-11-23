//引用express框架
const express = require("express");

//创建注册页面路由 一级路由
const login = express.Router();

//挂载二级路由
login.get("/",(req,res) => {
	res.render("login/ulogin");
});

//渲染用户登录页面路由
login.get("/ulogin",require("./login/u_login"));

//实现用户登录功能路由
login.post("/ulogin", require("./login/ulogin"));

//渲染商家登录页面路由
login.get("/blogin",require("./login/b_login"));

//实现商家登录功能路由
login.post("/blogin", require("./login/blogin"));

//实现用户退出功能路由
login.get("/logout",require("./login/logout"));



//将路由对象作为模块成员进行导出
module.exports = login;