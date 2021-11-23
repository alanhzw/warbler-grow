<!--
 * @Description:
 *     委托单详情页工种的组件
 * @Author:SXW 
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-30
 * @FilePath: \intelligent-overhaul-app\src\components\Additional.vue
-->
<template>
  <!-- 施工类别   工时   人数   工种 -->
  <div class="additional">
    <img src="../assets/icon-category.png">
    <span>{{constCategoryStr}}</span>
    <img src="../assets/icon-time.png">
    <span>{{(info.totalHour||0)-0}}h</span>
    <img src="../assets/icon-num.png">
    <span>{{(info.totalPeople||0)-0}}人</span>
    <img src="../assets/icon-worktype.png">
    <span style="margin-right: 0;">{{info.workTypeList.join('/')}}</span>
  </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  info: {
    default: () => ({})
  }
});
const constCategoryStr = computed(() => {
  const map = {
    11: '集中日修',
    2: '定修',
    3: '年修',
    4: '抢修',
    1: '日修',
  }
  return map[props.info.constCategory]
})
</script>
<style lang="scss" scoped>
@import '../style/_variable.scss';
.additional {
  font-size: 0.24rem;
  padding: 0.32rem 0.24rem;
  text-align: left;;
  background-color: $WHITE;
  border-bottom: 0.08rem solid  #6796DD;
  // border-image: linear-gradient(-90deg, #92BCFB, #6796DD) 30 30;
  display: flex;
  align-items: center;

  img {
    height: 0.3rem;
    margin-right: 0.08rem;
  }

  span {
    margin-right: 0.4rem;
  }
}
</style>