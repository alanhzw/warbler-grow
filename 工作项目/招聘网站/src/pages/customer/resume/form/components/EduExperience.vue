<!--
 * @Descripttion: 编辑在线简历-教育经历
 * @Author: yang chenglin
 * @Date: 2021-11-07 12:21:40
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:51:04
-->
<template>
  <div @mouseover='addIntro.educationList.flag = true'
       @mouseleave='addIntro.educationList.flag = false'>
    <div class='display-flex'
         style='justify-content: space-between'>
      <div class='content-title'>教育经历</div>
      <div class='add-btn'
           v-if='addIntro.educationList.flag'
           @click="addEduExperienceFun"><img src="@/assets/add-item.png"
             alt="">添加
      </div>
    </div>
    <el-form :inline='true'
             label-position='top'
             :class='eduExperience.length > 1 ? "demo-form-inline white-back-div" : "demo-form-inline"'
             v-for='(item, index) in eduExperience'
             :key='index'
             :model='eduExperience[index]'>
      <div class='delete-btn'
           v-if='eduExperience.length > 1 '
           @click="() => delProjectExperienceFun(index)"><img src="@/assets/delete-item.png"
             alt="">删除</div>
      <el-form-item label='学校名称'>
        <el-input v-model='item.schoolName'
                  placeholder='填写学校名称'></el-input>
      </el-form-item>
      <el-form-item label='在校时间'
                    class='double-element-form-item'>
        <div class='display-flex'>
          <el-date-picker v-model='item.atSchoolTimeStart'
                          type='month'
                          placeholder='入学时间'></el-date-picker>
          <div style='width: 40px; text-align: center; margin: 0 18px;'> 至 </div>
          <el-date-picker v-model='item.atSchoolTimeEnd'
                          type='month'
                          placeholder='毕业时间'></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label='专业'
                    class='single-item'>
        <el-input v-model='item.specialtyName'
                  placeholder='请输入所学专业'></el-input>
      </el-form-item>
      <el-form-item label='学历'>
        <el-select v-model='item.education'
                   placeholder='选择您的学历'>
          <el-option v-for='subitem in education'
                     :key='subitem.value'
                     :label='subitem.text'
                     :value='subitem.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='&nbsp;'
                    class='content-btn'>
        <el-button type='danger'
                   @click="() => editEduExperienceFun(index)">确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">
      <div style="text-align: center; margin-bottom: 20px">是否确认清空当前所有未保存的编辑？</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => {getEduExperience();dialogVisible = false}">是</el-button>
        <el-button plain
                   @click="dialogVisible = false">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from 'vue';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import useEducation from '../../hooks/useEducation';
import useEduExperience from '../../hooks/useEduExperience';

// 学历列表
const { education, getEducation } = useEducation();
getEducation();
// 清空内容弹窗
const dialogVisible = ref(false);

// 各可添加模块基础数据
const addIntro = reactive({
  educationList: {
    flag: false,
    info: {
      eduExperienceId: '',
      schoolName: '',
      atSchoolTimeStart: '',
      atSchoolTimeEnd: '',
      specialtyName: '',
      education: '4', // (0:初中及以下 1:中专 2:高中 3:大专 4:本科 5:硕士 6:博士 )
    },
  },
});

const {
  eduExperience, getEduExperience, addEduExperience, editEduExperience, delEduExperienceById,
} = useEduExperience();
getEduExperience();

// 添加教育经历
const addEduExperienceFun = async () => {
  await addEduExperience(addIntro.educationList.info);
  await getEduExperience();
};

// 保存教育经历
const editEduExperienceFun = async (index: any) => {
  const obj = { ...eduExperience.value[index] };
  // obj.projectTimeStart = dayjs(obj.atSchoolTimeStart).valueOf();
  // obj.projectTimeEnd = dayjs(obj.atSchoolTimeEnd).valueOf();

  // 最终校验数据是否填写完整，然后提交给全局
  // const msg = '请完整填写教育信息！';
  // await Promise.all(Object.keys(addIntro.educationList.info).map(async (validator: any) => {
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
  if (dayjs(obj.atSchoolTimeStart).valueOf() > dayjs(obj.atSchoolTimeEnd).valueOf()) {
    const schoolMessage = '请正确填写在校时间！';
    ElMessage({
      message: h('p', null, [
        h('span', { style: 'color: #ED263D' }, schoolMessage),
      ]),
    });
    return;
  }
  obj.atSchoolTimeStart = dayjs(eduExperience.value[index].atSchoolTimeStart).format('YYYY-MM');
  obj.atSchoolTimeEnd = dayjs(eduExperience.value[index].atSchoolTimeEnd).format('YYYY-MM');
  // 如果有id，是编辑，没有则是填写默认的第一条信息
  if (obj.eduExperienceId) {
    await editEduExperience(obj);
  } else {
    await addEduExperience(obj);
  }
  await getEduExperience();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};

// 删除教育经历
const delProjectExperienceFun = async (index: any) => {
  await delEduExperienceById({ eduExperienceId: eduExperience.value[index].eduExperienceId });
  await getEduExperience();
};
</script>
