<!--
 * @Descripttion: 企业端 招聘管理列表
 * @Author: yang chenglin
 * @Date: 2021-10-19 18:32:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-23 19:38:23
-->
<template>
  <div class="recruitment-manage-root">
    <div class="form-div">
      <el-input v-model="queryParams.recruitmentPostName"
                placeholder="搜索应聘者职位"></el-input>
      <div class="input-wd"
           @click="handlerSerach">搜索</div>
    </div>
    <div class="form-list">
      <el-form :inline="true"
               label-position="top"
               ref="form"
               :model="queryParams">
        <el-form-item label="岗位名称"
                      class="third-item">
          <el-cascader v-model="queryParams.classificationValueMap"
                       placeholder="请选择岗位"
                       :show-all-levels="false"
                       @change="handleChangeJob"
                       :props="{
              expandTrigger: 'hover',
              value: 'classificationValue',
              label: 'classificationName',
              children: 'classifies',
            }"
                       :options="queryAllList"></el-cascader>
        </el-form-item>

        <el-form-item label="薪资范围"
                      class="third-item money-limit">
          <div class="display-flex">
            <el-input type="number"
                      :min='0'
                      v-model="queryParams.moneyStart"></el-input> &nbsp;&nbsp;K
            <span style="display:inline-block;margin: 0 20px;"> -</span>
            <el-input type="number"
                      :min='0'
                      v-model="queryParams.moneyEnd"></el-input> &nbsp;&nbsp;K
          </div>
        </el-form-item>
        <el-form-item label="审核状态"
                      class="third-item">
          <el-select v-model="queryParams.applyStatus"
                     placeholder="请选择审核状态">
            <el-option v-for="item in applyStatusMap"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发布日期"
                      class="half-item">
          <div class="display-flex">
            <el-date-picker v-model="queryParams.timeMap"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="是否急招"
                      class="third-item">
          <!-- <el-radio-group v-model="queryParams.isHurry">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group> -->
          <el-select v-model="queryParams.isHurry"
                     placeholder="请选择急招状态">
            <el-option v-for="item in isHurryMap"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="new-create"
           @click="router.push(`/business/recruitment/create`)">新建招聘</div>

      <div class="recruitment-div">
        <div v-for="(item, index) in recruitmentInfoList"
             :key="index"
             class="recruitment-item">
          <img v-if="item.nowhiring"
               src="@/assets/now-hiring.png" />
          <div class="display-flex">
            <div style="width: 30%">
              <div class="recruitment-name">{{ item.recruitmentPostName }}</div>
              <div class="recruitment-cont">
                <span class="recruitment-pay">{{ item.moneyStart }}K - {{ item.moneyEnd }}K</span>
                {{ item.city }} | {{ workingYearsTypeMap[item.workingYearsType] }} | {{ educationMap[item.education] }} | {{ recruitmentType[item.recruitmentType] }}
              </div>
            </div>
            <div style="width: 380px"
                 class="display-flex">
              <div>发布日期：{{ item.createTime }}</div>
              <div class="pass-status">
                <span class="label-icon"
                      :style="{ background: ['#999999', '#ED263D', '#71C20A'][item.applyStatus] }"></span>
                {{ statusList[item.applyStatus].label }}
              </div>
            </div>
            <div class="operation-div">
              <div @click='handleEditRecruitmentStatus(item)'
                   :class="item.recruitmentStatus==='2' ? 'open-btn' : 'close-btn'">{{ item.recruitmentStatus === '2' ? '开放职位' : '关闭职位' }}</div>
              <div class="cursor-div">
                <div class="operation-icon"
                     @click="item.showOperation = !item.showOperation">
                  <img src="@/assets/open-operation.png" />
                </div>
                <div class="operation-list"
                     v-if="item.showOperation">
                  <div class="operation-item"
                       @click='handleEdit(item)'>编辑</div>
                  <div class="operation-item"
                       @click="handleDeleteRecruitmentInfo(item)">删除</div>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-panel">
            <div class="detail-panel-title">
              <div class="detail-panel-name">{{ item.recruitmentPostName }}</div>

              <div class="display-flex"
                   style='justify-content: space-between;padding:0'>
                <div>招聘人数：{{ item.recruitmentCount }}</div>
                <div class="classify-div">岗位分类：{{ item.postClassifyName }}</div>
              </div>
            </div>
            <div class="detail-panel-content">
              <div class="detail-panel-content-title">岗位描述：</div>
              <div class="detail-panel-content-content">{{ item.jobDescription }}</div>
              <div class="detail-panel-content-title">招聘截至时间：</div>
              <div class="detail-panel-content-content">{{ item.endTime }}</div>
            </div>
          </div>
        </div>
        <div class="pagination-div">
          <!-- <el-pagination background
                         layout='prev, pager, next'
                         :total='recruitment.page.total'
                         @current-change='goPage'
                         @prev-click='goPage'
          @next-click='goPage'></el-pagination>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useGetRecruitmentInfoList from '../apis/getRecruitmentInfoList';
