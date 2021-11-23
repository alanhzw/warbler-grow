<!--
 * @Description:
 *     首页的组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-30
 * @FilePath: \intelligent-overhaul-app\src\view\Home\Card.vue
-->
<template>
  <section class="home-card">
    <div class="top">
      <user />
      <toolbar />
    </div>
    <div class="bottom">
      <stat />
    </div>
  </section>
</template>
<script setup>
import { defineProps } from 'vue';
import User from './User.vue';
import Toolbar from './Toolbar.vue';
import Stat from './Stat.vue';

const props = defineProps({
  info: {
    default: () => ({})
  }
})
</script>
<style lang="scss" scoped>
@import '../../style/_variable.scss';

.home-card {
  background-image: url('../../assets/bg-home-banner.png');
  // background-image: url('../../assets/mine-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 0.32rem;
  // padding-top: 0.8rem;


  .top {
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    margin-top: 0.2rem;
  }
}
</style>