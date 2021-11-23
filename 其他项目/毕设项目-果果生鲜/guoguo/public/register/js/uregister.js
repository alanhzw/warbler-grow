function validAccount() {
	let obj = document.querySelector("#account");
	let value = obj.value;
	if (value.length != 11) {
		document.querySelector("#message-account").innerHTML = "<font size='4' color='red'>手机号格式不正确！</font>";
		obj.style.outline = "none";
		obj.style.border = "1px red solid";
		obj.select();
		return false;
	}else{
		obj.style.border = "1px #aaa solid";
		document.querySelector("#message-account").innerHTML = "<font size='4' color='red'>&nbsp;&nbsp;</font>";
	}
}

function validPassword () {
	let obj = document.querySelector("#password");
	let value = obj.value;
	if (value.length < 6) {
		document.querySelector("#message-password").innerHTML="<font size='4' color='red'>密码不能少于六位！</font>";
		obj.style.outline = "none";
		obj.style.border = "1px red solid";
		obj.select();
	} else{
		obj.style.border = "1px #aaa solid";
		document.querySelector("#message-password").innerHTML = "<font size='4' color='red'>&nbsp;&nbsp;</font>";
	}
}





function check(){
	
	return validAccount() && validPassword();

		
}

