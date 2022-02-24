/**
 * @Description:caoshijie
 * @Date: 2022/1/17
 * @Description: 雅诗兰黛复购礼 2月
 * @FilePath:src\pages\1000376745\99\2202100037674501\App.vue
*/

<template>
  <indexPage v-if="step=='0'" :activeInfo='activeInfo'></indexPage>
  <applyPage v-if="step=='1'"></applyPage>
  <notQualifiedPage v-if="step=='2'"></notQualifiedPage>
  <!--  <router-view></router-view>-->
</template>

<script lang='ts' setup>
import {
  inject, onMounted, provide, reactive, ref,
} from 'vue';
import { Toast } from 'vant';
import { skuList } from 'pages/1000088382/99/2110100008838201/assets/skulist';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import indexPage from './pages/index.vue';
import applyPage from './pages/apply.vue';
import notQualifiedPage from './pages/notQualified.vue';

// 1首页 2 申领 3 不满足条件
const step = ref('0');
const ruleText = ref('');
const skuListData = ref([]);
provide('ruleText', ruleText);
provide('skuList', skuListData);
const activeInfo = ref({});
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

const getActivityInfo = async (): Promise<void> => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    overlay: true,
    duration: 0,
  });
  const res = await cjwxRequest.post(
    '/crm/esteeLauder/purchase/activityContent',
    {
      activityId: baseInfo.activityId,
    },
  );
  Toast.clear();
  if (!res.result) {
    Toast(res.errorMessage);
  }
  const data = {
    isStop: false,
    isMember: true,
    isJoin: false,
    can: true,
    rule: res.data.rule,
  };
  const {
    isStop,
    isMember,
    isJoin,
    can,
    rule,
  } = res.data;
  ruleText.value = rule;
  activeInfo.value = res.data ? res.data : {};
  //    isStop  //活动是否结束  true 是

  //     isMember  //是否会员  true 是

  //     isJoin  //是否领取过令牌  参加过活动

  //     can  //是否符合条件  true 是  跳转领取页面
  if (isStop || isJoin) {
    step.value = '0';
    return;
  }
  if (can) {
    step.value = '1';
  } else {
    step.value = '2';
  }
};
const getSkuList = async (): Promise<void> => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    overlay: true,
    duration: 0,
  });
  const res = await cjwxRequest
    .post('/act/common/findSkus', {
      actId: baseInfo.activityId,
      userId: baseInfo.venderId,
      type: baseInfo.activityType,
    });
  Toast.clear();

  if (!res.isOk) {
    Toast(res.msg);
  }
  skuListData.value = res.skus;
};
onMounted(() => {
  getActivityInfo();
  getSkuList();
});
</script>

<style lang='scss'>
html {
  background: url('./assets/bgY.png') repeat-y 100% center;
}
</style>
