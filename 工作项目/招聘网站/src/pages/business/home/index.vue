<!--
 * @Descripttion: 企业端首页
 * @Author: yang chenglin
 * @Date: 2021-10-10 14:11:36
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 19:25:18
-->
<template>
  <div class="company-home-page">
    <div class="static-panel">
      <!-- <el-row>
      <el-col :span="11"> -->
      <div class="info-div">
        <div class="description-item-title"><span class="line-span"></span><span>岗位数据</span></div>
        <div class="info-div-item">
          <div style="flex: 1"
               v-for="(item, index) in jobList"
               :key="item">
            <base-info :info="jobInfo[item]"
                       :index="index"
                       :number='companyData[item]'></base-info>
          </div>
        </div>
      </div>
      <!-- </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="11"> -->
      <div class="info-div">
        <div class="description-item-title"><span class="line-span"></span><span>招聘数据</span></div>
        <div class="info-div-item">
          <div style="flex: 1"
               v-for="(item, index) in inviteList"
               :key="item">
            <base-info :info="inviteInfo[item]"
                       :index="index"
                       :number='companyData[item]'></base-info>
          </div>
        </div>
      </div>
    </div>
    <!-- </el-col>
    </el-row> -->
    <div class="talents-list-root">
      <div class='description-item-title'><span class='line-span'></span><span>推荐人才</span></div>
      <div class="talents-list-item"
           v-if="isLoading && recommendedTalentsList.list.length > 0">
        <div v-for=" item in recommendedTalentsList.list"
             :key="item">
          <talent-item :info="item"></talent-item>
        </div>
      </div>
      <div class="more-box"
           v-if="isLoading && recommendedTalentsList.list.length > 0">
        <el-button type="danger"
                   class="more"
                   @click="$router.push('/business/people/square')">查看更多</el-button>
      </div>

      <div v-if="recommendedTalentsList.list.length === 0  && isLoading"
           style="height: 100%;text-align: center;margin: auto; ">
        <div>
          <img src="https://ired-mp-1304913895.cos.ap-nanjing.myqcloud.com/mp_icon/zp-nodata.png"
               alt="">
        </div>
        <div style="margin: 20px 0; color: #656565">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import baseInfo from './components/baseInfo.vue';
import talentItem from './components/recommendedTalents.vue';
import recruitmentInProgress from '@/assets/recruitment-in-progress.png';
import numberOfResumesSubmitted from '@/assets/number-of-resumes-submitted.png';
import hasBeenAccepted from '@/assets/has-been-accepted.png';
import numberOfInitialInterviewRequests from '@/assets/number-of-initial-interview-requests.png';
import numberOfSecondInterviewInvitation from '@/assets/number-of-second-interview-invitation.png';
import cumulativeNumberOfRecruits from '@/assets/cumulative-number-of-recruits.png';
import useCompanyData from './hooks/useCompanyData';
import useRecommendedTalentsList from './hooks/useRecommendedTalentsList';

const isLoading = ref(false);
const { companyData, getCompanyData } = useCompanyData();

const { recommendedTalentsList, getRecommendedTalentsList } = useRecommendedTalentsList();
onMounted(async () => {
  await getRecommendedTalentsList();
  isLoading.value = true;
});

// 岗位数据
const jobList = ['recruitmentStartNumber', 'resumeQuantity', 'recruitmentCompletionNumber'];
const jobInfo = reactive({
  recruitmentStartNumber: {
    icon: recruitmentInProgress,
    label: '进行中招聘',
    number: 'recruitmentStartNumber',
  },
  resumeQuantity: {
    icon: numberOfResumesSubmitted,
    label: '投递简历数',
    number: 'resumeQuantity',
  },
  recruitmentCompletionNumber: {
    icon: hasBeenAccepted,
    label: '已录取数',
    number: 'recruitmentCompletionNumber',
  },
});
// 招聘数据
const inviteList = ['firstInvitesNumber', 'repeatedInvitationsNumber', 'employmentNumber'];
const inviteInfo = reactive({
  firstInvitesNumber: {
    icon: numberOfInitialInterviewRequests,
    label: '初试邀约数',
    number: 'firstInvitesNumber',
  },
  repeatedInvitationsNumber: {
    icon: numberOfSecondInterviewInvitation,
    label: '复试邀约数',
    number: 'repeatedInvitationsNumber',
  },
  employmentNumber: {
    icon: cumulativeNumberOfRecruits,
    label: '累计录取数',
    number: 'employmentNumber',
  },
});

onMounted(async () => {
  await getCompanyData();
});
</script>

<style lang='scss'>
.company-home-page {
  .static-panel {
    display: flex;
    justify-content: space-between;
    > div {
      width: calc(50% - 15px);
    }
  }
  .description-item-title {
    font-size: 24px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: 600;
    color: #222222;
    // line-height: 64px;
    margin-bottom: 20px;
    .line-span {
      display: inline-block;
      width: 4px;
      height: 20px;
      background: #ED263D;
      margin-right: 15px;
    }
  }

  .info-div {
    .info-div-item {
      height: 180px;
      background: #fff;
      display: flex;
      justify-content: space-around;
    }
  }

  .talents-list-root {
    .description-item-title {
      margin: 40px 0;
    }
    .talents-list-item {
      display: grid;
      grid-template-columns: 380px 380px 380px;
      grid-row-gap: 30px;
      grid-column-gap: 30px;
    }

    .more-box {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      .more {
        width: 354px;
        height: 46px;
        background: #ED263D;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        font-size: 14px;
      }
    }
  }
}
</style>
