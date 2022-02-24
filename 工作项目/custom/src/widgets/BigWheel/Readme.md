[toc]
# 大转盘部件

---

## 1. 功能描述

​	绘制可旋转的圆形组件，圆形的各个扇瓣显示相关的奖品信息，

​	可以通过传入props设置转盘背景和扇瓣上的奖品

​	指定旋转结果后，执行旋转动画，并结束旋转

## 2. 开发流程

 	1. 制作圆形可旋转区域（转盘）
      	1. 根据外部包裹元素绘制最大内切圆
      	2. 把传入背景图片作为转盘背景图片
 	2. 绘制指针
      	1. 根据传入图片绘制指针
 	3. 绘制扇瓣
      	1. 根据传入的奖品信息画出对应个数的奖品展示区域
      	2. 每个奖品的展示区域旋转对应的角度
      	3. 展示不同类型的奖品信息
 	4. 转盘旋转可控
      	1. 转盘可旋转到指定角度
      	2. 转盘可旋转到指定的奖品
      	3. 转盘旋转中展示过渡动画
 	5. 对外交互
      	1. 对外开放start、end事件
      	2. 对外开放旋转方法
      	3. 开放扇瓣绘制的插槽

## 3. 使用方法

1. 引入组件并安装

```javascript
import BigWheel from '@/widgets/BigWheel';

app.use(BigWheel)
```

2. template中使用组件
   1. 组件的属性中传入组件的参数
      * plate _(String)_: 转盘背景
      * pinter _(String)_: 指针图片
      * prizes _(Array)_: 奖品信息
      * startFunc _(Function)_: 旋转结束回调函数
      * finishFunc _(Function)_: 旋转结束回调函数
   2. 指定组件的ref

```html
<big-wheel ref="bw" diameter="90vw" plate="plate.png" pointer="pointer.png" :prizes="prizes" @rotate-start="startFunc" @rotate-over="finishFunc" />
```

3. 点击开始旋转，startFunc调用组件的 _rotateToPrize_ 方法控制大转盘旋转

```javascript
const bw = ref();
const startFunc = () => {
	bw.rotateToPrize(prizeIndex); // prizeIndex为奖品在prizes列表中的序号，从0开始 
}
```

4. 在旋转结束的事件处理函数中，处理结束的逻辑

```javascript
const finishFunc = (prizeIndex, prize) => {
	console.log(`大转盘旋转到第${prizeIndex + 1}个奖品的位置结束转动`);
  console.log(`奖品信息为：${JSON.stringify(prize)}`)
}
```

5. 可自定义扇瓣显示

```html
<big-wheel ref="bw" class="big-wheel" :plate="platePic" :pointer="pointerPic" :prizes="prizes" @rotate-start="startFunc"  @rotate-over="finishFunc">
  <template #prize="{prize}">
    <img :src="prize.prizePic" />
    <p>{{prize.prizeName}}</p>
  </template>
</big-wheel>
