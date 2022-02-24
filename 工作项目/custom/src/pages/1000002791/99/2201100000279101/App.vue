<template>
  <div class="index">
    <div class="banner">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/98762/16/20234/897904/61d68279E961de3b7/521d4781e145ee22.png"
      />
    </div>
    <div class="index-list">
      <div class="box box-text1">
        <p>消耗0积分</p>
        <span>积分兑换代言人微信红包序列码</span>
        <div class="box-text1-full" v-if="status === 3">已领完</div>
      </div>
      <div class="box box-text1">
        <p>兑换条件</p>
        <span>滴露骑士及以上会员</span>
      </div>
      <div class="bottom-box">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/207491/26/14518/11855/61d684abE3344ec96/83658a91faace3cf.png"
          v-if="status === 1"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/135006/30/21674/16332/61d68278E326e1ec8/c8f8994ecf662695.png"
          @click="addmsg(status)"
          :class="{ 'filter-gra': status !== 2 }"
          v-else
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/207714/29/15289/16520/61d68278E53c3a27c/a84f3d6ac86adcf8.png"
          @click="overlay.myGift = true"
        />
      </div>
      <div class="box">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/207094/30/15273/4967/61d68278E20087e23/5a302d8189672b62.png"
          class="box-wx-titel"
        />
        <div class="box-wx-text">
          每人限领取1次。获奖用户填写正确信息后，奖品以序列号方式发放，每个序列号仅可兑换1次，需领取后3个工作日内完成兑换。若因信息未填、填写错误、自行分享、超期未兑等用户原因导致奖品作废，不予补发。
          <br />领取流程：用户需更新手机微信至最新版本，打开发红包界面，前往“红包封面”-“添加红包封面”，输入有效领取序列号即可领取红包封面。详情请咨询客服。
        </div>
      </div>
      <div class="box">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/101757/39/21473/2393/61d68277E3ea7a6c4/ed19071135ac7713.png"
          class="box-wx-titel"
        />
        <div class="rule-text" v-html="rule"></div>
      </div>
    </div>
  </div>
  <!-- 填写信息弹窗 -->
  <van-popup v-model:show="overlay.addmsg">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/220756/24/10326/85621/61d7ebabEa9378c61/8113ec649fab0fcc.png"
        class="open-card-img"
      />
      <div class="msg">
        <input type="text" v-model="state.receiver" placeholder="姓名" maxlength="14" />
        <input type="text" v-model="state.phone" placeholder="手机号码" maxlength="11" />
      </div>
      <div class="get-button" @click="submit"></div>
      <div class="open-card-close" @click="overlay.addmsg = false"></div>
    </div>
  </van-popup>
  <!-- 领取成功弹窗 -->
  <van-popup v-model:show="overlay.gift" :close-on-click-overlay="false">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/176512/6/25797/130286/61d7eb03E03cf929d/59098ffac1501de3.png"
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
  </van-popup>
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
              :id="`copyInput${index}`"
              :value="item.giftName"
              readonly="true"
            />
          </div>
          <div
            class="mygift-copy"
            @click="myCopy(index)"
            :id="`cliptxt${index}`"
            :data-clipboard-target="`#copyInput${index}`"
          >复制序列号</div>
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
        src="//img10.360buyimg.com/imgzone/jfs/t1/143954/38/25955/160191/61d69685Eaa798c1b/aa87963788b2dfba.png"
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
  addmsg: false,
});
const rule = ref('');
const myGifts: Ref<any> = ref([]);
const giftName = ref('');
const status = ref(0);
function tracking() {
  window.location.href = 'https://lzkj-isv.isvjcloud.com/wxAssemblePage/largeSign';
}
const state = ref({
  receiver: '',
  phone: '',
});
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
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000002791/99/2201100000279101/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000002791&shopId=1000002791&venderType=5&channel=7006&returnUrl=${returnUrl}`;
};

// 兑换礼品
const convertPrize = () => {
  Toast.loading({
    message: '领取中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('wx/dettol/forRedEnvelope/redeem', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
    receiver: state.value.receiver,
    phone: state.value.phone,
  }).then((data) => {
    Toast.clear();
    if (data.result) {
      getActivityContent();
      giftName.value = data.data.urlKey;
      overlay.value.addmsg = false;
      overlay.value.gift = true;
    } else {
      Toast(data.errorMessage);
    }
  });
};

const submit = async () => {
  if (!state.value.receiver) {
    Toast.fail('请输入姓名');
    return;
  }
  if (!state.value.phone) {
    Toast.fail('请输入手机号码');
    return;
  }
  if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/.test(state.value.phone))) {
    Toast.fail('请填写正确的手机号码');
    return;
  }
  convertPrize();
};

// 填写信息
const addmsg = (type: number) => {
  if (!openCard) {
    overlay.value.openCard = true;
    return;
  }
  if (type !== 2) {
    return;
  }
  overlay.value.addmsg = true;
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
const myCopy = (index: number) => {
  const clipboard = new Clipboard(`#cliptxt${index}`);
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
