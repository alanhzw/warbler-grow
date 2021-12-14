<!--
 * @Author: 一尾流莺
 * @Description:正在招聘 单项
 * @Date: 2021-09-28 18:31:26
 * @LastEditTime: 2021-11-23 20:08:22
 * @FilePath: \ired_resource\src\pages\public\home\components\JobItem.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="job-item-vue">
    <div class="hurry"
         v-if='jobItem.isHurry === "1"'>
      <img src="../assets/icon-anxious-recruit.png">
    </div>
    <div class="first-part">
      <div class="left">{{jobItem.recruitmentPostName}}</div>
      <div class="right">{{jobItem.moneyStart}}K - {{jobItem.moneyEnd}}K</div>
    </div>
    <div class="second-part">{{jobItem.city}} | {{jobItem.workingYearsType}} | {{jobItem.education}}</div>
    <div class="third-part"></div>
    <div class="fourth-part">
      <img :src="jobItem.companyLogo"
           class="icon" />
      <div class="name">{{jobItem.shortName}}</div>
      <div class="info">{{jobItem.industryName}} | {{jobItem.financingStatus}}</div>
    </div>
  </div>
</template>

<script lang='ts' setup>


import { defineProps, computed } from 'vue';

const props = defineProps({
  jobItem: {
    type: Object,
    default: () => {},
  },
});
// 工作经验
const workingYearsTypeMap = ['', '不限', '1年以内', '1-3年', '3-5年', '5-10年'];
const workingYears = computed(() => workingYearsTypeMap[props.jobItem.workingYearsType]);

// 学历
const educationMap = ['', '不限', '初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'];
const education = computed(() => educationMap[props.jobItem.education]);

// 融资状态
const financingStatusMap = ['', '未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上'];
const financingStatus = computed(() => financingStatusMap[props.jobItem.financingStatus]);
</script>

<style lang='scss'>
.job-item-vue {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;



  * {
    box-sizing: border-box;
    font-family: PingFang SC-Regular, PingFang SC;
  }
  .first-part {
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 18px;
      color: #222222;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .red{
      color: #ED263D;
    }
    .right {
      font-size: 18px;
      font-weight: bold;
      color: #ff9100;
    }
  }
  .second-part {
    font-size: 14px;
    color: #999999;
  }
  .third-part {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #E8E8E8;
  }
  .fourth-part {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 8px 8px 8px 8px;
    }
    .name {
      margin-left: 10px;
      font-size: 14px;
      color: #222222;
    }
    .info {
      margin-left: 16px;
      font-size: 14px;
      color: #999999;
    }
  }
  .hurry{
    position: absolute;
    top: -30px;
    left: -20px;
    img{
      width: 40px;
      height: 40px;
    }
  }
}
</style>
