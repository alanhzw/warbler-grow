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
        <div @click="addressSelects = true" class="add-select">
          <input
            class="select-province"
            style="width: 1.2rem;"
            type="text"
            v-model="formData.province"
            readonly="readonly"
          />
          <input
            class="select-city"
            style="width: 1.3rem;"
            type="text"
            v-model="formData.city"
            readonly="readonly"
          />
          <input
            class="select-district"
            style="width: 3.2rem"
            type="text"
            v-model="formData.district"
            readonly="readonly"
          />
        </div>

        <input
          class="select-address"
          type="text"
          v-model="formData.address"
          maxlength="30"
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
  // giftRecordId: '',
  receiver: '',
  phone: '',
  address: '',
  // postalCode: '',
  // personalID: '',
  province: '',
  city: '',
  district: '',
});
// 省市区地址
const addressCode = ref('');
// 地址上拉弹窗
const addressSelects = ref(false);

// *************************************************************

const props = defineProps({
  currentData: Array,
});
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
  } else {
    emit('commitInfo', formData);
  }
};
// eslint-disable-next-line vue/no-setup-props-destructure
formData.value.receiver = props.currentData.receiver;
// eslint-disable-next-line vue/no-setup-props-destructure
formData.value.phone = props.currentData.phone;
// eslint-disable-next-line vue/no-setup-props-destructure
formData.value.address = props.currentData.address;
// eslint-disable-next-line vue/no-setup-props-destructure
formData.value.province = props.currentData.province;
// eslint-disable-next-line vue/no-setup-props-destructure
formData.value.city = props.currentData.city;
// eslint-disable-next-line vue/no-setup-props-destructure
formData.value.district = props.currentData.district;
</script>

<style lang="scss">
.fixInfo-view{
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/163044/23/21476/90303/61b1aa33E212d3c7c/aed86e085eb5078d.png") no-repeat;
  background-size: 100%;
  width: 6.13rem;
  height: 9rem;
  position: relative;
  display: flex;
  justify-content: center;

  .submit-btn{
    width: 4rem;
    height: 0.73rem;
    position: absolute;
    top: 6.3rem;
    left: 1.03rem;
  }
  .address-formData {
    position: relative;
    /* top: 2.88rem; */
    /* left: 1.85rem; */
    width: 3.7rem;
    height: 3.4rem;
    text-align: end;
    margin-top: 2.8rem;
    margin-left: 1.2rem;

    >input {
      border: none;
      background: none;
      color: #000;
      font-size: 0.2rem;
    }
    .formData-receive{
      position: absolute;
      left: 0;
      top: 0.15rem;
      width: 100%;
      height: 0.3rem;
    }
    .formData-phone{
      position: absolute;
      left: 0;
      top: .85rem;
      width: 100%;
      height: 0.3rem;
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
