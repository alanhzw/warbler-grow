//创建订单集合
//引入mongoose模块
const mongoose = require("mongoose");

//设定集合规则
const orderSchema = new mongoose.Schema({
	o_gid: {
		type:mongoose.Schema.Types.ObjectId,
		ref:"Goods"
	},
	o_uid: {
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	o_bid: {
		type:mongoose.Schema.Types.ObjectId,
		ref:"Bussness"
	},
	onum: {
		type: String
	},
	osum: {
		type: String
	},
	oaddress: {
		type: String,
		default:0
	},
	ostate: {
		type: String,
		default:"0"//默认值
	},
	otime: {
		type: Date,
		default:new Date()//默认是当前时间
	}
});


//创建地址集合
const Order = mongoose.model("Order", orderSchema);


//将地址集合作为模块成员进行导出
module.exports = {
	Order: Order
}
