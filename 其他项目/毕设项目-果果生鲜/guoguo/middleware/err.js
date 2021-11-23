module.exports = (err, req, res, next) => {
	//将字符换转换为对象类型
	const result = JSON.parse(err);
	
	res.redirect(`${result.path}?message=${result.message}`);
}
