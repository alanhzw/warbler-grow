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
		await Order.findOneAndDelete({
			_id: oid
		});

		//重定向回我的订单页面
		res.redirect("/user/myorder");
	} else {
		return next(JSON.stringify({
			path: "/user/myorder",
			message: "确认收货后可删除订单"
		}));
	}

	// res.send(order.ostate)



}
