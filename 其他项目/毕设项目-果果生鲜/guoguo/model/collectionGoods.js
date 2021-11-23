const mongoose = require("mongoose");
//创建收藏商品集合规则
const cgSchema = new mongoose.Schema({
	//用户id
	cg_uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	//商品id
	cg_gid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Goods"
	},
	//添加收藏的日期
	cg_time: {
		type: Date,
		default:new Date()//默认是当前时间
	}
});
//创建收藏商品集合
const CollectionGoods = mongoose.model("CollectionGoods", cgSchema);

//将收藏商品集合作为模块成员进行导出
module.exports = {
	CollectionGoods
}
