<!--
 * @Author: 一尾流莺
 * @Description:YSL关注店铺送积分
 * @Date: 2021-09-27 12:58:06
 * @LastEditTime: 2021-12-29 11:04:53
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\App.vue
-->
<template>
  <div class="ysl-page">
    <!-- 页面 -->
    <page-info class="page-info"
               @open-open-card-popup='openOpenCardPopup'
               @open-rule-popup='openRulePopup'
               @join='handleJoin'
               :activity-info='activityInfo'
               :is-open-card='isOpenCard'
               :join-result='joinResult'
               :options="options"></page-info>
    <!-- 活动规则弹窗 -->
    <van-popup v-model:show="isShowRulePopup"
               get-container="#app">
      <popup-rule :activity-info='activityInfo'
                  @close-popup="closeRulePopup"></popup-rule>
    </van-popup>
    <!-- 开卡弹窗 -->
    <van-popup v-model:show="isShowOpenCardPopup"
               get-container="#app">
      <popup-open-card @close-popup="closeOpenCardPopup"></popup-open-card>
    </van-popup>
  </div>
</template>

<script lang='ts' setup>

// ````````````引入组件库`````````````
import { Popup as VanPopup, Toast } from 'vant';
import { onMounted, ref } from 'vue';

// ````````````引入基本配置`````````````
import getOptions from './config/index';

// ````````````引入hooks`````````````
import useBaseInfo from './hooks/useBaseInfo';
import { initColor } from './hooks/useMethods';

// ````````````引入弹窗`````````````

import useOpenCardPopup from './popup/useOpenCardPopup';
import useRulePopup from './popup/useRulePopup';

// ````````````引入APIS`````````````
import useGetActivityInfo from './apis/useGetActivityInfo';
import useJoinActivity from './apis/useJoinActivity';
import useGetPrize from './apis/useGetPrize';
import useGetId from './apis/useGetId';

// ````````````引入自定义组件``````````````
import PageInfo from './pages/PageInfo.vue';
import PopupOpenCard from './components/PopupOpenCard.vue';
import PopupRule from './components/PopupRule.vue';
import { HomePageOptions } from './config/type';

// 获取配置对象
const options = ref<HomePageOptions>();
options.value = getOptions('old');

// 获取基本信息
const { baseInfo, isOpenCard } = useBaseInfo();

// 获取活动id
const { id, getId } = useGetId(baseInfo);

// 获取活动信息接口请求
const { main, activityInfo } = useGetActivityInfo(baseInfo);

// 获取参加活动接口
const { joinResult, join } = useJoinActivity(baseInfo);

// 获取领奖接口
const { getPrizeResult, getPrize } = useGetPrize(baseInfo);

// 开卡弹窗
const { isShowOpenCardPopup, openOpenCardPopup, closeOpenCardPopup } = useOpenCardPopup();

// 活动规则弹窗
const { isShowRulePopup, openRulePopup, closeRulePopup } = useRulePopup();

// 判断是否开卡
const getOpenCardStatus = () => {
  if (!isOpenCard) {
    openOpenCardPopup();
  }
};

// 参加活动
const handleJoin = async () => {
  await join(id.value);
  await main(id.value);
  if (joinResult.value) {
    options.value = getOptions('new');
    Toast.success('关注成功!');
    getPrize(id.value);
  }
};

onMounted(async () => {
  await getId();
  initColor(options?.value.mainColor);
  await main(id.value);
  getOpenCardStatus();
});
</script>

<style lang='scss'>

@font-face {
  font-family: "HYb1gj";
  src: url("./assets/HYb1gj.woff2") format("woff2"),
    url("./assets/HYb1gj.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .van-popup {
    // background: transparent;
  }
}

.ysl-page {

}
</style>
