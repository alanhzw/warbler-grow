<!--
 * @Description:
 * @Date: 2021-03-19 17:13:28
 * @LastEditTime: 2021-07-14 11:53:19
 * @FilePath: \vite-project-js\src\App.vue
-->
<template>
  <!-- <router-view></router-view> -->
  <div>
    <van-list v-model:loading="state.loading"
              :finished="state.finished"
              finished-text="没有更多了"
              :immediate-check='true'
              ref='list'
              @load="onLoad">
      <div v-for="(item,index) in state.list"
           class="floor"
           :key="item + index">
        <component :is="item"></component>
      </div>
    </van-list>
  </div>

</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import request from './utils/request';
const list = ref(null);

onMounted(() => {
  document.querySelector('#loading').style.display = 'none';

  console.log('🚀🚀~ list:', list.value);
  list.value.check();
});

const state = reactive({
  list: [],
  loading: false,
  finished: false,
});

const onLoad = () => {
  // 异步更新数据
  request({ url: '/api/getFloors', method: 'get' }).then((res) => {
    const testArr = ['testA', 'testB', 'testC'];
    const random = Math.floor(Math.random() * testArr.length);
    state.list.push(testArr[random]);
    // 加载状态结束
    state.loading = false;
    // 数据全部加载完成
    if (state.list.length >= 15) {
      state.finished = true;
    }
  });
};
</script>

<style>
.floor {
  margin: 0 auto;
  width: 1600px;
  height: 800px;
  border: 2px solid #000;
  margin-bottom: 5px;
}
</style>
