<!--
 * @Author: 一尾流莺
 * @Description:立即领取弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-10-29 17:29:03
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupAddAddress.vue
-->
<template>
  <div class="add-address-popup">
    <img src="../assets/popup-add-address.png"
         class="popup-content" />
    <div class="add-address-content">
      <input type="text"
             v-model="state.receiver"
             placeholder="姓名"
             maxlength="14"
             class="name" />

      <input type="number"
             v-model="state.phone"
             placeholder="手机号"
             maxlength="11"
             class="number" />
      <textarea class="address"
                v-model="state.address"
                autoHeight="true"
                maxlength="150"
                placeholder="收货地址"></textarea>

      <div class="submit"
           @click="submit"></div>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import {
  defineProps, defineEmits, ref, onUnmounted,
} from 'vue';
import { Toast } from 'vant';
import useBaseInfo from '../hooks/useBaseInfo';
import useSaveAddress from '../apis/useSaveAddress';
import emitter from '../hooks/mitt';

// 获取基本信息
const { baseInfo } = useBaseInfo();

const { saveAddress } = useSaveAddress(baseInfo);
const state = ref({
  phone: '',
  receiver: '',
  address: '',
});
const changeInfo = (value:any) => {
  state.value.phone = value.phone;
  state.value.receiver = value.receiver;
  state.value.address = value.address;
};
// 监听事件,更新数据
emitter.on('change-info', changeInfo);
const emit = defineEmits(['closePopup', 'closeMyPrizePopup', 'closeSuccess30Popup', 'closeSuccess15Popup']);
const props = defineProps({
  addressId: {
    type: String,
    default: () => (''),
  },
});

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
  state.value = {
    phone: '',
    receiver: '',
    address: '',
  };
};
const submit = async () => {
  if (!state.value.receiver) {
    Toast.fail('请输入姓名');
    return;
  }
  if (!state.value.phone) {
    Toast.fail('请输入手机号码');
    return;
  }
  if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/.test(state.value.phone))) {
    Toast.fail('请填写正确的手机号码');
    return;
  }
  if (!state.value.address) {
    Toast.fail('请输入收货地址');
    return;
  }
  const res = await saveAddress(state.value, props.addressId);
  if (res.result) {
    closePopup();
    emit('closeSuccess15Popup');
    emit('closeSuccess30Popup');
    emit('closeMyPrizePopup');

    state.value = {
      phone: '',
      receiver: '',
      address: '',
    };
    Toast.success('地址保存成功');
  }
};

</script>

<style lang='scss'>
.add-address-popup {
  position: relative;
  .popup-content {
    width: 7.2rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }

  .add-address-content {
    .name {
      width: 4.5rem;
      height: 0.5rem;
      position: absolute;
      left: 50%;
      top: 2.7rem;
      transform: translate(-50%);
      border: none;
      border-bottom: 1px solid #d6d6d6;
    }
    .number {
      width: 4.5rem;
      height: 0.5rem;
      position: absolute;
      left: 50%;
      top: 3.5rem;
      transform: translate(-50%);
      border: none;
      border-bottom: 1px solid #d6d6d6;
    }
     .address {
      width: 4.5rem;
      height: 0.45rem;
      position: absolute;
      left: 50%;
      top: 4.5rem;
      transform: translate(-50%);
      border: none;
      border-bottom: 1px solid #d6d6d6;
      resize:none;
    }
    .submit {
      width: 5.1rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      top: 6rem;
      transform: translate(-50%);
      overflow: auto;
      color: #000000;
      font-size: 0.28rem;
      background: transparent;
    }
  }
}
</style>