import useQueryAll from '../apis/queryAllClassifyList';
import useEditRecruitmentStatus from '../apis/editRecruitmentStatus';
import useDeleteRecruitmentInfo from '../apis/deleteRecruitmentInfo';

const { deleteRecruitmentInfo } = useDeleteRecruitmentInfo();

const { editRecruitmentStatus } = useEditRecruitmentStatus();

const router = useRouter();
const { queryAllList, queryAll } = useQueryAll();
const { recruitmentInfoList, getRecruitmentInfoList } = useGetRecruitmentInfoList();

// 工作经验
const workingYearsTypeMap = ['', '不限', '1年以内', '1-3年', '3-5年', '5-10年'];
// 学历
const educationMap = ['', '不限', '初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'];
// 职业类型
const recruitmentType = ['', '全职', '兼职'];

const queryParams = ref({
  applyStatus: '',
  companyId: '',
  isHurry: '',
  money: '',
  moneyEnd: 0,
  moneyStart: 0,
  pageNo: 1,
  pageSize: 9999,
  postClassifyId: '',
  recruitmentPostName: '',
  releaseDate: '',
  endTime: '',
  classificationValueMap: [],
  timeMap: [],
});

// 审核状态下拉框
const applyStatusMap = ref([
  {
    value: 0,
    label: '待审核',
  },
  {
    value: 1,
    label: '已通过',
  },
  {
    value: 2,
    label: '已拒绝',
  },
]);

// 是否急招
const isHurryMap = ref([
  {
    value: '',
    label: '全部',
  },
  {
    value: 1,
    label: '是',
  },
  {
    value: 2,
    label: '否',
  },
]);

// 审核状态回显map
const statusList = ref([
  {
    id: 1,
    label: '待审核',
  },
  {
    id: 2,
    label: '已通过',
  },
  {
    id: 3,
    label: '已拒绝',
  },
]);

// 执行搜索
const handlerSerach = async () => {
  await getRecruitmentInfoList(queryParams.value);
};

// 切换岗位名称时候调用获取职位名称
const handleChangeJob = async (value: any) => {
  const [value0, value1] = value;
  queryParams.value.postClassifyId = value1;
};

// 编辑企业招聘状态
const handleEditRecruitmentStatus = async (params:any) => {
  await editRecruitmentStatus({
    recruitmentInfoId: params.recruitmentInfoId,
    recruitmentStatus: params.recruitmentStatus === '1' ? '2' : '1',
  });
  getRecruitmentInfoList(queryParams.value);
};

// 删除招聘
const handleDeleteRecruitmentInfo = async (params:any) => {
  await deleteRecruitmentInfo({
    recruitmentInfoId: params.recruitmentInfoId,
  });
  getRecruitmentInfoList(queryParams.value);
};

// 编辑招聘
const handleEdit = (item:any) => {
  router.push({
    path: '/business/recruitment/create',
    query: {
      option: 'edit',
      result: JSON.stringify(item),
    },
  });
};

onMounted(async () => {
  queryAll();
  getRecruitmentInfoList(queryParams.value);
});

</script>

