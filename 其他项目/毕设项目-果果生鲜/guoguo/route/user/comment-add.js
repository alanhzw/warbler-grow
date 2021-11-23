//导入订单集合构造函数
const {
	Order
} = require("../../model/order");
//导入评论集合构造函数
const {
	Discuss
} = require("../../model/discuss");
//导入商品构造集合函数
const {
	Goods
} = require("../../model/goods");
module.exports = async (req, res, next) => {

	//接收客户端传递过来的商品id
	let gid = req.body.d_gid;
	//接收客户端传递过来的用户id
	let uid = req.session.uid;
	//根据商品id查询订单
	let order = await Order.findOne({
		o_gid: gid
	});
	let goods = await Goods.findOne({
		_id: gid
	}).populate("gshop");
	let bid = goods.gshop._id;
	// 如果订单存在并且处于已收货状态 则将评论信息添加到数据库中
	if (order && order.ostate == 2) {
		await Discuss.create({
			d_gid: gid,
			d_uid: uid,
			dinfo: req.body.dinfo,
			d_bid: bid,
			d_oid: order._id
		});
		res.redirect("/home/details?id=" + gid);
	} else { //如果订单不存在或者处于未收货状态提示确认收货后可以评论
		return next(JSON.stringify({
			path: "/user/myorder",
			message: "确认收货后可进行评论"
		}));
	}

	res.send(bid)
}
