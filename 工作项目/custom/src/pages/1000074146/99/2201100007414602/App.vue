/**
* @Description:hushuwei
* @Date: 2022/01/17
* @Description: 【swisse】会员下单送E卡-跨境
*/
<template>
  <img class='width100' src='./assets/kv.png' />
  <!--  如果已领取了E卡 在kv图下展示-->
  <!--  <div class='card_text' v-if='cardText'>{{cardText}}</div>-->
  <!--  e卡列表-->
  <div class='content'>
    <div class='content_list' v-for='item in cardList' :key='item.id'>
      <img class='width100' :src='item.imgUrl'>
      <div class='content-btn' @click='receiveGift(item)' :style='{background:(item.status=="1"|| item.status=="3"?"":"#ccc"),boxShadow:(item.status=="1"?"":"none")}'>{{ item.status == '2' ? '已领取' : '立即领取' }}&gt;</div>
    </div>
  </div>
  <div class='log_btn' @click='isECardModal =true'>E卡领取记录 <span class='log_gt'>&gt;</span></div>
  <div class='rule_box' v-html='rules'></div>
  <!--    无资格弹窗-->
  <Overlay class='overlay' v-model:show='isNoQualified' :close-on-click-overlay='false'>
    <div class='wrapper'>
      <img src='./assets/no-qualified.png'>
      <div class='go_shop' @click='gotoShopPage(baseInfo.shopId)'></div>
      <div class='close_isAllNoQualified' @click='isNoQualified=false'></div>
    </div>
  </Overlay>
  <!--领取成功弹窗-->
  <Overlay class='overlay' v-model:show='isSuccessModal' :close-on-click-overlay='false'>
    <div class='wrapper'>
      <img class='success_img' src='./assets/success.png'>
      <div class='go_shop show_cardInfo' @click='isSuccessModal=false,isECardModal=true'></div>
      <div class='close_isAllNoQualified close_isSuccessModal' @click='isSuccessModal=false'></div>
    </div>
  </Overlay>
  <!--e卡信息弹窗-->
  <Overlay class='overlay' v-model:show='isECardModal' :close-on-click-overlay='false'>
    <div class='wrapper'>
      <img class='success_img' src='./assets/E-Info.png'>
      <div class='info_content' v-if='cardText'>
        <div class='info_title'>
          <div class='info_label'>[领取账号]:</div>
          <div class='info_text'>{{ baseInfo.nickname }}</div>
        </div>
        <div class='info_title'>
          <div class='info_label'>[领取卡密]:</div>
          <div class='info_text'>{{ cardText }}</div>
          <input readonly id='copyInput' type='text' v-model='cardText'>
        </div>
      </div>
      <div v-else class='info_content'>暂无记录...</div>
      <div id='clipTxt' v-if='cardText' class='go_shop e_card' data-clipboard-target='#copyInput' @click='copyCardKey'></div>
      <div class='go_shop e_card' @click='gotoShopPage(baseInfo.shopId)'></div>
      <div class='close_isAllNoQualified close_e_card' @click='isECardModal=false'></div>
    </div>
  </Overlay>
</template>

<script setup lang='ts'>
import { inject, onMounted, ref } from 'vue';
import { Toast, Overlay } from 'vant';
import Clipboard from 'clipboard';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoShopPage } from '@/utils/index';
import img1 from './assets/01.png';
import img2 from './assets/02.png';
import img3 from './assets/03.png';
import tools from './hook/tool';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const rules = ref('');
const imgList: any = {
  50: img1,
  // 100: img2,
  // 200: img3,
};
const cardList = ref([]);
// 没有权限
const isAllNoQualified = ref(true);
// 部分没有权限
const isNoQualified = ref(false);

