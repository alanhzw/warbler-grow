<!--
 * @Description:
 *    退单组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\OrderBack.vue
-->
<template>
  <div class="home-order">
    <div class="order-info">
      <div class="order-content">
        <span>退单审批</span>
        <span>{{ info.position }}&nbsp;{{ info.clientPerson }}&nbsp;&nbsp;{{ info.createTime }}</span>
      </div>
      <div class="order-source">
        <p>{{ info.standardItemCode }}</p>
        <p>{{ info.projectName }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
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
    border-image: linear-gradient(-90deg, #e68319, #e98c29) 30 30;
    .order-content {
      display: flex;
      margin: 0.32rem 0.24rem 0.48rem 0.24rem;
      justify-content: space-between;
      align-items: center;
      >:nth-child(2) {
        font-size: .12rem;
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
    }
  }
}
</style>