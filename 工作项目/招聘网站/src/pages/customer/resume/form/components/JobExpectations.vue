<!--
 * @Descripttion: 编辑在线简历-求职期望
 * @Author: yang chenglin
 * @Date: 2021-11-06 11:04:56
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:51:11
-->
<template>
  <div @mouseover='addIntro.expectations.flag = true'
       @mouseleave='addIntro.expectations.flag = false'>
    <div class='display-flex'
         style='justify-content: space-between'>
      <div class='content-title'>求职期望</div>
      <div class='add-btn'
           v-if='addIntro.expectations.flag'
           @click="addJobExpectationsFun">
        <img src="@/assets/add-item.png"
             alt="">添加
      </div>
    </div>
    <el-form :inline='true'
             label-position='top'
             :class='jobExpectations.length > 1 ? "demo-form-inline white-back-div" : "demo-form-inline"'
             v-for='(item, index) in jobExpectations'
             :key='index'
             :model='jobExpectations[index]'>
      <div class='delete-btn'
           v-if='jobExpectations.length > 1'
           @click="() => delJobExpectationsFun(index)"><img src="@/assets/delete-item.png"
             alt="">删除</div>
      <el-form-item label='求职类型'>
        <div class='base-info-sex display-flex'>
          <div style='margin-right: 5px'
               :class="item.expectType === '1' ? 'active' : ''"
               @click="jobExpectations[index].expectType = '1'">全职</div>
          <div style='margin-left: 5px'
               :class="item.expectType === '2' ? 'active' : ''"
               @click="jobExpectations[index].expectType = '2'">兼职</div>
        </div>
      </el-form-item>
      <el-form-item label='工作城市'>
        <el-cascader :show-all-levels="false"
                     class='the-element'
                     placeholder='请选择'
                     :options="regionData"
                     :props="{ label: 'label' }"
                     v-model='item.expectAddress'>
          <template #default="{ data }">
            <span>{{ data.label }}</span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item label='期望行业'>
        <el-select class='the-element'
                   v-model='item.expectIndustryCode'
                   placeholder='请选择'>
          <el-option v-for='subitem in companyIndustry'
                     :key='subitem.value'
                     :label='subitem.text'
                     :value='subitem.value'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='期望职位'>
        <el-cascader :show-all-levels="false"
                     class='the-element'
                     placeholder='请选择'
                     :options="positionBaseList"
                     :props="{ label: 'text' }"
                     v-model='item.expectPostId'>
          <template #default="{ data }">
            <span>{{ data.text }}</span>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item label='期望薪资'
                    class='double-element-form-item'>
        <div class='display-flex'>
          <el-select class='the-element'
                     v-model='item.expectMoneyFrom'
                     placeholder='请选择'>
            <el-option v-for='subitem in expectMoney'
                       :key='subitem.value'
                       :label='subitem.text'
                       :value='subitem.value'>
            </el-option>
          </el-select>
          <div style='width: 40px; text-align: center; margin: 0 18px;'> 至 </div>
          <el-select class='the-element'
                     v-model='item.expectMoneyTo'
                     placeholder='请选择'>
            <el-option v-for='subitem in expectMoney'
                       :key='subitem.value'
                       :label='subitem.text'
                       :value='subitem.value'>
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label='&nbsp;'
                    class='content-btn'>
        <el-button type='danger'
                   @click="() => editJobExpectationsFun(index)">确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">
      <div style="text-align: center; margin-bottom: 20px">是否确认清空当前所有未保存的编辑？</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => {getJobExpectations();dialogVisible = false}">是</el-button>
        <el-button plain
                   @click="dialogVisible = false">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, h, ref } from 'vue';
import { ElMessage } from 'element-plus';
import useCompanyIndustry from '../../hooks/useCompanyIndustry';
import usePositionBaseList from '../../hooks/usePositionBaseList';
import useExpectMoney from '../../hooks/useExpectMoney';
import useJobExpectations from '../../hooks/useJobExpectations';
import useRegionData from '../../hooks/useRegionData';

