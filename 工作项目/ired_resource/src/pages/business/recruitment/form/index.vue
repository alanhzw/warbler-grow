<!--
 * @Descripttion: 企业端 新建招聘
 * @Author: yang chenglin
 * @Date: 2021-10-19 18:33:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-01 11:51:40
-->
<template>
  <div class="recruitment-manege-form">
    <div class="page-title">
      <span class="line-span"></span>招聘岗位信息
    </div>
    <div class="recruitment-content">
      <el-form :inline="true"
               label-position="top"
               ref="form"
               :model="recruimentInfo">
        <el-form-item label="岗位名称"
                      class="half-item">
          <el-cascader v-model="recruimentInfo.classificationValueMap"
                       :show-all-levels="false"
                       @change="handleChangeJob"
                       :props="{
              expandTrigger: 'hover',
              value: 'classificationValue',
              label: 'classificationName',
              children: 'classifies',
            }"
                       :options="queryAllList"></el-cascader>
          <span class="create-job-btn"
                @click="applyJobClassifyDialogVisible = true">新建</span>
        </el-form-item>
        <el-form-item label="职位名称"
                      class="half-item">
          <el-select v-model="recruimentInfo.recruitmentPostName"
                     @change='handleChangePost'
                     placeholder="请选择职位类型">
            <el-option v-for="item in allPostList"
                       :key="item.postId"
                       :label="item.postName"
                       :value="item.postName"></el-option>
          </el-select>
          <span class="create-job-btn"
                @click="applyJobDialogVisible = true">新建</span>
        </el-form-item>
        <el-form-item label="薪资待遇"
                      class="third-item  money-limit">
          <div class="display-flex">
            <el-input type="text"
                      max="999"
                      maxlength="3"
                      v-model="recruimentInfo.moneyStart"></el-input>&nbsp;K
            <span style="display:inline-block;margin: 0 20px;">-</span>
            <el-input type="text"
                      max="999"
                      maxlength="3"
                      v-model="recruimentInfo.moneyEnd"></el-input> &nbsp;K
          </div>
        </el-form-item>
        <el-form-item label="学历要求"
                      class="third-item">
          <el-select v-model="recruimentInfo.education"
                     placeholder="请选择学历">
            <el-option v-for="item in educationMap"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作年限"
                      class="third-item">
          <el-select v-model="recruimentInfo.workingYearsType"
                     placeholder="请选择年限">
            <el-option v-for="item in workingYearsTypeMap"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘人数"
                      class="third-item">
          <el-input v-model="recruimentInfo.recruitmentCount"
                    placeholder="请输入人数"></el-input>
        </el-form-item>
        <el-form-item label="招聘截止日期"
                      class="half-item">
          <div class="display-flex">
            <el-date-picker v-model="recruimentInfo.endTime"
                            type="date"
                            placeholder="日期"></el-date-picker>
            <div style="margin-left: 20px">
              <el-checkbox v-model="recruimentInfo.isLongValid"></el-checkbox>长期有效
            </div>
          </div>
        </el-form-item>
        <el-form-item label="是否急招"
                      class="third-item">
          <el-radio-group v-model="recruimentInfo.isHurry">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="招聘类型"
                      class="third-item">
          <el-radio-group v-model="recruimentInfo.recruitmentType">
            <el-radio :label="1">全职</el-radio>
            <el-radio :label="2">兼职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位描述"
                      class="one-item">
          <el-input show-word-limit
                    type="textarea"
                    :rows="14"
                    v-model="recruimentInfo.jobDescription"
                    placeholder="请简单介绍一下公司的发展情况、服务领域、主要产品等信息"></el-input>
        </el-form-item>
        <el-form-item label="工作地点"
                      class="two-item">
          <el-cascader v-model="recruimentInfo.cityMap"
                       :show-all-levels="true"
                       @change="handleChangeCity"
                       :props="{
              expandTrigger: 'hover',
              value: 'value',
              label: 'label',
              children: 'children',
            }"
                       :options="regionData"></el-cascader>

          <el-input style="width: 50%"
                    type="text"
                    class="address"
                    placeholder="请输入详细地址"
                    v-model="recruimentInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="职位福利"
                      class="one-item">
          <div class="welfare-list-div">
            <div v-for="(item,index) in companyWelfare"
                 :key="item"
                 class='welfare-div'
                 :class='{"active":recruimentInfo.tagList?.find((tag)=>tag?.tagName===item)}'
                 @click="setCorporateWelfare(item,index)">{{item}}</div>
          </div>
        </el-form-item>
        <el-form-item class="content-btn">
          <el-button type="danger"
                     @click="handleSubmit">提交</el-button>
          <el-button plain
                     @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title=" "
               v-model="applyJobClassifyDialogVisible">
      <apply-classify @submitFun="applyJobClassify"
                      @closeFun="applyJobClassifyDialogVisible = false"></apply-classify>
    </el-dialog>
    <el-dialog title=" "
               v-model="applyJobDialogVisible">
      <apply-job @submitFun="applyJobs"
                 @closeFun="applyJobDialogVisible = false"></apply-job>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted, ref,
} from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import applyClassify from './components/applyJobClassify/index.vue';
import applyJob from './components/applyJob/index.vue';
import useQueryAll from '../apis/queryAllClassifyList';
import useQueryAllPostList from '../apis/queryAllPostList';
import initMaps from './hooks';
import useRegionData from '../apis/useRegionData';
import useAddRecruitmentInfo from '../apis/addRecruitmentInfo';
import useCompanyWelfare from '../apis/useCompanyWelfare';
import useEditRecruitmentInfo from '../apis/editRecruitmentInfo';
import { positiveIntegerReg } from '@/utils/vol';

