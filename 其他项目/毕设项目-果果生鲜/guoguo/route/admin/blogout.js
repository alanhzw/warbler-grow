module.exports = async (req, res) => {
	//删除session
	req.session.destroy(() => {
		//删除cookie
		res.clearCookie("connect.sid");
		//重定向到商家登录页面
		res.redirect("/login/blogin");
	});
}
