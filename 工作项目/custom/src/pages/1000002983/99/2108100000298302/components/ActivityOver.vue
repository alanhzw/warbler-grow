<!--
 * @Author: 一尾流莺
 * @Description:活动结束页面
 * @Date: 2021-08-27 16:09:18
 * @LastEditTime: 2021-08-27 16:39:41
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\ActivityOver.vue
-->
<template>
  <div class="activity-over">
    <img src="../assets/activity_end.jpg"
         class="activity-over-img" />
    <div class="activity-over-text1">您来晚了,活动已经结束了</div>
    <div class="activity-over-text2">下次记得早点来哦~</div>
    <div class="activity-over-btn"
         @click="go2Shop">进店逛逛</div>
  </div>
</template>

<script lang='ts' setup>

import { defineEmits } from 'vue';

const emit = defineEmits(['go2Shop']);

// 进店逛逛
const go2Shop = () => {
  emit('go2Shop');
};
</script>

<style lang='scss'>
.activity-over {
  width: 100vw;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .activity-over-img {
    width: 4.5rem;
    height: 4.5rem;
  }
  .activity-over-text1 {
    margin-top: 0.5rem;
  }
  .activity-over-text2 {
    margin-top: 0.2rem;
    font-size: 0.4rem;
    color: rgb(102, 102, 102);
  }
  .activity-over-btn {
    width: 4.4rem;
    height: 0.9rem;
    margin-top: 0.2rem;
    line-height: 0.9rem;
    font-size: 0.4rem;
    text-align: center;
    color: rgb(255, 255, 255);
    background: rgb(0, 136, 223);
    border-radius: 0.55rem;
  }
}
</style>
