module.exports = (req,res) => {
	const { message } = req.query;
	res.render("login/ulogin",{
		message:message
	});
	
}