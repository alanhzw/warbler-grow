//导入用户集合构造函数
const {
	User
} = require("../../model/user");


module.exports = async (req, res) => {

	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//接收客户端传递过来的新昵称
	const uname = req.body.uname;
	
	//将新昵称添加到数据库中
	await User.updateOne({
		_id: id
	}, {
		uname: uname
	});

	// 重定向我的信息页面
	res.redirect("/user/myinfomation");
	// res.send(uname);
}
