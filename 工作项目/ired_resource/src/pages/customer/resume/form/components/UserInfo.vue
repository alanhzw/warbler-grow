<!--
 * @Descripttion: 编辑在线简历-个人信息
 * @Author: yang chenglin
 * @Date: 2021-11-05 19:55:44
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-30 20:51:52
-->
<template>
  <div>
    <div class='content-title'>编辑个人信息</div>
    <el-form :inline='true'
             label-position='top'
             :model='userInfo'
             class='demo-form-inline'>
      <!-- 空div占位，为了样式生效，求别删 -->
      <div></div>
      <el-form-item label='姓名'>
        <div class="display-flex upload-root">
          <Upload ref='upload'
                  :url="userInfo.headImageUrl"></Upload>
          <el-input maxlength='10'
                    show-word-limit
                    type='text'
                    placeholder='您的名字'
                    v-model='userInfo.realName'>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item label='当前求职状态'>
        <el-select v-model='userInfo.cvJobHuntingStatus'
                   placeholder='求职状态'>
          <el-option v-for='item in jobStatus'
                     :key='item.value'
                     :label='item.text'
                     :value='item.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='性别'>
        <div class='base-info-sex display-flex'>
          <div style='margin-right: 5px'
               :class="userInfo.sex === '1' ? 'active' : ''"
               @click="userInfo.sex = '1'">男
          </div>
          <div style='margin-left: 5px'
               :class="userInfo.sex !== '1' ? 'active' : ''"
               @click="userInfo.sex = '0'">女
          </div>
        </div>
      </el-form-item>
      <el-form-item label='电话'>
        <el-input v-model='userInfo.phoneNumber'
                  maxlength="11"
                  placeholder='您的电话'></el-input>
      </el-form-item>
      <el-form-item label='生日'>
        <el-date-picker placeholder='您的生日'
                        v-model="userInfo.birthday"
                        type="date" />
      </el-form-item>
      <el-form-item label='邮箱'>
        <el-input maxlength='30'
                  show-word-limit
                  v-model='userInfo.mail'
                  placeholder='您的邮箱'></el-input>
      </el-form-item>
      <el-form-item label='工作年限'>
        <el-select v-model='userInfo.workingYears'
                   placeholder='请选择工作年限'>
          <el-option v-for='item in workTime'
                     :key='item.value'
                     :label='item.text'
                     :value='item.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='&nbsp;'
                    class='content-btn'>
        <el-button type='danger'
                   @click='saveMpUserInfoFun'>确认</el-button>
        <el-button plain
                   @click="dialogVisible = true">取消</el-button>
      </el-form-item>
    </el-form>
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
import { ref, h, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import Upload from '@/components/Upload/Upload.vue';
import useWorkTime from '../../hooks/useWorkTime';
import useJobStatus from '../../hooks/useJobStatus';
import useUserInfo from '../../hooks/useUserInfo';

// 当前求职状态
const { jobStatus, getJobStatus } = useJobStatus();
getJobStatus();
// 工作年限
const { workTime, getWorkTime } = useWorkTime();
getWorkTime();
// 清空内容弹窗
const dialogVisible = ref(false);
/**
 * 基础信息模块
 */
const {
  userInfo,
  getMpUserInfo,
  saveMpUserInfo,
} = useUserInfo();

const upload = ref(null);

getMpUserInfo();

const saveMpUserInfoFun = async () => {
  const obj = { ...userInfo.value };
  obj.headImageUrl = upload.value.imageUrl || obj.headImageUrl;

  // 字段暂时不用
  // obj.cvWorkTimeStart = userInfo.value.workTime[0];
  // obj.cvWorkTimeEnd = userInfo.value.workTime[1];

  // if (obj.cvWorkTimeStart > obj.cvWorkTimeEnd) {
  //   const timeMessage = '请正确填写工作时间！';
  //   ElMessage({
  //     message: h('p', null, [
  //       h('span', { style: 'color: #ED263D' }, timeMessage),
  //     ]),
  //   });
  //   return;
  // }

  if (obj.mail) {
    const msg = '请正确填写邮箱！';
    const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(obj.mail)) {
      ElMessage({
        message: h('p', null, [
          h('span', { style: 'color: #ED263D' }, msg),
        ]),
      });
      return;
    }
  }

  await saveMpUserInfo(obj);
  await getMpUserInfo();
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
};
</script>

<style lang="scss">
.upload-root {
  .upload-hr-manager {
    .no-img {
      background: #f8f8f8;
    }
  }
  .el-input {
    width: calc(100% - 51px);
    margin-left: 5px;
  }
}
</style>
