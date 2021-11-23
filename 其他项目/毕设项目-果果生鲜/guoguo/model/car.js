const mongoose = require("mongoose");
//创建评论集合规则
const carSchema = new mongoose.Schema({
	//商品id
	c_gid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Goods"
	},
	//用户id
	c_uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	//添加购物车的日期
	ctime: {
		type: Date,
		default:new Date()//默认是当前时间
	}
});
//创建购物车集合
const Car = mongoose.model("Car", carSchema);

//将购物车集合作为模块成员进行导出
module.exports = {
	Car
}
