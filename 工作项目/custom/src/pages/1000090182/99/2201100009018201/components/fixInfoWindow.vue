<template>
  <div class="wrapper">
    <div class="fixInfo-view">
      <div class="address-formData">
        <input
          class="formData-receive"
          type="text"
          v-model="formData.receiver"
          maxlength="10"
          placeholder="姓名"
        />
        <input
          class="formData-phone"
          type="text"
          v-model="formData.phone"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
          placeholder="手机号码"
        />
      </div>
      <div class="submit-btn" @click="submitCheckOut"></div>
    </div>
    <div class="close-btn" @click="closeDialog"></div>
  </div>
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
  // giftRecordId: '',
  receiver: '',
  phone: '',
});

// *************************************************************

const emit = defineEmits(['closeFix']);
const closeDialog = () => {
  emit('closeFix', 'fixInfoDialog');
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
  } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(formData.value.phone))) {
    Toast('请输入正确的手机号');
  } else {
    emit('commitInfo', formData);
  }
};
</script>

<style lang="scss">
.wrapper{
  padding-top: 1rem;
}
.fixInfo-view{
  background: url("../assets/fix-View.png") no-repeat;
  background-size: 100%;
  width: 5.67rem;
  height: 6.81rem;
  position: relative;
  display: flex;
  justify-content: center;

  .submit-btn{
    width: 5.1rem;
    height: 1rem;
    position: absolute;
    top: 5.15rem;
    left: .3rem;
  }
  .address-formData {
    position: relative;
    /* top: 2.88rem; */
    /* left: 1.85rem; */
    width: 4.8rem;
    height: 1.4rem;
    text-align: end;
    margin-top: 1.8rem;

    >input {
      border: none;
      background: none;
      color: #000;
      font-size: 0.3rem;
    }
    .formData-receive{
      position: absolute;
      left: 0;
      top: 0.1rem;
      width: 100%;
      height: 0.5rem;
      line-height: .5rem;
    }
    .formData-phone{
      position: absolute;
      left: 0;
      top: 0.95rem;
      width: 100%;
      height: 0.5rem;
      line-height: .5rem;
    }
    .add-select{
      position: absolute;
      width: 3.3rem;
      height: 1.1rem;
      top: 1.5rem;

      >input {
        border: none;
        background: none;
        color: #000;
        font-size: 0.2rem;
      }
      .select-province{
        position: absolute;
        height: .3rem;
        left: 0;
        top: .08rem;
      }
      .select-city{
        position: absolute;
        height: 0.3rem;
        left: 1.95rem;
        top: 0.08rem;
      }
      .select-district{
        position: absolute;
        height: 0.3rem;
        left: 0;
        top: .65rem;
      }
    }
    .select-address{
      position: absolute;
      left: 0;
      top: 2.85rem;
      width: 100%;
      height: 0.3rem;
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
