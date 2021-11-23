module.exports = (req,res) => {
	const { message } = req.query;
	res.render("register/bregister",{
		message:message
	});
}