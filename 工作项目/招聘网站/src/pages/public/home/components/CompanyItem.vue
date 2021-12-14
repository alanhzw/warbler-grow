<!--
 * @Author: 一尾流莺
 * @Description:热门企业的 单项
 * @Date: 2021-09-28 18:32:07
 * @LastEditTime: 2021-11-27 17:16:22
 * @FilePath: \ired_resource\src\pages\public\home\components\CompanyItem.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="company-item-vue">
    <div class="first-part">
      <img :src="info.logoUrl"
           class="icon" />
    </div>
    <div class="second-part">{{info.shortName}}</div>
    <div class="third-part">{{info.financingStatus}} | {{info.industryName}}</div>
    <div class="fourth-part">
      <span class="quantity">{{info.recruitmentCount}}</span>个热招职位
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, computed } from 'vue';


const props = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
});
// 融资状态
const financingStatusMap = ['', '未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上'];

const financingStatus = computed(() => financingStatusMap[props.info.financingStatus]);

</script>

<style lang='scss'>
.company-item-vue {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  * {
    box-sizing: border-box;
    font-family: PingFang SC-Regular, PingFang SC;
  }
  .first-part {
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      border:1px solid #F9F9F9
    }
  }
  .second-part {
    font-size: 20px;
    color: #000000;
  }
  .third-part {
    font-size: 14px;
    color: #999999;
  }
  .fourth-part {
    width: 185px;
    height: 46px;
    background: #f8f8f8;
    font-size: 14px;
    color: #999999;
    text-align: center;
    line-height: 46px;
    &:hover, &:active {
      background: #FFFFFF;
      border: 1px solid #EE8B97;
    }
    .quantity {
      color: #ed263d;
    }
  }
}
</style>
