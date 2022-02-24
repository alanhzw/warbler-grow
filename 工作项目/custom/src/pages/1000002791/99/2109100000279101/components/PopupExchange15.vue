<!--
 * @Author: 一尾流莺
 * @Description:兑换30的
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-26 15:24:05
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupExchange15.vue
-->
<template>
  <div class="exchange-15-popup">
    <img src="../assets/exchange-15.png"
         class="popup-content" />
    <div class="exchange-15-content"
         @click='exchange'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';
import { Toast } from 'vant';
import useBaseInfo from '../hooks/useBaseInfo';
import useRedeem from '../apis/useRedeem';

// 获取基本信息
const { baseInfo } = useBaseInfo();
// 兑换礼品
const { redeem } = useRedeem(baseInfo);
const emit = defineEmits(['openOpenCardPopup', 'closePopup', 'main', 'openAddAddressPopup', 'changeAddressId', 'openFail15Popup', 'openSuccess15Popup']);
const props = defineProps({
  rule: {
    type: String,
    default: () => ('暂无规则'),
  },
  isOpenCard: {
    type: Boolean,
    default: () => (false),
  },
});
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
const exchange = async () => {
  if (!props.isOpenCard) {
    emit('openOpenCardPopup');
    return;
  }
  const res = await redeem('e00234dab2e5412284247c3ac0e50f3d');
  if (!res.result && (res.errorMessage === '拥有卡片不足，无法兑换该礼品' || res.errorMessage === '守护卡不足，无法兑换')) {
    closePopup();
    emit('openFail15Popup');
  }
  if (!res.result && res.errorMessage !== '拥有卡片不足，无法兑换该礼品') {
    Toast.fail(res.errorMessage);
  }
  if (res.result) {
    emit('main');
    emit('changeAddressId', res.data.addressId);
    closePopup();
    emit('openSuccess15Popup');
  }
};

</script>

<style lang='scss'>
.exchange-15-popup {
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
  .exchange-15-content {
    width: 5.1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 6.5rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;
  }
}
</style>
