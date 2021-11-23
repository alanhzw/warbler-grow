//全选/全不选操作
function setAllNo() {
	const father = document.getElementById("father");
	const sons = document.getElementsByName("son");
	if (father.checked == false) {
		for (let i = 0; i < sons.length; i++) {
			sons[i].checked = false;
		}
	} else {
		for (let i = 0; i < sons.length; i++) {
			sons[i].checked = true;
		}
	}
	sumall();
}


//加减按钮
function adder(e) {
	let carlist = document.getElementById(e);
	let count = carlist.getElementsByClassName("countnum")[0].innerHTML;
	let sum = carlist.getElementsByClassName("sum")[0].innerHTML;
	let price = carlist.getElementsByClassName("price")[0].innerHTML;
	count = parseInt(count) + 1;
	sum = parseFloat(price) * count;
	carlist.getElementsByClassName("countnum")[0].innerHTML = count;
	carlist.getElementsByClassName("sum")[0].innerHTML = sum;
	sumall();
}

function minuser(e) {
	let carlist = document.getElementById(e);
	let count = carlist.getElementsByClassName("countnum")[0].innerHTML;
	let sum = carlist.getElementsByClassName("sum")[0].innerHTML;
	let price = carlist.getElementsByClassName("price")[0].innerHTML;
	if (count <= 1) {
		count = 1;
	} else {
		count = parseInt(count) - 1;
	}
	sum = parseFloat(price) * count;
	carlist.getElementsByClassName("countnum")[0].innerHTML = count;
	carlist.getElementsByClassName("sum")[0].innerHTML = sum;
	sumall();
}


//批量删除功能
//获取删除按钮
let delall = document.querySelector(".del-all");
//添加点击事件
delall.onclick = () => {
	let ids = [];
	//获取选中的用户
	let checkedUser = $(".table").find("input").filter(":checked");
	//循环复选框 从复选框元素的身上获取data-id属性的值
	checkedUser.each(function(index, element) {
		//将选中的id添加到数组中
		ids.push($(element).attr("data-cid"));
	});
	//将数组转化为字符串
	let str = ids.toString();
	//创建ajax请求
	let xhr = new XMLHttpRequest();
	xhr.open("get", "http://localhost:80/user/car-delall?id=" + str);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			// location.reload();
			console.log("ok");
		}
	}
	xhr.send();

}

//购物车结算功能
function sumall(e) {
	let sumList = 0;
	let sum = 0;
	//声明id数组
	let ids = [];
	//声明每一条购物车的总价数组
	let lists = [];
	//获取选中的用户
	let checkedUser = $(".table").find("input").filter(":checked");
	//循环复选框 从复选框元素的身上获取data-id属性的值
	checkedUser.each(function(index, element) {
		//将选中的id添加到数组中
		ids.push($(element).attr("data-cid"));
	});
	for (let i in ids) {
		//获取每一个购物车
		let carlist = document.getElementById(ids[i]);
		//获取单价
		let price = parseFloat(carlist.getElementsByClassName("price")[0].innerHTML);
		//获取数量
		let count = parseInt(carlist.getElementsByClassName("countnum")[0].innerHTML);
		//获取每一个购物车的总价
		sumList = price * count;
		sum += sumList;
	}
	document.querySelector(".span-sum").innerHTML = ids.length;
	document.querySelector(".span-totle").innerHTML = "￥" + sum;
}







//添加订单功能
//获取结算按钮
let totle = document.querySelector(".totle");
//添加点击事件
totle.onclick = () => {
	let ids = [];
	let arr = [];
	//获取选中的用户
	let checkedUser = $(".table").find("input").filter(":checked");
	//循环复选框 从复选框元素的身上获取data-id属性的值
	checkedUser.each(function(index, element) {
		//将选中的id添加到数组中
		ids.push($(element).attr("data-cid"));
	});
	
	for (let i in ids) {
		let obj = {};
		//获取每一个购物车
		let carlist = document.getElementById(ids[i]);
		//获取单价
		let price = parseFloat(carlist.getElementsByClassName("price")[0].innerHTML);
		//获取数量
		let count = parseInt(carlist.getElementsByClassName("countnum")[0].innerHTML);
		//获取每一个购物车的总价
		sumList = price * count;
		//获取用户id
		let uid = document.getElementById("user").value;
		//获取商品id
		let gid = carlist.getElementsByClassName("son")[0].getAttribute("data-gid");
		obj.count = String(count);
		obj.sumList = String(sumList);
		obj.uid = uid;
		obj.gid = gid;
		obj.cid = ids[i];
		arr.push(obj);
	}
	
	//创建ajax请求
	let xhr = new XMLHttpRequest();
	xhr.open("post", "http://localhost:80/user/myorder-add");
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.send(JSON.stringify({arr:arr}));
	xhr.onload = function() {
		console.log(xhr.responseText);
	}  
}