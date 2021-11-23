const mongoose = require("mongoose");
//创建收藏商家集合规则
const csSchema = new mongoose.Schema({
	//用户id
	cs_uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	//商家id
	cs_bid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Business"
	},
	//添加收藏的日期
	cs_time: {
		type: Date,
		default:new Date()//默认是当前时间
	}
});
//创建收藏商家集合
const CollectionShop = mongoose.model("CollectionShop", csSchema);

//将收藏商家集合作为模块成员进行导出
module.exports = {
	CollectionShop
}
