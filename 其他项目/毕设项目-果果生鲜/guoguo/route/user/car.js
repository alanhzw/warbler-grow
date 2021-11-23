//引入购物车集合构造函数
const {
	Car
} = require("../../model/car");

module.exports = async (req, res) => {
	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//根据用户id查询购物车
	let car = await Car.find({c_uid:id}).populate("c_uid").populate("c_gid");	
	//渲染购物车页面
	res.render("user/car",{
		car
	});
	// res.send(car);
}
