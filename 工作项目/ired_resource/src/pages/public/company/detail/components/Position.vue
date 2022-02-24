<!--
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-15 18:55:27
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 21:47:23
-->
<template>
  <div class="position-item">
    <div>
      <div class="name">{{info.recruitmentPostName}}</div>
      <div><span class="salary">{{info.moneyStart}}k - {{info.moneyEnd}}k</span><span class="requirement">{{info.workingYearsType}}年 | {{education}}</span></div>
    </div>
    <div class="contact">
      <img class="avatar"
           :src="info.publishUsereAvatar"><span class="info">{{info.publishUserName}} | {{info.publishUserPosition}}</span>
    </div>
    <el-button class="btn-view"
               type="primary"
               @click="$router.push(`/job/${info.recruitmentInfoId}`)">查看详情</el-button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  info: {
    recruitmentPostName: string,
    moneyStart: number,
    moneyEnd: number,
    education: number,
    publishUsereAvatar: string,
    publishUserName: string,
    publishUserPosition: string,
    postId: string,
  }
}>()

// 学历
const educationMap = ['', '不限', '初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'];
const education = computed(() => educationMap[props.info.education]);
</script>

<style scoped lang="scss">
.position-item {
  position: relative;
  // height: 116px;
  background: #FFFFFF;
  box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05999999865889549);
  margin-bottom: 20px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .name {
    font-size: 18px;
    font-weight: 400;
    color: #222222;
    margin-bottom: 20px;
  }

  .salary {

    font-size: 18px;
    font-weight: 600;
    color: #FF9100;
    margin-right: 20px;
  }

  .requirement {
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }

  .contact {
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    display: flex;
    .avatar {
      vertical-align: top;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .btn-view {
    display: none;
  }

  &:hover {
    .btn-view {
      display: block;
    }
    .contact {
      display: none;
    }
  }
}

</style>