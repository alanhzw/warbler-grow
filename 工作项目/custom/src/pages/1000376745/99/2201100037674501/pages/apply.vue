/**
 * @Description:caoshijie
 * @Date: 2021/12/30
 * @Description: 雅诗兰黛复购礼 1月
 * @FilePath:src\pages\1000376745\99\2112100037674501\pages\apply.vue
*/
<template>
  <div class='box'>
    <img class='bg' src='../assets/applyBg.png' alt='' srcset='' />
    <!-- 礼品 -->
    <Gift class='gift'>
      <img style='width: 100%;display: block;border-radius: 0.1rem;' src='../assets/gift1.jpg' alt='' srcset='' />
    </Gift>
    <!-- 规则 -->
    <RuleText class='ruleBox'></RuleText>
    <!-- 进入店铺按钮 -->
    <div class='rules' @click='joinActive'>立即申领</div>
    <div class='skuTipInfo'>
      XVIII 为产品昵称，产品名为雅诗兰黛专研紧塑精华素，国妆备进字J201713711.
      <!--      Ⅳ为产品昵称，产品注册名为雅诗兰黛持妆粉底液SPF 10/PA++-->
      <!--      Ⅸ为产品昵称，产品注册名为雅诗兰黛樱花微精华露-->
    </div>
  </div>
</template>
<script lang='ts' setup>
import { inject, provide } from 'vue';
import { Toast } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';

import { gotoShopPage } from '@/utils/platforms';
import RuleText from '../components/ruleText.vue';
import Gift from '../components/gift.vue';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

const joinActive = async (): Promise<void> => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    overlay: true,
    duration: 0,
  });
  const res = await cjwxRequest
    .post('/crm/esteeLauder/purchase/join', {
      activityId: baseInfo.activityId,
    });
  Toast.clear();
  if (!res.result) {
    Toast(res.errorMessage);
  } else {
    window.location.href = `https://${window.location.host}/m/1000376745/99/2111100037674501/`;
  }
};

</script>
<style lang='scss' scoped>
.box {
  position: relative;

  .bg {
    width: 100%;
  }

  .gift {
    position: absolute;
    top: 0.55rem;
    padding: 0 0.35rem;
  }

  .ruleBox {
    position: absolute;
    top: 3.8rem;
    width: 6.8rem;
    left: 0.35rem;
    max-height: 5.4rem;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 0 0.3rem;
  }

  .rules {
    position: absolute;
    top: 9.8rem;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    font-size: 0.32rem;
    box-sizing: border-box;
    font-weight: 600;
    background: #020d29;
    line-height: 0.7rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    border-radius: 0.5rem;
    font-size: 0.32rem;
    width: 3rem;
  }

  .skuTipInfo {
    width: 100%;
    position: absolute;
    top: 10.7rem;
    text-align: center;
    padding: 0 0.45rem;
    box-sizing: border-box;
    font-size: 0.12rem;
    color: #020d29;
    line-height: 0.2rem;
  }
}
</style>
