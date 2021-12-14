<!--
 * @Author: 一尾流莺
 * @Description:右侧公司详情
 * @Date: 2021-09-28 17:28:19
 * @LastEditTime: 2021-12-03 15:41:34
 * @FilePath: \ired_resource\src\pages\public\overall\components\OverallInfo.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="overall-info">
    <!-- 招聘岗位 -->
    <info-block title="招聘岗位">
      <empty-div height="30px"></empty-div>
      <info-job :post-data="postData"
                :tab-index='tabIndex'
                @handle-get-job-details='handleGetJobDetails'></info-job>
    </info-block>
    <empty-div height="50px"></empty-div>
    <!-- 职位描述 -->
    <info-block title="职位描述"
                :content="postData">
      <div class="text">{{ jobDetails.jobDescription }}</div>
    </info-block>
    <!-- 公司介绍 -->
    <info-block title="公司介绍">
      <div class="text">{{ companyInfo.companyIntroduce }}</div>
    </info-block>
    <!-- 公司福利 -->
    <info-block title="公司福利">
      <div class="text">
        <div v-for="company in companyInfo.companyWelfareList"
             :key="company">{{ company }}</div>
      </div>
    </info-block>
    <!-- 公司地址 -->
    <info-block title="公司地址">
      <empty-div height="20px"></empty-div>
      <Map :address="companyInfo.companyAddr"
           :pos="{
            lng: companyInfo.longitude,
            lat: companyInfo.latitude,
          }"></Map>
      <empty-div height="70px"></empty-div>

    </info-block>
    <!-- 投递简历按钮 -->
    <div class="sent-btn">
      <el-button type="danger"
                 @click="router.push(`/job/${jobDetails.recruitmentInfoId}`)"
                 class="more">岗位详情</el-button>
    </div>
    <empty-div height="600px"></empty-div>
  </div>
</template>

<script lang='ts' setup>
import EmptyDiv from './EmptyDiv.vue';
import InfoBlock from './InfoBlock.vue';
import InfoJob from './InfoJob.vue';
import { defineProps, computed ,defineEmits} from 'vue';
import Map from '../../company/detail/components/Map.vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const emit = defineEmits(['handleGetJobDetails'])

const props = defineProps({
  postData: {
    default: () => ([]),
  },
  jobDetails: {
    default: () => ({}),
  },
  tabIndex:{
    default: () => 0,
  },
  companyInfo: {
    default: () => ({
    }),
  }
});

// 切换职位
const handleGetJobDetails = (recruitmentInfoId:any)=>{
  emit("handleGetJobDetails",recruitmentInfoId)
}



</script>

<style lang='scss'>
@import "styles/_variables.scss";

.overall-info {
  .sent-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    .more {
      width: 354px;
      height: 46px;
      background: #ed263d;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      border: 1px solid #ed263d;
    }
  }
  .text {
    width: 774px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #656565;
    line-height: 24px;
    padding: 20px 0 50px 0;

  display: flex;
  justify-content: flex-start;
  white-space: pre-line;
    div {
      padding: 12px 20px;
      background: #fff;
      margin-right: 30px;
    }
  }
}
</style>
