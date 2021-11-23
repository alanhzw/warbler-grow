//引入商家集合构造函数
const {
	Business
} = require("../../model/business");

module.exports = async (req, res) => {
	
	//接收客户端传递过来的商家id
	const id = req.session.bid;
	
	//标识 标识当前访问的是商品管理页面
	req.app.locals.currentLink = "shop";
	
	
	//根据商家id查询所有信息
	let business = await Business.findOne({_id:id});

	//渲染商家管理界面
	res.render("admin/shop-admin", {
		business
	});
	// res.send(business);
}
