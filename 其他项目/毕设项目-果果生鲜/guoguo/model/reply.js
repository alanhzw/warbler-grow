const mongoose = require("mongoose");
//创建评论回复集合规则
const replySchema = new mongoose.Schema({
	//商家id
	r_bid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Bussness"
	},
	//评论id
	r_did: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Discuss"
	},
	//添加评论的日期
	rtime: {
		type: Date,
		default:new Date()//默认是当前时间
	},
	//回复内容
	rinfo:{
		type: String,
		default:"暂无评论"//默认是当前时间
	}
});
//创建评论集合
const Reply = mongoose.model("Reply", replySchema);

//将评论集合作为模块成员进行导出
module.exports = {
	Reply
}
