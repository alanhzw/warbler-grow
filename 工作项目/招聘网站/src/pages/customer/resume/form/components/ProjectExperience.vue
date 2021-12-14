<!--
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-06 14:59:14
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:51:46
-->
<template>
  <div @mouseover='addIntro.projectList.flag = true'
       @mouseleave='addIntro.projectList.flag = false'>
    <div class='display-flex'
         style='justify-content: space-between'>
      <div class='content-title'>项目经验</div>
      <div class='add-btn'
           v-if='addIntro.projectList.flag'
           @click="addProjectExperienceFun">
        <img src="@/assets/add-item.png"
             alt="">添加
      </div>
    </div>
    <el-form :inline='true'
             label-position='top'
             :class='projectExperience.length > 1 ? "demo-form-inline white-back-div" : "demo-form-inline"'
             v-for='(item, index) in projectExperience'
             :key='index'
             :model='projectExperience[index]'>
      <div class='delete-btn'
           v-if='projectExperience.length > 1'
           @click="() => delProjectExperienceFun(index)"><img src="@/assets/delete-item.png"
             alt="">删除</div>
      <el-form-item label='项目名称'>
        <el-input v-model='item.projectName'
                  placeholder='填写项目名称'></el-input>
      </el-form-item>
      <el-form-item label='项目角色'>
        <el-input v-model='item.projectRole'
                  placeholder='填写项目角色'></el-input>
      </el-form-item>
      <el-form-item label='项目链接'>
        <el-input v-model='item.projectUrl'
                  placeholder='填写项目链接'></el-input>
      </el-form-item>
      <el-form-item label='项目周期'
                    class='double-element-form-item'>
        <div class='display-flex'>
          <el-date-picker v-model='item.projectTimeStart'
                          type='month'
                          placeholder='选择年月'></el-date-picker>
          <div style='width: 40px; text-align: center; margin: 0 18px;'> 至 </div>
          <el-date-picker v-model='item.projectTimeEnd'
                          type='month'
                          placeholder='选择年月'></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label='项目描述'
                    class='single-item'>
        <el-input maxlength='160'
                  show-word-limit
                  type='textarea'
                  :rows='5'
                  v-model='item.projectDescribe'
                  placeholder='描述该项目，像招聘者展示您的项目经验'></el-input>
      </el-form-item>
      <el-form-item label='项目业绩'
                    class='single-item'>
        <el-input maxlength='160'
                  show-word-limit
                  type='textarea'
                  :rows='5'
                  v-model='item.projectPerformance'
                  placeholder='请填写内容'></el-input>
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item class='content-btn'>
        <el-button type='danger'
                   @click='() => editProjectExperienceFun(index)'>确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">
      <div style="text-align: center; margin-bottom: 20px">是否确认清空当前所有未保存的编辑？</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => {getProjectExperience();dialogVisible = false}">是</el-button>
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
import useProjectExperience from '../../hooks/useProjectExperience';

// 清空内容弹窗
const dialogVisible = ref(false);
const {
  projectExperience, getProjectExperience, addProjectExperience, editProjectExperience, delProjectExperienceById,
} = useProjectExperience();
getProjectExperience();

// 各可添加模块基础数据
const addIntro = reactive({
  projectList: {
    flag: false,
    info: {
      projectExperienceId: '',
      projectName: '',
      projectRole: '',
      projectUrl: '',
      projectTimeStart: '',
      projectTimeEnd: '',
      projectPerformance: '',
      projectDescribe: '',
    },
  },
});

// 添加项目经历
const addProjectExperienceFun = async () => {
  await addProjectExperience(addIntro.projectList.info);
  await getProjectExperience();
};

// 保存项目经历
const editProjectExperienceFun = async (index: any) => {
  const obj = { ...projectExperience.value[index] };
  // obj.projectTimeStart = dayjs(obj.projectTimeStart).valueOf();
  // obj.projectTimeEnd = dayjs(obj.projectTimeEnd).valueOf();

  // 最终校验数据是否填写完整，然后提交给全局
  // const msg = '请完整填写项目信息！';
  // await Promise.all(Object.keys(addIntro.projectList.info).map(async (validator: any) => {
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
  if (dayjs(obj.projectTimeStart).valueOf() > dayjs(obj.projectTimeEnd).valueOf()) {
    const projectMessage = '请正确填写项目时间！';
    ElMessage({
      message: h('p', null, [
        h('span', { style: 'color: #ED263D' }, projectMessage),
      ]),
    });
    return;
  }
  obj.projectTimeStart = dayjs(projectExperience.value[index].projectTimeStart).format('YYYY-MM');
  obj.projectTimeEnd = dayjs(projectExperience.value[index].projectTimeEnd).format('YYYY-MM');
  // 如果有id，是编辑，没有则是填写默认的第一条信息
  if (obj.projectExperienceId) {
    await editProjectExperience(obj);
  } else {
    await addProjectExperience(obj);
  }
  await getProjectExperience();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};

// 删除项目经历
const delProjectExperienceFun = async (index: any) => {
  await delProjectExperienceById({ projectExperienceId: projectExperience.value[index].projectExperienceId });
  await getProjectExperience();
};
</script>
