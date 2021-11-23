//导入地址集合构造函数
const {
	Address
} = require("../../model/address");

module.exports = async (req, res) => {
	
	//将地址信息添加到数据库中
	await Address.create(req.body);
	//重定向回我的地址页面
	res.redirect("/user/myaddress");
	
	// res.send(req.body);
}
