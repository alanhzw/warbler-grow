<!--
 * @Descripttion: 编辑在线简历-个人优势
 * @Author: yang chenglin
 * @Date: 2021-11-05 19:59:31
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:50:46
-->
<template>
  <div>
    <div class='content-title'>个人优势</div>
    <el-input maxlength='140'
              show-word-limit
              type='textarea'
              :rows='4'
              v-model='userInfo.cvAdvantage'
              placeholder='个人优势'></el-input>
    <div class='content-btn'
         style='margin: 20px 30px'>
      <el-button type='danger'
                 @click='saveAdvantageFun'>确认</el-button>
      <el-button plain
                 @click="dialogVisible = true">取消</el-button>
    </div>
    <el-dialog v-model="dialogVisible"
               :before-close="() => dialogVisible = false">
      <div style="text-align: center; margin-bottom: 20px">是否确认清空当前所有未保存的编辑？</div>
      <div style="text-align: center">
        <el-button type='danger'
                   @click="() => {getMpUserInfo();dialogVisible = false}">是</el-button>
        <el-button plain
                   @click="dialogVisible = false">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import useUserInfo from '../../hooks/useUserInfo';
/**
 * 基础信息模块
 */
const {
  userInfo,
  getMpUserInfo,
  saveCvAdvantage,
} = useUserInfo();

getMpUserInfo();

// 清空内容弹窗
const dialogVisible = ref(false);

const saveAdvantageFun = async () => {
  await saveCvAdvantage({ cvAdvantage: userInfo.value.cvAdvantage });
  await getMpUserInfo();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};
</script>
