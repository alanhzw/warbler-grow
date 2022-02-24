<template>
  <div class="index">
    <div class="kv-img"></div>
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/164159/2/24673/240600/617933f1E91287ee2/470c6d56aa79859a.png"
      class="vip-banner"
      @click="goOpenCard"
    />
    <div class="box box8">
      <a href="https://pro.m.jd.com/mall/active/2RSY9As3TKAF88sGYyzim9hJEKBb/index.html">
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/197613/22/15802/442967/6183a769E3f57dec5/aff6778466615e40.png"></a>
    </div>
    <div class="box box1">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/156161/7/21337/1628/617933f1E35cda637/4a32070a19deb4f5.png"
        class="box1-rule"
        @click="showRule(rule.drawRule)"
      />
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/139837/23/26374/1665/617933f2Edf683d97/c3907cc4532e6aff.png"
        class="box1-gift"
        @click="overlay.mygift = true"
      />
      <div class="box1-drawnum">
        您可以抽奖
        <span>{{ restTimes }}</span>次
      </div>
      <p class="box1-hint">【完成一笔订单，可领一次机会】</p>
      <JiuGongLottery
        :restTimes="restTimes"
        :openCard="openCard"
        :drawPrizeInfo="drawPrizeInfo"
        @getResult="lotteryResult"
        @endResult="endResult"
        :winnerId="winnerId"
        style="transform: scale(0.63);"
      ></JiuGongLottery>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/215857/2/2273/11176/617ba33eEd707d188/78385d66beb8e678.png"
        class="box1-fotterimg"
      />
    </div>
    <div class="box box2">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/156161/7/21337/1628/617933f1E35cda637/4a32070a19deb4f5.png"
        class="box1-rule box2-rule"
        @click="showRule(rule.topRule)"
      />
    </div>
    <!-- top10获奖名单 -->
    <div class="box">
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/141573/7/20604/570045/6195fbf8E252102e7/bd0806162c2e0bb0.png">
    </div>
    <div class="box box3">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/156161/7/21337/1628/617933f1E35cda637/4a32070a19deb4f5.png"
        class="box1-rule box3-rule"
        @click="showRule(rule.orderRule)"
      />
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/169113/20/24917/1598/617933e6Ed67754fa/ddf1080285398a2e.png"
        class="box3-record"
        @click="overlay.record = true"
      />
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/139818/4/21025/12075/617933f2Ec3e8932c/e0e9e0db3b8ae9da.png"
        class="redeem-button filter-gra"
        v-if="progress.num < progress.max"
        v-click-track="`立即兑换`"
      />
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/139818/4/21025/12075/617933f2Ec3e8932c/e0e9e0db3b8ae9da.png"
        class="redeem-button"
        :class="{ 'filter-gra': progress.num < progress.max }"
        @click="convertPrize(giftId.buy, 1)"
        v-click-track="`立即兑换`"
        v-else
      />
      <div class="progress">
        <div class="progress-out">
          <div class="progress-in" :style="{ width: progres(progress.num, progress.max) + '%' }"></div>
        </div>
        <span>{{ progress.num }}/{{ progress.max }}</span>
      </div>
    </div>
    <div class="box box4">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/208028/13/6913/15461/617933e6E9d22726f/fc524766b9a7d955.png"
        class="box4-headimg"
      />
      <div class="box4-skulist">
        <div v-for="item in skuList.list1" :key="item.img" @click="gotoSkuPage(item.sku)">
          <img :src="item.img" />
        </div>
      </div>
    </div>
    <!-- 暂时隐藏 -->
    <!-- <div class="box box5">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/217509/40/2126/317324/617a1070Ebb36fd00/4d9d5600b78efba4.png"
      />
      <a
        href="https://pro.m.jd.com/mall/active/2LadamrnUp3cyyMk9V61KVgzwBdF/index.html"
        class="box5-url"
      ></a>
    </div>-->
    <!-- 暂时隐藏 -->
    <!-- <div class="box box6">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/204485/37/13176/120413/617a1286Ea4afcce5/b6fc6760be442346.png"
      />
      <div class="box4-skulist">
        <div v-for="item in skuList.list2" :key="item.img" @click="gotoSkuPage(item.sku)">
          <img :src="item.img" />
        </div>
      </div>
      <a
        href="https://pro.m.jd.com/mall/active/kCjmEvZmr6DGtywuDkVzxErG7Bj/index.html"
        class="box6-footer"
      ></a>
    </div> -->
    <div class="box box7">
      <!-- <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/199000/38/14659/608059/617933e7Ea8b55d46/e49ac3227d789ea6.png"
      /> -->
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/213981/11/3926/602523/618be154Eb08d02bb/e1c5c585b88182b9.png">
      <a
        href="https://lzkj-isv.isvjcloud.com/drawCenter/activity/a2d403f5641640519cc5d6917fc077e7?activityId=a2d403f5641640519cc5d6917fc077e7"
        class="box7-url1"
      ></a>
      <a
        href="https://lzkj-isv.isvjcloud.com/wxgame/activity/d4379ff7ea9f4a73836eaa078c5928ca?activityId=d4379ff7ea9f4a73836eaa078c5928ca"
        class="box7-url2"
      ></a>
    </div>
    <div class="box box8">
      <!-- <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/220630/13/1996/416962/617933e7Eb1ec6f53/b00538604c9c2fab.png"
      /> -->
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/219888/21/4014/422802/618be154E935b7a86/d2eb30181047924f.png">
      <a
        href="https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity?activityId=bac242661132414db328061e7f533c88"
        class="box8-url"
      ></a>
    </div>
    <!-- 暂时隐藏 -->
    <!-- <div class="box box9">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/197069/4/14832/326468/617933e7E0a0915b0/3bf4a3833b4f605d.png"
      />
      <div class="box9-url">
        <a
          href="https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgShiWu?venderId=1000088382&giftId=2f7bdd56c10048bfae8ad93fc624c40c&giftType=3"
        ></a>
        <a href="#"></a>
        <a href="#"></a>
      </div>
    </div>-->
    <div class="box box10">
      <!-- <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/159247/17/26357/270954/617933f1E989fa80a/5f1b16efb4cb81c3.png"
      />-->
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/202819/8/14869/273560/618be154E87190aad/4d81aa8f79793093.png"
      />
      <div class="box10-url">
        <a
          href="https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=60071c0e84a24072bdbd16af44a1fe80&venderId=1000088382"
        ></a>
        <a
          href="https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=ba3b341dce0c46a9a8a16848843870e9&venderId=1000088382"
        ></a>
      </div>
    </div>
    <div class="box box11">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/204774/12/12834/791147/617933e6Ee960b4fa/f47714327d7b8942.png"
      />
      <div class="box11-skulist">
        <div v-for="item in skuList.list3" :key="item.img" @click="gotoSkuPage(item.sku)">
          <img :src="item.img" />
        </div>
      </div>
    </div>
    <div class="box">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/176660/39/24608/544739/617933f2E6a1d39f6/91f69bb5f63b58cb.png"
      />
    </div>
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/165040/4/26408/175843/617933e6Edbab434a/95a315bc26c7f97b.png"
      class="fotter-img"
      @click="toTop()"
    />
  </div>
  <!-- 规则 -->
  <van-popup v-model:show="overlay.rule">
    <div class="rule">
      <div v-html="ruleText" style="height: 5.65rem; overflow-y: scroll"></div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlay.openCard">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/201705/34/13272/101339/617bac33E03a1ac98/63b3c7ae76a7bdd2.png"
        class="open-card-img"
      />
      <div class="open-card-go" @click="goOpenCard"></div>
    </div>
  </van-popup>
  <!-- 领取成功弹窗 -->
  <van-popup v-model:show="overlay.gift">
    <div class="gift">
      <div class="gift-name">{{ getGift.giftName }}</div>
      <img :src="getGift.showImage" class="gift-img" />
      <div class="gift-address" v-if="getGift.type === 7" @click="goAddress();"></div>
      <div class="gift-noaddress" v-else></div>
    </div>
  </van-popup>
  <!-- 地址 -->
  <van-popup v-model:show="overlay.address">
    <div class="address">
      <div class="address-list">
        <input type="text" v-model="formData.receiver" placeholder="姓名" maxlength="10" />
        <input
          type="text"
          v-model="formData.phone"
          placeholder="手机号"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
        />
        <input
          type="text"
          v-model="addressCode"
          readonly="true"
          placeholder="选择省/市/区"
          @click="overlay.addressSelects = true"
        />
        <input
          type="text"
          v-model="formData.address"
          placeholder="街道门牌号"
          style="width: 82%; float: right;"
        />
        <input
          type="text"
          v-model="formData.postalCode"
          placeholder="邮政编码"
          style="width: 82%; float: right;"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="6"
        />
      </div>
      <div class="address-check" @click="submitCheckOut()"></div>
    </div>
  </van-popup>
  <!-- 我的奖品 -->
  <van-popup v-model:show="overlay.mygift">
    <div class="mygift">
      <div class="mygift-list">
        <div class="mygift-tb" v-for="item,index in myDrawGifts" :key="item.id">
          <span>{{ item.giftName }}</span>
          <span>{{ item.exchangeTime }}</span>
          <span v-if="item.giftAddress && item.type === 7">已填写</span>
          <span
            v-else-if="!item.giftAddress && item.type === 7"
            @click="formDataEmpty(); changeAddress(1, index);"
          >未填写</span>
          <span v-else></span>
        </div>
      </div>
    </div>
  </van-popup>
  <!-- 兑换记录 -->
  <van-popup v-model:show="overlay.record">
    <div class="record">
      <div class="mygift-list">
        <div class="mygift-tb" v-for="item,index in myOrderGifts" :key="item.id">
          <span>{{ item.exchangeTime }}</span>
          <span>{{ item.giftName }}</span>
          <span v-if="item.giftAddress && item.type === 7">已填写</span>
          <span
            v-else-if="!item.giftAddress && item.type === 7"
            @click="formDataEmpty(); changeAddress(2, index);"
          >未填写</span>
          <span v-else></span>
        </div>
      </div>
    </div>
  </van-popup>
  <!-- 谢谢参与 -->
  <van-popup v-model:show="overlay.thanks">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/210219/25/7098/83561/617bac33E0baf2c83/c15e6f98ae98ba99.png"
        class="open-card-img"
      />
    </div>
  </van-popup>
  <!--地址选择-->
  <van-popup v-model:show="overlay.addressSelects" position="bottom">
    <van-area
      title="请输入详细地址"
      :area-list="areaList"
      @confirm="confirmAddress"
      @cancel="overlay.addressSelects = false"
    />
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, Ref,
} from 'vue';
import {
  Toast,
  Area as vanArea,
  Overlay as vanOverlay,
  Popup as vanPopup,
} from 'vant';
import { areaList } from '@vant/area-data';
import Clipboard from 'clipboard';
import { gotoSkuPage, gotoShopPage } from '@/utils/platforms';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { skuList } from './assets/skulist';
import './css/index.css';
import JiuGongLottery from './JiuGongLottery/JiuGongLottery.vue';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo; const openCard = ref(false);

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const overlay = ref({
  openCard: false,
  rule: false,
  mygift: false,
  record: false,
  gift: false,
  address: false,
  addressSelects: false,
  thanks: false,
});
const rule = ref({
  drawRule: '',
  topRule: '',
  orderRule: '',
});
const coupon: Ref<any> = ref({});
const restTimes = ref(0);
const drawPrizeInfo = ref([]);
const giftId = ref({
  draw: '',
  buy: '',
});
const progress = ref({
  num: 0,
  max: 2,
});
const myDrawGifts: Ref<any> = ref({});
const myOrderGifts: Ref<any> = ref({});
const getGift: Ref<any> = ref({
  // giftName: '普仙小酒52度100ml',
  // showImage: 'https://img10.360buyimg.com/imgzone/jfs/t1/207228/39/6734/10933/61791ba3Ed0ea529f/c0f6f0a96d999455.png',
  // type: 7,
});

