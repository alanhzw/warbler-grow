<!--
 * @Descripttion: 企业端 申请岗位
 * @Author: yang chenglin
 * @Date: 2021-10-21 19:12:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-20 13:49:05
-->
<template>
  <div class="dialog-root">
    <div class="dia-title">申请岗位名称</div>
    <el-form :inline='true'
             label-position='top'
             :model='applyJobInfo'
             class='demo-form-inline'>
      <el-form-item label='岗位分类'
                    style="width: calc(50% - 15px)">
        <el-select filterable
                   v-model='applyJobInfo.classificationValue'
                   placeholder='请选择岗位分类'>
          <el-option v-for='item in jobStatus'
                     :key='item.value'
                     :label='item.title'
                     :value='item.value'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='岗位名称'
                    style="width: calc(50% - 15px)">
        <el-input v-model='applyJobInfo.applyClassifyName'
                  placeholder='请输入将申请的岗位名称'></el-input>
      </el-form-item>
      <el-form-item label='申请理由'
                    style="width: 100%">
        <el-input type='textarea'
                  :rows='8'
                  v-model='applyJobInfo.applyReason'
                  placeholder='请输入申请理由'></el-input>
      </el-form-item>
      <el-form-item class='content-btn'>
        <el-button type='danger'
                   @click="submitForm">提交</el-button>
        <el-button plain
                   @click="closeDia">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import useJobStatus from '../../../apis/useJobStatus';
import useAddClassify from '../../../apis/addClassify';

const { jobStatus, getJobStatus } = useJobStatus();
const { addClassify } = useAddClassify();

const applyJobInfo = ref({
  applyClassifyName: '',
  classificationValue: '',
  applyReason: '',
});

const emit = defineEmits(['closeFun']);

const closeDia = () => {
  applyJobInfo.value = {
    applyClassifyName: '',
    classificationValue: '',
    applyReason: '',
  };
  emit('closeFun');
};

// 提交申请
const submitForm = async () => {
  if (!applyJobInfo.value.classificationValue) {
    ElMessage({
      message: '请选择岗位分类',
      type: 'error',
    });
    return;
  }
  if (!applyJobInfo.value.applyClassifyName) {
    ElMessage({
      message: '请输入岗位名称',
      type: 'error',
    });
    return;
  }
  if (!applyJobInfo.value.applyReason) {
    ElMessage({
      message: '请输入申请理由',
      type: 'error',
    });
    return;
  }
  await addClassify(applyJobInfo.value);
  closeDia();
  ElMessage({
    message: '操作成功！',
    type: 'success',
  });
};

// 获取岗位名称
onMounted(async () => {
  await getJobStatus();
});

</script>

<style lang="scss">
.dialog-root {
  color: #222222;
  font-family: PingFang SC-Regular, PingFang SC;
  .dia-title {
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
  }
  .el-form {
    justify-content: space-between;
    .el-form-item__label {
      font-size: 14px;
      color: #222222;
    }
    .el-select {
      width: 100%;
    }
    .el-input__inner, .el-textarea__inner {
      background: #f8f8f8;
    }
    .content-btn {
      width: 100%;
      margin-top: 30px;
      text-align: center;
      .el-button {
        width: 120px;
        &.el-button--danger {
          background: #ED263D;
        }
      }
    }
  }
}
</style>
