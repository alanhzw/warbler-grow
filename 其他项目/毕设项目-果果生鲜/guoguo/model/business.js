//创建用户集合
//引入mongoose模块
const mongoose = require("mongoose");
//引入joi模块 用来做请求参数格式验证
const Joi = require("joi");
//设定集合规则
const businessSchema = new mongoose.Schema({
	baccount:{
		type:String,
		required:true,
		unique:true	//保证账号在插入数据库时不重复
	},
	bpassword:{
		type:String,
		required:true
	},
	bname:{
		type:String,
		required:true,
		unique:true	//保证账号在插入数据库时不重复
	},
	bheader:{
		type:String,
	},
	baddress:{
		type:String,
	},
	bregdate:{
		type:Date,
		default:new Date()//默认是当前时间
	}
});

//创建集合
const Business = mongoose.model("Business",businessSchema);



//验证用户信息
const validateBusiness = business => {
	//定义验证规则
	const schema = {
		baccount:Joi.string().min(11).max(11).required().error(new Error("账号不符合规则")),
		bpassword:Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required().error(new Error("密码不符合规则")),
		bname:Joi.string().min(2).max(8).required().error(new Error("店铺名称不符合规则"))
	};
	//实施验证
	return Joi.validate(business,schema);
}

//将商家集合作为模块成员进行导出
module.exports = {
	Business:Business,
	validateBusiness:validateBusiness
}