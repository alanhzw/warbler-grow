//引用express框架
const express = require("express");
//创建网站服务器
const app = express();
//数据库连接
require("./model/connect");
//引入path模块 用来处理路径
const path = require("path");
//引入session模块
const session = require("express-session");

//导入art-template引擎模块
const template = require("art-template");
//引入时间处理模块 
const dateFormat = require("dateformat");

//引入路由对象
const register = require("./route/register");
const login = require("./route/login");
const admin = require("./route/admin");
const home = require("./route/home");
const user = require("./route/user");

//引入body-parser模块  用来处理post请求参数
const bodyParser = require("body-parser");

// 处理post请求参数
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json({
	extended: false
}));

//配置session
app.use(session({
	resave: false, //添加 resave 选项
	saveUninitialized: true, //添加 saveUninitialized 选项
	secret: "secret key",
	cookie: {
		maxAge: 24 * 60 * 60 * 1000 //保存的时间
	}
}));

//请求拦截 判断商家登录状态
app.use("/admin", require("./middleware/bloginGuard"));
//判断用户登录状态
app.use("/user", require("./middleware/userGuard"));
app.use("/home/details", require("./middleware/userGuard"));

//为路由匹配一级请求路径
app.use("/register", register);
app.use("/login", login);
app.use("/admin", admin);
app.use("/home", home);
app.use("/user", user);

//部署express框架模板所在的位置
app.set("views", path.join(__dirname, "views"));
//部署express框架模板的默认后缀
app.set("view engine", "art");
//部署渲染art后缀模板的模板引擎
app.engine("art", require("express-art-template"));


//像模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")));

//错误处理中间件
app.use(require("./middleware/err"));


//监听端口
app.listen(80);
console.log("网站服务器启动成功");
