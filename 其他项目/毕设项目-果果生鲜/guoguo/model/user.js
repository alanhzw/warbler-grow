//创建用户集合
//引入mongoose模块
const mongoose = require("mongoose");
//引入joi模块 用来做请求参数格式验证
const Joi = require("joi");
//设定集合规则
const userSchema = new mongoose.Schema({
	uaccount:{
		type:String,
		required:true,
		unique:true	//保证账号在插入数据库时不重复
	},
	upassword:{
		type:String,
		required:true
	},
	uname:{
		type:String,
		required:true
	},
	uheader:{
		type:String,
		default:"\\uploads\\upload_2c63eef29a35d38365e43734db6e1003.png"
	},
	uaddress:{
		type:String,
	},
	uregdate:{
		type:Date,
		default:new Date()//默认是当前时间
	}
});

//创建集合
const User = mongoose.model("User",userSchema);

//插入一条测试数据
// User.create({
// 	uaccount:"17615180174",
// 	upassword:"12346",
// 	uname:"hzw"
// });


//验证用户信息
const validateUser = user => {
	//定义验证规则
	const schema = {
		uaccount:Joi.string().min(11).max(11).required().error(new Error("账号不符合规则")),
		upassword:Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required().error(new Error("密码不符合规则")),
		uname:Joi.string().min(2).max(8).required().error(new Error("昵称不符合规则"))
	};
	//实施验证
	return Joi.validate(user,schema);
}

//将用户集合作为模块成员进行导出
module.exports = {
	User:User,
	validateUser:validateUser
}