const route = useRoute();
const router = useRouter();

const { editRecruitmentInfo, editRecruitmentInfoResult } = useEditRecruitmentInfo();

const { addRecruitmentInfo, addRecruitmentInfoResult } = useAddRecruitmentInfo();

const { companyWelfare, getWelfareTag } = useCompanyWelfare();
const { regionData, getRegionData } = useRegionData();
const { queryAllList, queryAll } = useQueryAll();
const { allPostList, queryAllPostList } = useQueryAllPostList();
const applyJobClassifyDialogVisible = ref(false); // 申请岗位分类
const applyJobDialogVisible = ref(false); // 申请岗位
const { workingYearsTypeMap, educationMap } = initMaps();

// 表单
const recruimentInfo = ref({
  classificationValueMap: [], // 岗位级联选择器
  cityMap: [], // 城市级联选择器
  classificationValue: '', // 岗位名称
  postClassifyId: '', // 岗位分类ID
  postId: '', // 岗位ID
  recruitmentPostName: '', // 职位名称
  moneyStart: 0, // 薪资开始
  moneyEnd: 0, // 薪资结束
  education: '', // 学历
  workingYearsType: '', // 工作年限
  recruitmentCount: '', // 招聘人数
  jobDescription: '', // 职位描述
  endTime: '', // 截止时间
  isLongValid: false, // 长期有效
  isHurry: 2, // 是否急招
  recruitmentType: 1, // 招聘类型
  province: '', // 省
  provinceCode: '', // 省-Code
  city: '', // 市
  cityCode: '', // 市-Code
  address: '', // 详细地址
  tagList: [], // 职位福利
});

// 初始化页面数据
const initRecruimentInfo = () => {
  recruimentInfo.value = {
    classificationValueMap: [], // 岗位级联选择器
    cityMap: [], // 城市级联选择器
    classificationValue: '', // 岗位名称
    postClassifyId: '', // 岗位分类ID
    postId: '', // 岗位ID
    recruitmentPostName: '', // 职位名称
    moneyStart: 0, // 薪资开始
    moneyEnd: 0, // 薪资结束
    education: '', // 学历
    workingYearsType: '', // 工作年限
    recruitmentCount: '', // 招聘人数
    jobDescription: '', // 职位描述
    endTime: '', // 截止时间
    isLongValid: false, // 长期有效
    isHurry: 2, // 是否急招
    recruitmentType: 1, // 招聘类型
    province: '', // 省
    provinceCode: '', // 省-Code
    city: '', // 市
    cityCode: '', // 市-Code
    address: '', // 详细地址
    tagList: [], // 职位福利
  };
};