<style lang="scss">
.recruitment-manage-root {
  *{
    box-sizing: border-box;
  }
  .display-flex {
    display: flex;
  }

  .form-div {
    height: 46px;
    display: flex;
    .el-input {
      width: calc(100% - 120px);
      .el-input__inner {
        border-radius: 5px 0 0 5px;
      }
    }
    .input-wd {
      width: 120px;
      height: 40px;
      background-color: #ed263d;
      border-radius: 0 5px 5px 0;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
    }
  }

  .form-list {
    padding: 30px;
    margin-top: 35px;
    background: #ffffff;
    position: relative;
    .form-select {
      .el-select {
        width: 110px;
        margin-right: 10px;
        .el-input__inner {
          border: none;
          color: #999999;
        }
      }
      .el-button {
        width: 120px;
        float: right;
        background: #ed263d;
      }
    }

    .recruitment-div {
      padding: 10px 0;
      width: 100%;
      background: #fff;
      opacity: 1;
      .recruitment-item {
        min-width: 100%;
        margin: 30px 0 ;
        img {
          position: absolute;
          top: 0;
          left: 0;
        }
        &:hover {
          .detail-panel {
            display: block;
            position: absolute;
            top: 0;
            right: 20%;
            width: 550px;
            z-index: 9999;
            // height: 409px;
            background: #ffffff;
            box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.06);
            opacity: 1;
            .detail-panel-title {
              padding: 20px 30px;
              background: #fff9fa;
              .detail-panel-name {
                font-size: 18px;
                font-family: PingFang SC-Bold, PingFang SC;
                font-weight: bold;
                color: #222222;
              }
              .display-flex {
                justify-content: space-between;
                font-size: 14px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                .classify-div {
                  color: #222222;
                }
              }
            }
            .detail-panel-content {
              padding: 0 30px 20px 30px;
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #656565;
              .detail-panel-content-title {
                margin: 15px 0 10px 0;
              }
              .detail-panel-content-content {
              }
            }
          }
        }
        .detail-panel {
          display: none;
        }
        position: relative;
        margin-bottom: 10px;
        padding: 30px;
        opacity: 1;
        color: #999999;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        line-height: 26px;
        box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.06);
        border-radius: 0px 0px 0px 0px;
        .display-flex {
          padding: 0 30px;
          align-items: center;
          justify-content: space-between;
        }
        .recruitment-name {
          font-size: 18px;
          color: #222222;
          font-weight: bold;
        }
        .recruitment-pay {
          margin-right: 10px;
          display: inline-block;
          color: #ff9100;
        }
        .recruitment-cont {
          color: #999999;
        }
        .label-icon {
          width: 6px;
          height: 6px;
          margin: 0 0px 2px 30px;
          border-radius: 50%;
          display: inline-block;
        }

        .icon-div {
          padding-top: 9px;
          margin-right: 5px;
          .circle-div {
            width: 6px;
            height: 6px;
            background: #ed263d;
            border-radius: 50%;
          }
          .line-div {
            width: 0px;
            height: 20px;
            opacity: 1;
            border: 1px dashed #ed263d;
            margin-left: 2px;
          }
        }

        .operation-div {
          width: 30%;
          display: flex;
          justify-content: right;
          .open-btn {
            width: 100px;
            height: 34px;
            background: #ed263d;
            border-radius: 8px;
            color: #ffffff;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
          }
          .close-btn {
            width: 100px;
            height: 34px;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #ed263d;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
            color: #ed263d;
          }
          .cursor-div {
            position: relative;
            margin-left: 30px;
            top: 5px;
            .operation-icon {
              font-size: 18px;
              color: #222222;
              font-weight: bold;
              // transform: rotate(90deg);
              cursor: pointer;
              margin-top: 5px;
            }
            .operation-list {
              width: 120px;
              position: absolute;
              right: 0;
              box-shadow: 0px 3px 20px 1px rgb(0 0 0 / 6%);
              .operation-item {
                height: 46px;
                cursor: pointer;
                background: #ffffff;
                opacity: 1;
                text-align: center;
                line-height: 46px;
                &:hover {
                  color: #ed263d;
                }
              }
            }
          }
        }
        .pass-status {
          font-size: 16px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
      .pagination-div {
        text-align: right;
        .el-pagination.is-background .el-pager li:not(.disabled).active {
          background-color: #ed263d;
          color: #ffffff;
        }
      }
    }
  }

  .el-form {
    .el-form-item__label {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: bold;
      color: #222222;
    }
    .el-input__inner,
    .el-textarea__inner {
      background: #f8f8f8;
      border-radius: 0;
    }

    .el-form-item.third-item {
      width: calc(20%);
      margin-right: 20px;
      .el-select {
        width: 100%;
      }
    }
    .el-range-input {
      background: #f8f8f8;
    }
    .el-cascader  {
      width: 100%;
    }
  }
  .new-create{
    position: absolute;
    right: 30px;
    top: 150px;
          width: 120px;
      height: 40px;
      background-color: #ed263d;
      border-radius: 5px;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
  }
  .el-form--inline.el-form--label-top{
    justify-content: space-between;
  }
  .el-form--inline.el-form--label-top .el-form-item{
    padding: 0;
    margin: 0;
  }
    .money-limit{
    .el-input__inner{
      padding: 0 0 0 15px ;
    }
  }
  .el-input__inner{
    border: none;
  }
}
</style>
