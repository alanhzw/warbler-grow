<!--
 * @Description:
 *     待办信息的组件
 * @Author:HJ
 * @Date: 2021-05-06
 * @LastEditTime: 2021-05-20
 * @FilePath: \intelligent-overhaul-app\src\components\CheckUp.vue
-->
<template>
  <div class="home-order">
    <div class="order-info">
      <div class="order-content">
        <span>{{ info.urgentStatus == '1' ? '紧急' : '一般' }}</span>
        <span>{{ info.createTime }}</span>
      </div>
      <div class="order-source">
        <p>{{ info.title }}</p>
        <p>{{ info.fromWorkerName }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from  "vue";

const props = defineProps({
  info: {
    default: () => ({})
  }
})

</script>
<style lang="scss" scoped>
@import '../style/_variable.scss';

.home-order {
  display: flex;
  flex-direction: column;
  position: relative;

  margin: 0.15rem 0;
  border-radius: 0.08rem 0.08rem 0.26rem 0.26rem;
  border: 1px solid #EBEEF2;
  overflow: hidden;

  .order-info {
    flex: 1;
    background-color: $WHITE;
    position: relative;
    border-bottom: 0.08rem solid;
    border-image: linear-gradient(-90deg, #E3726C, #E3726C) 30 30;
    .order-content {
      display: flex;
      margin: 0.32rem 0.24rem 0.48rem 0.24rem;
      justify-content: space-between;
      align-items: center;
      >:nth-child(2) {
        font-size: .30rem;
        opacity: .45;
      }
    }
    .order-source {
      margin: 0.24rem;
      border-left: 0.08rem solid rgba(0, 0, 0, .1);
      font-size: 0.24rem;
      text-align: left;
      line-height: 0.36rem;
      padding-left: 0.12rem;
      >:nth-child(2) {
        margin-left: 0.1rem;
      }
    }
  }
}
</style>
