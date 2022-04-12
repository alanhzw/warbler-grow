var EventUtil = {
	//检测绑定事件
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
			
		}else{
			element["on"+type]=handler;
		}
	},

	//通过removeHandler 移除事件
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
			
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
			
		}else{
			element["on"+type]=null;
		}
	},
	//得到事件对象
	getEvent:function(event){
		return event;
	},
	//得到目标
	getTarget:function(event){
		return event.target;
	},
	//取消默认行为
	preventDefault:function(event){
		event.preventDefault();
	},
	
	//取消冒泡
	stopPropagation:function(event){
		event.stopPropagation();
	},
	
	
	
	
};