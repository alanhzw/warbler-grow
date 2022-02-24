<template>
  <div>
    <!-- 完善信息弹窗 -->
    <div class="box">
      <img src="../assets/img/perfect-infomation-dialog.png"
           class="popup">
      <div class="dialog-commit-fillin">
        <input maxlength="11" type="tel" v-model="perfectInfo.phone" placeholder="请输入手机号"/>
        <input maxlength="10" v-model="perfectInfo.userName" placeholder="请输入姓名"/>
        <input :value="perfectInfo.babyBirthday" @click="selectType='birth',selectSwitch=true" readonly
               placeholder="请选择宝宝生日"/>
        <input maxlength="2" v-model="perfectInfo.babySex" @click="selectType='sex',selectSwitch=true"
               placeholder="请选择宝宝性别" readonly/>
        <input maxlength="10" v-model="perfectInfo.babyNick" placeholder="请输入宝宝昵称"/>
      </div>

      <div class="upload">
        <input @change="toUpload" class="upload-input" readonly type="file"
               accept="image/png,image/gif,image/jpeg"/>
        <div class="img-size" v-if="perfectInfo.babyImage">
          <img :src="perfectInfo.babyImage"/>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="close-btn" style="bottom: 1.2rem"
           @click='getCommitCheck()'></div>
      <!-- 关闭按钮 -->
      <div class="close-btn"
           @click="closeDialog()"></div>
    </div>

    <!--底部地址选择弹出层-->
    <van-popup v-model:show="selectSwitch" position="bottom" :style="{ height: '40%' }" teleport="body">
      <van-datetime-picker
        v-if="selectType==='birth'"
        v-model="currentDate"
        type="date"
        title="选择宝宝生日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="selectConfirm"
        @cancel="selectCancel"
      />
      <van-picker
        title="选择宝宝性别"
        v-if="selectType==='sex'"
        show-toolbar
        :columns="babySexArr"
        @confirm="selectConfirm"
        @cancel="selectCancel"
      />
    </van-popup>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';
import { Popup as vanPopup, Toast, DatetimePicker as vanDatetimePicker, Picker as vanPicker } from 'vant';
import { config } from '@vue/test-utils';
import { cjwxRequest } from '@/utils/service';

// const props = defineProps('');
const emit = defineEmits(['closeDialog', 'perfectInfo']);

const minDate = new Date(2000, 0, 1);
const maxDate = new Date(2025, 12, 1);
const currentDate = new Date();

const selectType = ref('');
const selectSwitch = ref(false);
const babySexArr = ['男', '女', '未知'];

const perfectInfo = ref({
  phone: '',
  userName: '',
  babyBirthday: '',
  babySex: '',
  babyNick: '',
  babyImage: '',
});

const closeDialog = () => {
  emit('closeDialog', 'commitDialog');

  perfectInfo.value.phone = '';
  perfectInfo.value.userName = '';
  perfectInfo.value.babyBirthday = '';
  perfectInfo.value.babySex = '';
  perfectInfo.value.babyNick = '';
  perfectInfo.value.babyImage = '';
};

const toUpload = (e: any) => {
  const file = e.target.files[0];
  const formData = new FormData();
  if (file.size > 1000 * 1024) {
    Toast('上传图片不能超过1MB');
    return;
  }
  formData.append('file', file);
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/qqstar/perfectInfo/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => {
    if (res.result) {
      perfectInfo.value.babyImage = res.data;
      Toast('上传图片成功！');
    } else {
      Toast(res.errorMessage);
    }
  });
};

const getCommitCheck = () => {
  const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
  if (!perfectInfo.value.phone) {
    Toast('请输入手机号');
  } else if (!phoneReg.test(perfectInfo.value.phone)) {
    Toast('请输入正确的手机号');
  } else if (!perfectInfo.value.userName) {
    Toast('请输入姓名');
  } else if (!perfectInfo.value.babyBirthday) {
    Toast('请选择宝宝生日');
  } else if (!perfectInfo.value.babySex) {
    Toast('请选择宝宝性别');
  } else if (!perfectInfo.value.babyNick) {
    Toast('请输入宝宝昵称');
  } else {
    emit('perfectInfo', perfectInfo);
  }
};

const selectConfirm = (info: any) => {
  if (selectType.value === 'birth') {
    const year = `${info.getFullYear()}`;
    const month = `${info.getMonth() + 1}`;
    const date = `${info.getDate()}`;
    console.log([year, month, date].join('-'));

    perfectInfo.value.babyBirthday = [year, month, date].join('-');
  } else {
    perfectInfo.value.babySex = info;
  }
  selectSwitch.value = false;
};

const selectCancel = (info: any) => {
  selectSwitch.value = false;
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;

  }

  img {
    margin: 0 auto;
  }

  .upload {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/171025/20/21891/1240/6179072bE9a528c6c/ffe948bf32ce980f.png");
    background-size: 100% 100%;
    width: 2.7rem;
    height: 1.6rem;
    position: absolute;
    bottom: 1.75rem;
    left: 2.4rem;

    .upload-input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0
    }

    .img-size {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }

  .dialog-commit-fillin {
    position: absolute;
    top: 1.7rem;
    left: 2.5rem;
    width: 45%;

    input {
      width: 100%;
      height: 0.43rem;
      font-size: 0.25rem;
      margin: 0.1rem 0;
      padding: 0.033rem 0;
      background: unset !important;
      border: unset !important;
      text-align: left;
    }
  }
}

.popup {
  background: unset !important;
}
</style>
