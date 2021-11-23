module.exports = (req, res, next) => {
	//判断用户的登录状态
	if (req.session.bname) {
		//如果处于已登录状态  将请求放行
		next();
	} else {
		//如果处于未登录状态  将请求重定向至商家登录界面
		res.redirect("/login/blogin");
	}
}