// 新增岗位分类
const applyJobClassify = (val: any) => {
  console.log(val);
};
// 新增岗位
const applyJobs = (val: any) => {
  console.log(val);
};

// 设置公司福利
const setCorporateWelfare = (name:any, value:any) => {
  const res = recruimentInfo.value.tagList.findIndex((item) => item?.tagName === name && item?.tagValue === value);
  // 如果没有添加
  if (res < 0) {
    recruimentInfo.value.tagList.push({
      tagName: name,
      tagValue: value,
    });
  }
  // 如果有删除
  if (res > -1) {
    recruimentInfo.value.tagList.splice(res, 1);
  }
};

// 切换岗位名称时候调用获取职位名称
const handleChangeJob = async (value: any) => {
  const [value0, value1] = value;
  // 重置职位名称
  recruimentInfo.value.recruitmentPostName = '';
  // 岗位分类id
  recruimentInfo.value.postClassifyId = value1;
  // 岗位名称父级code
  recruimentInfo.value.classificationValue = value0;
  await queryAllPostList({
    classifyId: value1,
  });
};

// 切换职位名称
const handleChangePost = (value:any) => {
  const job = allPostList.value.find((item:any) => item.postName === value);
  // postid
  recruimentInfo.value.postId = job.postId;
};

// 切换城市时获取城市名称
const handleChangeCity = async (value: any) => {
  const [provinceCode, cityCode] = value;
  recruimentInfo.value.provinceCode = provinceCode;
  recruimentInfo.value.cityCode = cityCode;
  const province = regionData.value.find((item:any) => item.value === provinceCode);
  const city = province.children.find((item:any) => item.value === cityCode);
  recruimentInfo.value.city = city.label;
  recruimentInfo.value.province = province.label;
};

