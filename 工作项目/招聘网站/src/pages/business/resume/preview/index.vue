<!--
 * @Descripttion: 简历预览
 * @Author: yang chenglin
 * @Date: 2021-09-22 18:50:28
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-29 15:39:09
-->
<template>
  <div class='resume-preview-div'>
    <div class='base-info-div display-flex'>
      <div style="display: flex;">
        <img :src='userResumeInfo.userInfo?.headImageUrl'
             style="border-radius: 50%"
             alt="暂无图片">
        <div class='person-div'>
          <div class='person-name'>{{userResumeInfo.userInfo?.realName}}</div>
          <div>
            <span v-if="userResumeInfo.userInfo?.sex">{{userResumeInfo.userInfo?.sex === '1' ? '女' : '男'}} | </span>
            <span v-if="userResumeInfo.userInfo?.age">{{userResumeInfo.userInfo?.age}}岁 | </span>
            <span v-if="userResumeInfo.userInfo?.cityName">{{userResumeInfo.userInfo?.cityName}} | </span>
            <span>{{userResumeInfo.userInfo?.expectType === '1' ? '全职' : '兼职'}}</span>
            <span v-if="userResumeInfo?.privacyType !== '4'">
              <span v-if="userResumeInfo?.privacyType == '2' || userResumeInfo?.privacyType == '3'"><img src="@/assets/icon-phone.png"
                     alt=""
                     style="width: 12px;height: 12px;margin-left: 15px">{{userResumeInfo.userInfo?.phoneNumber}}</span>
              <span v-if="userResumeInfo?.privacyType == '1' || userResumeInfo?.privacyType == '3'"><img src="@/assets/icon-mail.png"
                     alt=""
                     style="width: 12px;height: 12px;margin-left: 15px">{{userResumeInfo.userInfo?.mail}}</span>
            </span>
          </div>
          <div>
            <span v-if="userResumeInfo.userInfo?.education">{{userResumeInfo.userInfo?.education}} | </span>
            <span v-if="userResumeInfo.userInfo?.workingYears">{{userResumeInfo.userInfo?.workingYears}}年工作经验 | </span>
            <span v-if="userResumeInfo.userInfo?.expectPostName">{{userResumeInfo.userInfo?.expectPostName}} | </span>
            <span v-if="userResumeInfo.userInfo?.expectMoneyFrom">{{userResumeInfo.userInfo?.expectMoneyFrom}}-{{userResumeInfo.userInfo?.expectMoneyTo}} | </span>
            <span>{{jobStatus.find((it:any) => it.value === userResumeInfo.userInfo?.cvJobHuntingStatus)?.text}}</span>
          </div>
        </div>
      </div>
      <div>
        <el-button type='danger'
                   @click="dialogVisible = true">邀请面试
        </el-button>
      </div>
    </div>
    <div class='description-div'>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>个人优势</span></div>
        <div class='description-section-content'>{{userResumeInfo.userInfo?.cvAdvantage}}</div>
      </div>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>工作经历</span></div>
        <div class='experience-item'
             v-for='item in userResumeInfo.userWorkList'
             :key='item.id'>
          <div class='display-flex'
               style='justify-content: space-between; margin-bottom: 20px;'>
            <div class='display-flex'>
              <div>
                <div class='description-item-name'>{{item?.companyName}}</div>
                <div>{{item?.jobTitle}}</div>
              </div>
            </div>
            <div v-if="item?.onJobTimeStart">{{dayjs(item?.onJobTimeStart).format('YYYY-MM')}} -
              {{dayjs(item?.onJobTimeEnd).format('YYYY-MM')}}</div>
          </div>
          <div class='description-section-content'>
            <!-- <div v-for='(subItem, subIndex) in item.content' :key='subItem.id'>
              <span>{{subIndex + 1}}. </span>
              <span>{{subItem.desc}}</span>
            </div> -->
            <div>{{item.workContent}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>项目经历</span></div>
        <div class='project-item'
             v-for='item in userResumeInfo.cvProjectExperience'
             :key='item.id'>
          <div class='display-flex'>
            <div class='description-item-name'>{{item?.projectName}}</div>
            <div v-if="item?.projectTimeStart">{{dayjs(item?.projectTimeStart).format('YYYY-MM')}} -
              {{dayjs(item?.projectTimeEnd).format('YYYY-MM')}}</div>
          </div>
          <div class='description-section-content'>{{item?.projectDescribe}}</div>
        </div>
      </div>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>教育经历</span></div>
        <div class='education-item'
             v-for='item in userResumeInfo.eduExperiences'
             :key='item.id'>
          <div class='display-flex'>
            <div class='education-item-desc'>
              <span class='description-item-name'
                    style='width: 30%'>{{item?.schoolName}}</span>
              <span class='education-item-position'>{{item?.position}}</span>
              <span>{{item?.specialtyName}}</span>
            </div>
            <div class='education-item-time'
                 v-if="item?.atSchoolTimeStart">{{dayjs(item?.atSchoolTimeStart).format('YYYY-MM')}} -
              {{dayjs(item?.atSchoolTimeEnd).format('YYYY-MM')}}</div>
          </div>
        </div>
      </div>
      <div v-if="userResumeInfo.subjectTrainee">
        <div class='description-item-title'><span class='line-span'></span><span>我的测评</span></div>
        <div class='test-result'>
          <span style="font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;">{{userResumeInfo.subjectTrainee?.code}}</span> <span>{{userResumeInfo.subjectTrainee?.title}}</span>
        </div>
      </div>
    </div>
    <el-dialog class="dialog-root"
               v-model="dialogVisible"
               title=" "
               width="57%"
               :before-close="handleClose">
      <div v-if="isLoading && recruitmentInfoList.length > 0">
        <div class="head">请选择邀请职位</div>
        <div class="recruitment-list">
          <div v-for="item in recruitmentInfoList"
               :key="item"
               :class="activeJob.indexOf(item.postId) > -1 ? 'active' : ''"
               @click="handleSelectJob(item)">
            {{item.postName}}</div>
        </div>
        <div class="create-job"
             @click="$router.push('/business/recruitment/create')">
          <span>创建新职位</span>
          <span class="right-arrow">></span>
        </div>
        <div class="btn-container">
          <el-button type='danger'
                     @click="setInvitedFun">邀请
          </el-button>
          <el-button plain
                     @click="dialogVisible = false; activeJob = ''">取消</el-button>
        </div>
      </div>
      <div v-if="recruitmentInfoList.length === 0  && isLoading"
           style="height: 100%;text-align: center;margin: auto; ">
        <div>
          <img src="https://ired-mp-1304913895.cos.ap-nanjing.myqcloud.com/mp_icon/tip-nodata-person.png"
               alt="">
        </div>
        <div style="margin: 20px 0; color: #656565">您需要先发布职位，才能查看人才简历</div>
        <div>
          <el-button type='danger'
                     @click="$router.push('/business/recruitment/list')">去发布职位
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import useUserResumeInfo from './hooks/useUserResumeInfo';
import useJobStatus from './hooks/useJobStatus';
import useEvaluationDisplay from './hooks/useEvaluationDisplay';
import useRecruitmentInfoList from './hooks/useRecruitmentInfoList';
import useInvited from './hooks/useInvited';
// 职位数据是否加载完
const isLoading = ref(false);
// 招聘岗位信息
const { recruitmentInfoList, getRecruitmentInfoList } = useRecruitmentInfoList();
onMounted(async () => {
  await getRecruitmentInfoList();
  isLoading.value = true;
});

// 邀请面试弹窗
const dialogVisible = ref(false);
const handleClose = () => {
  dialogVisible.value = false;
};
// 所邀请的人
const activeId = ref('');
// 所要发起邀请的岗位
const activeJob = ref('');
// 点击岗位
const handleSelectJob = (item: any) => {
  if (activeJob.value === item.postId) {
    activeJob.value = '';
  } else {
    activeJob.value = item.postId;
  }
};
const { setInvited } = useInvited();
const setInvitedFun = async () => {
  await setInvited({ inviteeUserId: activeId.value, recruitmentInfoId: activeJob.value });
  dialogVisible.value = false;
  ElMessage({
    message: '邀请成功！',
    type: 'success',
  });
};

const route = useRoute();
// 当前求职状态'
const { jobStatus, getJobStatus } = useJobStatus();
getJobStatus();
// 是否可以查看测评信息
const { evaluationDisplayResult, evaluationDisplay } = useEvaluationDisplay();
evaluationDisplay();
console.log(evaluationDisplayResult.value);

const { userResumeInfo, setUserResumeInfo } = useUserResumeInfo();
setUserResumeInfo({ userId: route.params.personId, expectPostId: route.params.expectPostId });

// const jobStatusText = (val: any) => computed(() => jobStatus.value.find((it:any) => it.value === val)?.text);

</script>

<style lang='scss'>
.resume-preview-div {
  padding: 40px 0;
  color: #999999 ;
  font-family: PingFang SC-Regular, PingFang SC;
  .display-flex {
    display: flex;
  }

  .base-info-div {
    justify-content: space-between;
    height: 200px;
    padding: 40px 30px;
    border-radius: 16px 16px 0 0;
    border: 1px solid #E8E8E8;
    box-sizing: border-box;
    background: #F8F8F8;
    box-shadow: 0px -4px 8px 1px rgba(0, 0, 0, 0.02);
    img {
      width: 120px;
      height: 120px;
    }
    .person-div {
      font-size: 14px;
      font-weight: 400;
      color: #656565;
      line-height: 24px;
      .person-name {
        font-size: 24px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #222222;
        margin-bottom: 30px;
        line-height: 40px;
      }
    }
    .el-button {
        width: 120px;
        &.el-button--danger {
          background: #ED263D;
          margin-right: 30px;
        }
      }
  }

  .description-div {
    padding: 0 30px;
    border: 1px solid #E8E8E8;
    .description-item-title {
      font-size: 24px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;
      margin: 50px 0 30px 0;
      .line-span {
        display: inline-block;
        width: 4px;
        height: 20px;
        background: #ED263D;
        margin-right: 15px;
      }
    }
    .description-section-content {
      margin-bottom: 40px;
      font-size: 14px;
      line-height: 24px;
    }
    .description-item-name {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
    }

    .experience-item {
      .display-flex {
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }

    .project-item {
      .display-flex {
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }

    .education-item {
      margin-bottom: 30px;
      .education-item-desc {
        width: calc(100% - 200px);
        span {
          display: inline-block;
        }
        .education-item-position {
          width: 15%;
          margin: 0 30px;
        }
      }
      .education-item-time {
        width: 200px;
        text-align: right;
      }
    }

    .test-result {
      display: flex;
      align-items: center;
      height: 80px;
      padding-left: 30px;
      margin-bottom: 40px;
      background: #ED263D;
      font-size: 18px;
      color: #FFFFFF;
      span:nth-child(1) {
        margin-right: 30px;
        font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;
        font-size: 50px;
      }
    }
  }

  .el-dialog__body {
    .head {
      margin-left: 15px;
      margin-bottom: 20px;
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
    }
    .recruitment-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      div {
        min-width: 222px;
        margin: 15px;
        padding: 17px 30px;
        background: #F8F8F8;
        border-radius: 10px;
        opacity: 1;
        border: 1px solid #E8E8E8;
        cursor: pointer;
        &.active {
          background: #ED263D;
          color: #FFF;
        }
      }
    }
    .create-job {
      margin: 15px 0;
      text-align: center;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      cursor: pointer;
      .right-arrow {
        width: 14px;
        height: 14px;
        margin-left: 5px;
        display: inline-block;
        background: #656565;
        border-radius: 50%;
        line-height: 14px;
        text-align: center;
      }
    }
    .btn-container {
      width: 100%;
      text-align: center;
      .el-button {
        width: 120px;
        &.el-button--danger {
          background: #ED263D;
          margin-right: 30px;
        }
      }
    }
  }
}
</style>
