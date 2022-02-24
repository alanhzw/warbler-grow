<template>
  <div class="index">
    <div class="show-rule" @click="overlayRule = true"></div>
    <div class="my-gift" @click="overlayMyGift = true"></div>
    <div class="play1">
      <div class="gift-list">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/198184/36/12720/1304/61640396Ed74b9382/7f21d874eb3d5c97.png"
          v-if="openCardStatus !== 0"
          class="filter-gra"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/137778/26/23968/1892/61640396E9e170aa7/015a5f7b90aa4475.png"
          @click="goOpenCard()"
          v-else
        />
      </div>
      <div class="gift-list">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/198184/36/12720/1304/61640396Ed74b9382/7f21d874eb3d5c97.png"
          v-if="giftList.firstButtonStatus === 1 || giftList.firstButtonStatus === 2"
          :class="{ 'filter-gra': giftList.firstButtonStatus == 2 }"
          @click="convertPrize('1', giftList.firstButtonStatus)"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/137778/26/23968/1892/61640396E9e170aa7/015a5f7b90aa4475.png"
          v-else
        />
      </div>
      <div class="gift-list">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/198184/36/12720/1304/61640396Ed74b9382/7f21d874eb3d5c97.png"
          v-if="giftList.secondButtonStatus === 1 || giftList.secondButtonStatus === 2"
          :class="{ 'filter-gra': giftList.secondButtonStatus == 2 }"
          @click="convertPrize('2', giftList.secondButtonStatus)"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/137778/26/23968/1892/61640396E9e170aa7/015a5f7b90aa4475.png"
          v-else
        />
      </div>
      <div class="gift-list">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/198184/36/12720/1304/61640396Ed74b9382/7f21d874eb3d5c97.png"
          v-if="giftList.thirdButtonStatus === 1 || giftList.thirdButtonStatus === 2"
          :class="{ 'filter-gra': giftList.thirdButtonStatus == 2 }"
          @click="convertPrize('3', giftList.thirdButtonStatus)"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/137778/26/23968/1892/61640396E9e170aa7/015a5f7b90aa4475.png"
          v-else
        />
      </div>
      <div class="gift-list">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/198184/36/12720/1304/61640396Ed74b9382/7f21d874eb3d5c97.png"
          v-if="giftList.fourthButtonStatus === 1 || giftList.fourthButtonStatus === 2"
          :class="{ 'filter-gra': giftList.fourthButtonStatus == 2 }"
          @click="convertPrize('4', giftList.fourthButtonStatus)"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/137778/26/23968/1892/61640396E9e170aa7/015a5f7b90aa4475.png"
          v-else
        />
      </div>
    </div>
    <div class="play2" v-if="play2">
      <div class="play2-button" @click="overlayInvite = true"></div>
      <div class="play2-button" @click="overlayInvite = true"></div>
    </div>
    <div class="sku-list">
      <ul>
        <li v-for="item in skuLists" :key="item" @click="gotoSkuPage(item)"></li>
      </ul>
    </div>
  </div>
  <!-- 邀请页 -->
  <van-popup v-model:show="overlayInvite" overlay-class="invite-bk">
    <div class="invite">
      <div class="close-invite" @click="overlayInvite = false"></div>
      <div class="invite-box">
        <div class="invite-frinde-list">
          <div class="invite-frinde">
            <img
              :src="assistantFriends[0].userImg"
              v-if="assistantFriends[0] && assistantFriends[0].userImg"
            />
            <img
              src="https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg"
              v-else-if="assistantFriends[0] && !assistantFriends[0].userImg"
            />
            <div style="width: 100%;height: 100%;" v-else @click="shareCMD"></div>
          </div>
          <div class="invite-frinde">
            <img
              :src="assistantFriends[1].userImg"
              v-if="assistantFriends[1] && assistantFriends[1].userImg"
            />
            <img
              src="https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg"
              v-else-if="assistantFriends[1] && !assistantFriends[1].userImg"
            />
            <div style="width: 100%;height: 100%;" v-else @click="shareCMD"></div>
          </div>
          <div class="invite-frinde">
            <img
              :src="assistantFriends[2].userImg"
              v-if="assistantFriends[2] && assistantFriends[2].userImg"
            />
            <img
              src="https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg"
              v-else-if="assistantFriends[2] && !assistantFriends[2].userImg"
            />
            <div style="width: 100%;height: 100%;" v-else @click="shareCMD"></div>
          </div>
        </div>
        <div class="invite-button">
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/168758/22/27985/15069/6161487bEe68b303e/2ef5f8e0d3c79eea.png"
            @click="shareCMD"
          />
        </div>
      </div>
    </div>
  </van-popup>
  <!-- 规则弹窗 -->
  <van-popup v-model:show="overlayRule">
    <div class="rule">
      <div class="close-rule" @click="overlayRule = false"></div>
      <div v-html="rule" class="rule-text"></div>
    </div>
  </van-popup>
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlayMyGift">
    <div class="mygift">
      <div class="close-mygift" @click="overlayMyGift = false"></div>
      <div class="mygift-list">
        <div class="mygift-list-gift" v-for="item,index in myGifts" :key="index">
          <div class="mygift-text">
            <p>{{ item.giftName }}</p>
            <p>{{ item.exchangeTime }}</p>
          </div>
        </div>
        <!-- <div class="more">没有更多了...</div> -->
        <div class="mygift-empty" v-if="myGifts.length === 0">
          暂时还未获得奖品
        </div>
      </div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlayOpenCard" :close-on-click-overlay="false">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/155115/23/27478/310811/616133fdEe8c52b16/119ee7d877253f55.png"
        class="open-card-img"
      />
      <div class="open-card-go" @click="goOpenCard"></div>
      <div class="open-card-close" @click="overlayOpenCard = false"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, Ref,
} from 'vue';
import {
  Toast,
  Overlay as vanOverlay,
  Popup as vanPopup,
} from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import JD, { gotoSkuPage } from '@/utils/platforms';
import './css/index.css';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;
const inviterUuid: string = inject('helpUuid') as string ?? '';

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const overlayInvite = ref(false);
const overlayOpenCard = ref(false);
const overlayCoupon = ref(false);
const overlayGift = ref(false);
const overlayRule = ref(false);
const overlayMyGift = ref(false);
const play2 = ref(false);
const rule = ref('');
const giftList: Ref<any> = ref({});
const openCardStatus = ref(0);
const ordAmt = ref(0);
const assistantFriends: Ref<any> = ref([]);
const myGifts: Ref<any> = ref([]);
const giftName = ref('');
const skuLists = [100014111228, 8534207, 100013236452, 865332, 865331, 100007219849];

