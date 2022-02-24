<template>
  <div class="canvas" v-if="postUrl">
    <img :src="postUrl" style="width: 6.6rem"/>
  </div>
  <!-- 海报分享弹窗 -->
  <canvas ref="postBg" width="750" height="838" hidden
          style="height: 7rem;background-color: transparent;"></canvas>

</template>

<script lang='ts' setup>
import {
  defineEmits, defineProps, nextTick, Ref, ref, watch,
} from 'vue';

const emit = defineEmits(['getQrImg', 'getPostUrl']);
const props = defineProps({ qrUrl: String, postUrl: String });
const postBg: Ref = ref(null);

const toImage = () => {
  const postCtx = postBg.value?.getContext('2d');
  const postbg = new Image();
  const postqr = new Image();
  postCtx.clearRect(0, 0, 750, 750);
  postbg.crossOrigin = 'Anonymous';// 解决Canvas.toDataURL 图片跨域问题
  postbg.onload = () => {
    postCtx.drawImage(postbg, 0, 0, 750, 838);
    if (props.qrUrl) {
      postqr.src = props.qrUrl;
    }
  };
  postqr.crossOrigin = 'Anonymous';// 解决Canvas.toDataURL 图片跨域问题
  postqr.onload = () => {
    postCtx.drawImage(postqr, 435, 670, 170, 170);
    const baseUrl = postBg.value.toDataURL('image/jpg');
    emit('getPostUrl', baseUrl);
  };
  // 执行顺序 先获取图片网络请求 --> 在执行图片绘制onload
  postbg.src = 'https://img10.360buyimg.com/imgzone/jfs/t1/209526/1/5433/570532/616964d3Ec6d61caa/ddd075db98b1e6a6.png';
};

watch(() => props.qrUrl, (newValue, oldValue) => {
  toImage();
});

emit('getQrImg');

</script>

<style lang='scss' scoped>
.canvas {
  position: relative;

}
</style>