// 提交执行函数
const handleSubmit = async () => {
  if (!recruimentInfo.value.classificationValue) {
    ElMessage({
      message: '请选择岗位名称',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.recruitmentPostName) {
    ElMessage({
      message: '请选择职位名称',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.moneyStart || !recruimentInfo.value.moneyEnd || recruimentInfo.value.moneyStart > recruimentInfo.value.moneyEnd) {
    ElMessage({
      message: '请正确设置薪资待遇',
      type: 'error',
    });
    return;
  }
  if (!positiveIntegerReg(recruimentInfo.value.moneyStart) || !positiveIntegerReg(recruimentInfo.value.moneyEnd)) {
    ElMessage({
      message: '请正确设置薪资待遇',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.education) {
    ElMessage({
      message: '请选择学历',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.workingYearsType) {
    ElMessage({
      message: '请选择工作年限',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.recruitmentCount) {
    ElMessage({
      message: '请输入招聘人数',
      type: 'error',
    });
    return;
  }
  if (!positiveIntegerReg(recruimentInfo.value.recruitmentCount)) {
    ElMessage({
      message: '招聘人数请输入正整数',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.endTime && !recruimentInfo.value.isLongValid) {
    ElMessage({
      message: '非长期有效时,请选择招聘截止日期',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.jobDescription) {
    ElMessage({
      message: '请输入职位描述',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.province) {
    ElMessage({
      message: '请选择工作地点',
      type: 'error',
    });
    return;
  }
  if (!recruimentInfo.value.address) {
    ElMessage({
      message: '请输入详细地址',
      type: 'error',
    });
    return;
  }

  if (route.query.option === 'edit') {
    await editRecruitmentInfo(recruimentInfo.value);
    if (editRecruitmentInfoResult.value) {
      ElMessage({
        message: '编辑成功',
        type: 'success',
      });
    }
  } else {
    await addRecruitmentInfo(recruimentInfo.value);
    if (addRecruitmentInfoResult.value) {
      ElMessage({
        message: '创建成功',
        type: 'success',
      });
    }
    router.push({
      path: '/business/recruitment/list',
    });
  }
};

// 取消执行函数
const handleCancel = () => {
  router.push({
    path: '/business/recruitment/list',
  });
};

onMounted(async () => {
  if (route.query.option === 'edit') {
    // @ts-ignore
    const params = JSON.parse(route.query.result);
    recruimentInfo.value = {
      ...params,
      classificationValueMap: [params.classificationValue, params.postClassifyId], // 岗位级联选择器
      cityMap: [params.provinceCode, params.cityCode], // 城市级联选择器
      isHurry: params.isHurry === '1' ? 1 : 2,
      recruitmentType: params.recruitmentType === '1' ? 1 : 2,
      isLongValid: params.isLongValid === '1',
      tagList: params.tagList || [],
    };
  }

  queryAll();
  getRegionData();
  getWelfareTag();
});
</script>

<style lang="scss">
.el-dialog {
  .el-dialog__body {
    padding: 20px 60px;
  }
}
.recruitment-manege-form {
  color: #222222;
  .display-flex {
    display: flex;
  }
  .page-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    .line-span {
      display: inline-block;
      width: 4px;
      height: 20px;
      background: #ed263d;
      margin-right: 15px;
    }
  }

  .recruitment-content {
    background: #fff;
    padding: 30px;
    margin-bottom: 100px;
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
      }
      .el-form-item.half-item {
        .el-cascader {
          width: calc(100% - 60px);
        }
        width: calc(50% - 10px);
        // width: 50%;
        .el-select {
          width: calc(100% - 40px);
        }
        .create-job-btn {
          display: inline-block;
          margin-left: 5px;
          text-decoration: underline;
          cursor: pointer;
        }
        .el-radio.is-checked {
          .el-radio__label {
            color: #ed263d;
          }
          .el-radio__input.is-checked {
            .el-radio__inner {
              border-color: #ed263d;
              background-color: #ed263d;
            }
          }
        }
        .el-checkbox {
          margin-right: 10px;
          .el-checkbox__input {
            .el-checkbox__inner {
              &:hover {
                border-color: #ed263d;
              }
              &::after {
                border-color: red;
              }
            }
            &.is-checked .el-checkbox__inner {
              background-color: #fff;
              border-color: #ed263d;
              &::after {
                border-color: #ed263d;
              }
            }
          }
        }
        &.number-item {
          .el-input {
            width: 100px;
          }
          .slider-div {
            width: calc(100% - 290px);
            padding-left: 30px;
            .el-slider {
              // --el-slider-main-background-color: #F8F8F8;
              .el-slider__stop {
                background-color: #f8f8f8;
              }
              .el-slider__bar {
                background-color: #ed263d;
              }
              .el-slider__button {
                border-color: #ed263d;
              }
            }
          }
        }
      }
      .el-form-item.third-item {
        width: calc(25% - 20px);
        margin-right: 20px;
        .el-select {
          width: 100%;
        }
      }
      .el-form-item.one-item {
        width: calc(100% - 20px);
        .el-select {
          width: 25%;
          margin: 0 30px 20px 0;
        }
      }
      .el-form-item.two-item {
        width: 100%;
       .el-cascader {
          width: 278px;
          margin-right: 30px;
        }

        .address{
        // width: 100%;

          width: calc(100% - 315px) !important;
        }
      }
    }
    .welfare-list-div {
      display: flex;
      flex-wrap: wrap;
      .welfare-div {
        width: 100px;
        height: 38px;
        margin: 0 30px 20px 0;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
        background: #fff;
        box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.1);
        &.active {
          background: #ed263d;
          color: #fff;
        }
      }
    }
    .content-btn {
      width: 100%;
      margin-top: 30px;
      text-align: center;
      .el-button {
        width: 120px;
        &.el-button--danger {
          background: #ed263d;
          margin-right: 30px;
        }
      }
    }
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
