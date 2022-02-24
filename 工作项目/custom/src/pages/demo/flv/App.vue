<!--
 * @Author: YC
 * @Date: 2021-07-30 11:09:10
 * @LastEditors: YC
 * @LastEditTime: 2021-09-18 23:01:13
 * @Description:
-->
<template>
  <!-- <video ref="flvEl" width="384" height="667"> </video> -->
  <!-- <div>
    <button @click="play">播放</button>
  </div> -->

  <video width="384" height="667" id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" data-setup='{}'>
    <source src="https://jdpull.jd.com/live/6BDF768AB923682F34FF63BD0E1E699A_fhd.m3u8" type="application/x-mpegURL">
  </video>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// import FlvJS from 'flv.js';
// import VideoJS from 'video.js';

const videoEl = ref();
const flvEl = ref();

const flvPlayer = ref();

const play = () => {
  flvPlayer.value.play();
};

onMounted(() => {
  const flvUrl = 'https://jdpull.jd.com/live/A6AF714AE70706C5056585BE26226240_fhd5.flv';
  // if (FlvJS.isSupported()) {
  //   alert('supported');
  //   flvPlayer.value = FlvJS.createPlayer({
  //     type: 'flv',
  //     isLive: true,
  //     hasAudio: true,
  //     url: flvUrl,
  //   });
  //   flvPlayer.value.attachMediaElement(flvEl.value);
  //   flvPlayer.value.load();
  //   flvPlayer.value.play();
  // } else {
  //   alert('unsupported');
  // }
});
</script>
