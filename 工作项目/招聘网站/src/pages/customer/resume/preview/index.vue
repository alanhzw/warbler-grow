<!--
 * @Descripttion: 简历预览
 * @Author: yang chenglin
 * @Date: 2021-09-22 18:50:28
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-24 18:31:19
-->
<template>
  <div class='resume-preview-div'>
    <div class='base-info-div display-flex'>
      <img v-if="cvDataShowBack.userInfo.headImageUrl"
           :src='cvDataShowBack.userInfo?.headImageUrl ?? ""'
           alt="暂无图片">
      <div class='person-div'>
        <div class='person-name'>{{cvDataShowBack.userInfo?.realName}}</div>
        <div>
          <span>{{cvDataShowBack.userInfo?.sex === '1' ? '女' : '男'}}</span>
          <span v-if="cvDataShowBack.userInfo?.age"> | {{cvDataShowBack.userInfo?.age}}岁 | </span>
          <span v-if="cvDataShowBack.userInfo?.cityName">{{cvDataShowBack.userInfo?.cityName}} | </span>
          <span>{{cvDataShowBack.userInfo?.expectType === '1' ? '全职' : '兼职'}}</span>
          <span><img src="@/assets/icon-phone.png"
                 alt=""
                 style="width: 12px;height: 12px;margin-left: 15px">{{cvDataShowBack.userInfo?.phoneNumber}}</span>
          <span><img src="@/assets/icon-mail.png"
                 alt=""
                 style="width: 12px;height: 12px;margin-left: 15px">{{cvDataShowBack.userInfo?.mail}}</span>
        </div>
        <div>
          <span v-if="cvDataShowBack.userInfo?.education">{{cvDataShowBack.userInfo?.education}} | </span>
          <span v-if="cvDataShowBack.userInfo?.workingYears">{{cvDataShowBack.userInfo?.workingYears}}年工作经验 | </span>
          <span v-if="cvDataShowBack.userInfo?.expectPostName">{{cvDataShowBack.userInfo?.expectPostName}} | </span>
          <span v-if="cvDataShowBack.userInfo?.expectMoneyFrom">{{cvDataShowBack.userInfo?.expectMoneyFrom}}-{{cvDataShowBack.userInfo?.expectMoneyTo}} | </span>
          <span>{{jobStatus.find((it:any) => it.value === cvDataShowBack.userInfo?.cvJobHuntingStatus)?.text}}</span>
        </div>
      </div>
    </div>
    <div class='description-div'>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>个人优势</span></div>
        <div class='description-section-content'>{{cvDataShowBack.userInfo?.cvAdvantage}}</div>
      </div>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>工作经历</span></div>
        <div class='experience-item'
             v-for='item in cvDataShowBack.cvWorkExperience'
             :key='item.id'>
          <div class='display-flex'
               style='justify-content: space-between; margin-bottom: 20px;'>
            <div class='display-flex'>
              <div>
                <div class='description-item-name'>{{item?.companyName}}</div>
                <div>{{item?.jobTitle}}</div>
              </div>
            </div>
            <div v-if="item.onJobTimeStart">{{dayjs(item?.onJobTimeStart).format('YYYY-MM')}} -
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
             v-for='item in cvDataShowBack.cvProjectExperience'
             :key='item.id'>
          <div class='display-flex'>
            <div class='description-item-name'>{{item?.projectName}}</div>
            <div v-if="item.projectTimeStart">{{dayjs(item?.projectTimeStart).format('YYYY-MM')}} -
              {{dayjs(item?.projectTimeEnd).format('YYYY-MM')}}</div>
          </div>
          <div class='description-section-content'>{{item?.projectDescribe}}</div>
        </div>
      </div>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>教育经历</span></div>
        <div class='education-item'
             v-for='item in cvDataShowBack.cvEduExperience'
             :key='item.id'>
          <div class='display-flex'>
            <div class='education-item-desc'>
              <span class='description-item-name'
                    style='width: 30%'>{{item?.schoolName}}</span>
              <span class='education-item-position'>{{item?.position}}</span>
              <span>{{item?.specialtyName}}</span>
            </div>
            <div class='education-item-time'
                 v-if="item.atSchoolTimeStart">{{dayjs(item?.atSchoolTimeStart).format('YYYY-MM')}} -
              {{dayjs(item?.atSchoolTimeEnd).format('YYYY-MM')}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class='description-item-title'><span class='line-span'></span><span>我的测评</span></div>
        <div class='test-result'>
          <span style="font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;">{{viewLast?.code}}</span> <span>{{viewLast?.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import { log } from 'console';
import useCvDataShowBack from './hooks/useCvDataShowBack';
import useJobStatus from '../hooks/useJobStatus';
import useEvaluationDisplay from './hooks/useEvaluationDisplay';
import useViewLast from './hooks/useViewLast';
// 当前求职状态'
const { jobStatus, getJobStatus } = useJobStatus();
getJobStatus();

// 查询测评结果
const { viewLast, getViewLast } = useViewLast();
getViewLast();
// 是否可以查看测评信息
const { evaluationDisplayResult, evaluationDisplay } = useEvaluationDisplay();
evaluationDisplay();
console.log(evaluationDisplayResult.value);

const { cvDataShowBack, getCvDataShowBack } = useCvDataShowBack();
getCvDataShowBack();

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
      border-radius: 50%;
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
  }

  .description-div {
    padding: 0 30px;
    background-color: #FFFFFF;
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
}
</style>
