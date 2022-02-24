<template>
  <div class="index">
    <!--    kv-->
    <div class="kv-img"></div>
    <!--储值卡-->
    <a href="https://shop.m.jd.com/?shopId=1000088382" v-click-track="`储值礼`">
      <div class="save-money"></div>
    </a>

    <div class="state-area">
      <div class="state-btn">
        <div v-for="(item, index) in stateArr" :key="index">
          <img
            :src="item"
            @click="tabLevel(index)"
            :class="tabLevelIndex === index ? '' : 'filter-gra'"
          />
        </div>
      </div>
      <div class="swiper-container" ref="swiperRef" id="mySwiper" style="margin: 0 0.7rem;">
        <div class="swiper-wrapper">
          <div class="state-step swiper-slide">
            <a @click="goOpenCard">
              <img
                src="//img10.360buyimg.com/imgzone/jfs/t1/213773/35/9405/79525/61cd1a0bE0baf3af4/8e97f73cb3d7a933.png"
                v-click-track="`新用户入会立享`"
              />
            </a>
            <a
              href="https://cjhy-isv.isvjcloud.com/wx/completeInfoActivity/view/activity?activityId=4e9aa4b64cfa4c98b51cc1a56e4be4c4&venderId=1000088382"
            >
              <img
                src="//img10.360buyimg.com/imgzone/jfs/t1/145421/22/20590/50671/61cd1a0bE748222b0/7fae211232d794c1.png"
                v-click-track="`完善信息送京豆`"
              />
            </a>
            <a>
              <img
                src="//img10.360buyimg.com/imgzone/jfs/t1/207065/16/16281/193274/61e8ebd6Eae076601/7456976f1f157525.png"
                v-click-track="`入会见面礼`"
              />
            </a>
          </div>
          <div class="state-step swiper-slide">
            <div class="pos-re">
              <img
                src="//img10.360buyimg.com/imgzone/jfs/t1/105025/23/21934/107867/61dff807E08243f23/d20eadbc1cdf5f5b.png"
              />
              <a
                @click="goLink('https://coupon.m.jd.com/coupons/show.action?key=cfm6c5sdo9a647ad842b13eeeba0d871&roleId=67029186&to=https://shop.m.jd.com/?shopId=1000088382', 1)"
                v-click-track="`首购礼金`"
                class="vip-new-coupon"
              ></a>
              <div class="vip-new">
                <img
                  src="//img10.360buyimg.com/imgzone/jfs/t1/102012/13/20003/11063/61cd1a0aE67d65c7d/758bb25ee81bc341.png"
                  @click="convertPrize(giftId.newVip, 1)"
                  v-if="myNewGiftsStatus !== 1"
                  :class="{ 'filter-gra': myNewGiftsStatus === 2 }"
                  v-click-track="`首购礼包`"
                />
                <img
                  src="//img10.360buyimg.com/imgzone/jfs/t1/164214/35/23322/10808/61cd1a0bE773c97fd/2aa3dd9ba33cb245.png"
                  @click="newVipGoAdddress(newVipGiftId)"
                  v-else
                />
              </div>
            </div>
          </div>
          <div class="state-step swiper-slide">
            <div class="pos-re" style="top: -0.15rem;">
              <img
                src="//img10.360buyimg.com/imgzone/jfs/t1/208900/40/14196/238832/61cd7fabE2b4aad44/a1e92a1d34b0d270.png"
              />
              <p style="font-size: 0.2rem;color: #000;text-align: center;">注：需要1.1前存在会员订单才算老客噢</p>
              <div class="pos-ab vip-old">
                <a
                  @click="goLink('https://lzkjdz-isv.isvjcloud.com/m/1000088382/99/2201100008838202/', 2)"
                  v-click-track="`老客复购`"
                ></a>
                <div class="vip-old-a" v-click-track="`老客积分换礼`">
                  <a
                    @click="oldVipHref('https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgShiWu?venderId=1000088382&giftId=02d786d1273b4c1cb108cf053c4e9cc9&giftType=3')"
                  ></a>
                  <a
                    @click="oldVipHref('https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgShiWu?venderId=1000088382&giftId=662e14ae129f446e8040ea73bd5563b5&giftType=3')"
                  ></a>
                  <a
                    @click="oldVipHref('https://cjhy-isv.isvjcloud.com/mc/wxPointShopView/pointExgShiWu?venderId=1000088382&giftId=c94f7803febe45a2a63eda32018d61db&giftType=3')"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/214882/11/9613/15182/61cd2382E9b5e2ef5/3556de079f26f6ed.png"
      class="more-banner"
    />
    <div class="box box8">
      <a href="https://lzkjdz-isv.isvjcloud.com/m/1000088382/99/2111100008838202/">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/149219/14/22631/523613/61e625ceE512f69ee/13f177bd74480fe4.png"
        />
      </a>
    </div>
    <div class="box box1">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/210616/20/14166/1739/61cdac89E8c7326e5/861e4f8f9bca597d.png"
        class="box1-rule"
        @click="showRule(rule.drawRule)"
      />
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/150369/8/24208/1756/61cdac89E1c32854c/dd9ff8270ed08517.png"
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
      <div class="pos-re">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/222504/14/7697/78779/61cd3e20E82a55130/4251015e6f78f5cf.png"
          class="jiugongge-imglist"
        />
        <!-- <div class="jiugongge-imglist-href">
          <a href="https://item.jd.com/988835.html"></a>
          <a href="https://item.jd.com/100016944073.html"></a>
          <a href="https://item.jd.com/69585719706.html"></a>
        </div>-->
      </div>

      <div class="remark">注：完成订单后可获取抽奖资格，实物奖中奖需保证订单为已完成状态，退货或取消的订单将不发奖。读取订单状态会有36小时的延迟时间，请您耐心等待。</div>
    </div>
    <div class="box href-list">
      <div class="href-list1">
        <a href="https://pro.m.jd.com/mall/active/2RSY9As3TKAF88sGYyzim9hJEKBb/index.html"></a>
        <a
          href="https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity?activityId=70f22485483a428ea1b5e2a1b31859b8"
        ></a>
      </div>
      <div class="href-list2">
        <a
          href="https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=06464091b82440eb9edc970c9e043eaa&venderId=1000088382"
        ></a>
        <a
          href="https://lzkj-isv.isvjcloud.com/drawCenter/activity/67b1cf035a514ef2b4a665936fb15837?activityId=67b1cf035a514ef2b4a665936fb15837"
        ></a>
        <a
          href="https://lzkj-isv.isvjcloud.com/wxgame/activity/9f9864e1edd24359bc65b423abc77ff2?activityId=9f9864e1edd24359bc65b423abc77ff2"
        ></a>
      </div>
    </div>
    <div class="box showSku">
      <div class="showSku-skulist">
        <div v-for="item in skuList.list3" :key="item.img" @click="gotoSkuPage(item.sku)"></div>
      </div>
    </div>
    <div class="box vip-show"></div>
    <!-- <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/165040/4/26408/175843/617933e6Edbab434a/95a315bc26c7f97b.png"
      class="fotter-img"
      @click="toTop()"
    />-->
  </div>
  <!-- 规则 -->
  <Popup v-model:show="overlay.rule">
    <div class="rule">
      <div v-html="ruleText" style="height: 100%; overflow-y: scroll"></div>
    </div>
  </Popup>
  <!-- 入会弹窗 -->
  <Popup v-model:show="overlay.openCard">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/216006/16/9652/613827/61cda9e7E2b862688/7402b1d8dfbc5b03.png"
        class="open-card-img"
      />
      <div class="open-card-go" @click="goOpenCard"></div>
    </div>
  </Popup>
  <!-- 领取成功弹窗 -->
  <Popup v-model:show="overlay.gift">
    <div class="gift">
      <div class="gift-name">{{ getGift.giftName }}</div>
      <img :src="getGift.showImage" class="gift-img" />
      <div class="gift-address" v-if="getGift.type === 7" @click="goAddress();"></div>
      <div class="gift-noaddress" v-else></div>
    </div>
  </Popup>
  <!-- 信息 -->
  <Popup v-model:show="overlay.msg">
    <div class="msg">
      <div class="msg-list">
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
        <input type="text" v-model="formData.address" placeholder="街道门牌号" />
        <input
          type="text"
          v-model="formData.postalCode"
          placeholder="邮政编码"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="6"
        />
      </div>
      <div class="msg-check" @click="submitCheckOut()"></div>
    </div>
  </Popup>
  <!-- 地址 -->
  <Popup v-model:show="overlay.address">
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
  </Popup>
  <!-- 我的奖品 -->
  <Popup v-model:show="overlay.mygift">
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
  </Popup>
  <!-- 兑换记录 -->
  <Popup v-model:show="overlay.record">
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
  </Popup>
  <!-- 谢谢参与 -->
  <Popup v-model:show="overlay.thanks">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/210219/25/7098/83561/617bac33E0baf2c83/c15e6f98ae98ba99.png"
        class="open-card-img"
      />
    </div>
  </Popup>
  <!-- 无订单 -->
  <Popup v-model:show="overlay.noOder">
    <div class="open-card">
      <a @click="overlay.noOder = false">
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/104527/32/20470/603548/61cd7904E8488be53/ca8b61450cc6735c.png"
          class="open-card-img"
        />
      </a>
    </div>
  </Popup>
  <!--地址选择-->
  <Popup v-model:show="overlay.addressSelects" position="bottom">
    <Area
      title="请输入详细地址"
      :area-list="areaList"
      @confirm="confirmAddress"
      @cancel="overlay.addressSelects = false"
    />
  </Popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, Ref, nextTick,
} from 'vue';
import {
  Toast,
  Area,
  Overlay,
  Popup,
} from 'vant';
import { areaList } from '@vant/area-data';
import Swiper, { Autoplay } from 'swiper';
import { gotoSkuPage, gotoShopPage } from '@/utils/platforms';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { skuList } from './assets/skulist';
import './css/index.scss';
import JiuGongLottery from './JiuGongLottery/JiuGongLottery.vue';
import 'swiper/swiper.min.css';

