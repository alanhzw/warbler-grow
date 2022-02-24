<template>
  <div class="video-list">
    <div class="video-item" v-for="item in videoList" :key="item.taskId">
      <div class="video-wrapper">
        <lz-video :src="item.link" :poset="item.image" :disabled="!item.canWatch"/>
      </div>
      <div class="video-title">{{ item.name }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LzVideo from './components/LzVideo';

const videoList = [
  {
    image: '//img10.360buyimg.com/imgzone/jfs/t1/207906/1/11893/656179/61aecbdfE503ec30d/efed3e57fa4bc8f2.png',
    canWatch: true,
    link: 'https://jvod.300hu.com/vod/product/6d9529c1-be2c-41d5-a7a3-75a71e304b86/2f423988d16a43838ceacb3146d7531d.mp4',
    name: '时间都去哪儿了',
    taskId: 'ea89b66e38ea40b080b2819ad461cb7b',
  },
  {
    image: '//img10.360buyimg.com/imgzone/jfs/t1/170871/9/27492/745619/61aecbdfE9f867453/2e26c4b55a873c77.png',
    canWatch: true,
    link: 'https://jvod.300hu.com/vod/product/e5db4f87-1b76-4fe3-bcba-f001a0af240b/999ab957159a48a881b483e19c834e08.mp4',
    name: '这个杀手不大冷',
    taskId: 'ade25dfb03b643b995d191f879b9e7a4',
  },
  {
    image: '//img10.360buyimg.com/imgzone/jfs/t1/203514/24/17528/621027/61aecbe0Eac87dc5a/68047b25f5cc8910.png',
    canWatch: true,
    link: 'https://jvod.300hu.com/vod/product/4c3ed956-ac98-4f05-9dd7-bc0f60d80f52/30a26da9500543e7ba2c3c0cfde4cf0c.mp4',
    name: '笑吧皮奥莱维奇',
    taskId: '4ab923c2b8074bd08a666543dce3c886',
  },
  {
    image: '//img10.360buyimg.com/imgzone/jfs/t1/169403/18/26764/635932/61aecbdeE5fd03094/acc54fe394b0a7b4.png',
    canWatch: true,
    link: 'https://jvod.300hu.com/vod/product/ca93a95b-055c-4862-a563-14f665996dea/d98a9c0999ae43e7a7fdf73d42d5f679.mp4',
    name: '浪漫泄露',
    taskId: '029b6265620811ebaceefa163ec25a95',
  },
  {
    image: '//img10.360buyimg.com/imgzone/jfs/t1/221065/5/5124/581007/61aecbdeE4555ab9d/8e10cb1a351c4f86.png',
    canWatch: true,
    link: 'https://jvod.300hu.com/vod/product/33c92a39-972c-42ad-9497-4198284fda64/bc572fa4203e4d5f90e2c3d1514db869.mp4',
    name: '当男人踏进民政局',
    taskId: '011b926ab47a4ff4a39a202be6eea433',
  },
];
</script>
<style lang="scss" scoped>
.video-list {

  .video-item {
    width: 7rem;
    height: 3rem;
    background: #0b0c27;
    margin: .25rem;
    position: relative;

    .video-wrapper {
      width: 7rem;
      height: 2rem;
    }

    .video-title {
      color: white;
      padding: .2rem;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
