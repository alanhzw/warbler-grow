const mongoose = require("mongoose");
 //创建评论集合规则
 const discussSchema = new mongoose.Schema({
 	//商品id
 	d_gid: {
 		type: mongoose.Schema.Types.ObjectId,
 		ref: "Goods"
 	},
 	//订单id
 	d_oid: {
 		type: mongoose.Schema.Types.ObjectId,
 		ref: "Order"
 	},
 	//用户id
 	d_uid: {
 		type: mongoose.Schema.Types.ObjectId,
 		ref: "User"
 	},
 	//商家id
 	d_bid: {
 		type: mongoose.Schema.Types.ObjectId,
 		ref: "Bussness"
 	},
 	//添加评论的日期
 	dtime: {
 		type: Date,
 		default: new Date() //默认是当前时间
 	},
 	//评论内容
 	dinfo: {
 		type: String
 	},
 	//评论回复内容
 	drinfo: {
 		type: String,
		default:"暂无回复" 
 	},
 	//评论回复时间
 	drtime: {
 		type: Date,
		default: null
 	},
 });
 //创建评论集合
 const Discuss = mongoose.model("Discuss", discussSchema);

 //将评论集合作为模块成员进行导出
 module.exports = {
 	Discuss
 }
