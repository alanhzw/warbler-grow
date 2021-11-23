//引入评论集合构造函数
const {
	Discuss
} = require("../../model/discuss");
//引入mongoose-sex-page
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
	//接受客户端传递过来的页码
	const page = req.query.page;
	//接收客户端传递过来的商家id
	const id = req.session.bid;
	//标识 标识当前访问的是评论管理页面
	req.app.locals.currentLink = "discuss";
	//page指定当前页
	//size 指定每页显示的数据条数
	//display 指定客户端要显示的页码数量
	//exec 像数据库中发送请求

	//根据商家id查询所有评论数据并且按照时间进行排序 完成分页效果
	let discuss = await pagination(Discuss).find({
		d_bid: id
	}).populate("d_gid").populate("dreply").sort({
		"dtime": -1
	}).page(page).size(5).display(4).exec();

	//渲染商品管理界面
	res.render("admin/discuss-admin", {
		discuss
	});
	// res.send(discuss);
}
