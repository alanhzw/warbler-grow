<!--
 * @Author: 一尾流莺
 * @Description:【惠氏】0元试用
 * @Date: 2021-09-27 12:58:06
 * @LastEditTime: 2021-10-31 19:19:46
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\App.vue
-->
<template>
  <div class="wyeth-trial">
    <!-- 活动主入口 -->
    <div class="homepage"
         v-if="pageType === 'home'"
         :style="homePageOptions.styleOption">
      <div class="choose-container">
        <div class="choose-item"
             @click="check(item.pageName)"
             v-for="item in homePageOptions.pageList"
             :key="item.pageName"></div>
      </div>
    </div>
    <!-- 铂臻页面 -->
    <page-info class="page-bozhen"
               v-if="pageType === 'bozhen'"
               :options="bozhenOptions"
               @change-page-type="changePageType"></page-info>
    <!-- 有机页面 -->
    <page-info class="page-youji"
               v-if="pageType === 'youji'"
               :options="youjiOptions"
               @change-page-type="changePageType"></page-info>
    <!-- 蕴醇页面 -->
    <page-info class="page-yunchun"
               v-if="pageType === 'yunchun'"
               :options="yunchunOptions"
               @change-page-type="changePageType"></page-info>
    <!-- 蓝钻页面 -->
    <page-info class="page-lanzuan"
               v-if="pageType === 'lanzuan'"
               :options="lanzuanOptions"
               @change-page-type="changePageType"></page-info>
    <!-- 已经购买铂臻弹窗 -->
    <van-popup v-model:show="isShowBozhenPopup"
               get-container="#app">
      <popup-bozhen @close-popup="closeBozhenPopup"
                    @change-page-type="changePageType"></popup-bozhen>
    </van-popup>
    <!-- 已经购买有机弹窗 -->
    <van-popup v-model:show="isShowYoujiPopup"
               get-container="#app">
      <popup-youji @close-popup="closeYoujiPopup"
                   @change-page-type="changePageType"></popup-youji>
    </van-popup>
    <!-- 已经购买蓝钻弹窗 -->
    <van-popup v-model:show="isShowLanzuanPopup"
               get-container="#app">
      <popup-lanzuan @close-popup="closeLanzuanPopup"
                     @change-page-type="changePageType"></popup-lanzuan>
    </van-popup>
    <!-- 已经购买蕴醇弹窗 -->
    <van-popup v-model:show="isShowYunchunPopup"
               get-container="#app">
      <popup-yunchun @close-popup="closeYunchunPopup"
                     @change-page-type="changePageType"></popup-yunchun>
    </van-popup>
    <!-- 不符合条件弹窗 -->
    <van-popup v-model:show="isShowUnqualifiedPopup"
               get-container="#app">
      <popup-unqualified @close-popup="closeUnqualifiedPopup"></popup-unqualified>
    </van-popup>
    <!-- 已完成弹窗 -->
    <van-popup v-model:show="isShowFinishPopup"
               get-container="#app">
      <popup-finish @close-popup="closeFinishPopup"></popup-finish>
    </van-popup>
    <!-- 红包弹窗 -->
    <van-popup v-model:show="isShowRedPackagePopup"
               get-container="#app">
      <popup-red-package @close-popup="closeRedPackagePopup"></popup-red-package>
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
import { Popup as VanPopup } from 'vant';
import { onMounted } from 'vue';

// ````````````引入基本配置`````````````
import {
  homePageOptions, bozhenOptions, lanzuanOptions, youjiOptions, yunchunOptions,
} from './config/index';
// ````````````引入hooks`````````````
import usePageType from './hooks/usePageType';
import useBaseInfo from './hooks/useBaseInfo';
// ````````````引入弹窗`````````````
import useBozhenPopup from './popup/useBozhenPopup';
import useYoujiPopup from './popup/useYoujiPopup';
import useLanzuanPopup from './popup/useLanzuanPopup';
import useYunchunPopup from './popup/useYunchunPopup';
import useRedPackagePopup from './popup/useRedPackagePopup';
import useOpenCardPopup from './popup/useOpenCardPopup';
import useUnqualifiedPopup from './popup/useUnqualifiedPopup';
import useFinishPopup from './popup/useFinishPopup';

// ````````````引入APIS`````````````
import useGetActivityInfo from './apis/useGetActivityInfo';

// ````````````引入自定义组件``````````````
import PageInfo from './pages/PageInfo.vue';
import PopupBozhen from './components/PopupBozhen.vue';
import PopupYouji from './components/PopupYouji.vue';
import PopupLanzuan from './components/PopupLanzuan.vue';
import PopupYunchun from './components/PopupYunchun.vue';
import PopupOpenCard from './components/PopupOpenCard.vue';
import PopupRedPackage from './components/PopupRedPackage.vue';
import PopupFinish from './components/PopupFinish.vue';
import PopupUnqualified from './components/PopupUnqualified.vue';

