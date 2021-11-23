<!--
 * @Description: 
 * @Autor: hanzhiwei
 * @Date: 2021-03-03 09:40:12
 * @LastEditTime: 2021-03-03 13:08:46
 * @FilePath: \bigwheel\src\components\HelloWorld.vue
-->
<template>
  <div class="hello">
    <input type="text" @input='getWheelSetting' v-model="type">
    <button @click='onClickRotate'>开始</button>
    <div class="bg" :style="`transform: rotate(${wheelDeg}deg)`">
      <div class="item" v-for='(item,index) in dataInfo.dataList' :key='item+index' :style="`transform: rotate(${dataInfo.rotate * index}deg) skewY(${dataInfo.skewY}deg);background-color:${index %2 ===0?'red':'blue'}`">
        <p class="title" :style="`transform:rotate(-55deg) skewY(0deg)`">{{item.data}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import getWheelSettings from '../js/data'
export default {
  name: 'HelloWorld',
  data () {
    return {
      type: 0,
      dataInfo: {},
      wheelDeg: "",
      rolling: false
    }
  },
  methods: {
    async getWheelSetting () {
      this.dataInfo = await getWheelSettings.getWheelSettings(this.type)
    },
    onClickRotate () {
      if (this.rolling) {
        //判断当前是否正在抽奖,防止连击
        return;
      }
      //根据接口返回的结果,决定指针最后停留的位置
      const result = Math.floor(Math.random() * this.dataInfo.dataList.length);
      console.log(result);
      this.roll(result);
    },
    roll (result) {
      this.rolling = true; //状态置为当前正在抽奖
      const { wheelDeg } = this;
      console.log(wheelDeg);
      //自身旋转的度数,加上转的圈数
      this.wheelDeg =
        wheelDeg - (wheelDeg % 360) + 6 * 360 + (360 - (360 / this.dataInfo.dataList.length) * result);
      //定时器结束,显示结果
      setTimeout(() => {
        //当前状态置为没有抽奖
        this.rolling = false;
        //显示结果
        alert("Result：" + this.dataInfo.dataList[result].data);
      }, 4500);
    },
  }
}
</script>

<style scoped>
.bg {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: green;
  overflow: hidden;
  transition: transform 4s ease-in-out;
}
.item {
  position: absolute;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: greenyellow;
  transform-origin: right bottom;
}
.title {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: skewY(-30deg);
}
</style>
