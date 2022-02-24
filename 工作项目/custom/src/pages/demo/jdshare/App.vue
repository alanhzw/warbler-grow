<template>
  <button @click="share1">分享图片(callSharePane)</button>
  <br>
  <br>
  <br>
  <br>
  <button @click="share2">分享图片(sendDirectShare)</button>
  <br>
  <br>
  <br>
  <br>
  <img style="width: 80vw" :src="imageUrl">
</template>

<script setup lang="ts">

const imageUrl = 'https://img1.baidu.com/it/u=4095057498,403099720&fm=26&fmt=auto';

const share1 = () => {
  window.jdshare?.callSharePane({
    title: '分享图片',
    content: '分享图片',
    url: imageUrl,
    img: imageUrl,
    channel: 'QRCode',
    callback: null,
    qrparam: {
      top_pic: '',
      mid_pic: imageUrl,
      slogan: '',
      qr_title: '',
      qr_content: '',
      qr_direct: imageUrl,
    },
    timeline_title: '',
  });
};
const share2 = () => {
  window.jdshare?.sendDirectShare({
    title: '分享图片',
    content: '分享图片',
    url: imageUrl,
    img: imageUrl,
    channel: 'QRCode',
    callback: null,
    qrparam: {
      top_pic: '',
      mid_pic: imageUrl,
      slogan: '',
      qr_title: '',
      qr_content: '',
      qr_direct: imageUrl,
    },
    timeline_title: '',
  });
};
</script>

<style scoped>

</style>
