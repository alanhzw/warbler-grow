<!--
 * @Author: 一尾流莺
 * @Description:hr管理页面
 * @Date: 2021-10-28 09:56:57
 * @LastEditTime: 2021-11-19 18:59:35
 * @FilePath: \ired_resource\src\pages\business\hrManage\index.vue
-->
<template>
  <div class="hr-manage-box">
    <div class="part-top">
      <Search @get-company-hr-info-list="getCompanyHrInfoList"
              :company-info="companyInfo"></Search>
      <div class="add-hr-btn"
           @click="newHr">新建HR</div>
    </div>
    <div class="part-bottom">
      <Table :company-hr-info-list="companyHrInfoList"
             :company-id="companyInfo.companyId"
             @handler-disabled="handlerDisabled"
             @edit-hr="editHr"
             @handler-delete-hr="handlerDeleteHr"></Table>
    </div>
    <el-dialog v-model="dialogVisible"
               :close-on-click-modal="false"
               title=" "
               :before-close="handleClose">
      <Dialog @handler-add-hr="handlerAddHr"
              v-if="dialogVisible"
              :is-edit="isEdit"
              :edin-init-date="edinInitDate"
              @handler-edit-hr="handlerEditHr"
              :company-id="companyInfo.companyId"></Dialog>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import Dialog from './components/Dialog.vue';
import Table from './components/Table.vue';
import Search from './components/Search.vue';
import useGetCompanyInfo from './apis/getCompanyInfo';
import useAddCompanyHr from './apis/addCompanyHr';
import useDeleteHrInfo from './apis/deleteHrInfo';
import useEditCompanyHrInfo from './apis/editCompanyHrInfo';
import useGetCompanyHrInfoList from './apis/getCompanyHrInfoList';
import useEditCompanyHrStatus from './apis/editCompanyHrStatus';

const { disabledResult, editCompanyHrStatus } = useEditCompanyHrStatus();
const { companyInfo, getCompanyInfo } = useGetCompanyInfo();
const { addCompanyHrResult, addCompanyHr } = useAddCompanyHr();
const { deleteHrInfoResult, deleteHrInfo } = useDeleteHrInfo();
const { editCompanyHrInfoResult, editCompanyHrInfo } = useEditCompanyHrInfo();
const { companyHrInfoList, getCompanyHrInfoList } = useGetCompanyHrInfoList();

// 是否显示弹窗
const dialogVisible = ref(false);

// 关闭弹窗的回调
const handleClose = (done: any) => {
  done();
};

// 修改弹窗是否可见
const changeDialogVisible = () => {
  dialogVisible.value = !dialogVisible.value;
};

const edinInitDate = ref({
  name: '',
  position: '',
  phone: '',
  url: '',
  hrInfoId: '',
});

// 新建hr
const newHr = () => {
  dialogVisible.value = true;
  edinInitDate.value = {
    name: '',
    position: '',
    phone: '',
    url: '',
    hrInfoId: '',
  };
};

// 新建hr  提交保存
const handlerAddHr = async (params: any) => {
  await addCompanyHr(params);
  ElMessage({
    message: '保存成功！',
    type: 'success',
  });
  await changeDialogVisible();
  await getCompanyHrInfoList({
    companyId: params.companyId,
  });
};

// 提交删除
const handlerDeleteHr = async (id: any) => {
  await deleteHrInfo(id);
  ElMessage({
    message: '删除成功！',
    type: 'success',
  });
  await getCompanyHrInfoList({
    companyId: companyInfo.value.companyId,
  });
};

// 提交 禁用
const handlerDisabled = async (params: any) => {
  await editCompanyHrStatus({
    hrInfoId: params.id,
    status: params.status === '0' ? '1' : '0',
  });
  ElMessage({
    message: params.status === '1' ? '禁用成功！' : '启用成功！',
    type: 'success',
  });
  await getCompanyHrInfoList({
    companyId: companyInfo.value.companyId,
  });
};

const isEdit = ref(false);

// 编辑hr
const editHr = (params: any) => {
  isEdit.value = true;
  edinInitDate.value.name = params.name;
  edinInitDate.value.position = params.position;
  edinInitDate.value.phone = params.phone;
  edinInitDate.value.url = params.avatarUrl;
  edinInitDate.value.hrInfoId = params.id;
  dialogVisible.value = true;
};

// 编辑hr  提交保存
const handlerEditHr = async (params: any) => {
  await editCompanyHrInfo(params);
  ElMessage({
    message: '编辑成功！',
    type: 'success',
  });
  await changeDialogVisible();
  await getCompanyHrInfoList({
    companyId: params.companyId,
  });
};

// 初始化
onMounted(async () => {
  await getCompanyInfo();
  await getCompanyHrInfoList({
    companyId: companyInfo.value.companyId,
  });
});

</script>

<style lang='scss'>
.hr-manage-box {
  .part-top {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    .add-hr-btn {
      width: 120px;
      background-color: #ed263d;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      line-height: 46px;
      height: 46px;
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
    }
  }
  .part-bottom {
    margin-top: 30px;
  }
  .el-dialog {
    width: 818px;
    height: 446px;
    background: #ffffff;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    padding: 20px 60px 60px 60px;
    .el-dialog__body {
      padding: 0px;
    }
  }
}
</style>
