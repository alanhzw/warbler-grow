<template>
  <div ref="divEl">
    <h1>Hello world!!!</h1>
    <img ref="imgEl" :src="imageUrl">
    <article>
      <a :href="imageUrl" download="test-image">测试图片</a>
    </article>

    <button @click="save1">保存图片1</button>
    <br/>
    <br/>
    <br/>
    <br/>
    <button @click="save2">保存图片2</button>
    <!-- <button @click="saveCanvas">保存canvas</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HTML2Canvas from 'html2canvas';
import { Jdsdk } from '../../../utils/platforms/jdsdk';

const divEl = ref();
const imgEl = ref();
const imageUrl = 'https://lzkj-yc.isvjcloud.com/m/707261/99/211270726101/img/share-btn.2ae75399.png';

const save1 = () => {
  const url = document.querySelector('canvas')?.toDataURL('image/png');
  const cbId = Date.now();
  const json = {
    imgUrl: url,
    callBackName: 'imageSaved',
    callBackId: cbId,
    permission_desc: '需要申请权限，请您同意一下',
  };

  window.imageSaved = (jsonStr) => {
    console.log('🚀 ~ save ~ jsonStr', jsonStr);
    const result = JSON.parse(jsonStr);
    if (result.callBackId === cbId && result.code === '0') {
      alert('图片已保存');
    } else {
      alert('保存失败');
    }
  };
  window.JDAppUnite
    ? window.JDAppUnite.saveImageToPhoteAlbum(JSON.stringify(json))
    : window.webkit.messageHandlers.JDAppUnite.postMessage({
      method: 'saveImageToPhoteAlbum',
      params: JSON.stringify(json),
    });
};

const save2 = () => {
  const url = 'https://lzkj-yc.isvjcloud.com/m/707261/99/211270726101/img/share-btn.2ae75399.png';
  const cbId = Date.now();
  const json = {
    imgUrl: url,
    callBackName: 'imageSaved',
    callBackId: cbId,
    permission_desc: '需要申请权限，请您同意一下',
  };

  window.imageSaved = (jsonStr) => {
    console.log('🚀 ~ save ~ jsonStr', jsonStr);
    const result = JSON.parse(jsonStr);
    if (result.callBackId === cbId && result.code === '0') {
      alert('图片已保存');
    } else {
      alert('保存失败');
    }
  };
  window.JDAppUnite
    ? window.JDAppUnite.saveImageToPhoteAlbum(JSON.stringify(json))
    : window.webkit.messageHandlers.JDAppUnite.postMessage({
      method: 'saveImageToPhoteAlbum',
      params: JSON.stringify(json),
    });
};

onMounted(() => {
  HTML2Canvas(divEl.value).then((canvas) => document.body.appendChild(canvas));
});
</script>

<style scoped>

</style>
