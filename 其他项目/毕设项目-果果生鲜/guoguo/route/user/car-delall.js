//引入购物车集合构造函数
const {
	Car
} = require("../../model/car");

module.exports = async (req, res) => {
	
	//获取要删除的购物车id
	//req.query.id
	//根据id删除购物车
	
	let str = req.query.id;
	//将字符串转化成数组
	let arr = str.split(",");
	// res.send(arr);
	//循环数组 根据id删除购物车
	for(let i in arr){
		await Car.findOneAndDelete({_id:arr[i]});
	}
}

