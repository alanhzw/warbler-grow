<!--
 * @Descripttion: 企业端人才广场
 * @Author: yang chenglin
 * @Date: 2021-10-18 18:59:57
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 23:34:10
-->
<template>
  <div class="people-square-root"
       v-if="recruitmentInfoList.length > 0 && isLoading">
    <div class="search-form-div">
      <div class="recruitment-div">
        <div :class="formInfo.recruitmentInfoId ? 'normal' : 'active active-result'"
             @click="() => {formInfo.recruitmentInfoId = ''; talentSquareList.list = [], talentSquareList.page = { ...talentSquareList.page, current: 1}}">
          不限职位</div>
        <div v-for="item in recruitmentInfoList"
             :key="item"
             :class="formInfo.recruitmentInfoId === item.postId ? 'active' : 'normal'"
             @click="() => {formInfo.recruitmentInfoId = item.postId; searchList()}">
          {{item.postName}}</div>
      </div>
      <div class='form-div'>
        <el-input v-model='formInfo.nickName'
                  placeholder='搜索应聘者姓名/职位'></el-input>
        <div class="input-wd"
             @click="searchList">搜索</div>
      </div>
      <div>
        <div class="search-select-div">
          <div class="search-select-title">学历</div>
          <div class="search-select-content">
            <div style="margin-left: 16px"> | </div>
            <div style="margin-left: 16px"
                 :class='formInfo.education ? "education-item" : "active education-item"'
                 @click="() => {formInfo.education = ''; searchList()}">不限</div>
            <div v-for="it in education"
                 :key="it.value"
                 :class='it.value === formInfo.education ? "active education-item" : "education-item"'
                 @click="() => {formInfo.education = it.value; searchList()}">{{it.text}}</div>
            <div>
              <span class="education-item">自定义</span>
              <el-select v-model='formInfo.educationMin'
                         placeholder='最低学历'
                         @change="searchList">
                <el-option v-for='item in education'
                           :key='item.value'
                           :label='item.text'
                           :value='item.value'>
                </el-option>
              </el-select>
              <span> 至 </span>
              <el-select v-model='formInfo.educationMax'
                         placeholder='最高学历'
                         @change="searchList">
                <el-option v-for='item in education'
                           :key='item.value'
                           :label='item.text'
                           :value='item.value'>
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="search-select-div">
          <div class="search-select-title">经验</div>
          <div class="search-select-content">
            <div style="margin-left: 16px"> | </div>
            <!-- <div style="margin-left: 16px"
                 :class='formInfo.experience ? "education-item" : "active education-item"'
                 @click="() => {formInfo.experience === ''; searchList()}">不限</div> -->
            <div v-for="it in workingYearsType"
                 :key="it.value"
                 :class='it.value === formInfo.experience ? "active education-item" : "education-item"'
                 @click="() => {formInfo.experience = it.value; searchList()}">{{it.text}}</div>
            <div>
              <span class="education-item">自定义</span>
              <el-select v-model='formInfo.workingYearsStart'
                         placeholder='开始'
                         @change="searchList">
                <el-option v-for='item in workTime'
                           :key='item.value'
                           :label='item.text'
                           :value='item.value'>
                </el-option>
              </el-select>
              <span> 至 </span>
              <el-select v-model='formInfo.workingYearsEnd'
                         placeholder='结束'
                         @change="searchList">
                <el-option v-for='item in workTime'
                           :key='item.value'
                           :label='item.text'
                           :value='item.value'>
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="display-flex search-detail-div">
          <div>
            <div class="search-detail-title">求职状态 <span>(多选)</span></div>
            <el-select v-model='formInfo.cvJobHuntingStatusList'
                       placeholder='不限'
                       multiple
                       @change="searchList">
              <el-option v-for='item in jobStatus'
                         :key='item.value'
                         :label='item.text'
                         :value='item.value'>
              </el-option>
            </el-select>
          </div>
          <div>
            <div class="search-detail-title">性别</div>
            <el-select v-model='formInfo.sex'
                       placeholder='不限'
                       @change="searchList">
              <el-option key='-1'
                         label='不限'
                         value=''></el-option>
              <el-option key='0'
                         label='未知'
                         value='0'></el-option>
              <el-option key='1'
                         label='男'
                         value='1'></el-option>
              <el-option key='2'
                         label='女'
                         value='2'></el-option>
            </el-select>
          </div>
          <div>
            <div class="search-detail-title">年龄要求</div>
            <div class="display-flex">
              <el-select v-model='formInfo.ageMin'
                         placeholder='最低年龄'
                         @change="searchList">
                <el-option key=''
                           label='不限'
                           value=''></el-option>
                <el-option v-for='item in ageList'
                           :key='item.key'
                           :label='item.label'
                           :value='item.key'>
                </el-option>
              </el-select>
              <span style="margin: 0 5px"> 至 </span>
              <el-select v-model='formInfo.ageMax'
                         placeholder='最高年龄'
                         @change="searchList">
                <el-option key=''
                           label='不限'
                           value=''></el-option>
                <el-option v-for='item in ageList'
                           :key='item.key'
                           :label='item.label'
                           :value='item.key'>
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="search-detail-title">期望薪资</div>
            <div class="display-flex">
              <el-select v-model='formInfo.expectMoneyMin'
                         placeholder='最低薪资'>
                <el-option key=''
                           label='不限'
                           value=''></el-option>
                <el-option v-for='item in expectMoney'
                           :key='item.value'
                           :label='item.text'
                           :value='item.value'>
                </el-option>
              </el-select>
              <span style="margin: 0 5px"> 至 </span>
              <el-select v-model='formInfo.expectMoneyMax'
                         placeholder='最高薪资'>
                <el-option key=''
                           label='不限'
                           value=''></el-option>
                <el-option v-for='item in expectMoney'
                           :key='item.value'
                           :label='item.text'
                           :value='item.value'>
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='people-div'>
      <div v-for='(item, index) in talentSquareList.list'
           :key='index'
           class='people-item'
           @click="() => {resumeId = item.userId; resumeExpectId = item.expectPostId; resumeVisible = true}">
        <div class='display-flex'
             style="justify-content: space-between;">
          <div class='display-flex'>
            <div style="position: relative">
              <img :src="item.headImageUrl"
                   alt="暂无图片"
                   class="main-img">
              <img v-if="item.sex==='1'"
                   style="position: absolute;bottom: 15px;left: 0;"
                   src="@/assets/man-icon.png"
                   alt="">
              <img v-if="item.sex==='2'"
                   style="position: absolute;bottom: 15px;left: 0;"
                   src="@/assets/woman-icon.png"
                   alt="">
            </div>
            <div>
              <div class='people-name'>{{item.nickName}}</div>
              <div class='display-flex'
                   style="justify-content: space-between;">
                <div style="width: 600px">
                  <div class='people-advan'
                       :title="item.cvAdvantage">{{item.cvAdvantage}}</div>
                  <div class="people-cont">
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
                  <div style="width: 400px">
                    <div>期望职位：{{item.expectPostName}}</div>
                    <div class='people-advan'
                         :title="item.specialtyName">
                      教育经历：
                      <span v-if="item.schoolName">{{item.schoolName}}</span>
                      <span v-if="item.specialtyName"> -{{item.specialtyName}}</span>
                      <span v-else>暂无经历</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cursor-div">
            <el-button type='danger'
                       @click.stop="() => {activeId = item.userId; dialogVisible = true}">邀请面试
            </el-button>
          </div>
        </div>
      </div>
      <div class='pagination-div'
           v-if="talentSquareList.list.length > 0">
        <el-pagination background
                       layout='prev, pager, next'
                       :page-size="talentSquareList.page.size"
                       :total='talentSquareList.page.total'
                       @current-change='goPage'
                       @prev-click='goPage'
                       @next-click='goPage'>
        </el-pagination>
      </div>

      <div v-if="talentSquareList.list.length === 0"><img src="@/assets/peoplesquareBG.png"
             alt=""
             style="width: 100%">
      </div>
    </div>
    <el-dialog class="dialog-root"
               v-model="dialogVisible"
               title=" "
               width="57%"
               :before-close="handleClose">
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
    </el-dialog>

    <el-dialog v-model="resumeVisible"
               :close-on-click-modal='false'
               :before-close="() => {resumeVisible = false; resumeId = ''; resumeExpectId = ''}">
      <resume-dialog :personId='resumeId'
                     :expectPostId="resumeExpectId"></resume-dialog>
    </el-dialog>
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
</template>

