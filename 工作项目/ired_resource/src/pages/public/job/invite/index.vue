<!--
 * @Descripttion: 岗位详情页面
 * @Author: yang chenglin
 * @Date: 2021-09-22 18:50:28
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 22:06:00
-->
<template>
  <div class="job-details">
    <Wrapper class="header">
      <div class="header-content">
        <div class="job-info">
          <div>
            <span class="title">{{ jobInfo.recruitmentPostName }}</span>
            <span class="salary">&nbsp;&nbsp;{{ jobInfo.moneyStart }}K-{{ jobInfo.moneyEnd }}K</span>
          </div>
          <div class="detail">{{ jobInfo.city }} | {{ jobInfo.workingYearsType }} | {{ jobInfo.education }} | {{ recruitmentType }}</div>
          <div class="company">
            <span>{{ jobInfo.companyOrPostName }}</span>
            <span class="company-link"
                  @click="$router.push(`/company/${jobInfo.companyId}`)">查看该公司所有职位</span>
            <img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/icon_goto_red.png.png" />
          </div>
        </div>
        <div style="width: 380px;"></div>
        <div>

          <el-button v-if="jobInfo.inviteStatus == 3"  style="background-color: #FFFFFF;width: 120px;height: 46px;background: #F8F8F8;border-radius: 8px 8px 8px 8px;border: 1px solid #ED263D; color: #ED263D; margin-right: 15px;"
                     type="primary"
                     plain disabled
                     >已拒绝</el-button>
          <el-button v-if="jobInfo.inviteStatus == 2"  style="width: 120px;height: 46px;background: #ED263D;border-radius: 8px 8px 8px 8px;border: 1px solid #ED263D;margin-left: 15px;"
                     type="primary"
                    disabled  >已接受邀请</el-button>
          <el-button v-if="jobInfo.inviteStatus == 1"  style="background-color: #FFFFFF;width: 120px;height: 46px;background: #F8F8F8;border-radius: 8px 8px 8px 8px;border: 1px solid #ED263D; color: #ED263D; margin-right: 15px;"
                     type="primary"
                     plain
                     @click="declineInvitation">拒绝</el-button>
          <el-button v-if="jobInfo.inviteStatus == 1"  style="width: 120px;height: 46px;background: #ED263D;border-radius: 8px 8px 8px 8px;border: 1px solid #ED263D;margin-left: 15px;"
                     type="primary"
                     @click="agreeInvitation">授受邀请</el-button>

        </div>

      </div>
    </Wrapper>
    <Wrapper>
      <div class="page-job-detail">
        <div class="left">
          <block title="职位描述"><span class="cp-detail">{{ jobInfo.jobDescription }}</span></block>
          <block title="公司介绍"><span class="cp-detail">{{ companyInfo.companyIntroduce }}</span></block>
          <block title="公司福利">
            <span class="welfare"
                  v-for="welfare in companyInfo.companyWelfareList"
                  :key="welfare">{{ welfare }}</span>
          </block>
          <block title="公司地址">
            <Map :address="companyInfo.companyAddr"
                 :pos="{
                lng: companyInfo.longitude,
                lat: companyInfo.latitude,
              }"></Map>
          </block>
        </div>
        <div class="right">
          <sign class="sign-block" />
          <block title="公司简介">
            <div class="intruction">
              <img class="avatar"
                   :src="companyInfo.logoUrl" />
              <div class="info">
                <p class="company-name">{{ companyInfo.fullName }}</p>
                <p class="desc">{{ companyInfo.financingStatus }} | {{ companyInfo.industryName }}</p>
              </div>
            </div>
          </block>
          <SimilarJobs :recruitmentInfoId="route.params.jobId" />
        </div>
      </div>
    </Wrapper>
    <el-dialog v-model="showAddDialog"
               custom-class='add-dialog'
               title=" "
               :before-close="handleClose">
      <Add @close-dialog='closeDialog'></Add>
    </el-dialog>
    <el-dialog v-model="showFinishDialog"
               custom-class='finish-dialog'
               title=" "
               :before-close="handleClose">
      <Finish @close-dialog='closeDialog'></Finish>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { CommonService, UserService } from '@/service';
import { useRouter, useRoute } from 'vue-router';
import Wrapper from '@/layout/components/Wrapper.vue';
import Sign from '@/components/sign/index.vue';
import Block from '../../company/detail/components/Block.vue';
import Map from '../../company/detail/components/Map.vue';
import SimilarJobs from '@/components/similarjobs/index.vue';
import Add from '@/components/dialog/Add.vue';
import Finish from '@/components/dialog/Finish.vue';
import { watch } from 'fs';


const route = useRoute();
const router = useRouter();

const jobInfo = ref<any>({});

// 学历
// const educationMap = ['', '不限', '初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'];
// const education = computed(() => educationMap[jobInfo.value.education]);
const recruitmentTypeMap = ['全职', '兼职'];
const recruitmentType = computed(() => recruitmentTypeMap[jobInfo.value.recruitmentType]);

const financingStatusMap = ['', '未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上'];
const financingStatus = computed(() => financingStatusMap[companyInfo.value.financingStatus]);

const companyInfo: any = ref({})

const getJobDetail = async () => {

  const res: any = await CommonService.getPositionDetail({
    recruitmentInfoId: route.params.jobId
  });
  jobInfo.value = res;

  const info: any = await CommonService.getCompanyDetail({
    companyId: res.companyId,
  })
  companyInfo.value = info;
}
getJobDetail();


const store = useStore();
const logined = computed(() => typeof store.state.token === 'string' && store.state.token !== '');
const resumes = ref([]);
const resumeId = ref('');

