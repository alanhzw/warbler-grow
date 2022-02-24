<!--
 * @Author: 一尾流莺
 * @Description:未中奖弹窗
 * @Date: 2021-09-02 14:19:26
 * @LastEditTime: 2021-09-06 21:25:24
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\components\PopupAddAddress.vue
-->
<template>
  <van-popup v-model:show="myVisible"
             get-container="#app">
    <div class="add-address-box">
      <img src="../assets/popup-add-address.png"
           class="popup-content" />
      <div class="form">
        <van-address-edit :area-list="areaList"
                          :AddressInfo="myAddressInfo"
                          save-button-text=' '
                          show-postal
                          :area-columns-placeholder="['请选择', '请选择', '请选择']"
                          detail-maxlength='20'
                          detail-rows='1'
                          @save="onSave" />
      </div>
      <div class="close-icon"
           @click="closePopup"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  Popup as VanPopup,
  AddressEdit as VanAddressEdit,
} from 'vant';
import {
  defineProps, defineEmits, ref, computed,
} from 'vue';
import { areaList } from '@vant/area-data';
import useAddAddress from '../hooks/useAddAddress';

const form = ref({});

const emit = defineEmits(['closePopup']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => (false),
  },
  baseInfo: {
    type: Object,
    default: () => ({}),
  },
  addressInfo: {
    type: Object,
    default: () => ({}),
  },
  giftId: {
    type: String,
    default: () => (''),
  },
  isCanSubmit: {
    type: Boolean,
    default: () => (true),
  },
});

const myVisible = computed(() => props.visible);

// 添加地址
const {
  addAddress,
} = useAddAddress();

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};

const onSave = (content:any) => {
  addAddress(props.baseInfo, content, props.giftId, closePopup, props.isCanSubmit);
};

const myAddressInfo = computed(() => ({
  id: props.addressInfo.id,
  name: props.addressInfo.receiver,
  tel: props.addressInfo.phone,
  province: props.addressInfo.province,
  city: props.addressInfo.city,
  county: props.addressInfo.county,
  addressDetail: props.addressInfo.address,
  areaCode: props.addressInfo.areaCode,
  postalCode: props.addressInfo.postalCode,
}));

</script>

<style lang='scss'>
.add-address-box {
  position: relative;
  .popup-content {
    width: 6.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
  }
  .form{
    width: 90%;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translate(-50%);
  }
  .van-cell{
    background: transparent;
  }

  .van-field__label{
    color: #fff;
  }
.van-button--danger{
    border:none;
    background: transparent;
    background-image: url('../assets/submit-btn.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 1.2rem 0;
  }
}
.van-address-edit__buttons{
  padding: 0;
}
</style>
