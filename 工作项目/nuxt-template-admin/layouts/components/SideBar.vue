<!--
 * @Author: 一尾流莺
 * @Description:侧边栏通用
 * @Date: 2021-12-15 14:15:34
 * @LastEditTime: 2021-12-18 15:22:32
 * @FilePath: \nuxt-template-admin\layouts\components\SideBar.vue
-->
<template>
  <div class='side-bar'>
    <div class="logo"
         @click="$router.push('/home')">
      <img :src="logo">
    </div>
    <div class="side-bar-item"
         v-for="item in sideBarList"
         :class="{'active-item':currentId === item.id}"
         @click='changePage(item)'
         :key='item.id'>{{item.title}}</div>
  </div>
</template>

<script lang='ts' setup>
import logo from '@/assets/images/logo.svg'
const router = useRouter()

interface SideBarDate {
  id: number
  title: string
  route: string
}
type SideBarList = SideBarDate[]

// 侧边栏数据
const sideBarList: SideBarList = [
  {
    id: 1,
    title: '模板管理',
    route: '/home',
  },
]

// 当前激活的侧边栏
const currentId = ref(1)

// 修改当前侧边栏
function changePage(item: SideBarDate) {
  currentId.value = item.id
  router.push(item.route)
}
</script>

<style lang='scss' scoped>
.side-bar {
  background-color: #1f1f1f;
  color: #d7dde4;
  text-align: center;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    cursor: pointer;
  }
  .side-bar-item {
    padding: 30px;
    cursor: pointer;
  }
  .active-item {
    background-color: #3370ff;
  }
}
</style>
