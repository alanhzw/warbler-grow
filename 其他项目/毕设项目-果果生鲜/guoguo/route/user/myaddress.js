//导入地址集合构造函数
const {
	Address
} = require("../../model/address");

module.exports = async (req, res) => {

	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//根据id查询当前用户是否填写地址
	let address = await Address.findOne({auser:id});
	//如果address存在则证明已经填写地址  进行修改操作
	if (address) {
		
		// 渲染地址修改页面
		res.render("user/myaddress", {
			address:address,
			link: "/user/myaddress-modify",
			button:"修改"
		});
	} else{
		//如果address不存在则证明未填写地址  进行添加操作
		//添加操作
		res.render("user/myaddress", {
			link: "/user/myaddress-add",
			button:"保存"
		});
	}
	// res.send(address);
}
