<!--
 * @Description:
 *    进度条组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\WorkProgress.vue
-->
<template>
  <div class="work-progress">
    <div class="axis" :style="{
      background: `linear-gradient(90deg, #6796DD 0%, #92BCFB ${steps.progress-0.01}%, #E5E5E5 ${steps.progress}%, #E5E5E5 100%)`
    }">
      <div class="tick" v-for="(step, index) in steps.list" :key="`tick-${index}`" :class="{ finish: step.finish}">
        <div class="label">{{step.label}}</div>
        <div class="date">{{step.date}}</div>
      </div>
    </div>
    <!-- <div>{{JSON.stringify(info.progressStatus)}}</div> -->

  </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import Moment from 'moment';

const props = defineProps({
  info: {
    default: () => ({})
  }
});
const steps = computed(() => {
  const arr = [
    {
      label: '挂牌',
      statusAlias: 'statusOne',
      dateAlias: 'statusOneDate',
    },
    {
      label: '安全确认',
      statusAlias: 'statusTwo',
      dateAlias: 'statusTwoDate',
    },
    {
      label: '交底',
      statusAlias: 'statusThree',
      dateAlias: 'statusThreeDate',
    },
    {
      label: '施工',
      statusAlias: 'statusFour',
      dateAlias: 'statusFourDate',
    },
    {
      label: '自检',
      statusAlias: 'statusFive',
      dateAlias: 'statusFiveDate',
    },
    {
      label: '验收',
      statusAlias: 'statusSix',
      dateAlias: 'statusSixDate',
    },
    {
      label: '摘牌',
      statusAlias: 'statusSeven',
      dateAlias: 'statusSevenDate',
    },
  ]
  let maxActive = 0
  arr.forEach((step, index) => {
    step.finish = props.info.progressStatus[step.statusAlias] == 1;
    if (step.finish) {
      maxActive = index
    }
    const date = props.info.progressStatus[step.dateAlias];
    if (date) {
      step.date = Moment(date).format('M-DD');
    }
  })
  return {
    list: arr,
    progress: maxActive + 1 == arr.length ? 100 : `${(maxActive + 1) * 100 / (arr.length + 1)}`,
  }
})

</script>
<style lang="scss" scoped>
@import '../style/_variable.scss';

.work-progress {
  background-color: $WHITE;
  padding-bottom: 0.96rem;

  .axis {
    position: relative;
    height: 0.16rem;
    display: flex;
    justify-content: space-evenly;
    padding: 0 0.1rem;

    .tick {
      position: relative;
      height: 0.12rem;
      width: 0.12rem;
      background-color: $WHITE;
      // margin: 0.02rem;
      border-radius: 50%;
      border: 0.02rem solid #e5e5e5;
      &.finish {
        border-color: #92BCFB;
        .label {
          opacity: 1;
        }
      }
      .label {
        position: absolute;
        text-align: center;
        font-size: 0.22rem;
        transform: translate(-50%, 0);
        width: 2rem;
        top: 100%;
        margin-top: 0.16rem;
        opacity: 0.28;
      }
      .date {
        position: absolute;
        text-align: center;
        font-size: 0.22rem;
        transform: translate(-50%, 0);
        width: 2rem;
        top: 100%;
        margin-top: 0.48rem;
        opacity: 0.28;
      }
    }
  }
}
</style>