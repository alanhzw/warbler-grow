//引入收藏集合构造函数
const {
	CollectionShop
} = require("../../model/collectionShop");
module.exports = async (req, res) => {
	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//根据用户id查询收藏
	let cs = await CollectionShop.find({cs_uid:id}).populate("cs_bid");
	
	// 渲染我的信息页面
	res.render("user/collectionShop",{
		cs
	});
	// res.send(cs)
}
