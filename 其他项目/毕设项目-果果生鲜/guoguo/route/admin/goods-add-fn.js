//引入formidable模块
const formidable = require("formidable");
//引入path模块
const path = require("path");
//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods.js");

module.exports = async (req, res) => {
	//1.创建表单解析对象
	const form = new formidable.IncomingForm();
	//2.配置文件上传目录
	form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
	//3.保留上传文件的后缀
	form.keepExtensions = true;
	//4.解析表单
	form.parse(req, async (err, fields, files) => {
		//1.err错误对象 如果表单解析失败 err里面存储错误信息 否则为null
		//2.fields 对象类型 保存普通表单数据
		//3.files 对象类型 保存了和上传文件相关的数据
		//向商品集合插入数据
		await Goods.create({
			gname: fields.gname,
			gnum: fields.gnum,
			ginfo: fields.ginfo,
			gprice: fields.gprice,
			gphoto: files.gphoto.path.split("public")[1],
			gshop: fields.gshop,
			gfsort: fields.gfsort,
			gcsort: fields.gcsort
		});
		
		// 重定向到商品管理页面
		res.redirect("/admin/goods/goods-admin")
	});
}