const addressCode = ref('');
const formData = ref({
  activityId,
  pin,
  giftRecordId: '',
  receiver: '',
  phone: '',
  address: '',
  postalCode: '',
  province: '',
  city: '',
  district: '',
});

const formDataEmpty = () => {
  formData.value = {
    activityId,
    pin,
    giftRecordId: '',
    receiver: '',
    phone: '',
    address: '',
    postalCode: '',
    province: '',
    city: '',
    district: '',
  };
  addressCode.value = '';
};

// 主接口 获取规则;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\r\n');
        rule.value = rules.join('<br/>');
      }
    });
};
const formatRule = (res: string) => {
  const format = res.split('\r\n');
  return format.join('<br/>');
};
const progres = (num: number, maxNum: number) => {
  let x = 0;
  if (num < maxNum) {
    x = num / maxNum;
    x *= 100;
  } else {
    x = 100;
  }
  return x;
};

interface AddressItem {
  name: string;
}
// 地址确认三级联动地址
const confirmAddress = (addressItemList: AddressItem[]) => {
  formData.value.province = addressItemList[0].name;
  formData.value.city = addressItemList[1].name;
  formData.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item) => item.name).join('/');
  overlay.value.addressSelects = false;
};

let open = 0;
// 获取九宫格
const getJiuGongGe = (id: string) => {
  if (open !== 0) return;
  open += 1;
  cjwxRequest.post('/wxDrawActivity/activityContent', {
    activityId: id,
    pin,
  }).then((data) => {
    drawPrizeInfo.value = data.data.content;
  });
};

