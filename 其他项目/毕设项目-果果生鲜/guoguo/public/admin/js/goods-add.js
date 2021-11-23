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



function clearNoNum(obj){ 
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        obj.value= parseFloat(obj.value); 
    } 
} 
