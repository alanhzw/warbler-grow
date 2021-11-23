//选择文件上传控件
let file = document.querySelector("#file");
let preview = document.querySelector("#img-preview")
//当用户选择完文件以后
file.onchange = function () {
	//1.创建文件读取对象
	let reader = new FileReader();
	//用户选择的文件列表
	//this.files[0]
	//2.读取文件
	reader.readAsDataURL(this.files[0]);
	//3.监听onload事件
	reader.onload = function () {
		preview.src = reader.result;
	}
}