// 主接口 活动内容信息
const getActivityContent = () => {
  cjwxRequest.post('/xhtxjy/memberDay/activityContent', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
  }).then((data) => {
    if (data.result) {
      coupon.value = data.data;
      data.data.giftList.forEach((item: any) => {
        if (data.data.userRecord.openCardStatus === 0) {
          openCard.value = false;
          // overlay.value.openCard = true;
        } else {
          openCard.value = true;
        }
        if (item.showAreaCode === '1') {
          getJiuGongGe(item.priceInfo);
          giftId.value.draw = item.id;
        } else if (item.showAreaCode === '2') {
          giftId.value.buy = item.id;
          progress.value.max = item.value;
        }
        restTimes.value = data.data.restTimes;
        progress.value.num = data.data.orderNum;
        rule.value = {
          drawRule: formatRule(data.data.drawRule),
          topRule: formatRule(data.data.topRule),
          orderRule: formatRule(data.data.orderRule),
        };
        myDrawGifts.value = data.data.myDrawGifts;
        myOrderGifts.value = data.data.myOrderGifts;
      });
    } else {
      Toast(data.errorMessage);
    }
  });
};

// 开卡链接
const goOpenCard = () => {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000088382/99/2110100008838201/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000088382&channel=9678&returnUrl=${returnUrl}`;
};
const ruleText = ref('');
const showRule = (text: string) => {
  ruleText.value = text;
  overlay.value.rule = true;
};

const goLink = () => {
  window.location.href = 'https://giftcard.jd.com/storepurchase/index?flag=1&encodeJsonStr=up%2B0pDbwr342PGQVzkamke%2B%2FIxvG0b5oMuPN%2FgCAKNI%3D';
};

const changeAddress = (tab: number, index: number) => {
  let giftAddress: any = {};
  if (tab === 1) {
    giftAddress = myDrawGifts.value[index].giftAddress;
    formData.value.giftRecordId = myDrawGifts.value[index].id;
  } else if (tab === 2) {
    giftAddress = myOrderGifts.value[index].giftAddress;
    formData.value.giftRecordId = myOrderGifts.value[index].id;
  }
  if (giftAddress !== null) {
    formData.value.receiver = giftAddress.receiver;
    formData.value.phone = giftAddress.phone;
    formData.value.province = giftAddress.province;
    formData.value.city = giftAddress.city;
    formData.value.district = giftAddress.district;
    formData.value.address = giftAddress.address;
    formData.value.postalCode = giftAddress.postalCode;
    addressCode.value = `${giftAddress.province}/${giftAddress.city}/${giftAddress.district}`;
  }
  overlay.value.gift = false;
  overlay.value.record = false;
  overlay.value.address = true;
};

const goAddress = () => {
  formDataEmpty();
  formData.value.giftRecordId = getGift.value.id;
  overlay.value.address = true;
};

const winnerId = ref(-1);
// 兑换礼品
const convertPrize = (id: string, type: number) => {
  if (!openCard.value) {
    overlay.value.openCard = true;
    return;
  }
  if (type === 1) {
    Toast.loading({
      message: '领取中...',
      forbidClick: true,
    });
  }
  cjwxRequest.post('/xhtxjy/memberDay/convertPrize', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
    giftId: id,
  }).then((data) => {
    if (data.result) {
      getActivityContent();
      getGift.value = data.data;
      if (type === 0) {
        winnerId.value = drawPrizeInfo.value.findIndex((item: any) => item.id === Number(data.data.drawnId));
        console.log(winnerId.value);
      } else {
        goAddress();
      }
    } else {
      Toast(data.errorMessage);
    }
  });
};

const submitAddress = () => {
  Toast.loading({ message: '提交中', forbidClick: true });
  setTimeout(() => {
    cjwxRequest
      .post('/xhtxjy/memberDay/recordReciverInfo', formData.value)
      .then((res) => {
        Toast.clear();
        if (res.result) {
          overlay.value.address = false;
        } else {
          Toast(res.errorMessage);
        }
        getActivityContent();
      });
  }, 1000);
};

const submitCheckOut = () => {
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  const reg = /^\d{11}$/;
  const re = new RegExp(regu);
  if (!formData.value.receiver) {
    Toast('请输入姓名');
  } else if (re.test(formData.value.receiver)) {
    Toast('姓名不可以存在特殊字符');
  } else if (!/^1[3456789]\d{9}$/.test(formData.value.phone)) {
    Toast('请填写正确的手机号码');
  } else if (addressCode.value === '') {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('请填写详细地址');
  } else if (!/^\d{6}$/.test(formData.value.postalCode)) {
    Toast('请填写正确的邮编');
  } else {
    submitAddress();
  }
};

// 点击奖盘开始抽奖
const lotteryResult = () => {
  convertPrize(giftId.value.draw, 0);
  // setTimeout(() => {
  //   winnerId.value = 1;
  // }, 10000);
};

const endResult = () => {
  if (!openCard.value) {
    overlay.value.openCard = true;
    return;
  }
  if (getGift.value.drawnId === '0') {
    overlay.value.thanks = true;
  } else {
    formDataEmpty();
    if (getGift.value.type === 9) {
      getGift.value.showImage = '//img10.360buyimg.com/imgzone/jfs/t1/155722/10/22323/5937/617bb787Ef6a8b894/d60ff5a5c1cd30e7.png';
    } else if (getGift.value.type === 6) {
      getGift.value.showImage = '//img10.360buyimg.com/imgzone/jfs/t1/155911/22/22243/13077/617bb787Ef813feea/2504ab392875fcad.png';
    }
    overlay.value.gift = true;
  }
};

const toTop = () => {
  document.documentElement.scrollTop = 0;
};

getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
</style>
