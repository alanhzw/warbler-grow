<template>
  <div class="code">
    <p class="code-titel">礼券使用说明</p>
    <div class="code-rule">{{props.couponDesc}}</div>
    <QRCodeVue3
      :margin="0"
      :value="codeInfor"
      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
      :dotsOptions="{
        type: 'square',
        color: '#000',
      }"
      :backgroundOptions="{ color: '#ffffff' }"
      :cornersSquareOptions="{ type: 'square', color: '#000000' }"
      :cornersDotOptions="{ type: 'square', color: '#000000' }"
      fileExt="png"
      myclass="my-qur"
      imgclass="img-qr"
      class="code-img"
    />
    <div class="back" @click="back">返回</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, defineProps, defineEmits, watch } from 'vue';
import QRCodeVue3 from 'qrcode-vue3';
import { cjwxRequest } from '@/utils/service';

const emit = defineEmits(['codeBack', 'codeEnd']);

const codeUrl = ref('');
const props = defineProps({
  codeInfor: {
    type: String,
    default: () => (''),
  },
  showCode: {
    type: Boolean,
    default: () => (false),
  },
  couponId: {
    type: String,
    default: () => (''),
  },
  couponDesc: {
    type: String,
    default: () => (''),
  },
});

const back = () => {
  emit('codeBack');
};

const getCouponStatus = () => {
  const timer = setInterval(async () => {
    const res = await cjwxRequest.post('/wx/lorealcoupon/getCouponStatus', {
      couponId: props.couponId,
    });
    if (res.result) {
      if (res.data === '1') {
        clearInterval(timer);
        emit('codeEnd', true);
      } else if (res.data === '2') {
        clearInterval(timer);
        emit('codeEnd', false);
      } else if (!props.showCode) {
        clearInterval(timer);
      }
    }
  }, 3000);
};
// 停用轮询
// watch(() => props.showCode, (newValue, oldValue) => {
//   if (newValue) {
//     getCouponStatus();
//   }
// });

// getCouponStatus();

</script>

<style lang="scss">
</style>
