//1.获取元素 tbody里面所有的行
	let trs = document.querySelector("tbody").querySelectorAll("tr");
	//2.循环绑定事件
	for (let i = 0; i < trs.length; i++) {
		trs[i].onmouseover = function() {
			this.className = "bg";
		}
		trs[i].onmouseout = function() {
			this.className = "";
		}
	}





function isDel() {
	var b = window.confirm("是否确认删除？");
	if (b == true) {
		return ture;
	}else
	{
		return false;
	}
}