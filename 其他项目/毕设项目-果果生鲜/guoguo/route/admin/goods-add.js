//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods");

module.exports = async (req, res) => {
	//标识 标识当前访问的是商品管理页面
	req.app.locals.currentLink = "goods";
	//获取地址栏中id参数 来判断是添加还是修改操作
	const {
		id
	} = req.query;
	//如果传递了id参数 说明是修改操作 
	if (id) {
		let goods = await Goods.findOne({
			_id: id
		});
		//渲染商品修改页面
		res.render("admin/goods-add", {
			goods: goods,
			link: "/admin/goods/goods-modify?id=" + id,
			button:"修改"
		});
	} else {
		//添加操作
		res.render("admin/goods-add", {
			link: "/admin/goods/goods-add",
			button:"添加"
		});
	}


}
