//引用express框架
const express = require("express");
//创建注册页面路由 一级路由
const register = express.Router();

//挂载二级路由
register.get("/",(req,res) => {
	res.render("register/uregister");
});


//展示用户注册界面路由
register.get("/uregister",require("./register/u_register"));

//实现用户注册功能路由
register.post("/uregister",require("./register/uregister"));

//展示商家注册界面路由
register.get("/bregister",require("./register/b_register"));

//实现商家注册功能路由
register.post("/bregister",require("./register/bregister"));


//将路由对象作为模块成员进行导出
module.exports = register;