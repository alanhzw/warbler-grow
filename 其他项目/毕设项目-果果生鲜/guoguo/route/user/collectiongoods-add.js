//引入购物车集合构造函数
const {
	CollectionGoods
} = require("../../model/collectionGoods");

module.exports = async (req, res) => {

	//获取要收藏的商品id
	let gid = req.query.id;
	//获取当前的用户id
	let uid = req.session.uid

	//根据id收藏商品	
	await CollectionGoods.create({
		cg_gid: gid,
		cg_uid: uid
	});

	res.redirect("/user/collectionGoods");
}
