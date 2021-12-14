<!--
 * @Descripttion: 企业端-应聘管理页
 * @Author: yang chenglin
 * @Date: 2021-10-10 18:03:23
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 21:34:17
-->
<template>
  <div class="application-manage-root">
    <div class='form-div'>
      <el-input v-model='formInfo.name'
                placeholder='搜索应聘者姓名/职位'></el-input>
      <div class="input-wd"
           @click="searchList">搜索</div>
    </div>
    <div class='display-flex status-tabs'>
      <div v-for='item in resumeState'
           :key='item.key'
           :class="item.key === formInfo.applyCompanyStatus ? 'active-status-div normal-status-div' : 'normal-status-div'"
           @click="handleTabClick(item.key)">
        <span class=''>{{item.title}}</span>
      </div>
    </div>
    <div class='applyInfo-div'
         v-if="applyForList.list.length > 0 && isLoading">
      <div v-for='(item, index) in applyForList.list'
           :key='item'
           class='applyInfo-item'>
        <div class='display-flex'
             style="justify-content: space-between;">
          <div class='display-flex'>
            <div style="position: relative">
              <img :src="item.headImageUrl"
                   alt="暂无图片"
                   style="width: 128px;height: 128px;margin-right: 20px;border-radius: 50%;">
              <img v-if="item.sex==='1'"
                   style="width: 24px;height: 24px;position: absolute;bottom: 20px;left: 0;"
                   src="@/assets/man-icon.png"
                   alt="">
              <img v-if="item.sex==='2'"
                   style="width: 24px;height: 24px;position: absolute;bottom: 20px;left: 0;"
                   src="@/assets/woman-icon.png"
                   alt="">
            </div>
            <div>
              <div class='applyInfo-name'>{{item.nickName}}</div>
              <div class='display-flex'
                   style="justify-content: flex-start;width: 718px;">
                <div style="width: 60%">
                  <div class='applyInfo-advan'
                       :title="item.cvAdvantage">{{item.cvAdvantage}}</div>
                  <div class="applyInfo-cont">
                    <span v-if="item.age">{{item.age}}岁 | </span>
                    <span v-if="item.workingYears">{{item.workingYears}}年 | </span>
                    <span v-if="education.find((it:any) => it.value === item.education)?.text">{{education.find((it:any) => it.value === item.education)?.text}} | </span>
                    <span v-if="jobStatus.find((it:any) => it.value === item.cvJobHuntingStatus)?.text">{{jobStatus.find((it:any) => it.value === item.cvJobHuntingStatus)?.text}} | </span>
                    <span v-if="item.expectMoneyFrom">{{item.expectMoneyFrom}}-{{item.expectMoneyTo}}k</span>
                  </div>
                </div>
                <div class='display-flex'>
                  <div class="icon-div">
                    <div class="circle-div"></div>
                    <div class="line-div"></div>
                    <div class="circle-div"></div>
                  </div>
                  <div>
                    <div>{{resumeState[formInfo.applyCompanyStatus].timeLabel}}：{{item.applyForDate}}</div>
                    <!-- <div>期望职位：{{item.expectIndustryName}}</div> -->
                    <div>投递职位：{{item.recruitmentPostName}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cursor-div">
            <div class="operation-icon"
                 @click="applyForList.list[index].showOperation = !applyForList.list[index].showOperation">...</div>
            <div class="operation-list"
                 v-if="item.showOperation">
              <div v-for="op in resumeState[formInfo.applyCompanyStatus].operationList"
                   :key="op.label"
                   class="operation-item"
                   @click="() => operationFun(index, item, op)">
                {{op.label}}
              </div>
            </div>
            <div style="display: flex;margin-top: 65px">
              <el-button type="danger"
                         class="more"
                         @click="() => {resumeId = item.userId; resumeExpectId = item.expectPostId; resumeVisible = true}">在线简历
              </el-button>
              <el-button v-if="item.enclosureId"
                         type="danger"
                         class="more"
                         @click="() => {activeResume = item.enclosureId; dialogVisible = true;}">附件简历
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class='pagination-div'
           v-if="applyForList.list.length > 0">
        <el-pagination background
                       layout='prev, pager, next'
                       :page-size="applyForList.page.size"
                       :total='applyForList.page.total'
                       @current-change='goPage'
                       @prev-click='goPage'
                       @next-click='goPage'>
        </el-pagination>
      </div>
    </div>
    <div v-if="applyForList.list.length === 0  && isLoading"
         style="height: 100%;text-align: center;margin: auto; ">
      <div>
        <img src="https://ired-mp-1304913895.cos.ap-nanjing.myqcloud.com/mp_icon/zp-nodata.png"
             alt="">
      </div>
      <div style="margin: 20px 0; color: #656565">暂无数据</div>
    </div>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">

      <div style="text-align: center; margin-bottom: 20px; font-size: 18px;">下载附件简历</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => checkDetail(activeResume)">是</el-button>
        <el-button plain
                   @click="dialogVisible = false">否</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="resumeVisible"
               :close-on-click-modal='false'
               :before-close="() => {resumeVisible = false; resumeId = ''; resumeExpectId = ''}">
      <resume-dialog :personId='resumeId'
                     :expectPostId="resumeExpectId"></resume-dialog>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { on } from 'events';
import useEducation from './hooks/useEducation';
import useJobStatus from './hooks/useJobStatus';
import useApplyForList from './hooks/useApplyForList';
import useApplyForRecordStatus from './hooks/useApplyForRecordStatus';
import useInfoByEnclosureId from './hooks/useInfoByEnclosureId';
import resumeDialog from '@/components/company_get_resume/index.vue';

const isLoading = ref(false);

const route = useRoute();
// 确认是否下载弹窗
const dialogVisible = ref(false);
// 当前操作的附件简历
const activeResume = ref('');

// 查看用户简历弹窗
const resumeVisible = ref(false);
const resumeId = ref('');
const resumeExpectId = ref('');

// 学历列表
const { education, getEducation } = useEducation();
getEducation();
// 当前求职状态'
const { jobStatus, getJobStatus } = useJobStatus();
getJobStatus();
// 操作简历
const { setApplyForRecordStatus, delApplyForRecordStatus } = useApplyForRecordStatus();
// 查看附件简历
const { enclosureIdInfo, getInfoByEnclosureId } = useInfoByEnclosureId();
const checkDetail = async (id: any) => {
  await getInfoByEnclosureId({ enclosureId: id });

  const a = document.createElement('a');
  a.setAttribute('download', '');
  a.setAttribute('style', 'display:none');
  a.setAttribute('href', enclosureIdInfo.value.enclosureUrl);
  a.click();
};

const formInfo = reactive({
  name: '',
  applyCompanyStatus: Number(route.params.status),
});

const { applyForList, setApplyForList } = useApplyForList();
onMounted(() => {
  isLoading.value = false;
  setApplyForList({
    applyCompanyStatus: formInfo.applyCompanyStatus,
    name: formInfo.name,
  });
  isLoading.value = true;
});

// 简历投递状态枚举
const resumeState = [
  {
    key: 0,
    title: '新投递',
    timeLabel: '投递时间',
    operationList: [
      {
        label: '初试邀约',
        status: 1,
        ajaxurl: '',
      },
      {
        label: '不合适',
        status: 3,
        ajaxurl: '',
      },
      {
        label: '转人才备用库',
        status: 4,
        ajaxurl: '',
      },
      {
        label: '录取',
        status: 5,
        ajaxurl: '',
      },
    ],
  },
  {
    key: 1,
    title: '初试邀约',
    timeLabel: '邀约时间',
    operationList: [
      {
        label: '复试邀约',
        status: 2,
        ajaxurl: '',
      },
      {
        label: '不合适',
        status: 3,
        ajaxurl: '',
      },
      {
        label: '转人才备用库',
        status: 4,
        ajaxurl: '',
      },
      {
        label: '录取',
        status: 5,
        ajaxurl: '',
      },
    ],
  },
  {
    key: 2,
    title: '复试邀约',
    timeLabel: '邀约时间',
    operationList: [
      {
        label: '不合适',
        status: 3,
        ajaxurl: '',
      },
      {
        label: '转人才备用库',
        status: 4,
        ajaxurl: '',
      },
      {
        label: '录取',
        status: 5,
        ajaxurl: '',
      },
    ],
  },
  {
    key: 3,
    title: '不合适',
    timeLabel: '投递时间',
    operationList: [
      {
        label: '转人才备用库',
        status: 4,
        ajaxurl: '',
      },
    ],
  },
  {
    key: 4,
    title: '人才备选',
    timeLabel: '投递时间',
    operationList: [
      {
        label: '删除',
        status: '',
        ajaxurl: 'deleteApplyForRecordInfo',
      },
      {
        label: '不合适',
        status: 3,
        ajaxurl: '',
      },
      {
        label: '录取',
        status: 5,
        ajaxurl: '',
      },
      {
        label: '初试邀约',
        status: 1,
        ajaxurl: '',
      },
    ],
  },
  {
    key: 5,
    title: '已录取',
    timeLabel: '录取时间',
    operationList: [
      {
        label: '转正',
        status: 6,
        ajaxurl: '',
      },
      {
        label: '删除',
        status: '',
        ajaxurl: 'deleteApplyForRecordInfo',
      },
    ],
  },
  {
    key: 6,
    title: '已转正',
    timeLabel: '转正时间',
  },
];

// 点击操作面板的数据，如果有ajaxUrl，证明是删除，其他的都是正常操作接口
const operationFun = async (index: any, item: any, op: any) => {
  if (op.ajaxUrl) {
    await delApplyForRecordStatus({ applyForRecordId: item.applyForRecordId });
    applyForList.list[index].showOperation = !applyForList.list[index].showOperation;
    ElMessage({
      message: '删除成功！',
      type: 'success',
    });
  } else {
    await setApplyForRecordStatus({ applyForRecordId: item.applyForRecordId, applyCompanyStatus: op.status });
    applyForList.list[index].showOperation = !applyForList.list[index].showOperation;
    ElMessage({
      message: '操作成功！',
      type: 'success',
    });
  }
  await setApplyForList({
    applyCompanyStatus: formInfo.applyCompanyStatus,
    name: formInfo.name,
  });
};

// 查询列表数据
const searchList = async () => {
  isLoading.value = false;
  await setApplyForList({
    applyCompanyStatus: formInfo.applyCompanyStatus,
    name: formInfo.name,
  });
  isLoading.value = true;
};

/**
 * @description: 切换tab
 * @param {*} key-当前点击的tab所表示的值
 * @return {*}
 */
const handleTabClick = (key: any) => {
  formInfo.applyCompanyStatus = key;
  searchList();
};

// 分页方法
const goPage = async (val: any) => {
  applyForList.page.current = val;
  isLoading.value = false;
  await setApplyForList({
    applyCompanyStatus: formInfo.applyCompanyStatus,
    name: formInfo.name,
  });
  isLoading.value = true;
};

// const educationText = (val: any) => computed(() => education.value.find((it:any) => it.value === val)?.text);
// const jobStatusText = (val: any) => computed(() => jobStatus.value.find((it:any) => it.value === val)?.text);
</script>

<style lang="scss">
.application-manage-root {
  .display-flex {
    display: flex;
  }

  .form-div {
    height: 46px;
    margin: 20px 0;
    margin-top: 0;
    display: flex;
    .el-input {
      width: calc(100% - 120px);
      .el-input__inner {
        border-radius: 0;
      }
    }
    .input-wd {
      width: 120px;
      height: 40px;
      background-color: #ED263D;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
    }
  }
  .status-tabs {
    height: 64px;
    border: 1px solid #E8E8E8;
    box-sizing: border-box;
    background: #fff;
    .normal-status-div {
      width: 20%;
      padding: 20px 0;
      text-align: center;
      color: #656565;
      font-size: 16px;
      cursor: pointer;
      &:not(:first-child) {
        span {
          width: 100%;
          display: inline-block;
          border-left: 1px solid #c7c6c6;
        }
      }
    }
    .active-status-div {
      color: #ED263D;
      border-bottom: 2px solid#ED263D;
    }
  }
  .applyInfo-div {
    padding: 30px;
    border: 1px solid #E8E8E8;
    border-top: none;
    background: #fff;
    .applyInfo-item {
      margin-bottom: 30px;
      padding: 30px;
      color: #999999;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      line-height: 26px;
      box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.06);
      border-radius: 0px 0px 0px 0px;
      img {
        width: 120px;
        height: 120px;
        margin-right: 20px;
      }
      .applyInfo-name {
        font-size: 18px;
        color: #222222;
        font-weight: bold;
        line-height: 56px;
      }
      .applyInfo-advan {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 90%;
        cursor: pointer;
      }
      .applyInfo-cont {
        color: #222222;
      }

      .icon-div {
        padding-top: 9px;
        margin-right: 5px;
        .circle-div {
          width: 6px;
          height: 6px;
          background: #ED263D;
          border-radius: 50%;
        }
        .line-div {
          width: 0px;
          height: 20px;
          opacity: 1;
          border: 1px dashed #ED263D;
          margin-left: 2px;
        }
      }

      .cursor-div {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        .operation-icon {
          width: 30px;
          height: 30px;
          font-size: 18px;
          color: #222222;
          font-weight: bold;
          transform: rotate(90deg);
          cursor: pointer;
        }
        .operation-list {
          width: 120px;
          position: absolute;
          right: 50px;
          box-shadow: 0px 3px 20px 1px rgb(0 0 0 / 6%);
          .operation-item {
            height: 46px;
            cursor: pointer;
            background: #FFFFFF;
            opacity: 1;
            text-align: center;
            line-height: 46px;
            &:hover {
              color: #ED263D;
            }
          }
        }
      }
    }
    .pagination-div {
      text-align: right;
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ED263D;
        color: #ffffff;
      }
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
</style>
