module.exports = async (req, res) => {
	const {
		message
	} = req.query;
	res.render("register/uregister", {
		message: message
	});
}