// ````````````引入类型声明``````````````
import { PageType } from './type/index';

// 获取基本信息
const { baseInfo } = useBaseInfo();
// 获取活动信息功能
const { main, activityInfo } = useGetActivityInfo(baseInfo);
// 控制显示哪个二级页面
const { pageType, changePageType } = usePageType();
// 已购铂臻ESKU弹窗
const { isShowBozhenPopup, openBozhenPopup, closeBozhenPopup } = useBozhenPopup();
// 已购有机ESKU弹窗
const { isShowYoujiPopup, openYoujiPopup, closeYoujiPopup } = useYoujiPopup();
// 已购蓝钻ESKU弹窗
const { isShowLanzuanPopup, openLanzuanPopup, closeLanzuanPopup } = useLanzuanPopup();
// 已购蕴醇ESKU弹窗
const { isShowYunchunPopup, openYunchunPopup, closeYunchunPopup } = useYunchunPopup();
// 红包到账弹窗
const { isShowRedPackagePopup, openRedPackagePopup, closeRedPackagePopup } = useRedPackagePopup();
// 开卡弹窗
const { isShowOpenCardPopup, openOpenCardPopup, closeOpenCardPopup } = useOpenCardPopup();
// 不符合条件弹窗
const { isShowUnqualifiedPopup, openUnqualifiedPopup, closeUnqualifiedPopup } = useUnqualifiedPopup();
// 已完成弹窗
const { isShowFinishPopup, openFinishPopup, closeFinishPopup } = useFinishPopup();

// 验证身份
const check = (pageName: PageType) => {
  if (activityInfo.value === 0) {
    openOpenCardPopup();
    return;
  }
  if (activityInfo.value === 7) {
    openUnqualifiedPopup();
    return;
  }
  // 暂时关闭蕴醇页面
  // if (pageName === 'yunchun') {
  //   return;
  // }
  changePageType(pageName);
};

onMounted(async () => {
  // 0:非会员;1:已购蓝钻;2:已购有机;3:已购铂臻;4:已购蕴醇;5:已购正装;6:已发红包;7:不是新客;8:活动主页;
  await main();
  // 测试
  // activityInfo.value = 0;
  if (activityInfo.value === 0) {
    openOpenCardPopup();
  }
  if (activityInfo.value === 1) {
    openLanzuanPopup();
  }
  if (activityInfo.value === 2) {
    openYoujiPopup();
  }
  if (activityInfo.value === 3) {
    openBozhenPopup();
  }
  if (activityInfo.value === 4) {
    openYunchunPopup();
  }
  if (activityInfo.value === 5) {
    openFinishPopup();
  }
  if (activityInfo.value === 6) {
    openRedPackagePopup();
  }
  if (activityInfo.value === 7) {
    openUnqualifiedPopup();
  }
});
</script>

<style lang='scss'>
html,
body,
#app {
  background-color: #ededed;
}

#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .van-popup {
    background: transparent;
  }
}

.wyeth-trial {
  .homepage {
    background-repeat: no-repeat;
    background-size: 100%;
    position: relative;
    .choose-container {
      position: absolute;
      height: 3rem;
      top: 4.5rem;
      left: 50%;
      transform: translate(-50%);
      width: 90%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      padding: 0 1rem;
    }
    .choose-item {
      width: 25%;
    }
    .cover {
      position: absolute;
      height: 2.5rem;
      top: 4.9rem;
      right: 0.6rem;
      width: 1.4rem;
      background: #000000;
      opacity: 0.75;
      color: #fff;
      text-align: center;
      line-height: 2.5rem;
      font-size: 0.2rem;
    }
  }

  .page-bozhen {
    .part-one-new{
        .top{
          display: none;
        }
        .block{
          height: 2.1rem;
        }
    }
    .part-two-new {
      top: 17rem !important;
    }
  }

  .page-youji {
    .part-two-new {
      top: 17.2rem !important;
    }
  }

  .page-yunchun {
    .part-one {
      top: 11rem;
      height: 4rem;
      .block {
        height: 1.3rem;
      }
    }
    .part-two {
      position: absolute;
      top: 16rem;
      left: 50%;
      transform: translate(-50%);
      width: 7rem;
      height: 5.2rem;
    }
    .part-one-new {
      top: 11rem;
      height: 4rem;
      .block {
        height: 1.2rem;
      }
    }
    .part-two-new{
       top: 17.5rem !important;
    }
  }

  .page-lanzuan {
  }
}
</style>