// 期望行业
const { companyIndustry, getCompanyIndustry } = useCompanyIndustry();
getCompanyIndustry();
// 期望职位
const { positionBaseList, getPositionBaseList } = usePositionBaseList();
getPositionBaseList();
// 期望薪资
const { expectMoney, getExpectMoney } = useExpectMoney();
getExpectMoney();
// 期望地区
const { regionData, getRegionData } = useRegionData();
getRegionData();
// 清空内容弹窗
const dialogVisible = ref(false);

// 求职期望
const {
  jobExpectations, getJobExpectations, addJobExpectations, editJobExpectations, delJobExpectationsById,
} = useJobExpectations();
getJobExpectations();

// 各可添加模块基础数据
const addIntro = reactive({
  expectations: {
    flag: false,
    info: {
      jobExpectId: '',
      expectType: '1', // 期望类型 1-全职 2-兼职
      expectAddress: '',
      expectIndustryCode: '', // 期望行业
      expectIndustryName: '',
      expectMoneyFrom: '',
      expectMoneyTo: '',
      expectClassificationFatherId: '', // 期望职位的三级分类
      expectPostClassifyId: '',
      expectPostId: '',
      expectPostName: '',
    },
  },
});

// 添加求职期望
const addJobExpectationsFun = async () => {
  await addJobExpectations(addIntro.expectations.info);
  await getJobExpectations();
};

// 保存求职期望
const editJobExpectationsFun = async (index: any) => {
  const obj = { ...jobExpectations.value[index] };
  // obj.onJobTimeStart = dayjs(obj.onJobTimeStart).valueOf();
  // obj.onJobTimeEnd = dayjs(obj.onJobTimeEnd).valueOf();

  // 最终校验数据是否填写完整，然后提交给全局
  // const msg = '请完整填写求职期望！';
  // await Promise.all(Object.keys(addIntro.experienceList.info).map(async (validator: any) => {
  //   if (validator in obj) {
  //     if (!obj[validator]) {
  //       ElMessage({
  //         message: h('p', null, [
  //           h('span', { style: 'color: #ED263D' }, msg),
  //         ]),
  //       });
  //       return Promise.reject(new Error(msg));
  //     }
  //   }
  // }));

  if (+obj.expectMoneyFrom > +obj.expectMoneyTo) {
    const moneyMsg = '请正确填写期望薪资！';
    ElMessage({
      message: h('p', null, [
        h('span', { style: 'color: #ED263D' }, moneyMsg),
      ]),
    });
    return;
  }
  // 如果有id，是编辑，没有则是填写默认的第一条信息
  if (obj.expectIndustryCode) {
    obj.expectIndustryName = companyIndustry.value.find((it: any) => it.value === obj.expectIndustryCode)?.text;
  }
  // 地区是级联组件，所以需要选出最终值，有可能不是初始保存，expectAddress就不是数组，不必操作
  if (obj.expectAddress && obj.expectAddress instanceof Array) {
    obj.expectAddress = obj.expectAddress[1];
  }
  // 期望行业同理
  if (obj.expectPostId && obj.expectPostId instanceof Array) {
    obj.expectClassificationFatherId = obj.expectPostId[0];
    obj.expectPostClassifyId = obj.expectPostId[1];
    obj.expectPostId = obj.expectPostId[2];
  }
  // 还要查出期望行业的中文（并没有用，但是需要传）
  obj.expectPostName = positionBaseList.value.find((i: any) => i.value === obj.expectClassificationFatherId)?.children.find((i: any) => i.value === obj.expectPostClassifyId)?.children.find((i: any) => i.value === obj.expectPostId)?.text;
  if (obj.jobExpectId) {
    await editJobExpectations(obj);
  } else {
    await addJobExpectations(obj);
  }
  await getJobExpectations();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};

// 删除求职期望
const delJobExpectationsFun = async (index: any) => {
  await delJobExpectationsById({ jobExpectId: jobExpectations.value[index].jobExpectId });
  await getJobExpectations();
};
</script>
