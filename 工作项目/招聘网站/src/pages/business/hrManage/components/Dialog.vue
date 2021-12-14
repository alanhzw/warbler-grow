<!--
 * @Author: 一尾流莺
 * @Description:弹窗
 * @Date: 2021-11-10 10:28:22
 * @LastEditTime: 2021-11-23 09:29:39
 * @FilePath: \ired_resource\src\pages\business\hrManage\components\Dialog.vue
-->
<template>
  <div class="hrManage-dialog-content">
    <div class="head">新增HR</div>
    <div class="form">
      <div class="form-name">
        <p class="form-label">HR姓名</p>
        <el-input class="form-input"
                  v-model="name"
                  maxlength="20"
                  placeholder="请输入姓名" />
      </div>
      <div class="form-job">
        <p class="form-label">HR职位</p>
        <el-input class="form-input"
                  v-model="position"
                  maxlength="10"
                  placeholder="请输入职位" />
      </div>
      <div class="form-phone">
        <p class="form-label">手机号</p>
        <el-input class="form-input"
                  v-model="phone"
                  maxlength="11"
                  placeholder="请输入手机号" />
      </div>
      <div class="form-header">
        <p class="form-label">上传头像</p>
        <div class="form-upload">
          <Upload ref='upload'
                  :url='url'></Upload>

        </div>
        <p class="form-tip">仅支持JPG格式</p>
      </div>
    </div>
    <div class="btn-container">
      <el-button type="text"
                 class="dialog-save"
                 size="small"
                 @click="handlerSave">保存</el-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, defineProps, onMounted, defineEmits,
} from 'vue';
import { ElMessage } from 'element-plus';
import Upload from '../../../../components/Upload/Upload.vue';

const name = ref('');
const position = ref('');
const phone = ref('');
const upload = ref(null);
const url = ref('');
const props = defineProps({

  companyId: {
    type: String,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  edinInitDate: {
    type: Object,
    default: () => ({
      name: '',
      position: '',
      phone: '',
      url: '',
    }),
  },
});

const emit = defineEmits(['handlerAddHr', 'handlerEditHr']);
const handlerSave = () => {
  if (!name.value) {
    ElMessage({
      message: '请输入HR姓名',
      type: 'error',
    });
    return;
  }

  if (!position.value) {
    ElMessage({
      message: '请输入HR职位',
      type: 'error',
    });
    return;
  }
  if (!phone.value) {
    ElMessage({
      message: '请输入手机号',
      type: 'error',
    });
    return;
  }
  if (!name.value) {
    ElMessage({
      message: '请输入HR姓名',
      type: 'error',
    });
    return;
  }
  if (!url.value && !upload.value.imageUrl) {
    ElMessage({
      message: '请上传头像',
      type: 'error',
    });
    return;
  }
  if (props.isEdit) {
    emit('handlerEditHr', {
      name: name.value,
      position: position.value,
      phone: phone.value,
      // @ts-ignore
      avatarUrl: upload.value.imageUrl || url.value,
      companyId: props.companyId,
      hrInfoId: props.edinInitDate.hrInfoId,
    });
  } else {
    emit('handlerAddHr', {
      name: name.value,
      position: position.value,
      phone: phone.value,
      // @ts-ignore
      avatarUrl: upload.value.imageUrl,
      companyId: props.companyId,
    });
  }
};

onMounted(() => {
  if (props.isEdit) {
    name.value = props.edinInitDate.name;
    position.value = props.edinInitDate.position;
    phone.value = props.edinInitDate.phone;
    url.value = props.edinInitDate.url;
  }
});

</script>

<style lang='scss'>
.hrManage-dialog-content {
  .head {
    width: 82px;
    height: 34px;
    font-size: 24px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 28px;
  }
  .btn-container {
    width: 100%;
    text-align: center;
  }
  .form {
    width: 100%;
    height: 256px;
    position: relative;
    margin-top: 30px;
    .form-label {
      position: absolute;
      width: 130px;
      height: 14px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 12px;
    }

    .form-input {
      position: absolute;
      width: 330px;
      height: 46px;
      top: 24px;
      left: 0;
      .el-input__inner {
        background-color: #f8f8f8;
        border: none;
        border-radius: 0px 0px 0px 0px;
        height: 46px;
      }
    }
    .form-name {
      position: absolute;
      width: 330px;
      height: 70px;
      top: 0;
      left: 0;
    }
    .form-job {
      position: absolute;
      width: 330px;
      height: 70px;
      top: 0;
      right: 0;
    }
    .form-phone {
      position: absolute;
      width: 330px;
      height: 70px;
      left: 0;
      top: 100px;
    }
    .form-header {
      position: absolute;
      width: 330px;
      height: 70px;
      right: 0px;
      top: 100px;
      .form-head-img {
        position: absolute;
        top: 24px;
        width: 48px;
        height: 48px;
        border: 1px solid #000;
      }
      .form-tip {
        position: absolute;
        top: 90px;
        width: 172px;
        height: 14px;
        font-size: 14px;
        font-family: PingFang SC-Light, PingFang SC;
        font-weight: 300;
        color: #999999;
        line-height: 12px;
      }
    }
        .form-upload{
        position: absolute;
        top: 25px;
        left: 0px;
    }
  }
  .dialog-save {
    width: 354px;
    height: 46px;
    background: #ed263d;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    font-size: 14px;
    color: #fff;
  }
}
</style>
