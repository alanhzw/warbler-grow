//引入订单集合构造函数
const {
	Order
} = require("../../model/order");

module.exports = async (req, res, next) => {
	//获取要删除的订单id
	//req.query.id
	//根据id删除订单
	let oid = req.query.id;

	let order = await Order.findOne({
		_id: oid
	});



	if (order.ostate == "2") {
		
		//重定向回商品详情页面
		res.redirect("/home/details?id="+order.o_gid);
	} else {
		return next(JSON.stringify({
			path: "/user/myorder",
			message: "确认收货后可添加评论"
		}));
	}

	// res.send(order.ostate)



}
