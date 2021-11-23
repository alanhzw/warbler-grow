//引入加密模块
const bcrypt =require("bcryptjs");
//引入用户集合构造函数
const { User, validateUser } = require("../../model/user.js");
module.exports = async (req,res,next) => {
	
	try{	
		await validateUser(req.body);
	}catch(e){
		//验证没有通过
		//重定向回用户注册页面
		//把对象类型转化为字符串类型
		return next(JSON.stringify({path:"/register/uregister",message:e.message}));
	}
	
	//根据账号查询用户是否存在
	let user = await User.findOne({uaccount:req.body.uaccount});
	//如果用户已经存在 说明账号已经被占用
	if (user) {		
			// return res.redirect(`/register/uregister?message=该账号已存在`);
		return next(JSON.stringify({path:"/register/uregister",message:"该账号已存在"}));
	} 
	//对密码进行加密处理
	//生成随即字符串
	const salt = await bcrypt.genSalt(10);
	//加密
	const upassword = await bcrypt.hash(req.body.upassword,salt);
	//替换加密后的密码
	req.body.upassword = upassword;
	
	//将用户注册信息添加到数据库中
	await User.create(req.body);
	//
	return res.redirect(`/register/uregister?message=注册成功`);
}