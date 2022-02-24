<template>
  <div class="index">
    <div class="banner">
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/208447/36/6069/284631/616fd3d4E15f7d56b/b7015d56dba7bb49.png" />
    </div>
    <div class="index-list">
      <div class="box box-text1">
        <p>消耗0积分</p>
        <span>兑换代言人微信红包封面序列号</span>
        <div class="box-text1-full"
             v-if="status === 3">已领完</div>
      </div>
      <div class="box box-text1">
        <p>兑换条件</p>
        <span>滴露骑士及以上会员</span>
      </div>
      <div class="bottom-box">
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/219944/12/380/3826/6168efd4Efeb2a44e/8b74ed5cb72a6c6c.png"
             v-if="status === 1" />
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/170049/15/28128/5665/6168efd4E0fb1ace7/3e2f9888a62577ec.png"
             @click="convertPrize(status)"
             :class="{ 'filter-gra': status !== 2 }"
             v-else />
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/206315/32/11298/5943/6168efd4Ee5394453/e3711b843d2ed69f.png"
             @click="overlay.myGift = true" />
      </div>
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/197639/38/14752/65502/6177d2bcE53866005/7423a90116fb640d.jpg"
           style="width: 100%;"
           @click="goHerf()" />
      <div class="box">
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/209859/16/5243/4635/6168efd4E24889c03/273aaad2d75bf644.png"
             class="box-wx-titel" />
        <div class="box-wx-text">
          每人限中奖1次。获奖用户填写正确信息后，奖品以序列号方式发放，每个序列号仅可兑换1次，需在21年11月15日前完成兑换。若因信息未填、填写错误、自行分享、超期未兑等用户原因导致奖品作废，不予补发。
          <br />领取流程：用户需更新手机微信至最新版本，打开发红包界面，前往“红包封面”-“添加红包封面”，输入有效领取序列号即可领取红包封面。详情请咨询客服。
        </div>
      </div>
      <div class="rule-titel">
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/198365/35/13257/2230/6168efd4E0dcd4795/2cc61efb67dd1f6f.png" />
        <div class="box rule-text"
             v-html="rule"></div>
      </div>
    </div>
  </div>
  <!-- 领取成功弹窗 -->
  <van-popup v-model:show="overlay.gift"
             :close-on-click-overlay="false">
    <div class="open-card">
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/212203/34/497/112234/61692d3dE1480639b/2ef8828da0b424ef.png"
           class="open-card-img" />
      <div class="copy-text">{{ giftName }}</div>
      <input type="text"
             class="copy-input"
             :id="'copyInput'"
             :value="giftName" />
      <div class="copy-button"
           @click="copy()"
           :id="'cliptxt'"
           :data-clipboard-target="'#copyInput'"></div>
      <div class="open-card-close"
           @click="overlay.gift = false"></div>
    </div>
  </van-popup>
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlay.myGift">
    <div class="mygift">
      <div class="close-mygift"
           @click="overlay.myGift = false"></div>
      <div class="mygift-list">
        <div class="mygift-list-gift"
             v-for="item,index in myGifts"
             :key="index">
          <div class="mygift-text">
            <p>{{ item.exchangeTime }}</p>
            <p>{{ item.giftName }}</p>
          </div>
        </div>
        <!-- <div class="more">没有更多了...</div> -->
        <div class="mygift-empty"
             v-if="myGifts.length === 0">暂时还未获得奖品</div>
      </div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlay.openCard"
             :close-on-click-overlay="false">
    <div class="open-card">
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/155746/17/26668/128004/61691c57E4a123dd5/0d15babed77d2d3b.png"
           class="open-card-img" />
      <div class="open-card-go"
           @click="goOpenCard"></div>
      <div class="open-card-close"
           @click="overlay.openCard = false"></div>
    </div>
  </van-popup>
  <span class="hover-icon"
        @click="tracking"></span>
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
function tracking() {
  window.location.href = 'https://lzkj-isv.isvjcloud.com/wxAssemblePage/largeSign';
}
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
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000002791/99/2109100000279103/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000002791&shopId=1000002791&venderType=5&channel=7006&returnUrl=${returnUrl}`;
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
        overlay.value.gift = true;
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

const goHerf = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/3o9qwsY4DojeKmZfHSCwdrw3Jygd/index.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&gx=RnFjwW8IPGaKztTAMheh8QjJ-JBJ5Hm-QIw';
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
