<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-13 09:41:08
 * @LastEditTime: 2021-11-02 16:57:19
 * @FilePath: \Vue3 + Ts 的一个 todolist 练习\vue3.0-learn-todolist1\src\App.vue
-->
<template>
  <div class="box">
    <div class="vbody"
         v-for='item in list'
         :key='item'>内容区域{{item}}</div>
    <div class="reference"
         ref='reference'></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  name: '',
  setup() {
    const reference = ref(null)
    const list = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    onMounted(() => {
      let n = 10
      //回调函数
      const callback = (entries) => {
        const myEntry = entries[0]
        if (myEntry.isIntersecting) {
          myEntry.target.
        }
      }
      //配置对象
      const options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: [0, 1],
        trackVisibility: true,
        delay: 100,
      }
      //观察器实例
      const myObserver = new IntersectionObserver(callback, options)
      //开始观察
      myObserver.observe(reference.value)
    })

    return { reference, list }
  },
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.reference {
  width: 100%;
  visibility: hidden;
}
.vbody {
  width: 100%;
  height: 200px;
  background-color: red;
  color: aliceblue;
  font-size: 40px;
  text-align: center;
  line-height: 200px;
  margin: 10px 0;
  transition: all 1s;
}
</style>