<template>
  <div class="wrapper">
    <div class="fixInfo-view">
      <div class="address-formData">
        <input
          class="formData-receive"
          type="text"
          v-model="formData.receiver"
          maxlength="10"
        />
        <input
          class="formData-phone"
          type="text"
          v-model="formData.phone"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
        />
        <input
          class="add-select"
          type="text"
          v-model="addressCode"
          readonly="readonly"
          @click="addressSelects = true"
        />
        <input
          class="formData-address"
          type="text"
          v-model="formData.address"
          maxlength="30"
        />
        <input
          class="formData-postalCode"
          type="text"
          v-model="formData.postalCode"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="6"
        />
      </div>
      <div class="submit-btn" @click="submitCheckOut"></div>
    </div>
    <div class="close-btn" @click="closeDialog"></div>
  </div>
  <Popup v-model:show="addressSelects" position="bottom" teleport="body">
    <Area
      title="请输入详细地址"
      :area-list="areaList"
      @confirm="confirmAddress"
      @cancel="onCancel"
    />
  </Popup>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import {
  Popup, Toast, Overlay, Checkbox, Area,
} from 'vant';
import { areaList } from '@vant/area-data';

// *************************************************************
// 完善信息内容
const formData = ref({
  receiver: '',
  phone: '',
  address: '',
  postalCode: '',
  province: '',
  city: '',
  district: '',
});
// 省市区地址
const addressCode = ref('');
// 地址上拉弹窗
const addressSelects = ref(false);

// *************************************************************

const emit = defineEmits(['closeFix']);
const closeDialog = () => {
  emit('closeFix', 'fixInfoDialog');
};
// 确认三联地址信息
const confirmAddress = (addressItemList: any[]) => {
  formData.value.province = addressItemList[0].name;
  formData.value.city = addressItemList[1].name;
  formData.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item) => item.name).join('/');
  addressSelects.value = false;
};
// 关闭三联地址框
const onCancel = () => {
  addressSelects.value = false;
};
// 信息校验
const submitCheckOut = () => {
  // 特殊字符
  const spcWord = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  // 空格
  const whitespace = /\s+/g;
  // 表情符号
  const faceWord = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  if (!formData.value.receiver) {
    Toast('姓名不能为空');
  } else if (spcWord.test(formData.value.receiver)) {
    Toast('姓名不能包含特殊符号');
  } else if (faceWord.test(formData.value.receiver)) {
    Toast('姓名不能包含表情符号');
  } else if (whitespace.test(formData.value.receiver)) {
    Toast('姓名不能包含空格');
  } else if (!formData.value.phone) {
    Toast('电话不能为空');
  } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(formData.value.phone))) {
    Toast('请输入正确的手机号');
  } else if (!formData.value.province) {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('详细地址不能为空');
  } else if (faceWord.test(formData.value.address)) {
    Toast('详细地址不能包含表情符号');
  } else if (whitespace.test(formData.value.address)) {
    Toast('详细地址不能包含空格');
  } else if (!formData.value.postalCode) {
    Toast('邮政编码不能为空');
  } else if (!/^\d{6}$/.test(formData.value.postalCode)) {
    Toast('请填写正确的邮编');
  } else {
    emit('commitInfo', formData);
  }
};
</script>

<style lang="scss">
.fixInfo-view{
  background: url("../assets/fixWin.png") no-repeat;
  background-size: 100%;
  width: 4.8rem;
  height: 7.5rem;
  position: relative;
  display: flex;
  justify-content: center;

  .submit-btn{
    width: 2.75rem;
    height: 0.73rem;
    position: absolute;
    top: 5.7rem;
    left: 1.03rem;
  }
  .address-formData {
    position: relative;
    width: 2.3rem;
    height: 4.2rem;
    text-align: end;
    margin-top: 1.1rem;
    margin-left: .8rem;

    >input {
      border: none;
      background: none;
      color: #000;
      font-size: 0.26rem;
      width: 95%;
      height: 0.4rem;
      display: flex;
      align-items: center;
    }
    .formData-receive{
      position: absolute;
      left: 0;
      top: .08rem;
    }
    .formData-phone{
      position: absolute;
      left: 0;
      top: 0.95rem;
    }
    .add-select{
      position: absolute;
      top: 1.85rem;
      left: 0;
    }
    .formData-address{
      position: absolute;
      left: 0;
      top: 2.75rem;
    }
    .formData-postalCode{
      position: absolute;
      left: 0;
      top: 3.65rem;
    }
  }
}
.close-btn {
  width: 0.42rem;
  height: 0.42rem;
  position: absolute;
  bottom: 0;
  background: url("../assets/closeBtn.png") no-repeat;
  background-size: 100%;
}
</style>
