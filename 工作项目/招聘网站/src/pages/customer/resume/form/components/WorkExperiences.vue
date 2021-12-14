<!--
 * @Descripttion: 编辑在线简历-工作经历
 * @Author: yang chenglin
 * @Date: 2021-11-06 13:43:56
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:51:57
-->
<template>
  <div @mouseover='addIntro.experienceList.flag = true'
       @mouseleave='addIntro.experienceList.flag = false'>
    <div class='display-flex'
         style='justify-content: space-between'>
      <div class='content-title'>工作经历</div>
      <div class='add-btn'
           v-if='addIntro.experienceList.flag'
           @click="addWorkExperienceFun"><img src="@/assets/add-item.png"
             alt="">添加
      </div>
    </div>
    <el-form :inline='true'
             label-position='top'
             v-for='(item, index) in workExperiences'
             :key='index'
             :model='workExperiences[index]'
             :class='workExperiences.length > 1 ? "demo-form-inline white-back-div" : "demo-form-inline"'>
      <div class='delete-btn'
           v-if='workExperiences.length > 1'
           @click="workExperiences.splice(index, 1)"><img src="@/assets/delete-item.png"
             alt=""
             @click="() => delWorkExperienceFun(index)">删除</div>
      <el-form-item label='公司名称'>
        <el-input v-model='item.companyName'
                  placeholder='例如：北京某某有限公司'></el-input>
      </el-form-item>
      <el-form-item label='所属行业'>
        <el-select class='the-element'
                   v-model='item.industryCode'
                   placeholder='请选择'>
          <el-option v-for='subitem in companyIndustry'
                     :key='subitem.value'
                     :label='subitem.text'
                     :value='subitem.value'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='职位名称'>
        <el-input v-model='item.jobTitle'
                  placeholder='填写职位名称'></el-input>
      </el-form-item>
      <el-form-item label='薪酬'>
        <el-select class='the-element'
                   v-model='item.salary'
                   placeholder='请选择薪酬范围'>
          <el-option v-for='subitem in salary'
                     :key='subitem.value'
                     :label='subitem.text'
                     :value='subitem.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='工作内容'
                    class="single-item">
        <el-input maxlength='1600'
                  show-word-limit
                  type='textarea'
                  :rows='5'
                  v-model='item.workContent'
                  placeholder='描述该工作内容，像招聘者展示您的工作内容'></el-input>
      </el-form-item>
      <el-form-item label='在职时间'
                    class='double-element-form-item'>
        <div class='display-flex'>
          <el-date-picker v-model='item.onJobTimeStart'
                          type='month'
                          placeholder='选择在职时间'></el-date-picker>
          <div style='width: 40px; text-align: center; margin: 0 18px;'> 至 </div>
          <el-date-picker v-model='item.onJobTimeEnd'
                          type='month'
                          placeholder='选择离职时间'></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label='&nbsp;'
                    class='content-btn'>
        <el-button type='danger'
                   @click="() => editWorkExperienceFun(index)">确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">
      <div style="text-align: center; margin-bottom: 20px">是否确认清空当前所有未保存的编辑？</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => {getWorkExperiences();dialogVisible = false}">是</el-button>
        <el-button plain
                   @click="dialogVisible = false">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, h, ref } from 'vue';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import useSalary from '../../hooks/useSalary';
import useCompanyIndustry from '../../hooks/useCompanyIndustry';
import useWorkExperiences from '../../hooks/useWorkExperiences';
// 清空内容弹窗
const dialogVisible = ref(false);
// 期望薪资
const { salary, getSalary } = useSalary();
getSalary();

// 期望行业
const { companyIndustry, getCompanyIndustry } = useCompanyIndustry();
getCompanyIndustry();

// 工作经历
const {
  workExperiences, getWorkExperiences, addWorkExperiences, editWorkExperiences, delWorkExperiencesById,
} = useWorkExperiences();
getWorkExperiences();

// 各可添加模块基础数据
const addIntro = reactive({
  experienceList: {
    flag: false,
    info: {
      workExperienceId: '',
      companyName: '',
      industryCode: '', // 所属行业
      industryName: '',
      onJobTimeStart: '',
      onJobTimeEnd: '',
      jobTitle: '',
      salary: '',
      workContent: '',
    },
  },
});

// 添加工作经历
const addWorkExperienceFun = async () => {
  await addWorkExperiences(addIntro.experienceList.info);
  await getWorkExperiences();
};

// 保存工作经历
const editWorkExperienceFun = async (index: any) => {
  const obj = { ...workExperiences.value[index] };
  // obj.onJobTimeStart = dayjs(obj.onJobTimeStart).valueOf();
  // obj.onJobTimeEnd = dayjs(obj.onJobTimeEnd).valueOf();

  // 最终校验数据是否填写完整，然后提交给全局
  // const msg = '请完整填写工作信息！';
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
  if (dayjs(obj.onJobTimeStart).valueOf() > dayjs(obj.onJobTimeEnd).valueOf()) {
    const workMessage = '请正确填写在职时间！';
    ElMessage({
      message: h('p', null, [
        h('span', { style: 'color: #ED263D' }, workMessage),
      ]),
    });
    return;
  }
  obj.onJobTimeStart = dayjs(workExperiences.value[index].onJobTimeStart).format('YYYY-MM');
  obj.onJobTimeEnd = dayjs(workExperiences.value[index].onJobTimeEnd).format('YYYY-MM');
  // 如果有id，是编辑，没有则是填写默认的第一条信息
  if (obj.workExperienceId) {
    if (obj.industryCode) {
      obj.industryName = companyIndustry.value.find((it: any) => it.value === obj.industryCode)?.text;
    }
    await editWorkExperiences(obj);
  } else {
    await addWorkExperiences(obj);
  }
  await getWorkExperiences();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};

// 删除工作经历
const delWorkExperienceFun = async (index: any) => {
  await delWorkExperiencesById({ workExperienceId: workExperiences.value[index].workExperienceId });
  await getWorkExperiences();
};
</script>
