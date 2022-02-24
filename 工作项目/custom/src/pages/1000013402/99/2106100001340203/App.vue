<!--
 * @Description:伊利老客入会
 * @Date: 2021-06-24 10:46:57
 * @LastEditTime: 2021-06-26 19:56:13
 * @FilePath: \custom\src\pages\1000074146\2106100007414601\App.vue
-->
<template>
  <div class="yili">
    <!-- 背景图片 -->
    <img :src="background"
         class='background'>

    <!-- 领取按钮 -->
    <img :src="drawbtn"
         class='draw-btn'>
  </div>
</template>

<script lang='ts' setup>
import {
  computed, ref, onMounted, reactive, inject,
} from 'vue';
import { Popup as VanPopup, Toast } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';

import { cjwxRequest } from '@/utils/service';
import background from './assets/background.png';
import drawbtn from './assets/500-btn.gif';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
console.log('baseInfo', baseInfo);

const state = reactive(
  {
    content: {
      code: '3', // 响应码:0.成功 1.活动已结束 2.您还未入会 3.没找到openId 4.配置缺失
      rule: '', // 活动规则
    },
  },
);

// 主接口;
// 获取活动信息;
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/joinMember/activityContent', {
    activityId: activityId.value,
  }).then((res) => {
    if (!res.data) {
      return;
    }
    state.content = res.data;
    state.content.rule = state.content.rule.replace(/\r\n/g, '<br>');
    // state.content.code = '1';
    if (state.content.code === '2') {
      // const returnUrl = encodeURIComponent(yuming + `/yili/joinMember/viewPage?activityId=${activityId}`);
      // location.href = "https://shopmember.m.jd.com/shopcard?venderId=100000000000168&shopId=1000013402&venderType=1&channel=7154&returnUrl=" + returnUrl;
      window.location.href = 'https://shopmember.m.jd.com/shopcard?venderId=100000000000198&shopId=1000002672&venderType=1&channel=7039';
    }
    if (state.content.code === '3' || state.content.code === '4') {
      Toast('当前活动太火爆,请稍候再试~');
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 进店逛逛
const enterShop = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000074146';
};

// 初始化
onMounted(() => {
  getActivityInfo();
});

</script>

<style lang='scss'>
.yili {
  background: url("./assets/y.png") repeat-y;
  background-size: 100% 100%;
  height: 100vh;
  text-align: center;

  .background {
    width: 100%;
  }

  .draw-btn {
    width: 8rem;
  }
}
</style>
