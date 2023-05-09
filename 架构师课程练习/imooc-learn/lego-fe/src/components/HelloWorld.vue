<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-31 10:30:06
 * @LastEditTime: 2022-05-31 16:16:39
 * @FilePath: \lego-fe\src\components\HelloWorld.vue
-->
<template>
  <div>
    <!-- 显示 props.msg 内容 -->
    <h1>{{ msg }}</h1>
    <!-- 按钮 点击 count ++  -->
    <button class="add-count"
            @click="addCount">{{ count }}</button>
    <!-- 输入框 -->
    <input type="text"
           v-model="todo" />
    <!-- 按钮 点击添加 todo -->
    <button class="add-todo"
            @click="addTodo">addTodo</button>
    <!-- . todos 列表 渲染 todo -->
    <ul>
      <li v-for="(todo, index) in todos"
          :key="index">{{ todo }}</li>
    </ul>
    <!-- 按钮 点击发起异步请求 -->
    <button class="load-user"
            @click="loadUser">loadUser</button>
    <!-- 加载动画 -->
    <p v-if="user.loading"
       class="loading">loading</p>
    <!-- 显示数据 -->
    <div v-else
         class="user-name">{{ user?.data?.username }}</div>
    <!-- 错误提示 -->
    <p v-if="user.error"
       class="error">error</p>
    <!-- 子组件 传递 msg = 1234 -->
    <hello-com msg="1234"></hello-com>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { defineProps, ref, defineEmits, reactive } from 'vue'
import HelloCom from './hello.vue'

// 定义props
defineProps({
  msg: String
})

// 定义事件
const emit = defineEmits(['send'])

// 初始化 count
const count = ref(0)

// count++
const addCount = () => {
  count.value++
}

// 初始化 input 内容
const todo = ref('')

// 初始化 todos 列表
const todos = ref<string[]>([])

// 添加 todo 到 todos 列表
const addTodo = () => {
  if (todo.value) {
    todos.value.push(todo.value)
    emit('send', todo.value)
  }
}

// 初始化异步请求数据
const user = reactive({
  data: null as any,
  loading: false,
  error: false
})

// 异步请求
const loadUser = () => {
  user.loading = true
  axios.get("https://jsonplaceholder.typicode.com/users/1").then((resp) => {
    console.log(resp)
    user.data = resp.data
  }).catch(() => {
    user.error = true
  }).finally(() => {
    user.loading = false
  })
}

</script>

<style scoped>
</style>