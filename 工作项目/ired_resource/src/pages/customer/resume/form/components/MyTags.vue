<!--
 * @Descripttion: 编辑在线简历-个人标签
 * @Author: yang chenglin
 * @Date: 2021-11-05 19:19:29
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:51:18
-->
<template>
  <div>
    <div class="display-flex"
         style="justify-content: space-between;">
      <div class='content-title'>我的标签</div>
      <div class='content-title'
           style="display: flex; align-items: center; color: #222222; font-size: 14px; cursor: pointer"
           @click="editLabel = !editLabel"><img src="@/assets/edit-icon.png"
             alt=""
             style="margin-right: 5px"> 编辑</div>
    </div>
    <div class="label-content">
      <div v-for="(it, index) in myTags"
           :key="it.value"
           class="label-item active">
        {{resumeLabel.find(i => i.value === it.tagCode)?.text}}
        <img src="@/assets/close-icon.png"
             alt=""
             @click="myTags.splice(index, 1)">
      </div>
    </div>
    <div v-if="editLabel"
         class="edit-label-content">
      <div v-for="it in resumeLabel"
           :key="it.value"
           :class='myTags.findIndex((i: any) => i.tagCode === it.value) > -1 ? "label-item active" : "label-item"'
           @click="setLabelList(it)">
        {{it.text}}</div>
    </div>
    <div class='content-btn'
         style='margin: 20px 30px'>
      <el-button type='danger'
                 @click='addMyTagFun'>确认</el-button>
      <el-button plain
                 @click="dialogVisible = true">取消</el-button>
    </div>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">
      <div style="text-align: center; margin-bottom: 20px">是否确认清空当前所有未保存的编辑？</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => {getMyTags();dialogVisible = false}">是</el-button>
        <el-button plain
                   @click="dialogVisible = false">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import useMyTags from '../../hooks/useMyTags';
// 清空内容弹窗
const dialogVisible = ref(false);
/**
 * 个人标签
 */
const {
  resumeLabel, getResumeLabel, myTags, getMyTags, addMyTag,
} = useMyTags();
getResumeLabel();
getMyTags();

// const myTags = ref([...myTags.value]);

// 是否展示标签编辑部分
const editLabel = ref(false);
// 设置标签
const setLabelList = (obj: Object) => {
  const index = myTags.value.findIndex((i: any) => i.tagCode === obj.value);
  if (index > -1) {
    myTags.value.splice(index, 1);
  } else {
    myTags.value.push({ tagName: obj.text, tagCode: obj.value });
  }
};
const addMyTagFun = async () => {
  await addMyTag({ tags: myTags.value.filter((item) => myTags.value.indexOf((it: any) => it.tagCode === item.tagCode) < 0) });
  await getMyTags();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};
</script>
