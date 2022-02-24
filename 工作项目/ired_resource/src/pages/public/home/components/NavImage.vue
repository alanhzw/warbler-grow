<!--
 * @Author: 一尾流莺
 * @Description:右侧图片矩阵
 * @Date: 2021-09-28 16:54:46
 * @LastEditTime: 2021-11-27 17:18:36
 * @FilePath: \ired_resource\src\pages\public\home\components\NavImage.vue
-->
<template>
  <!-- 组件根节点 -->
  <!-- 六宫格 -->
  <div class="nav-image"
       v-if='bannerModel === 6'>
    <div class="top">
      <div class="item">
        <img :src="webBannerList[0].imageUrl"
             @click='openUrl(webBannerList[0].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[1].imageUrl"
             @click='openUrl(webBannerList[1].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[2].imageUrl"
             @click='openUrl(webBannerList[2].bannerJumpUrl)'
             class="img-content">
      </div>
    </div>
    <div class="bottom">
      <div class="first">
        <img :src="webBannerList[3].imageUrl"
             @click='openUrl(webBannerList[3].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="second">
        <img :src="webBannerList[4].imageUrl"
             @click='openUrl(webBannerList[4].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="third">
        <img :src="webBannerList[5].imageUrl"
             @click='openUrl(webBannerList[5].bannerJumpUrl)'
             class="img-content">
      </div>
    </div>
  </div>

  <!-- 九宫格 -->
  <div class="nav-image"
       v-else>
    <div class="top">
      <div class="item">
        <img :src="webBannerList[0].imageUrl"
             @click='openUrl(webBannerList[0].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[1].imageUrl"
             @click='openUrl(webBannerList[1].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[2].imageUrl"
             @click='openUrl(webBannerList[2].bannerJumpUrl)'
             class="img-content">
      </div>
    </div>
    <div class="top"
         style='margin-top:4px'>
      <div class="item">
        <img :src="webBannerList[3].imageUrl"
             @click='openUrl(webBannerList[3].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[4].imageUrl"
             @click='openUrl(webBannerList[4].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[5].imageUrl"
             @click='openUrl(webBannerList[5].bannerJumpUrl)'
             class="img-content">
      </div>
    </div>
    <div class="top"
         style='margin-top:4px'>
      <div class="item">
        <img :src="webBannerList[6].imageUrl"
             @click='openUrl(webBannerList[6].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[7].imageUrl"
             @click='openUrl(webBannerList[7].bannerJumpUrl)'
             class="img-content">
      </div>
      <div class="item">
        <img :src="webBannerList[8].imageUrl"
             @click='openUrl(webBannerList[8].bannerJumpUrl)'
             class="img-content">
      </div>
    </div>
  </div>

</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import useGetWebBannerList from '../apis/getWebBannerList';

const { webBannerList, getWebBannerList, bannerModel } = useGetWebBannerList();
onMounted(async () => {
  await getWebBannerList();
});

const openUrl = (url:string)=>{
  if (url != null) {
    window.open(url)
  }
}

</script>

<style lang='scss'>
@import "styles/_variables.scss";

.nav-image {
  width: 692px;
  height: 392px;
  position: absolute;
  top: 0;
  right: 0;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .item {
      width: 228px;
      height: 128px;
      background: #fff;
    }
  }
  .bottom {
    width: 100%;
    height: 260px;
    position: absolute;
    bottom: 0;

    .first,
    .second,
    .third {
      position: absolute;
    }

    .first {
      width: 228px;
      height: 128px;
      background: #fff;
      top: 0;
      left: 0;
    }
    .second {
      width: 228px;
      height: 128px;
      background: #fff;
      bottom: 0;
      left: 0;
    }
    .third {
      width: 460px;
      height: 260px;
      background: #fff;
      right: 0;
      bottom: 0;
    }
  }
  .img-content{
    width: 100%;
    height: 100%;
  }
}
</style>
