//导入用户集合构造函数
const {
	User
} = require("../../model/user");
//导入地址集合构造函数
const {
	Address
} = require("../../model/address");

module.exports = async (req, res) => {
	
	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//根据用户id查询用户
	let user = await User.findOne({_id:id});	
	//根据用户id查询地址
	let address = await Address.findOne({auser:id});
	// 渲染我的信息页面
	res.render("user/myinformation",{
		user,
		address
	});
	// res.send(address);
}
