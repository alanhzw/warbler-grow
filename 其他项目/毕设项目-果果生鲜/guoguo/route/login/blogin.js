//引入用户集合构造函数
const {
	Business
} = require("../../model/business.js");
//引入加密模块
const bcrypt = require("bcryptjs");
module.exports = async (req, res, next) => {
	//接收客户端的请求参数
	const {
		baccount,
		bpassword
	} = req.body;
	//二次验证
	if (baccount.trim().length == 0 || bpassword.trim().length == 0) {
		return res.status(400).send("<h4>账号或密码错误</h4>");
	}
	//根据账号查询用户信息
	//如果查询到了 business是一个对象  如果没有查询到 business变量为空
	const business = await Business.findOne({
		baccount: baccount
	});
	if (business) {
		//查询到了用户
		//将客户端传递过来的密码和用户信息中的密码进行比对

		const isValid = await bcrypt.compare(bpassword, business.bpassword);

		if (isValid) {
			//将用户名和id存储在请求对象中
			req.session.bname = business.bname;
			req.session.bid=business.id;
			//密码比对成功
			//把信息保存到模板文件中
			req.app.locals.businessInfo = business;
			//重定向到商品管理页面
			res.redirect("/admin/goods/goods-admin");
		} else {
			//密码比对失败
			// return res.status(400).send("<h4>账号或密码错误</h4>");
			return next(JSON.stringify({
				path: "/login/blogin",
				message: "账号或密码错误"
			}));
		}
	} else {
		//没有查询到用户
		// return res.status(400).send("<h4>账号或密码错误</h4>");
		return next(JSON.stringify({
			path: "/login/blogin",
			message: "账号或密码错误"
		}));
	}
}