// 领取成功
const isSuccessModal = ref(false);
// E卡记录
const isECardModal = ref(false);
// e卡卡密
const cardText = ref('');
const {
  getActivityInfo,
  activityInfo,
  receiveGiftInfo,
} = tools(baseInfo);
const getInfo = async () => {
  await getActivityInfo();
  cardList.value = activityInfo.data.giftVOS ? activityInfo.data.giftVOS.sort((a: any, b: any) => a.amount - b.amount) : [];
  cardList.value.forEach((item: any) => {
    item.imgUrl = imgList[item.amount];
    if (item.status !== 0) {
      isAllNoQualified.value = false;
    }
  });
  isNoQualified.value = isAllNoQualified.value;
  cardText.value = activityInfo.data.ecardKey;
  rules.value = activityInfo.data.rule ? activityInfo.data.rule.replace(/\n/g, '</br>') : '';
};
const receiveGift = async (data: any) => {
  if (data.status === 0 && isAllNoQualified.value) {
    isNoQualified.value = true;
    return;
  }
  if (data.status === 0 && !isAllNoQualified.value) {
    Toast('您不符合此档位领取条件');
    return;
  }
  if (data.status === 3) {
    Toast('本周E卡库存不足，请下周一再来领取');
    return;
  }
  if (data.status === 2) {
    isECardModal.value = true;
    return;
  }
  const info = await receiveGiftInfo(data.giftId);
  if (info.value.result) {
    isSuccessModal.value = true;
    cardText.value = info.value.data;
    await getInfo();
    const timer = setTimeout(() => {
      isSuccessModal.value = false;
      isECardModal.value = true;
      clearTimeout(timer);
    }, 3000);
  }
};
// 复制文本
const copyCardKey = () => {
  const clipboard = new Clipboard('#clipTxt');
  clipboard.on('success', (e) => {
    Toast('复制成功！');
    clipboard.destroy();
  });
  clipboard.on('error', (e) => {
    Toast('复制失败，请长按复制！');
    clipboard.destroy();
  });
};
onMounted(async () => {
  await getInfo();
});
</script>
<style>
html {
  background: #af190c;
  padding-bottom: .2rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
<style lang='scss' scoped>
.content {

  .content_list {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 .23rem;
    margin: .2rem 0;
    position: relative;

    //&:nth-child(2) .content-btn {
    //  bottom: .7rem;
    //}

    .content-btn {
      width: 1.87rem;
      line-height: .46rem;
      background-image: linear-gradient(90deg,
        #f22840 0%,
        #ff4023 100%);
      box-shadow: 0rem 0.05rem 0.03rem 0rem rgba(217, 103, 73, 0.9);
      border-radius: 0.34rem;
      color: #fff;
      text-align: center;
      font-size: .27rem;
      position: absolute;
      left: 2.7rem;
      bottom: 0.35rem;

    }
  }

}

.log_btn {
  width: 3.49rem;
  line-height: 0.73rem;
  background-color: #f8deab;
  border-radius: 0.36rem;
  border: solid 0.02rem #ffffff;
  text-align: center;
  color: #fe3a22;
  font-size: 0.43rem;
  margin-left: 50%;
  transform: translateX(-50%);

  .log_gt {
    vertical-align: inherit;
    display: inline-block;
    width: 0.55rem;
    line-height: 0.56rem;
    background-color: #ff3a21;
    border-radius: 50%;
    color: #f9e2b1;
  }
}

.width100 {
  width: 100%;
}

.rule_box {
  height: 7.9rem;
  overflow-y: auto;
  width: 7.2rem;
  margin-left: .15rem;
  background-color: #8a1006;
  box-shadow: inset 0rem 0rem 0.06rem 0rem #730b03;
  border-radius: 0.3rem;
  border: solid 0.01rem rgba(203, 68, 58, 0.63);
  margin-top: .25rem;
  padding: .2rem;
  color: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    margin-top: 1.5rem;
  }

  .go_shop {
    position: absolute;
    top: 8.5rem;
    left: 2.5rem;
    width: 3rem;
    height: 1rem;
  }

  .close_isAllNoQualified {
    position: absolute;
    top: 10rem;
    left: 3.6rem;
    width: .6rem;
    height: .6rem;
  }

  .success_img {
    width: 80%;
    margin-left: 10%;
  }

  //成功
  .close_isSuccessModal {
    top: 7.6rem;
    left: 3.7rem;
  }

  .show_cardInfo {
    top: 6.3rem;
  }

  //e卡
  .info_content {
    position: absolute;
    top: 4.5rem;
    left: 2rem;
    width: 4.3rem;

    .info_title {
      display: flex;
      padding: .2rem 0;
      width: 100%;
      line-height: .4rem;
      border-bottom: .01rem solid #ccc;
      position: relative;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      .info_label {
        min-width: 1.6rem;
        word-break: break-all;
      }

      .info_text {
        flex: 1;
        word-break: break-all;
      }

    }
  }

  .e_card {
    top: 7.5rem;
  }

  .close_e_card {
    top: 9rem;
    left: 3.8rem;
  }
}
#clipTxt {
  top: 6.6rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2.2rem;
  background: url(./assets/copy.png) no-repeat;
  background-size: 100%;
}
#copyInput {
  position: absolute;
  left: 999rem;
}
</style>
