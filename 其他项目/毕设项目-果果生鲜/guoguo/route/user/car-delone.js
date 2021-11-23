//引入购物车集合构造函数
const {
	Car
} = require("../../model/car");

module.exports = async (req, res) => {
	
	//获取要删除的购物车id
	//req.query.id
	//根据id删除购物车
	
	
	// res.send(req.query.id);
	
	await Car.findOneAndDelete({_id:req.query.id});
	
	//重定向回购物车列表页面
	res.redirect("/user/car");




}
