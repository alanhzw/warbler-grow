//导入地址集合构造函数
const {
	Business
} = require("../../model/business");

module.exports = async (req, res) => {
	//修改店铺信息
	await Business.updateOne(req.body);
	//重定向回我的店铺页面
	res.redirect("/admin/shop-admin");
	// res.send(req.body);
}
