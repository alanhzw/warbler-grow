//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods");
module.exports = async (req, res) => {
	//获取要删除的商品id
	//req.query.id
	//根据id删除商品
	await Goods.findOneAndDelete({_id:req.query.id});
	//重定向回商品列表页面
	res.redirect("/admin/goods/goods-admin");
}
