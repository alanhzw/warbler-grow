//引入订单集合构造函数
const {
	Order
} = require("../../model/order");

module.exports = async (req, res) => {
	//获取要确认的订单id
	//req.query.id
	let oid = req.query.id;
	

	await Order.updateOne({_id:oid},{
		ostate:2
	});
	
	//重定向回我的订单页面
	res.redirect("/user/myorder");
}
