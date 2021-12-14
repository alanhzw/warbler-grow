<!--
 * @Descripttion: 岗位详情页面
 * @Author: yang chenglin
 * @Date: 2021-09-22 18:50:28
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-27 14:06:35
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
        <div>
          <el-button class="btn-interest"
                     v-if="jobInfo.isCollectFlg==1"
                     plain
                     @click="cancelInterest"><img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/heart_red.png">取消感兴趣</el-button>
          <el-button class="btn-interest"
                     v-else
                     @click="addInterest"><img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/heart_red_white.png">感兴趣</el-button>
          <el-popover placement="bottom"
                      title=""
                      width="250px"
                      v-model:visible="visible"
                      trigger="click">
            <template #reference>
              <el-button type="primary"
                         class="btn-tdjl">投递简历</el-button>
            </template>
            <template #default>
              <div>请选择企业可以查看的联系方式</div>
              <el-radio-group v-model="privacyType"
                              class="privacy-options">
                <el-radio v-for="(type, index) in privacyTypes"
                          :key="type"
                          :label="index + 1">{{type}}</el-radio>
              </el-radio-group>
              <div>
                <el-button size="mini"
                           @click="visible=false">取消</el-button>
                <el-button type="primary"
                           size="mini"
                           @click="doCvDelivery">确定</el-button>
              </div>
            </template>
          </el-popover>
        </div>
        <div class="operations"
             v-if="resumes.length===0">
          <div class="operate"
               @click="showDialog('finish')">
            <img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/icon_resume_red.png" />完善在线简历
          </div>
          <div class="operate"
               @click="showDialog('add')">
            <img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/icon_upload_red.png" />新增简历附件
          </div>
        </div>
        <el-radio-group class="options"
                        v-else
                        v-model="resumeId">
          <el-radio class="option"
                    label="">
            <img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/online.png" />在线简历
          </el-radio>
          <el-radio v-for="r in resumes"
                    :key="`resume-${r.id}`"
                    class="option"
                    :label="r.id"><img src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/attachment.png" />{{r.enclosureName}}</el-radio>
        </el-radio-group>
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
import { ref, computed, watchEffect, watch } from 'vue';
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

watchEffect(() => route.params.jobId && getJobDetail());

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
  if (!logined.value) {
    router.push(`/login?returnUrl=`);
  } else {
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
}

</script>
<style lang="scss" >
.job-details {

  .btn-tdjl {
    width: 120px;
    height: 46px;
    background: #ED263D;
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    border: 1px solid #ED263D;
    color: #FFF;
  }
  .btn-interest {
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    border: 1px solid #ED263D;
    width: 120px;
    height: 46px;
    color: #ED263D;
    img {
      vertical-align: top;
      height: 12px;
      margin-right: 5px;
      padding-top: 1px;
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

  .cp-detail {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #656565;
    line-height: 33px;
	white-space: pre-line;

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
          border-radius: 8px;
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
