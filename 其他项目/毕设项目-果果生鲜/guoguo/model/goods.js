//创建用户集合
//引入mongoose模块
const mongoose = require("mongoose");
//引入joi模块 用来做请求参数格式验证
const Joi = require("joi");
//设定集合规则
const goodsSchema = new mongoose.Schema({
	gname:{
		type:String,
		required:true,
		unique:true	//保证账号在插入数据库时不重复
	},
	gnum:{
		type:Number,
		required:true
	},
	ginfo:{
		type:String,
		required:true
	},
	gprice:{
		type:Number,
		required:true
	},
	gphoto:{
		type:String,
		required:true
	},
	gsale:{
		type:Number,
		required:true,
		default:0//默认值
	},
	gshop:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Business",//关联操作 
		required:true
	},
	gfsort:{
		type:String,
		required:true
	},
	gcsort:{
		type:String,
		required:true
	}
});

//创建集合
const Goods = mongoose.model("Goods",goodsSchema);



//验证用户信息
const validateGoods = goods => {
	//定义验证规则
	const schema = {
		gprice:Joi.string().regex(/[^\d^\.]+/g).required().error(new Error("价格不符合规则")),
		gnum:Joi.string().regex(/^[0-9]{1,5}$/).required().error(new Error("数量不符合规则")),
		gname:Joi.string().min(2).max(8).required().error(new Error("商品名称不符合规则"))
	};
	//实施验证
	return Joi.validate(goods,schema);
}

//将商品集合作为模块成员进行导出
module.exports = {
	Goods:Goods,
	validateGoods:validateGoods
}