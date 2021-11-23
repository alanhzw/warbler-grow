//创建收货地址集合
//引入mongoose模块
const mongoose = require("mongoose");

//设定集合规则
const addressSchema = new mongoose.Schema({
	auser: {
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	aarea: {
		type: String,
		required: true
	},
	aaddress: {
		type: String,
		required: true,
	},
	amoblie: {
		type: Number,
		required: true,
	},
	aemail: {
		type: String
	},
	atelephone: {
		type: Number
	},
	aalias: {
		type: String
	},
	aname:{
		type: String
	}
});


//创建地址集合
const Address = mongoose.model("Address", addressSchema);


//将地址集合作为模块成员进行导出
module.exports = {
	Address: Address
}
