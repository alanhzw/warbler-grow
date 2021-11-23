window.addEventListener("load", () => {
	//动画函数
	function animate(obj, target, callback) {
		// console.log(callback);  callback = function() {}  调用的时候 callback()

		// 先清除以前的定时器，只保留当前的一个定时器执行
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			// 步长值写到定时器的里面
			// 把我们步长值改为整数 不要出现小数的问题
			// var step = Math.ceil((target - obj.offsetLeft) / 10);
			var step = (target - obj.offsetLeft) / 10;
			step = step > 0 ? Math.ceil(step) : Math.floor(step);
			if (obj.offsetLeft == target) {
				// 停止动画 本质是停止定时器
				clearInterval(obj.timer);
				// 回调函数写到定时器结束里面
				// if (callback) {
				//     // 调用函数
				//     callback();
				// }
				callback && callback();
			}
			// 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
			obj.style.left = obj.offsetLeft + step + 'px';

		}, 15);
	}




	// 1.获取左右箭头元素
	let left = document.querySelector(".left");
	let right = document.querySelector(".right");
	//获取图片宽度			
	let box = document.querySelector(".menu-swiper");
	let boxwidth = box.offsetWidth;
	//2.添加鼠标经过事件 显示隐藏左右按钮
	//鼠标经过停止定时器  鼠标离开就开启
	box.addEventListener("mouseenter", () => {
		left.style.display = "block";
		right.style.display = "block";
		clearInterval(timer);
		timer = null;
	});
	box.addEventListener("mouseleave", () => {
		left.style.display = "none";
		right.style.display = "none";
		timer = setInterval(() => {
			//手动调用点击事件
			right.click();
		}, 2000);
	});


	//3.动态生成小圆圈 有几张图 就生成几个小圆圈
	//获取图片的数量
	let ul = box.querySelector("ul");
	//获取ol元素
	let ol = box.querySelector(".circle");
	//循环插入li到ol里面
	for (let i = 0; i < ul.children.length; i++) {
		//创建一个li
		let li = document.createElement("li");
		// 生成一个自定义属性(记录当前小圆圈的索引号)
		li.setAttribute("index", i);
		//把li插入到ol里面 
		ol.appendChild(li);
		//4.给小圆圈绑定点击事件
		li.addEventListener("click", function() {
			//清除所有li的current类名
			for (let i = 0; i < ol.children.length; i++) {
				ol.children[i].className = "";
			}
			//当前的li设置current类名
			this.className = "current";
			//5.点击小圆圈 移动图片  移动的是<ul>
			//ul的移动距离就是圆圈的索引号×图片的宽度  是 负值
			//点击某个li 拿到当前li的索引号
			let index = this.getAttribute("index");
			//当点击某个li 讲这个li的索引号给num
			num = index;
			//当点击某个li 讲这个li的索引号给circle
			circle = index;
			animate(ul, -index * boxwidth);
		});
	}
	//把ol里面的第一个li设置类名为current			
	ol.children[0].className = "current";
	//6.克隆第一张图片 放在ul最后面
	let first = ul.children[0].cloneNode(true);
	ul.appendChild(first);
	//7.点击右侧按钮,图片滚动一张
	let num = 0;
	let circle = 0;
	let flag = true;
	right.addEventListener("click", () => {
		if (flag) {
			//关闭节流阀
			flag = false;
			//如果走到了最后一张复制的图片 此时ul要快速复原 left改为0
			if (num == ul.children.length - 1) {
				ul.style.left = 0;
				num = 0;
			}
			num++;
			animate(ul, -num * boxwidth, () => {
				//打开节流阀
				flag = true;
			});
			//8.点击右侧按钮 小圆圈跟随一起变化
			circle++;
			//如果circle==4 说明走到了克隆的图片
			if (circle == ol.children.length) {
				circle = 0;
			}
			//调用函数
			circleChange();
		}
	});

	left.addEventListener("click", () => {
		if (flag) {
			flag = false;
			//如果走到了最后一张复制的图片 此时ul要快速复原 left改为0
			if (num == 0) {
				num = ul.children.length - 1;
				ul.style.left = -num * boxwidth + "px";
			}
			num--;
			animate(ul, -num * boxwidth, () => {
				//打开节流阀
				flag = true;
			});
			//8.点击右侧按钮 小圆圈跟随一起变化
			circle--;
			//如果circle < 0 说明第一张图片 则小圆圈要改为第四个小圆圈(3)
			if (circle < 0) {
				circle = ol.children.length - 1;
			}
			//调用函数
			circleChange();

		}
	});


	function circleChange() {
		//清除其余小圆圈的current类名
		for (let i = 0; i < ol.children.length; i++) {
			ol.children[i].className = '';
		}
		//添加当前小圆圈current类名
		ol.children[circle].className = "current";
	}


	//自动播放 就相当于  点击了 右侧按钮
	let timer = setInterval(() => {
		//手动调用点击事件
		right.click();
	}, 2000);



	
	
});
