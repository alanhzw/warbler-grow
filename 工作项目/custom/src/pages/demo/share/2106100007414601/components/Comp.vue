<template>
  <cell-group title="基础信息">
    <cell v-for="entry in Object.entries(baseInfo)" :key="entry[0]" :title="entry[0]" :value="entry[1] ?? '--'"/>
  </cell-group>

  <cell-group title="京东APP分享">
    <cell title="jdshare H5分享" value=""  @click="shareH5" is-link/>
    <cell title="JDSDK H5分享" value=""  @click="shareH5WithSDK" is-link/>
    <cell title="京口令分享" value=""  @click="shareCMD" is-link/>
    <cell title="分享到小程序" value=""  @click="shareToMiniApp" is-link/>
  </cell-group>

  <cell-group title="微信分享">
    <cell title="微信SDK分享H5页面" value=""  @click="shareH5inWeChat" is-link/>
    <cell title="分享到小程序" value=""  @click="shareToMiniApp" is-link/>
  </cell-group>

  <cell-group title="微信分享">
    <cell title="自动选择分享渠道" value=""  @click="callShare" is-link/>
  </cell-group>

</template>

<script setup lang="ts">
import { inject } from 'vue';
import { CellGroup, Cell } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';
import JD from '@/utils/platforms';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

const shareH5 = () => {
  JD.shareH5({
    type: '1',
    title: '测试点击分享H5',
  });
};
const shareCMD = () => {
  JD.shareWithCmdword({
    type: '0',
    title: '测试点击分享京口令',
  });
};
const shareToMiniApp = () => {
  debugger;
  JD.shareToMiniApp({
    type: '2',
    title: '测试点击分享到小程序',
  });
};

const shareH5WithSDK = () => {
  JD.shareH5WithSDK({
    type: '1',
    title: '测试点击分享H5',
  });
};

const shareH5inWeChat = () => {
  JD.shareH5inWeChat({
    type: '1',
    title: '测试点击微信分享H5',
  });
};

const callShare = () => {
  JD.callShare({
    type: baseInfo.shareType,
    title: '测试根据配置自动选择分享渠道',
  });
};

</script>

<style scoped>

</style>
