<!--
 * @Description:
 *     首页数量的组件
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-20
 * @FilePath: \intelligent-overhaul-app\src\view\Home\Stat.vue
-->
<template>
  <div class="home-stat">
    <div>
      <p class="value">{{statData.totalMoney}}<span style="font-size: .2rem;">&nbsp;万</span></p>
      <p class="label">委托总金额</p>
    </div>
    <div>
      <p class="value">{{statData.yearNumber}}</p>
      <p class="label">年度工单</p>
    </div>
    <div>
      <p class="value">{{statData.mouthNumber}}</p>
      <p class="label">本月工单</p>
    </div>
    <div>
      <p class="value">{{statData.weekNumber}}</p>
      <p class="label">本周工单</p>
    </div>
  </div>
</template>
<script setup>
import { statData } from './store/statData';

</script>
<style lang="scss" scoped>
@import '../../style/_variable.scss';

.home-stat {
  padding-top: 0.2rem;
  padding-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
  color: $WHITE;
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  .value {
    font-size: 0.32rem;
  }
  .label {
    font-size: 0.22rem;
  }
}
</style>