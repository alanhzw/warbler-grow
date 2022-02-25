<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-01-25 10:04:23
 * @LastEditTime: 2022-02-16 16:50:48
 * @FilePath: \common_c\src\components\ICondition.vue
-->
<template>
  <!-- 兑换条件 -->
  <div class="ICondition">

    <p v-if="isMemberCoupon"
       class="title">领取条件</p>
    <p v-else
       class="title">兑换条件</p>
    <div class="con_conditions">
      <div v-for="(c, index) in conditionsArray"
           :key="index"
           class="item"
           :style="[{color:  $store.state.styleOptions?$store.state.styleOptions.exchangeFrontColor : '#0684ff',backgroundColor: $store.state.styleOptions ? $store.state.styleOptions.exchangeBackgroundColor : '#e6f2fe'}]">
        {{ c }}
      </div>
    </div>
  </div>
</template>

<script>
import { PointsService } from '@/http';
import Qs from 'qs';

export default {
  name: 'ICondition',
  props: {
    conditions: {
      required: true,
    },
    isMemberCoupon: {
      default: false,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    // 原来conditions 为,分割的数字，现在只有一个字符串
    conditionsArray() {
      const temp = [];
      if (this.conditions) {
        temp.push(this.conditions);
        // this.conditions.split(',').forEach(e => {
        //   temp.push(
        //     ['非会员', '一级' , '二级', '三级', '四级', '五级'][e] + '以上可用'
        //   )
        // })
      } else {
        temp.push('无');
      }

      return temp;
    },
  },
  methods: {

  },
};
</script>

<style scoped>
.ICondition {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.18rem 0.3rem;
  margin-bottom: 0.2rem;
}

.title {
  color: #303030;
  font-size: 0.3rem;
  text-align: left;
  margin-bottom: 0.24rem;
}

.con_conditions {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.item {
  padding: 0.08rem;
  background: #e6f2fe;
  color: #0684ff;
  font-size: 0.24rem;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}
</style>
