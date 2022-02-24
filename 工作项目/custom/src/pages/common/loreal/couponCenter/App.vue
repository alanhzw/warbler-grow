<template>
  <div class="index pos-re">
    <div>
      <div class="user-infor">
        <img :src="userInfor.img" class="user-img" />
        <div>
          <p class="user-name">{{ userInfor.name }}</p>
          <div  v-if="userInfor.levelName" class="user-level">
            <div>{{ userInfor.levelName }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab">
      <div
        class="tab-button"
        v-for="item in tabList"
        :key="item.id"
        :class="{ 'tab-active': item.id === tabId }"
        @click="cutover(item.id)"
      >
        <div>{{ item.name }}</div>
        <b></b>
      </div>
    </div>
    <div class="coupon-list" v-if="couponList.length > 0">
      <div class="coupon-bk pos-re" v-for="item,index in couponList" :key="index">
        <div class="coupon">
          <div :class="{ 'op45': tabId !== 0 }">
            <div class="coupon-name">{{ item.couponName }}</div>
            <div class="coupon-time">{{ item.startTime }}至{{ item.endTime }}可用</div>
            <div class="coupon-inline">
              <div class="coupon-button" @click="getCouponQRCode(index)">立即使用</div>
              <div class="coupon-times">剩余{{ item.remainTimes ?? '0' }}次</div>
            </div>
          </div>
        </div>
        <div v-if="tabId !== 0">
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/206549/30/15457/11066/61dbfdc5Ef8311222/42ad54c4ab8b50e7.png"
            v-if="tabId === 1"
            class="coupon-watermark"
          />
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/203251/29/19530/11075/61dbfdc5E37b72b1f/fa526f35cbb7a6ed.png"
            v-else-if="tabId === 2"
            class="coupon-watermark"
          />
        </div>
      </div>
    </div>
    <div v-else class="coupon-no">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/141082/19/26384/43551/61dc0d9eEd4de9eee/e209f8c246e3368c.png"
      />
    </div>
  </div>
  <van-popup v-model:show="page.code" get-container="#app" class="full">
    <coupon-code-vue
      :show-code="page.code"
      :coupon-id="couponId"
      :code-infor="codeInfor"
      :coupon-desc="couponDesc"
      @code-back="codeBack"
      @code-end="codeEnd"
    ></coupon-code-vue>
  </van-popup>
  <van-popup v-model:show="page.end" get-container="#app" class="full">
    <end-vue :code-status="codeStatus" @go-Shop="gotoShopPage(venderId)" @end-back="endBack"></end-vue>
  </van-popup>
</template>

<script lang='ts' setup>
import { computed, inject, ref } from 'vue';
import {
  Toast,
  Area as vanArea,
  Popup as vanPopup,
} from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from './ts/baseInfo';
import { callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import couponCodeVue from './components/couponCode.vue';
import endVue from './components/end.vue';
import './css/app.scss';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

// 获取基本信息
const {
  nickname, pin, venderId,
} = baseInfo;

// 设置页面title
// document.title = actName;

const page = ref({
  code: false,
  end: false,
});
const userInfor = ref({
  name: nickname,
  img: '',
  levelName: '',
});

const tabList = [
  {
    id: 0,
    name: '可使用',
  },
  {
    id: 1,
    name: '已使用',
  },
  {
    id: 2,
    name: '已过期',
  },
];
const tabId = ref(1);
const couponList: any = ref([]);
const codeInfor = ref('');
const couponId = ref('');
const couponDesc = ref('');
const codeStatus = ref(true);

const getUserInfor = async () => {
  const res = await cjwxRequest.post('/wxActionCommon/getUserInfo', {
    pin,
  });
  userInfor.value.name = res.data.nicknameShow;
  userInfor.value.img = res.data.yunMidImageUrl ?? '//img10.360buyimg.com/imgzone/jfs/t1/218938/6/10162/3879/61d56cd9E0e54edd1/88aa717be1a3a959.jpg';
};

const getLevelAndPoint = async () => {
  const res = await cjwxRequest.post('/wx/lorealcoupon/getLevelName', {
    pin,
    venderId,
  });
  userInfor.value.levelName = res.data;
};

// 获取卡券列表
const getCouponList = async (state: string) => {
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post('/wx/lorealcoupon/getCouponList', {
      venderId,
      pin,
      state,
    });
    Toast.clear();
    if (res.result) {
      couponList.value = res.data;
    } else {
      Toast.fail(res.errorMessage);
    }
  } catch (error: any) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  } finally {
    Toast.clear();
  }
};

// 获取二维码内容
const getCouponQRCode = async (index: number) => {
  if (tabId.value !== 0) return;
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  const res = await cjwxRequest.post('/wx/lorealcoupon/getCouponQRCode', {
    venderId,
    pin,
    couponId: couponList.value[index].couponId,
    consumberId: couponList.value[index].consumberId,
  });
  Toast.clear();
  if (res.result) {
    couponId.value = couponList.value[index].couponId;
    couponDesc.value = couponList.value[index].couponDesc;
    codeInfor.value = res.data;
    page.value.code = true;
  }
};

const cutover = async (id: number) => {
  await getCouponList(String(id));
  tabId.value = id;
};

const init = () => {
  tabId.value = 0;
  getCouponList('0');
  getUserInfor();
  getLevelAndPoint();
};

const codeEnd = (statu: boolean) => {
  codeStatus.value = statu;
  page.value.end = true;
  page.value.code = false;
};

const codeBack = () => {
  page.value.code = false;
  init();
};

const endBack = () => {
  page.value.end = false;
  init();
};
// 初始化
init();

</script>

<style lang='scss'>
</style>
