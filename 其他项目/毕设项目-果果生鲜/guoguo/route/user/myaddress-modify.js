//导入地址集合构造函数
const {
	Address
} = require("../../model/address");

module.exports = async (req, res) => {
	//修改地址信息
	await Address.updateOne(req.body);
	//重定向回我的地址页面
	res.redirect("/user/myaddress");
}
