//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods");

//引入评论集合构造函数
const {
	Discuss
} = require("../../model/discuss");


//引入mongoose-sex-page
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {


	// //按照销量排序查询所有商品信息
	let goods = await pagination(Goods).find().sort({
		"gsale": -1
	}).page(1).size(6).display(1).exec();
	// //按照销量排序查询各种分类商品信息
	// // 新鲜水果
	let fruits = await pagination(Goods).find({
		gfsort: 1
	}).sort({
		"gsale": -1
	}).page(1).size(8).display(1).exec();
	// // 海鲜水产
	let seafood = await pagination(Goods).find({
		gfsort: 2
	}).sort({
		"gsale": -1
	}).page(1).size(8).display(1).exec();
	// // 精选肉类
	let meat = await pagination(Goods).find({
		gfsort: 3
	}).sort({
		"gsale": -1
	}).page(1).size(8).display(1).exec();
	// // 冷饮冻食
	let cold = await pagination(Goods).find({
		gfsort: 4
	}).sort({
		"gsale": -1
	}).page(1).size(8).display(1).exec();
	// // 蔬菜蛋品
	let vegetables = await pagination(Goods).find({
		gfsort: 5
	}).sort({
		"gsale": -1
	}).page(1).size(8).display(1).exec();

	//查询所有评论
	// let discuss = await Discuss.find({}).sort({"gsale": -1}).populate("d_uid").populate("d_gid");
	
	//查询所有评论
	let discuss = await pagination(Discuss).find({
		
	}).sort({
		"gtime": -1
	}).populate("d_uid").populate("d_gid").page(1).size(3).display(1).exec();


	//渲染主界面
	res.render(("user/home"), {
		goods: goods,
		fruits: fruits,
		seafood: seafood,
		meat: meat,
		cold: cold,
		vegetables: vegetables,
		discuss:discuss
	});
	
	// res.send(discuss);

}
