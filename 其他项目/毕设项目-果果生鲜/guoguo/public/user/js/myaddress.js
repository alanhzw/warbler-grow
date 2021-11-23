function isPreserve() {
	var b = window.confirm("确认保存？");
	if (b == true) {
		alert("修改成功");
		return ture;
	} else {
		return false;
	}
}
