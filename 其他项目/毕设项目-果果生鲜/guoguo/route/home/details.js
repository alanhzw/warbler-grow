//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods");
//导入评论集合构造函数
const {
	Discuss
} = require("../../model/discuss");
module.exports = async (req, res) => {
	//接收客户端传递过来的商品id值
	const id = req.query.id;
	//根据id查询商品详细信息
	let goods = await Goods.findOne({
		_id: id
	}).populate("gshop");
	//根据商品id查询评论信息
	let discuss = await Discuss.find({
		d_gid: id
	}).populate("d_uid").sort({"_id":-1});
	//渲染商品详情模板
	res.render("user/details", {
		goods,
		discuss
	});
	// res.send(discuss)
}
