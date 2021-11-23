//导入评论集合构造函数
const {
	Discuss
} = require("../../model/discuss");

module.exports = async (req, res) => {

	//接受客户端传递过来的用户id
	const id = req.session.uid;
	//根据用户id查询评论
	let discuss = await Discuss.find({d_uid:id}).populate("d_uid").populate("d_gid");	

	//渲染我的评论页面
	res.render("user/mydiscuss",{
		discuss
	});
	// res.send(discuss);
}
