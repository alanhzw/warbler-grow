//导入用户集合构造函数
const {
	User
} = require("../../model/user");
//引入加密模块
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {

	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//接收客户端传递过来的新密码
	const password = req.body.upassword;

	//对密码进行加密处理
	//生成随即字符串
	const salt = await bcrypt.genSalt(10);
	//加密
	const upassword = await bcrypt.hash(password, salt);

	//将新密码添加到数据库中
	await User.updateOne({_id:id},{
		upassword:upassword
	});
	// 渲染我的信息页面
	res.render("user/mypassword", {
	});
	// res.send(upassword);
}
