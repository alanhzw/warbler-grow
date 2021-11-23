//引入订单集合构造函数
const {
	Order
} = require("../../model/order");
//引入购物车集合构造函数
const {
	Car
} = require("../../model/car");
//引入商品集合构造函数
const {
	Goods
} = require("../../model/goods");
//引入地址集合构造函数
const {
	Address
} = require("../../model/address");
module.exports = async (req, res) => {
	let arr = req.body.arr;
	for (let i in arr) {
		let arrList = req.body.arr[i];
		let count = arrList.count;
		let sumList = arrList.sumList;
		let uid = arrList.uid;
		let gid = arrList.gid;
		let cid = arrList.cid;
		let bid = await Goods.findOne({
			_id: arrList.gid
		}).populate("gshop");
		let oaddress = await Address.findOne({
			auser: arrList.uid
		});
			oaddress = oaddress.aaddress;
			bid = bid.gshop._id;
		await Order.create({
			o_gid: gid,
			o_uid: uid,
			onum: count,
			osum: sumList,
			o_bid: bid,
			oaddress:oaddress
		});
		await Car.findOneAndDelete({
			_id: cid
		});
	}
}
