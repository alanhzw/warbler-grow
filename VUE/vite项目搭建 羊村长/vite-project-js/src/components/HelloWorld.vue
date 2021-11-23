<!--
 * @Description:
 * @Date: 2021-03-19 17:13:28
 * @LastEditTime: 2021-03-24 00:16:50
 * @FilePath: \vite-project-js\src\components\HelloWorld.vue
-->
<template>
  <h1>{{ msg }}</h1>
  <div>12345</div>
  <div class='test'>asd</div>
  <p>{{ $store.state.couter }}</p>
  <el-button>asd</el-button>
  <van-button type="primary">主要按钮</van-button>
  <div>11</div>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
  <comp />
  <button @click="state.count++">count is: {{ state.count }}</button>
  <button @click="emit('clickMe')"></button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
// 直接导入组件
import Comp from './comp.vue';
import { defineProps, reactive, defineEmit, useContext } from 'vue';

import request from '../utils/request';
// 属性定义
const props = defineProps({
  msg: String,
});
console.log('props:', props);
// 定义事件
const emit = defineEmit(['clickMe']);
// a
// 获取上下文
const ctx = useContext();

const name = 'hzw';
console.log('ctx:', name);
ctx.expose({
  methods() {
    console.log('123:', name);
  },
});

console.log(2222222222, import.meta.env);

const state = reactive({ count: 0 });

// 请求
request({ url: '/api/getUsers', method: 'get' }).then((res) => {
  console.log(res);
});
</script>

<style scoped>
.test {
  display: flex;
  width: 100px;
  height: 100px;
  border: 1px solid black;
}
</style>
