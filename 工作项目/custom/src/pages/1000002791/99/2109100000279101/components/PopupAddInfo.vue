<!--
 * @Author: 一尾流莺
 * @Description:立即领取弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-30 14:25:37
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupAddInfo.vue
-->
<template>
  <div class="add-info-popup">
    <img src="../assets/Popup-add-info.png"
         class="popup-content" />
    <div class="add-info-content">
      <input type="text"
             v-model="state.receiver"
             placeholder="姓名"
             maxlength="14"
             class="name" />

      <input type="text"
             v-model="state.phone"
             placeholder="手机号码"
             maxlength="11"
             class="number" />
      <div class="submit"
           @click="submit"></div>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits, ref } from 'vue';
import { Toast } from 'vant';
import useBaseInfo from '../hooks/useBaseInfo';
import useSaveAddress from '../apis/useSaveAddress';

// 获取基本信息
const { baseInfo } = useBaseInfo();
const { saveAddress } = useSaveAddress(baseInfo);
const state = ref({
  phone: '',
  receiver: '',
});

const emit = defineEmits(['closePopup', 'openCdkPopup', 'closeMyPrizePopup']);
const props = defineProps({
  addressId: {
    type: String,
    default: () => (''),
  },
});

const submit = async () => {
  if (!state.value.receiver) {
    Toast.fail('姓名');
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
  await saveAddress(state.value, props.addressId);
  Toast.success('保存成功');
  emit('closePopup');
  emit('closeMyPrizePopup');
  emit('openCdkPopup');
};
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.add-info-popup {
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

  .add-info-content {
    .name {
      width: 4.5rem;
      height: 0.5rem;
      position: absolute;
      left: 50%;
      top: 2.7rem;
      transform: translate(-50%);
      border: none;
    }
    .number {
      width: 4.5rem;
      height: 0.5rem;
      position: absolute;
      left: 50%;
      top: 3.5rem;
      transform: translate(-50%);
      border: none;
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
