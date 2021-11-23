//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods");
//引入mongoose-sex-page
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
	//接受客户端传递过来的页码
	const page =req.query.page;
	//接收客户端传递过来的商家id
	const id = req.session.bid;
	//标识 标识当前访问的是商品管理页面
	req.app.locals.currentLink = "goods";
	//page指定当前页
	//size 指定每页显示的数据条数
	//display 指定客户端要显示的页码数量
	//exec 像数据库中发送请求
	//根据商家id查询所有商品数据并且按照类别进行排序 完成分页效果
	let goods = await pagination(Goods).find({gshop:id}).sort({"gfsort":1}).page(page).size(5).display(4).exec();

	//渲染商品管理界面
	res.render("admin/goods-admin", {
		goods: goods
	});
	// res.send(id);
}