Swiper.use([Autoplay]);

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo; const openCard = ref(false);

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;
// ------------------------------------------------------------
// 状态选项图标
const stateArr: Array<string> = ['//img10.360buyimg.com/imgzone/jfs/t1/204168/27/19914/8136/61cc2e21E647e61e0/9485ef6d334aca85.png', '//img10.360buyimg.com/imgzone/jfs/t1/216874/28/9489/12064/61cc2e21E31b448dc/7ec783ebe4706168.png', '//img10.360buyimg.com/imgzone/jfs/t1/216533/7/9457/11937/61cc2e21Ea90ff52d/93730eb5b09dbb49.png'];
const tabLevelIndex = ref(0);
let myLevel = 0;
const myNewGiftsStatus = ref(0);// 0 未领取 1 领取未填地址 2 领取已填地址
const newVipGiftId = ref('');
// ---------------------------------------------------------------
const overlay = ref({
  openCard: false,
  rule: false,
  mygift: false,
  record: false,
  gift: false,
  address: false,
  addressSelects: false,
  thanks: false,
  noOder: false,
  msg: false,
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
  newVip: '',
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

// 创建swiper组件
const swiperRef: Ref = ref(null);
let swiper: Swiper;
const creatSwiper = () => {
  if (swiperRef.value) {
    const mySwiper = new Swiper('#mySwiper', {
      slidesPerView: 'auto', // 自动适配多个swiper-item
      // direction: 'horizontal',
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper的父元素时，自动初始化swipe
      on: {
        slideChangeTransitionStart() {
          tabLevelIndex.value = mySwiper.activeIndex;
        },
      },
    });
    swiper = mySwiper;
  }
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
      if (data.data.userRecord.openCardStatus === 0) {
        openCard.value = false;
        // overlay.value.openCard = true;
      } else {
        openCard.value = true;
        myLevel = data.data.userRecord.noFlag + 1;
        tabLevelIndex.value = data.data.userRecord.noFlag + 1;
      }
      data.data.giftList.forEach((item: any) => {
        if (item.showAreaCode === '2') {
          getJiuGongGe(item.priceInfo);
          giftId.value.draw = item.id;
        } else if (item.showAreaCode === '1') {
          giftId.value.newVip = item.id;
        }
      });
      if (data.data.myNewGifts.length > 0) {
        newVipGiftId.value = data.data.myNewGifts[0].id;
        if (data.data.myNewGifts[0].giftAddress !== null) {
          myNewGiftsStatus.value = 2;
        } else {
          myNewGiftsStatus.value = 1;
        }
      } else {
        myNewGiftsStatus.value = 0;
      }
      nextTick(() => {
        creatSwiper();
        swiper.slideTo(tabLevelIndex.value);
      });
      restTimes.value = data.data.restTimes;
      rule.value = {
        drawRule: formatRule(data.data.drawRule),
        topRule: '',
        orderRule: '',
      };
      myDrawGifts.value = data.data.myDrawGifts;
    } else {
      Toast(data.errorMessage);
    }
  });
};

