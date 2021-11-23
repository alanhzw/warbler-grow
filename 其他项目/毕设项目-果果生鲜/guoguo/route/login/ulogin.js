//引入用户集合构造函数
const {
	User
} = require("../../model/user.js");
//引入加密模块
const bcrypt = require("bcryptjs");
module.exports = async (req, res, next) => {
	//接收客户端的请求参数
	const {
		uaccount,
		upassword
	} = req.body;
	//二次验证
	if (uaccount.trim().length == 0 || upassword.trim().length == 0) {
		return res.status(400).send("<h4>账号或密码错误</h4>");
	}
	//根据账号查询用户信息
	//如果查询到了 user是一个对象  如果没有查询到 user变量为空
	const user = await User.findOne({
		uaccount: uaccount
	});
	if (user) {
		//查询到了用户
		//将客户端传递过来的密码和用户信息中的密码进行比对

		const isValid = await bcrypt.compare(upassword, user.upassword);

		if (isValid) {
			//密码比对成功
			//将用户名和id存储在请求对象中
			req.session.uname = user.uname;
			req.session.uid = user.id;
			//密码比对成功
			//把信息保存到模板文件中
			req.app.locals.userInfo = user;

			//重定向到系统主页
			res.redirect("/home/homepage");

		} else {
			//密码比对失败
			// return res.status(400).send("<h4>账号或密码错误</h4>");
			return next(JSON.stringify({
				path: "/login/ulogin",
				message: "账号或密码错误"
			}));
		}
	} else {
		//没有查询到用户
		// return res.status(400).send("<h4>账号或密码错误</h4>");
		return next(JSON.stringify({
			path: "/login/ulogin",
			message: "账号或密码错误"
		}));
	}
}
