//引入购物车集合构造函数
const {
	Car
} = require("../../model/car");

module.exports = async (req, res) => {
	//接收客户端传递过来的用户id
	const uid = req.session.uid;
	//接收客户端传递过来的商品id
	const gid = req.query.id;
	//向购物车集合插入数据
	
	let car = await Car.findOne({
		c_gid: gid
	});
	

	if (car == null) {
		await Car.create({
			c_gid:gid,
			c_uid:uid
		});
		
		// 重定向到购物车页面
		res.redirect("/user/car");
	} else{
		res.redirect("/user/car");
	}

	

}
