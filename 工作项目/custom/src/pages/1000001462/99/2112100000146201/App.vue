<template>
  <div class="index">
    <div class="banner">
      <!-- <img src="//img10.360buyimg.com/imgzone/jfs/t1/208447/36/6069/284631/616fd3d4E15f7d56b/b7015d56dba7bb49.png" /> -->
    </div>
    <div class="index-list">
      <div class="box box-text1">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/221672/34/5223/23392/61b0633fEd2f3d9b2/0e775f2d87ec783d.png"
          style="width: 100%;"
        />
        <div class="box-text1-full" v-if="status === 3">已领完</div>
      </div>
      <div class="bottom-box">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/208571/13/11067/33780/61a5c371E02dacab1/a621bbee183f2f64.png"
          v-if="status === 1"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/213554/10/6105/51349/61a5c371E64eab594/6dadc417b867cd3f.png"
          @click="convertPrize(status)"
          :class="{ 'filter-gra': status !== 2 }"
          v-else
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/199186/25/19015/51663/61a5c371E4c95030b/e33499a4219e4f70.png"
          @click="overlay.myGift = true"
        />
      </div>
      <div class="box box-wx">
        <div class="box-wx-text">
          每人限领取一次。获奖用户填写正确信息后，奖品以序列号方式发放，每个序列号仅可兑换一次，需在21年12月17日前完成兑换。若因信息未填、填写错误、自行分享、超期未兑等用户原因导致奖品作废，不予补发。
          <br />领取流程：用户需更新手机软件至最新版本，打开发红包页面，前往“红包封面”-“添加红包封面”，输入有效领取序列号即可领取红包封面。详情请咨询客服。
        </div>
      </div>
      <div class="box">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/174200/7/22853/66412/61b1a631Eb23a9321/643ebac298b7d819.png"
          style="width: 100%;display: block;"
        />
      </div>
      <div class="rule-titel">
        <div class="box rule-text" v-html="rule"></div>
      </div>
    </div>
  </div>
  <!-- 领取成功弹窗 -->
  <!-- <van-popup v-model:show="overlay.gift" :close-on-click-overlay="false">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/212203/34/497/112234/61692d3dE1480639b/2ef8828da0b424ef.png"
        class="open-card-img"
      />
      <div class="copy-text">{{ giftName }}</div>
      <input type="text" class="copy-input" :id="'copyInput'" :value="giftName" />
      <div
        class="copy-button"
        @click="copy()"
        :id="'cliptxt'"
        :data-clipboard-target="'#copyInput'"
      ></div>
      <div class="open-card-close" @click="overlay.gift = false"></div>
    </div>
  </van-popup>-->
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlay.myGift">
    <div class="mygift">
      <div class="close-mygift" @click="overlay.myGift = false"></div>
      <div class="mygift-list">
        <div class="mygift-list-gift" v-for="item,index in myGifts" :key="index">
          <div class="mygift-text">
            <p>{{ item.exchangeTime }}</p>
            <p>{{ item.giftName }}</p>
            <input
              type="text"
              class="copy-input"
              :id="'copyInput'"
              :value="item.giftName"
              readonly="true"
            />
          </div>
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/216334/28/7386/51508/61b2bf1bEfce4cac3/d9be6ea3b3619789.png"
            class="copy-button"
            @click="copy()"
            :id="'cliptxt'"
            :data-clipboard-target="'#copyInput'"
          />
        </div>

        <!-- <div class="more">没有更多了...</div> -->
        <div class="mygift-empty" v-if="myGifts.length === 0">暂时还未获得奖品</div>
      </div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlay.openCard" :close-on-click-overlay="false">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/159278/28/21738/191889/61a5c3c6E45d03738/f5730937b3e3db97.png"
        class="open-card-img"
      />
      <div class="open-card-go" @click="goOpenCard"></div>
      <div class="open-card-close" @click="overlay.openCard = false"></div>
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
import Clipboard from 'clipboard';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import './css/index.css';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const overlay = ref({
  openCard: false,
  myGift: false,
  gift: false,
});
const rule = ref('');
const myGifts: Ref<any> = ref([]);
const giftName = ref('');
const status = ref(0);
// 时间戳转YYYY-MM-DD
const getLocalTime = (r: string) => {
  const year = String(new Date(r).getFullYear());
  const month = String(new Date(r).getMonth() + 1);
  const date = String(new Date(r).getDate());
  const hour = String(new Date(r).getHours());
  let minute = String(new Date(r).getMinutes());
  if (minute.length === 1) {
    minute = `0${minute}`;
  }
  return `${year}-${month}-${date}`;
};

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
  cjwxRequest.post('/wx/dettol/forRedEnvelope/activityContent', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
  }).then((data) => {
    if (data.result) {
      status.value = data.data.status;
      if (status.value === 1) {
        myGifts.value = [{
          giftName: data.data.detail.urlKey,
          exchangeTime: getLocalTime(data.data.detail.drawTime),
        }];
        console.log(myGifts.value);
      }
    } else {
      Toast(data.errorMessage);
    }
  });
};

// 开卡链接
const goOpenCard = () => {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000001462/99/2112100000146201/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000001462&shopId=1000001462&venderType=5&channel=7009&returnUrl=${returnUrl}`;
};

// 兑换礼品
const convertPrize = (type: number) => {
  if (!openCard) {
    overlay.value.openCard = true;
    return;
  }
  if (type === 2) {
    cjwxRequest.post('wx/dettol/forRedEnvelope/redeem', {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    }).then((data) => {
      if (data.result) {
        getActivityContent();
        giftName.value = data.data.urlKey;
        // overlay.value.gift = true;
        Toast('领取成功，请在我的奖品中查看');
      } else {
        Toast(data.errorMessage);
      }
    });
  }
};

// 复制文本
const copy = () => {
  const clipboard = new Clipboard('#cliptxt');
  clipboard.on('success', (e) => {
    Toast('复制成功！');
    clipboard.destroy();
  });
  clipboard.on('error', (e) => {
    Toast('复制失败，请长按复制！');
    clipboard.destroy();
  });
};

if (!openCard) {
  overlay.value.openCard = true;
}
getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
.hover-icon {
  position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  right: 0rem;
  top: 8rem;
  width: 1rem;
  height: 1rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/170883/38/22251/702022/61725979E901bb604/6ed4c4c9f8589c27.gif");
}
</style>
