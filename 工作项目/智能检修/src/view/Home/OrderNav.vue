<!--
 * @Description:
 *     首页的模块组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-20
 * @FilePath: \intelligent-overhaul-app\src\view\Home\OrderNav.vue
-->
<template>
  <nav class="home-nav">
    <div class="nav-item">
      <router-link :to="'/h5/orderNavs/itemToDo'">
        <img src="../../assets/icon-todo.png">
        <div v-if="statData.pendingNumber != 0" class="dot"></div>
        <p>待办事项</p>
      </router-link>
    </div>
    <div class="nav-item" v-if="user.userType != 3">
      <router-link :to="'/h5/orderNavs/waitFileOrders'">
        <img src="../../assets/icon-archive.png">
        <p>待归档工单</p>
      </router-link>
    </div>
    <div class="nav-item" v-else>
      <router-link :to="'/h5/orderNavs/workeringOrders'">
        <img src="../../assets/icon-archive.png">
        <p>进行中工单</p>
      </router-link>
    </div>
    <div class="nav-item" v-if="user.userType != 3">
      <router-link :to="'/h5/orderNavs/finishedOrders'">
        <img src="../../assets/icon-finish.png">
        <p>完结工单</p>
      </router-link>
    </div>
    <div class="nav-item" v-else>
      <router-link :to="'/h5/orderNavs/completedOrders'">
        <img src="../../assets/icon-finish.png">
        <p>已完成工单</p>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { statData } from './store/statData';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const user = computed(() => store.state.user.info)
</script>

<style lang="scss" scoped>
@import '../../style/_variable.scss';

.home-nav {
  display: flex;
  background-color: $WHITE;
  margin: -0.32rem 0.32rem 0.32rem 0.32rem;
  box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.04);
  border-radius: 0.08rem;

  .nav-item {
    flex: 1;
    height: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 0.48rem;
    }
    p {
      margin-top: 0.1rem;
      font-size: 0.24rem;
      color: black;
    }
    &:nth-child(2) {
      border-left: 1px solid #EBEEF2;
      border-right: 1px solid #EBEEF2;
    }
    .dot {
      position: relative;
    }
    .dot::after {
      content: " ";
      width: 0.15rem;
      height: 0.15rem;
      border-radius: 50%;
      position: absolute;
      top: -0.56rem;
      left: 0.6rem;
      background-color: #F17300;
}
  }
}
</style>