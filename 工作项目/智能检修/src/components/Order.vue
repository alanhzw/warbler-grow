<!--
 * @Description:
 *    委托单组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\Order.vue
-->
<template>
  <div class="home-order">
    <div class="order-info">
      <!-- <span class="order-status blue">待派单</span> -->
      <span class="order-status" :class="orderState.color">{{orderState.label}}</span>
      <div class="order-content">{{info.projectName}}</div>
      <img class="level-img" :src="levelPics[info.qualityGrade]">
      <img class="warn-img" :src="warnPics[info.highDangerGrade]">
      <div class="order-source">
        <p>{{info.standardItemCode}}</p>
        <p>{{info.clientId_dictText}} {{info.clientPerson}} {{info.clientDate}} 委托</p>
        <p v-if="user.userType==1">预计{{info.planConstDate}} 施工</p>
      </div>
    </div>
    <additional v-if="type==1" :info="info" />
    <work-progress v-if="type==2" :info="info"/>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";
import WorkProgress from './WorkProgress.vue';
import Additional from './Additional.vue';
import warn1Pic from '../assets/warn-1.png';
import warn2Pic from '../assets/warn-2.png';
import warn3Pic from '../assets/warn-3.png';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.state.user.info);

const warnPics = [ '', warn1Pic, warn2Pic, warn3Pic ]

import level1Pic from '../assets/level-A.png';
import level2Pic from '../assets/level-B.png';
import level3Pic from '../assets/level-C.png';
import level4Pic from '../assets/level-D.png';
const levelPics = {
  A: level1Pic,
  B: level2Pic,
  C: level3Pic,
  4: level4Pic
};

const props = defineProps({
  info: {
    default: () => ({})
  },
  type: {
    default: '2'
  }
});
const orderState = computed(() => {
  const stateMap = {
    // 10: {
    //   label: '待派单',
    //   color: 'dark-blue', // '#4E78B7',
    // },
    // 20: {
    //   label: '待派单',
    //   color: 'dark-blue', // '#4E78B7',
    // },
    // 30: {
    //   label: '待派单',
    //   color: 'dark-blue', // '#4E78B7',
    // },
    // 40: {
    //   label: '待派单',
    //   color: 'dark-blue', // '#4E78B7',
    // },
    // 50: {
    //   label: '施工中',
    //   color: 'green', // '#6CAF51',
    // },
    // 60: {
    //   label: '自检中',
    //   color: 'light-blue', // '#9ABEF4',
    // },
    // 70: {
    //   label: '验收中',
    //   color: 'orange', // '#F17300',
    // },
    // 80: {
    //   label: '待归档',
    //   color: 'black', // '#575757',
    // },
    // 90: {
    //   label: '已归档',
    //   color: 'blue', // '#6DA5F8',
    // },
    "A01": {
      label: '待派单',
      color: 'dark-blue',
    },
    "A02": {
      label: '未开工',
      color: 'gray',
    },
    "A03": {
      label: '施工中',
      color: 'green',
    },
    "A04": {
      label: '自检中',
      color: 'light-blue',
    },
    "A05": {
      label: '验收中',
      color: 'orange',
    },
    "A06": {
      label: '待归档',
      color: 'black',
    },
    "A07": {
      label: '已归档',
      color: 'blue',
    },
    "A08": {
      label: '自检中',
      color: 'light-blue',
    }
  }
  return stateMap[props.info.orderState] || {};
});

</script>
<style lang="scss" scoped>
@import '../style/_variable.scss';

.home-order {
  display: flex;
  flex-direction: column;
  position: relative;

  margin: 0.15rem 0;
  border-radius: 0.08rem;
  border: 1px solid #EBEEF2;
  overflow: hidden;

  .order-info {
    flex: 1;
    background-color: $WHITE;
    position: relative;

    .order-status {
      position: absolute;
      right: 0;
      top: 0.32rem;
      color: $WHITE;
      font-size: 0.24rem;
      line-height: 0.24rem;
      padding: 0.12rem 0.24rem;

      &::before {
        position: absolute;
        left: -0.1rem;
        top: 0;
        content: '';
        width: 0;
        border-top: 0 ;
        border-left: 0.1rem solid;
        border-bottom: 0.48rem solid;
        border-right: 0.1rem solid;
      }


      &.dark-blue {
        background-color: #4E78B7;
      }

      &.dark-blue::before {
        border-color: transparent transparent #4E78B7 transparent;
      }

      &.gray {
        background-color: #788BA7;
      }

      &.gray::before {
        border-color: transparent transparent #788BA7 transparent;
      }

      &.green {
        background-color: #6CAF51;
      }

      &.green::before {
        border-color: transparent transparent #6CAF51 transparent;
      }

      &.light-blue {
        background-color: #9ABEF4;
      }

      &.light-blue::before {
        border-color: transparent transparent #9ABEF4 transparent;
      }

      &.orange {
        background-color: #F17300;
      }

      &.orange::before {
        border-color: transparent transparent #F17300 transparent;
      }

      &.black {
        background-color: #575757;
      }

      &.black::before {
        border-color: transparent transparent #575757 transparent;
      }

      &.blue {
        background-color: #6DA5F8;
      }

      &.blue::before {
        border-color: transparent transparent #6DA5F8 transparent;
      }

    }
    .level-img {
      position: absolute;
      width: 0.48rem;
      top: 1.56rem;
      right: 0.24rem
    }

    .warn-img {
      position: absolute;
      width: 0.48rem;
      top: 1.56rem;
      right: 0.88rem;

    }


    .order-content {
      font-size: 0.28rem;
      line-height: 0.42rem;
      margin: 0.32rem 1.68rem 0.48rem 0.24rem;
      text-align: left;
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