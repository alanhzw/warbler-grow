<template>
  <img class='kv' src='./assets/kv.png' alt=''>
  <div class='btn' @click='goDeatils'>
    去下单>
  </div>
  <div class='my_gift' @click='getMyGifts'>我的奖励</div>
  <div class='rule_box' v-html='ruleText'></div>
  <!--  领取记录-->
  <popup v-model:show='showPopUp.receivingRecord'>
    <div class='dialog'>
      <div class='log_list'>
        <div class='log_til'>
          <p>奖励</p>
        </div>
        <div class='log_til'><p>发放时间</p></div>
      </div>
      <div v-if='giftList.prizeName'>
        <div class='log_list' >
          <div class='log_til log_text'>
            <img class='icon' src='./assets/dou.png'>
            <p>{{ giftList.prizeName }}</p>
          </div>
          <div class='log_til log_text'>
            <p>{{dayjs(giftList.sendTime ).format('YYYY-MM-DD')}}<br/>{{dayjs(giftList.sendTime ).format('HH:mm:ss')}}</p>
          </div>
        </div>
      </div>
      <div v-else style='font-size: .33rem;text-align: center;margin-top: 0.3rem;'>
        暂无记录...
      </div>
    </div>
  </popup>
  <!--  会员-->
  <popup v-model:show='showPopUp.joinMember'>
    <div class='dialog'>
      <div class='member_tips'>您还不是羽西品牌会员,<br/>加入会员后下单才有奖励哦!</div>
      <div class='join_btn' @click='joinMember'>立即入会</div>
    </div>
  </popup>
</template>

<script setup lang='ts'>
import { onMounted, reactive, inject, ref } from 'vue';
import { getActInfo, getMyPrize, getRules, joinMember } from './tools/tools';
import { BaseInfo } from '@/types/BaseInfo';
import dayjs from 'dayjs';
import { Popup } from 'vant';
import { gotoShopPage } from '@/utils';

const baseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard = inject('isOpenCard');
const showPopUp = reactive({
  receivingRecord: false,
  joinMember: false,
});
const ruleText = ref('');
const giftList = ref({});
const goDeatils = () => {
  if (!isOpenCard) {
    showPopUp.joinMember = true;
    return;
  }
  // window.location.href = 'https://shop.m.jd.com/?shopId=590943&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&ad_od=share&gx=RnFmlmdROjPendRP--sNJ0F_sVfSo9sMHKc';
  gotoShopPage(baseInfo.shopId);
};
const getMyGifts = async () => {
  const data = await getMyPrize(baseInfo);
  if (data) {
    giftList.value = data;
  }
  showPopUp.receivingRecord = true;
};
onMounted(async () => {
  ruleText.value = await getRules(baseInfo);
  await getActInfo(baseInfo);
});
</script>
<style>
html {
  background: #ad1919;
}

/*修改vant popup样式*/
.van-popup {
  background: transparent;
}

.van-toast {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
<style lang='scss' scoped>
.kv {
  width: 100%;
}

.btn {
  font-size: 0.38rem;
  color: #fff;
  background: #960404;
  padding: .05rem .2rem;
  box-sizing: border-box;
  position: absolute;
  top: 2.1rem;
  left: 50%;
  transform: translateX(-50%);
}

.my_gift {
  font-size: .2rem;
  color: #fff;
  background: #960404;
  border-radius: .3rem 0 0 .3rem;
  padding: .12rem .08rem .12rem .2rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 1rem;
  right: 0;
}

.rule_box {
  width: 6.4rem;
  max-height: 4.5rem;
  overflow-y: auto;
  padding: .2rem;
  box-sizing: border-box;
  position: absolute;
  top: 8.2rem;
  left: 50%;
  transform: translateX(-50%);
}

.dialog {
  width: 5.3rem;
  height: 2.6rem;
  background: #fff;
  background-size: 100%;
  border-radius: 0.24rem;
  box-sizing: border-box;
  padding: .65rem 0;

  .log_list {
    display: flex;
    margin-bottom: .1rem;
    align-items: center;

    .log_til {
      width: 50%;
      margin-right: 1%;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        display: inline-block;
        background: #cd2324;
        color: #fff;
        text-align: center;
        font-size: .23rem;
        border-radius: .3rem;
        padding: .08rem 0.21rem;
        box-sizing: border-box;
      }
    }

    .log_text {
      p {
        display: inline-block;
        background: #fff;
        color: #666;
        text-align: center;
        font-size: .23rem;
        border-radius: 0rem;
        padding: .1rem 0;
        box-sizing: border-box;
        line-height: .4rem;
      }
    .icon{
      width: .45rem;
      height: .28rem;
    }
    }
  }
  .member_tips{
    font-size: 0.32rem;
    line-height: 0.57rem;
    color: #666666;
    text-align: center;
    margin-top: -.2rem;
  }
  .join_btn{
    display: inline-block;
    font-size: 0.32rem;
    color: #ffffff;
    padding: .11rem .54rem;
    box-sizing: border-box;
    background-color: #cd2324;
    border-radius: 0.26rem;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: .1rem;
  }
}
</style>