// 开卡链接
const goOpenCard = () => {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000088382/99/2201100008838201/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000088382&shopId=1000088382&channel=8076&returnUrl=${returnUrl}`;
};
const ruleText = ref('');
const showRule = (text: string) => {
  ruleText.value = text;
  overlay.value.rule = true;
};

const goLink = (href: string, level: number) => {
  if (myLevel !== level) {
    if (level === 1) {
      Toast('您不是新客');
    } else if (level === 2) {
      Toast('您不是老客');
    }
    return;
  }
  window.location.href = href;
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

const newVipGoAdddress = (id: string) => {
  formDataEmpty();
  formData.value.giftRecordId = id;
  overlay.value.msg = true;
};

const winnerId = ref(-1);
// 兑换礼品
const convertPrize = (id: string, type: number) => {
  if (!openCard.value) {
    overlay.value.openCard = true;
    return;
  }
  if (myLevel !== 1 && type === 1) {
    Toast('您不是新客');
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
      } else {
        newVipGoAdddress(data.data.id);
      }
    } else {
      Toast(data.errorMessage);
    }
  });
};

// 会员福利切换
const tabLevel = (index: number) => {
  // if (index === 1 && myLevel === 2) return;
  // if (index === 2 && myLevel === 1) return;
  tabLevelIndex.value = index;
  swiper.slideTo(index);
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
          overlay.value.msg = false;
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

const oldVipHref = (href: string) => {
  if (myLevel !== 2) {
    Toast('您不是老客');
    return;
  }
  Toast.loading({
    duration: 0,
    forbidClick: true,
  });
  cjwxRequest.post('/xhtxjy/memberDay/checkOldGift', {
    activityId,
    pin,
  }).finally(() => {
    Toast.clear();
  }).then((res) => {
    if (res.result) {
      if (res.data) {
        window.location.href = href;
      } else {
        overlay.value.noOder = true;
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};

const toTop = () => {
  document.documentElement.scrollTop = 0;
};

getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
</style>
