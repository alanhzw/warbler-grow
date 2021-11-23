//导入订单集合构造函数
const {
	Order
} = require("../../model/order");
//导入地址集合构造函数
const {
	Address
} = require("../../model/address");

module.exports = async (req, res) => {
	//获取错误信息
	const { message } = req.query;
	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//根据用户id查询订单
	let orders = await Order.find({o_uid:id}).populate("o_uid").populate("o_gid");	
	let address = await Address.findOne({auser:id});
	//渲染我的订单页面
	res.render("user/myorder",{
		orders,
		address,
		message
	});
	// res.send(address.aaddress);
}
