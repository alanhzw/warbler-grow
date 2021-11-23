//引入加密模块
const bcrypt =require("bcryptjs");
//引入用户集合构造函数
const { Business, validateBusiness } = require("../../model/business.js");
module.exports = async (req,res,next) => {
	
	try{	
		await validateBusiness(req.body);
	}catch(e){
		//验证没有通过
		//重定向回用户注册页面
		//把对象类型转化为字符串类型
		return next(JSON.stringify({path:"/register/bregister",message:e.message}));
	}
	
	//根据账号查询用户是否存在
	let business = await Business.findOne({baccount:req.body.baccount});
	//根据店铺名字查询店铺是否存在
	let bname = await Business.findOne({bname:req.body.bname});
	//如果用户已经存在 说明账号已经被占用
	if (business) {		
			// return res.redirect(`/register/uregister?message=该账号已存在`);
		return next(JSON.stringify({path:"/register/bregister",message:"该账号已存在"}));
	} 
	if (bname) {
			// return res.redirect(`/register/uregister?message=该账号已存在`);
		return next(JSON.stringify({path:"/register/bregister",message:"店铺名字已被占用"}));
	} 
	//对密码进行加密处理
	//生成随即字符串
	const salt = await bcrypt.genSalt(10);
	//加密
	const bpassword = await bcrypt.hash(req.body.bpassword,salt);
	//替换加密后的密码
	req.body.bpassword = bpassword;
	
	//将用户注册信息添加到数据库中
	await Business.create(req.body);
	//
	return res.redirect(`/register/bregister?message=注册成功`);
}