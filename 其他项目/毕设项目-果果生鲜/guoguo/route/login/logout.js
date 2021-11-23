const { User } = require("../../model/user");
module.exports = async (req,res) => {
	//删除session
	req.session.destroy( () =>{
		//删除cookie
		res.clearCookie("connect.sid");
		//重定向到用户登录页面
		res.redirect("/login/ulogin");
		//清空模板中的用户信息
		req.app.locals.userInfo = null;
	});
}