<script lang="ts" setup>
import {
  reactive, ref, computed, onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import useJobStatus from './hooks/useJobStatus';
import useEducation from './hooks/useEducation';
import useWorkTime from './hooks/useWorkTime';
import useExpectMoney from './hooks/useExpectMoney';
import useRecruitmentInfoList from './hooks/useRecruitmentInfoList';
import useTalentSquareList from './hooks/useTalentSquareList';
import useInvited from './hooks/useInvited';
import resumeDialog from '@/components/company_get_resume/index.vue';

// 职位数据是否加载完
const isLoading = ref(false);

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

// 查看用户简历弹窗
const resumeVisible = ref(false);
const resumeId = ref('');
const resumeExpectId = ref('');

// 招聘岗位信息
const { recruitmentInfoList, getRecruitmentInfoList } = useRecruitmentInfoList();
onMounted(async () => {
  await getRecruitmentInfoList();
  isLoading.value = true;
});

// 当前求职状态'
const { jobStatus, getJobStatus } = useJobStatus();
getJobStatus();
// 学历列表
const { education, getEducation } = useEducation();
getEducation();
// 工作年限
const { workTime, getWorkTime } = useWorkTime();
getWorkTime();
// 期望薪资
const { expectMoney, getExpectMoney } = useExpectMoney();
getExpectMoney();

// 查询条件
const formInfo = reactive({
  recruitmentInfoId: '', // 默认是不限职位，如果选择再去筛选
  nickName: '',
  jobTitle: '',
  education: '', // 1不限 2初中及以下 3.中专/中技 4.高中 5.大专 6.本科 7.硕士 8.博士
  educationMin: '',
  educationMax: '',
  experience: '1', // 1.不限 2.在校/应届 3. 1-3年 4. 3-5年 5. 5-10年
  workingYearsStart: '',
  workingYearsEnd: '',
  cvJobHuntingStatusList: [], // 1.离职-随时到岗 2.在职-暂不考虑 3.在职-考虑机会 4.在职-月内到岗
  sex: '', // 0：未知、1：男、2：女
  ageMin: '',
  ageMax: '',
  expectMoneyMin: '',
  expectMoneyMax: '',
});
// 人才列表
const { talentSquareList, getTalentSquareList } = useTalentSquareList();
getTalentSquareList(formInfo);
console.log(talentSquareList.list);

// 工作年限选项
const workingYearsType = [
  {
    text: '不限',
    value: '1',
  }, {
    text: '在校/应届',
    value: '2',
  }, {
    text: '1-3年',
    value: '3',
  }, {
    text: '3-5年',
    value: '4',
  }, {
    text: '5-10年',
    value: '5',
  },
];

// 年龄列表
const ageFun = () => {
  const ar = [];
  for (let i = 1; i < 51; i += 1) {
    ar.push({ label: `${i}岁`, key: i });
  }
  return ar;
};
const ageList = ref(ageFun());

// 查询列表数据
const searchList = async () => {
  await getTalentSquareList(formInfo);
};

// 分页方法
const goPage = async (val: any) => {
  talentSquareList.page.current = val;
  await getTalentSquareList(formInfo);
};
</script>

<style lang="scss">
.people-square-root {
  .display-flex {
    display: flex;
  }
  .search-form-div {
    margin: 0 0 30px 0;
    padding: 30px 20px;
    background: #FFFFFF;
    .el-select {
      .el-input__inner {
        border: 1px solid #f8f8f8;
      }
    }
    .recruitment-div {
      margin: 20px 60px;
      display: flex;
      align-items: center;
      color: #656565;
      .normal {
        padding: 8px 16px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        margin: 0 16px;
        color: #222222;
        font-weight: bold;
        cursor: pointer;
      }
      .active {
        padding: 8px 16px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        margin: 0 16px;
        cursor: pointer;
        color: #FFF;
        background-color: #ED263D;
      }
      .active-result {
        color: #ED263D;
        background-color: #FFF;
      }
    }
    .el-select {
      width: 140px;
      .el-select__tags > span {
        display: flex;
        overflow-x: auto;
      }
    }
    .form-div {
      height: 46px;
      margin: 20px 60px;
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
    .search-select-div {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .search-select-title {
        font-size: 16px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #222222;
      }
      .search-select-content {
        display: flex;
        align-items: center;
        color: #656565;
        .education-item {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          margin: 0 16px;
          cursor: pointer;
          &.active {
          color: #ED263D;
          }
        }
      }
    }
    .search-detail-div {
      margin-top: 20px;
      justify-content: space-between;
      align-items: center;
      .display-flex {
        align-items: center;
      }
      .search-detail-title {
        font-size: 16px;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-bottom: 10px;
      }
    }
  }
  .people-div {
    border-top: none;
    .people-item {
      margin-bottom: 30px;
      padding: 30px;
      color: #999999;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      line-height: 26px;
      box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.06);
      border-radius: 0px 0px 0px 0px;
      .main-img {
        width: 128px;
        height: 128px;
        margin-right: 20px;
        border-radius: 50%;
      }
      .people-name {
        font-size: 18px;
        color: #222222;
        font-weight: bold;
        line-height: 56px;
      }
      .people-advan {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 90%;
        cursor: pointer;
      }
      .people-cont {
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
        margin-top: 15px;
        .el-button {
          width: 120px;
          position: absolute;
          right: 0;
          top: 40%;
          background: #ED263D;
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

.el-select-dropdown__item.selected {
  color: #ED263D;
}
</style>
