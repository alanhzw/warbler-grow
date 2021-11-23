//引入评论回复集合构造函数
const {
	Reply
} = require("../../model/reply");
//引入评论集合构造函数
const {
	Discuss
} = require("../../model/discuss");

module.exports = async (req, res) => {
	//接收客户端传递过来的商家id
	const bid = req.session.bid;

	//接收客户端传递过来的评论id
	const did = req.body.did;


	
	await Discuss.updateOne({_id:did},{
		drinfo: req.body.rinfo,
		drtime: new Date
	});
	

	//向评论回复集合插入数据
	await Reply.create({
		r_bid: bid,
		r_did: did,
		rinfo: req.body.rinfo
	});


	// 重定向到评论管理页面
	res.redirect("/admin/discuss-admin");
	// res.send(a)




}
