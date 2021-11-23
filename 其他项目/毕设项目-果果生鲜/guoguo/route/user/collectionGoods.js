//引入收藏集合构造函数
const {
	CollectionGoods
} = require("../../model/collectionGoods");
module.exports = async (req, res) => {
	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//根据用户id查询收藏
	let cg = await CollectionGoods.find({cg_uid:id}).populate("cg_gid");
	
	// 渲染我的收藏页面
	res.render("user/collectionGoods",{
		cg
	});
	// res.send(cg)
}