const myUuid = ref('');

console.log(inviterUuid);

// 主接口 获取规则;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};

// 主接口 活动内容信息
const getActivityContent = () => {
  cjwxRequest.post('/qqstar/repurchaseGift/activityContent', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
    inviterUuid,
  }).then((data) => {
    if (data.result) {
      if (data.data.gameFlag === 'game') {
        play2.value = true;
      }
      myUuid.value = data.data.userRecord.uuid;
      ordAmt.value = data.data.userRecord.ordAmt;
      assistantFriends.value = data.data.assistantFriends;
      openCardStatus.value = data.data.userRecord.openCardStatus;
      myGifts.value = data.data.myGifts;
      JD.setHeaderShare({
        title: '加入qq星会员购买产品，领取京豆权益',
        shareUrl: `https://${window.location.host}/m/1000361242/99/2109100036124203/?helpUuid=${myUuid.value}`,
      });
      if (data.data.userRecord.assistStatus === 1) {
        Toast('助力成功！');
      } else if (data.data.userRecord.assistStatus === 5) {
        Toast('老会员无法助力！');
      }
      if (data.data.userRecord.openCardStatus === 0) {
        overlayOpenCard.value = true;
      } else {
        giftList.value = data.data.giftButtonStatus;
      }
    } else {
      Toast(data.errorMessage);
    }
  });
};

const goOpenCard = () => {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000361242/99/2109100036124203/?helpUuid=${inviterUuid}`);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000361242&shopId=1000361242&venderType=1&channel=7982&sceneval=2&jxsid=16309170861736832614&returnUrl=${returnUrl}`;
};

const convertPrize = (giftId: string, type: number) => {
  if (type === 1) {
    cjwxRequest.post('/qqstar/repurchaseGift/convertPrize', {
      activityId: baseInfo.activityId,
      giftId,
      uuid: myUuid.value,
      pin: baseInfo.pin,
    }).then((data) => {
      if (data.result) {
        getActivityContent();
        if (data.data.type === 8) {
          giftName.value = data.data.giftName;
          overlayGift.value = true;
        } else {
          overlayCoupon.value = false;
          Toast('领取成功！');
        }
      } else {
        Toast(data.errorMessage);
      }
    });
  } else if (type === 2) {
    Toast('该礼品只能获得一次哦！');
  }
};

const shareCMD = () => {
  if (openCardStatus.value === 0) {
    goOpenCard();
    return;
  }
  JD.callShare({
    type: '0',
    title: '加入qq星会员购买产品，领取京豆权益',
    shareUrl: `https://${window.location.host}/m/1000361242/99/2109100036124203/?helpUuid=${myUuid.value}`,
  });
};

getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
</style>
