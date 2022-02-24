<!--
 * @Descripttion: 企业端 申请职位
 * @Author: yang chenglin
 * @Date: 2021-10-21 19:12:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-20 14:20:35
-->
<template>
  <div class="dialog-root">
    <div class="dia-title">申请职位名称</div>
    <el-form :inline='true'
             label-position='top'
             :model='applyJobInfo'
             class='demo-form-inline'>
      <el-form-item label='岗位名称'
                    style="width: calc(50% - 15px)">
        <el-cascader v-model="applyJobInfo.classificationValueMap"
                     :show-all-levels="false"
                     @change="handleChangeJob"
                     placeholder="请选择岗位名称"
                     :props="{
              expandTrigger: 'hover',
              value: 'classificationValue',
              label: 'classificationName',
              children: 'classifies',
            }"
                     :options="queryAllList"></el-cascader>
      </el-form-item>
      <el-form-item label='职位名称'
                    style="width: calc(50% - 15px)">
        <el-input v-model='applyJobInfo.applyPostName'
                  placeholder='请输入将申请的职位名称'></el-input>
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
import useAddPost from '../../../apis/addPost';
import useQueryAll from '../../../apis/queryAllClassifyList';

const { queryAllList, queryAll } = useQueryAll();

const { addPost } = useAddPost();

const applyJobInfo = ref({
  classificationValueMap: [],
  applyPostName: '',
  classificationValue: '',
  applyReason: '',
  classifyCode: '',
});

const emit = defineEmits(['closeFun']);

// 切换岗位名称时候调用获取职位名称
const handleChangeJob = async (value: any) => {
  const [value0, value1] = value;
  applyJobInfo.value.classificationValue = value0;
  applyJobInfo.value.classifyCode = value1;
};

const closeDia = () => {
  emit('closeFun');
  applyJobInfo.value = {
    classificationValueMap: [],
    applyPostName: '',
    classificationValue: '',
    applyReason: '',
    classifyCode: '',
  };
};

const submitForm = async () => {
  if (!applyJobInfo.value.classificationValue) {
    ElMessage({
      message: '请选择岗位名称',
      type: 'error',
    });
    return;
  }
  if (!applyJobInfo.value.applyPostName) {
    ElMessage({
      message: '请输入职位名称',
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
  await addPost(applyJobInfo.value);
  closeDia();
  ElMessage({
    message: '操作成功！',
    type: 'success',
  });
};

onMounted(async () => {
  await queryAll();
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
  .el-cascader{
    width: 100%;
  }
}
</style>
