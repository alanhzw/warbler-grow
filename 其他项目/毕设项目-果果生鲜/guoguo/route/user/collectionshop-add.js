//引入收藏集合构造函数
const {
	CollectionShop
} = require("../../model/collectionShop");

module.exports = async (req, res) => {

	//获取要收藏的商家id
	let bid = req.query.id;
	//获取当前的用户id
	let uid = req.session.uid

	//根据id收藏商品	
	await CollectionShop.create({
		cs_bid: bid,
		cs_uid: uid
	});

	res.redirect("/user/collectionShop");
}