const getResumes = async () => {
  resumes.value = await UserService.getMyResumeList();
}

watchEffect(() => {
  if (logined.value) {
    getResumes();
  }
});

// const interest = ref(false);
// const getInterestStatus = async () => {
//   const result = await UserService.getCollectRecruitmentList({
//     pageNo: 1,
//     pageSize: 999,
//   });
//   interest.value = result.records.some((record: any) => record.postId === route.params.jobId);
// }
// watchEffect(() => {
//   if (logined.value) {
//     getInterestStatus()
//   }
// })

const cancelInterest = async () => {
  if (!logined.value) {
    router.push(`/login?returnUrl=`);
  } else {
    await UserService.unCollectRecruitment({ recruitmentInfoId: route.params.jobId });
    // getInterestStatus();
    getJobDetail();
  }
};

//     @ApiOperation(value = "拒绝邀请")
const declineInvitation = async () => {
  if (!logined.value) {
    router.push(`/login?returnUrl=`);
  } else {


    await UserService.declineInvitation({ inviteRecordId: jobInfo.value.inviteRecordId });
    // getInterestStatus();
    getJobDetail();
  }
};
// 接受邀请
const agreeInvitation = async () => {
  if (!logined.value) {
    router.push(`/login?returnUrl=`);
  } else {
    await UserService.agreeInvitation({ inviteRecordId: jobInfo.value.inviteRecordId });
    // getInterestStatus();
    getJobDetail();
  }
};




const addInterest = async () => {
  if (!logined.value) {
    router.push(`/login?returnUrl=`);
  } else {
    await UserService.collectRecruitment({ recruitmentInfoId: route.params.jobId });
    // getInterestStatus();
    getJobDetail();
  }
}
const showAddDialog = ref(false)
const showFinishDialog = ref(false)

const handleClose = (done: any) => {
  done();
};

const showDialog = (type: any) => {
  if (type === 'finish') {
    showFinishDialog.value = true
  }
  if (type === 'add') {
    showAddDialog.value = true
  }
}
const closeDialog = (type: any) => {
  if (type === 'finish') {
    showFinishDialog.value = false
  }
  if (type === 'add') {
    showAddDialog.value = false
  }
}

const visible = ref(false);
const privacyTypes = [
  '邮箱',
  '手机号',
  '都可以',
  // '都不可以'
];
const privacyType = ref(1);
const doCvDelivery = async () => {
  const params: any = {
    privacyType: privacyType.value,
    recruitmentInfoId: route.params.jobId
  }
  if (resumeId.value !== '') {
    params.enclosureId = resumeId.value;
  }
  await UserService.doCvDelivery(params);
  ElMessage.success('投递成功');
  visible.value = false;
}

</script>
<style lang="scss" >
.job-details {

  .btn-interest {
    img {
      vertical-align: top;
      height: 12px;
      margin-right: 5px;
    }
  }
  .el-dialog {
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    padding: 20px 60px 60px 60px;
    .el-dialog__body {
      padding: 0px;
    }
  }

  .cp-detail {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #656565;
    line-height: 33px;
	  white-space: pre-line;

  }

  .add-dialog {
    width: 818px;
    height: 456px;
    position: relative;

  }
  .finish-dialog {
    width: 818px;
    height: 568px;
    position: relative;
    .el-dialog__headerbtn{
      z-index: 9999;
      right: -20px;
      top: -20px;
      .el-dialog__close{
      color: #fff;

      }
    }
  }

  .header {
    background: #f8f8f8;
    box-shadow: 0px -4px 8px 1px rgba(0, 0, 0, 0.019999999552965164);
    .header-content {
      display: flex;
      height: 234px;
      align-items: center;
    }
  }
  .job-info {
    min-width: 480px;

    .title {
      font-size: 40px;
      font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;
      font-weight: 800;
      color: #222222;
      line-height: 60px;
    }
    .salary {
      font-size: 40px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ff9100;
    }
    .detail {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
    .company {
      display: flex;
      align-items: center;
      margin-top: 50px;

      img {
        vertical-align: top;
      }
    }
    .company-link {
      color: #ed263d;
      cursor: pointer;
    }
  }
  .page-job-detail {
    display: flex;
    padding-top: 40px;
    background-color: #ffffff;
    .left {
      width: 750px;
      padding-right: 30px;
      border-right: 1px solid #e8e8e8;
      .container-amap {
        height: 120px;
      }

      .welfare {
        margin-right: 30px;
        padding: 12px 20px;
        line-height: 38px;
        font-size: 14px;
        font-weight: 400;
        color: #656565;
        background: #F8F8F8;
        border-radius: 8px 8px 8px 8px;
      }
    }
    .right {
      margin-left: 30px;
      flex: 1;

      .intruction {
        display: flex;
        align-items: center;
        .avatar {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        .company-name {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
        }
        .desc {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }
      }
      .sign-block {
        margin-bottom: 50px;
      }
    }
  }
  .operations {
    color: #ed263d;
    font-size: 16px;
    line-height: 36px;
    margin-left: 60px;
    .operate {
      cursor: pointer;
      display: flex;
      align-items: center;
      img {
        vertical-align: top;
        margin-right: 10px;
      }
    }
  }
  .options {
    margin-left: 60px;
    color: #999999!important;
    display: flex;
    flex-direction: column;

    .el-radio__label {
      display: flex;
      align-items: center;
      color: #999999!important;
      img {
        margin-right: 10px;
      }
    }
  }

}

.privacy-options {
  display: flex;
  flex-direction: column;
}
</style>
