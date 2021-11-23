//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods");
//引入mongoose-sex-page
const pagination = require("mongoose-sex-page");
module.exports = async (req, res) => {
	// 接受客户端传递过来的页码
	const page = req.query.page;
	
	const keyword = req.query.keyword; //从URL中传来的 keyword参数
	const reg = new RegExp(keyword, 'i') //不区分大小写
	const result = await  Goods.find({
		$or: [ //多条件，数组
			{
				gname: {
					$regex: reg
				}
			}
		]
	}).sort({
		"gsale": -1 //按照销量排序
	});
	// 渲染搜索结果页面
	res.render("user/search", {
		result
	});
	// res.send(result);
}
