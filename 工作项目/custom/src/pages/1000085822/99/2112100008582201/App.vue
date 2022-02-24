<template>
  <div id="main" v-cloak>
    <div v-show="!prizeShow">
      <div class="newPage">
        <div class="pubBg oldPage1">
          <div class="oldNickName">{{ nickName }}</div>
          <div class="oldPoint">积分余额：{{ point }}</div>
          <img
            v-if="isMsg == false"
            src="https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png"
            class="oldAvatar"
          />
          <img v-else :src="avatar" class="oldAvatar" />
          <div class="kvBtn" style="top: 1.8rem" @click="popupIndex = 1"></div>
          <div
            class="priceBtn"
            style="top: 2.6rem"
            @click="prizeShow = true"
          ></div>
        </div>
        <div class="pubBg oldPage2" :class="['orderCount' + orderCount]">
          <!--          活动详情按钮-->
          <!--                   @click='handleSmallBtnClick(item)'-->
          <button class="under-Btn" @click="popupIndex = 1" />
          <div class="orderBtnGroup">
            <div v-for="(item, index) in awardConfigs.list" :key="item.id">
              <div
                class="orderBtn"
                @click="ajaxGetCouponJump(item.giftId)"
                :class="['orderBtnIndex' + index, 'orderBtn' + item.status]"
              ></div>
            </div>
          </div>
          <div v-if="orderCount == 5" class="orderNowBtn"></div>
          <div
            v-else-if="orderCount != 0"
            class="orderNowBtn"
            @click="handleNowCoupon"
          ></div>
        </div>
        <div class="pubBg newPage5">
          <div @click="huangJia" class="one-skuleft"></div>
          <div @click="huangJia" class="one-skucenter"></div>
          <div @click="jinZhuang" class="one-skuright"></div>
        </div>
        <div class="getMore" @click="handleNowCoupon"></div>
        <!--        <div class='pubBg newPage5'>-->
        <!--          <div class='one-skuleft'-->
        <!--               @click='goToSku(1950744)'></div>-->
        <!--          <div class='one-skucenter'-->
        <!--               @click='goToSku(1950749)'></div>-->
        <!--          <div class='one-skuright'-->
        <!--               @click='goToSku(4548245)'></div>-->
        <!--        </div>-->
        <div class="pubBg footer">
          <div class="joinActivity" @click="joinActivity"></div>
          <div class="accumulatePoints">
            <div class="exchange" @click="exchange"></div>
            <div class="lotteryDraw" @click="lotteryDraw"></div>
          </div>
        </div>
      </div>
      <!--      活动规则弹窗-->
      <div class="popup-mask" v-show="popupIndex == 1">
        <div class="popup rule">
          <div class="context">
            <p>一、活动时间:</p>
            <p style="margin-top: 9px">自开卡加入会员后活动开始</p>
            <p style="margin-top: 27px">二、活动对象：</p>
            <p style="margin-top: 9px">美素佳儿海外自营官方旗舰店会员</p>
            <p style="margin-top: 27px">三、会员等级权益：</p>
            <p style="margin-top: 9px">
              1.所有用户需先加入会员后参与活动，老会员可直接跳转
            </p>
            <p style="margin-top: 9px">活动页面参加活动；</p>
            <p style="margin-top: 9px">（1）美素佳儿跨境等级权益</p>
            <p style="margin-top: 9px">第一关，可得100积分+开卡券包；</p>
            <p style="margin-top: 9px">第二关，可得满599减40元复购券/每月；</p>
            <p>第三关，可得满799减50元复购券/每月；</p>
            <p>第四关，可得满999减80元复购券/每月；</p>
            <p>第五关，可得满1299减130元复购券/每月；</p>
            <p>第六关，可得满1599减160元复购券/每月；</p>
            <p>*复购券每月每个ID可领取1次，逾期未领取失效。</p>
            <p>（2） 等级晋升规则</p>
            <p>领卡加入会员即可闯入会员第一关</p>
            <p>自2022年1月1日起，会员按照2022年1月1日之后的成</p>
            <p>功购买次数进行等级的晋升，详细如下：</p>
            <p>1、复购券除1段产品，港版金装2段，港版金装3段，港</p>
            <p>版金装4段以外均可使用，购买除1段产品，所有SKU均</p>
            <p>可参与闯关</p>
            <p>2、购买次数可累计，以开卡时间起计算1年清零</p>
            <p>3、次月只可以领取当前所处等级的优惠券，不可领取之</p>
            <p>前等级优惠券，如果当月未产生购买仍可领取当前所处等</p>
            <p>级优惠券，当月只可领取一张优惠券</p>
            <p>（已退款订单不计入，以确认收货为准）</p>
            <p>• 成功购买1次，升至第二关；</p>
            <p>• 成功购买2次，升至第三关；</p>
            <p>• 成功购买3次，升至第四关；</p>
            <p>• 成功购买4次，升至第五关；</p>
            <p>• 成功购买5次，升至第六关；</p>
          </div>
          <!--          <pre style='white-space: pre-wrap;'-->
          <!--               class='context'-->
          <!--               v-html='rule'></pre>-->
          <div class="closeBtn" @click="popupIndex = 0"></div>
        </div>
      </div>
      <!--      开卡弹窗-->
      <div class="popup-mask" v-show="!openCard">
        <div class="popup goToOpenCard">
          <div class="open-card-btn" @click="toOpenCard"></div>
        </div>
      </div>
    </div>
    <div class="popup-mask" v-show="prizeShow">
      <div class="popup prize-Kv">
        <div class="prize-content">
          <div v-if="giftList.length > 0">
            <div
              v-for="(it, index) in giftList"
              :key="index"
              class="prize-item"
            >
              <!--              <img :src="it.userImg ? it.userImg : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg'"-->
              <!--                   alt="头像">-->
              <div
                style="
                  width: 2.5rem;
                  text-align: center;
                  line-height: 0.6rem;
                  margin-left: 0.2rem;
                  margin-top: 0.2rem;
                "
              >
                {{ dateChange(it.createTime) }}
              </div>
              <div
                style="
                  width: 3rem;
                  text-align: center;
                  line-height: 0.6rem;
                  margin-left: -0.3rem;
                  margin-top: 0.2rem;
                "
                @click="getPrize(it.giftValue)"
              >
                {{ it.giftName }}
              </div>
            </div>
          </div>
          <div style="margin-top: -0.3rem" v-else>暂无获奖记录</div>
        </div>
        <div class="close-Prize" @click="prizeShow = false"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { inject, ref, reactive } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoShopPage } from '@/utils/platforms';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// const openCard = true;

/**
 * 收集
 * */
function getUrlQueryValueByKey(url: string, keyName: string) {
  const reg = new RegExp(`(^|[&?])${keyName}=([^&]*)(&|$)`);
  const r = url.match(reg);// search,查询？后面的参数，并匹配正则
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// 获取基本信息
const {
  activityId,
  actName,
  pin,
  venderId,
} = baseInfo;
// 头像是否有值
const isMsg = ref(false);
// 老活动id
const activityOld = ref<string>(baseInfo.activityId).value;
// 奖品页切换
const prizeShow = ref(false);
// 当前规则
const rule = ref('');
// 新活动ID
const activityNew = ref('');
// 店铺ID
const shopId = ref<string>(baseInfo.venderId).value;
// 用户Pin
const userPin = ref<string>(baseInfo.pin).value;
// 弹窗控制
const popupIndex = ref(0);
const ignoreState = ref('');
// 用户信息
const actor = reactive({ list: [] });
// 闯关信息
const awardConfigs = reactive({ list: [] });
// 会员当前等级
const orderCount = ref('');
// 关卡号
// const customerPass = ref('');
// 状态
const status = ref('');
// 开卡状态
const openStatus = ref(false);
// 用户id
const actorUuid = ref('');
// 奖品列表
const giftList = ref([]);
// 新会员券包状态
const getPrizeBtn = ref(false);
// 好友id
const friendUuid = ref(getUrlQueryValueByKey(window.location.href, 'shareUuid'));

const nickName = ref('');

const avatar = ref('');

const point = ref('');

function tracking() {
  window.location.href = 'https://lzkj-isv.isvjcloud.com/wxAssemblePage/largeSign';
}

// 日期补零
const appendZero = (obj: number) => {
  if (obj < 10) {
    return `0${obj}`;
  }
  return obj;
};
// 日期转换  yyy-mm-dd hh:mm
const dateChange = (date: any) => {
  // var _this = this;
  if (date == null) {
    return '';
  }
  // 日期转换
  const time = date;
  const now = new Date(time);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  // var hour = now.getHours();
  // var minute = now.getMinutes();
  const day = now.getDate();
  const dateStr = `${year}.${appendZero(month)}.${appendZero(day)}`;
  return dateStr;
};

// 当前时间
const nowTime = dateChange(Date.parse(String(new Date())));

// 开卡链接
const toOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000085822&shopId=1000085822&venderType=5&channel=401&returnUrl=${returnUrl}`;
};

// 埋点信息
const trackEvent = (info: any, url: any) => {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
    venderId: shopId,
    elementId: info,
    pageId: activityNew.value,
    pin: userPin,
  })
    .then();
  if (url) {
    window.location.href = url;
  }
};
// 跳转商品详情
const gotoSkuPage = (skuid: string) => {
  window.location.href = `https://item.m.jd.com/product/${skuid}.html?wjfrom=ISV_2180A2AFA5B2452F9061C01C053C4756_WX&wjwxpubid=wxd9fd3549c5fdb283&wjunionid=&wjopenid=`;
};

// 判断按钮状态
const btnStatus = (item: { receiveStatus: number; isRemaining: number; }) => {
  let btnState = null;
  if (item.receiveStatus === -1) {
    btnState = -1;
  }
  if (item.isRemaining === 0) {
    btnState = -2;
  }
  if (item.receiveStatus === 0) {
    btnState = 0;
  } else if (item.receiveStatus === 1) {
    btnState = 1;
  }
  return btnState;
};
// 奖品信息
const prizeList = () => {
  cjwxRequest.post('/common/brand/getDrawRecord', {
    activityId,
    venderId,
  })
    .then((res) => {
      // eslint-disable-next-line no-param-reassign
      // res = {
      //   count: 6,
      //   data: [
      //     {
      //       awardContent: null,
      //       giftName: '第一关',
      //       awardType: 1,
      //       createTime: 1630483198000,
      //     },
      //     {
      //       awardContent: null,
      //       giftName: '第一关',
      //       awardType: 1,
      //       createTime: 1630483198000,
      //     },
      //     {
      //       awardContent: null,
      //       awardName: '1499-150优惠券',
      //       awardType: 1,
      //       createTime: 1630483198000,
      //     },
      //     {
      //       awardContent: null,
      //       awardName: '1499-150优惠券',
      //       awardType: 1,
      //       createTime: 1630483198000,
      //     },
      //     {
      //       awardContent: null,
      //       awardName: '1499-150优惠券',
      //       awardType: 1,
      //       createTime: 1630483198000,
      //     },
      //     {
      //       awardContent: null,
      //       awardName: '1499-150优惠券',
      //       awardType: 1,
      //       createTime: 1630483198000,
      //     },
      //     {
      //       awardContent: null,
      //       awardName: '1499-150优惠券',
      //       awardType: 1,
      //       createTime: 1630483198000,
      //     },
      //   ],
      //   errorMessage: '',
      //   result: true,
      // };
      if (res.result) {
        console.log(res);
        giftList.value = res.data;
        // giftValue.value = res.data.giftValue;
        // console.log(giftValue);
      } else {
        Toast(res.errorMessage);
      }
    });
  return giftList.value;
};
// 领奖
const ajaxGetCouponJump = (giftId: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/friso/biRePurchase/receivePrize', {
    activityId,
    giftId,
    pin,
  })
    .then((data) => {
      if (data.result) {
        if (data.errorMessage) {
          Toast(data.errorMessage);
        } else {
          Toast('领取成功');
          prizeList();
          // eslint-disable-next-line no-use-before-define
          getActivityInfo();
          // debugger;
          window.location.href = data.data;
          // btnStatus(1);
          // window.location.reload();

          // window.location.href = res.data.awardContent;
        }
      } else {
        Toast(data.errorMessage);
      }
    });
  // .finally(() => {
  //   Toast.clear();
  // });
};
// 跳转领取奖品
const getPrize = (giftValue: any) => {
  console.log(giftValue);
  window.location.href = `https://quan.jd.com/pc/exchange_coupon.action?key=${giftValue}`;
};

const handleNowCoupon = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000085822';
};

const joinActivity = () => {
  window.location.href = 'https://jyds-isv.isvjcloud.com/page/index-20211228.php?instId=29&merchantNum=2000084&type=0&platform=2';
};
// 积分兑换
const exchange = () => {
  window.location.href = 'https://jyds-isv.isvjcloud.com/page/index-20211228.php?instId=14&merchantNum=2000084&type=0&platform=2';
};
// 积分抽奖
const lotteryDraw = () => {
  window.location.href = 'https://jyds-isv.isvjcloud.com/page/index-20211230.php?instId=60&merchantNum=2000084&type=6&platform=2';
};

const huangJia = () => {
  window.location.href = 'https://shop.m.jd.com/mshop/SearchList?venderId=1000085822&vendorId=1000085822&shopId=1000085822&shopCategoryId=6298605&sceneval=2&jxsid=16405892811602271124&ptag=138526.6.7';
};
const jinZhuang = () => {
  window.location.href = 'https://shop.m.jd.com/mshop/SearchList?venderId=1000085822&vendorId=1000085822&shopId=1000085822&shopCategoryId=6298806&sceneval=2&jxsid=16405892811602271124&ptag=138526.6.7';
};

// 解锁的按钮
const handleSmallBtnClick = (item: { receiveStatus: number; isRemaining: number; id: any; }) => {
  if (item.receiveStatus === -1) {
    return;
  }
  if (item.isRemaining === 0) {
    return;
  }
  ajaxGetCouponJump(item.id);
};

// 优惠券领取
const couponBtn = () => {
  const info = '领券包';
  const url = 'https://lzkj-isv.isvjcloud.com/a2Cross/activity';
  trackEvent(info, url);
};

// 跳转商品
const goToSku = (skuId: any) => { // 跳转商品详情页
  if (!skuId) return;
  trackEvent(`商品${skuId}`, null);
  gotoSkuPage(skuId);
};

// 获取用户信息
const getUserInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wxActionCommon/getUserInfo', {
    pin,
  })
    .then((data) => {
      if (data.result) {
        if (data.data) {
          nickName.value = data.data.nickname;
          if (data.data.yunMidImageUrl) {
            if (data.data.yunMidImageUrl.indexOf('.') !== -1) {
              avatar.value = data.data.yunMidImageUrl;
              isMsg.value = true;
            }
          }
        }
      } else {
        Toast(data.errorMessage);
      }
      // prizeList();
    })
    .finally(() => {
      Toast.clear();
    });
};
// 获取会员等级和积分
const getLevelAndPoint = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crmCard/common/coupon/getLevelAndPoint', {
    pin,
    venderId,
  })
    .then((data) => {
      // debugger;
      if (data.isOk) {
        point.value = data.point;
        console.log(point.value);
      } else {
        Toast(data.errorMessage);
      }
    })
    .finally(() => {
      Toast.clear();
    });
};
// 主接口
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/friso/biRePurchase/activityContent', {
    pin,
    activityId,
  })
    .then((data) => {
      // eslint-disable-next-line no-param-reassign
      // data = {
      //   result: true,
      //   data: {
      //     giftVOs: [
      //       {
      //         giftId: 'b0a362870f204509b421f4fcca558fb2',
      //         giftName: '第一关',
      //         customerPass: 1,
      //         status: 1,
      //         orderVal: 1,
      //       },
      //       {
      //         giftId: 'e48512f6409a4d779707e78a049b1ce6',
      //         giftName: '第二关',
      //         customerPass: 2,
      //         status: 1,
      //         orderVal: 2,
      //       },
      //       {
      //         giftId: 'e284af79b2294018a52e5b8bb67e7282',
      //         giftName: '第三关',
      //         customerPass: 3,
      //         status: 0,
      //         orderVal: 3,
      //       },
      //       {
      //         giftId: '0f71c8c01b32426c9e143aae3b9b95da',
      //         giftName: '第四关',
      //         customerPass: 4,
      //         status: 0,
      //         orderVal: 4,
      //       },
      //       {
      //         giftId: '147afac66d0a4e318e7cd6bd24d53451',
      //         giftName: '第五关',
      //         customerPass: 5,
      //         status: 0,
      //         orderVal: 5,
      //       },
      //       {
      //         giftId: 'f1197ae87ded4b56b1ffd81ad5e6f1a8',
      //         giftName: '第六关',
      //         customerPass: 6,
      //         status: 0,
      //         orderVal: 6,
      //       },
      //     ],
      //     nowCustomsPass: 1,
      //   },
      //   count: 0,
      //   errorMessage: '',
      // };
      if (data.result) {
        console.log(data);
        awardConfigs.list = data.data.giftVOs;
        console.log(awardConfigs.list);
        orderCount.value = data.data.nowCustomsPass;
        console.log(orderCount.value);
      } else {
        Toast(data.errorMessage);
      }
      prizeList();
      // eslint-disable-next-line no-param-reassign
      getLevelAndPoint();
    })
    .finally(() => {
      Toast.clear();
    });
};

// 规则
const getActivityRule = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        if (!res.data.rule) return;
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};

// 执行主接口
getActivityRule();
getActivityInfo();
getUserInfo();
// getPrize();
</script>

<style scoped>
[v-cloak] {
  display: none;
}

/*填写地址样式*/
#address {
  width: 100vw;
  height: 100vh;
  background: #f7f8fa;
}

.van-address-edit {
  padding: 0.2rem;
}

/*填写地址样式结束*/

button.feedback {
  overflow: hidden;
  position: relative;
}

button.feedback:active {
  -webkit-filter: brightness(80%);
  filter: brightness(80%);
}

button.feedback.gray100:active {
  -webkit-filter: grayscale(100%) brightness(80%);
  filter: grayscale(100%) brightness(80%);
}

.prize-item {
  display: flex;
  text-align: start;
  margin-left: 0rem;
  margin-bottom: 0.5rem;
  height: 0.6rem;
}

#main {
  width: 100%;
  max-width: 7.5rem;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  display: -webkit-flex;
  /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
  display: -moz-flex;
  /* Firefox 18+ */
  display: flex;
  /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
  align-items: center;
  flex-direction: column;
  /*padding-top:12rem;*/
  /*padding-bottom:1rem;*/
  background: #fffcf2;
}

#main .kvBtn {
  width: 1.4rem;
  height: 0.7rem;
  position: absolute;
  top: 0.5rem;
  right: 0;
  padding: 0;
  /*background: url("//img10.360buyimg.com/imgzone/jfs/t1/201762/17/20341/3083/61cac65eE37fc254c/9f0f8d825b0cb55d.png") no-repeat;*/
  background-size: 100%;
  border: none;
}

#main .priceBtn {
  width: 1.4rem;
  height: 0.6rem;
  position: absolute;
  top: 1rem;
  right: 0;
  padding: 0;
  /*background: url("//img10.360buyimg.com/imgzone/jfs/t1/159308/18/24990/3433/61cac65eE7a0b9ad4/a4dd481902c8e6e6.png") no-repeat;*/
  background-size: 100%;
  border: none;
}

.under-Btn {
  width: 1.6rem;
  height: 0.4rem;
  position: absolute;
  bottom: 0.15rem;
  left: 5.3rem;
  padding: 0;
  border: none;
  background: none;
}

.popup-mask {
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

/*弹窗样式*/
.popup {
  width: 6.8rem;
  height: 8.5rem;
  /*background: #fff;*/
  /*border: 0.08rem solid #fff;*/
  border-radius: 0.3rem;
  position: fixed;
  top: calc(50% - 7.9rem / 2);
  left: calc(50% - 7.06rem / 2);
}

.rule {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/110059/6/21052/7497/61cbca0fE9d7fdf86/308d29e96ddb7075.png")
    no-repeat;
  background-size: 100%;
  margin-left: 0.3rem;
}

.goToOpenCard {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/205997/13/19572/266842/61cbc9e9Ed5efceb2/b1ddd0267dd24061.png")
    no-repeat;
  background-size: 100%;
}

.close-Prize {
  position: absolute;
  width: 0.62rem;
  height: 0.62rem;
  background-size: 100%;
  bottom: 0.25rem;
  left: 3.1rem;
}

.prize-Kv {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/95482/29/20272/55865/61cbca56E54ad7068/66fdceb918d7d1a1.png")
    no-repeat;
  background-size: 100%;
  margin-left: 0.12rem;
}

.open-card-btn {
  position: absolute;
  width: 2.5rem;
  height: 0.7rem;
  top: 3.3rem;
  left: 2.2rem;
}

.popup .closeBtn {
  width: 0.6rem;
  height: 0.6rem;
  background-size: 100% 100%;
  position: absolute;
  top: 0rem;
  right: 0rem;
  border: none;
}

.popup .context {
  position: relative;
  /*padding: 0.2rem 0 0 0.2rem;*/
  width: 5.5rem;
  margin-top: 0.6rem;
  margin-left: 0.5rem;
  height: 6.7rem;
  overflow-y: scroll;
  overflow-x: hidden;
  color: #80591e;
  /*background-color: #0a4a39;*/
  /* word-break: keep-all; */
  white-space: pre-wrap;
  font-size: 0.22rem;
  font-family: sans-serif;
}

.prize-content {
  width: 5.8rem;
  height: 5.3rem;
  position: relative;
  margin-top: 2.3rem;
  margin-left: 0.5rem;
  display: flex;
  align-content: start;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  color: #80591e;
  /*font-weight: bold;*/
}

.popup ul.listTitle {
  width: calc(100% - 0.6rem);
  margin-top: 0.2rem;
  /*取值1*/
}

.popup ul.listTitle li {
  width: calc(100% / 3);
  line-height: 0.7rem;
  /*取值2*/
  font-size: 0.3rem;
  color: #000;
  text-align: center;
}

.popup ul.list {
  width: calc(100% - 0.6rem);
  height: calc(100% - 0.2rem - 0.7rem - 0.5rem - 0.3rem);
  /*外层高度 - 取值1 - 取值2 - 顶部距离 - 间距*/
  overflow-y: scroll;
}

.popup ul.list li {
  margin-bottom: 0.1rem;
}

.popup ul.list li p {
  width: calc(100% / 3);
  line-height: 0.7rem;
  font-size: 0.28rem;
  color: #000;
  text-align: center;
}

.popup ul.list li p span {
  display: inline-block;
  font-size: 0.22rem;
  color: #fff;
  text-align: center;
  width: 1.2rem;
  line-height: 0.4rem;
  background: #e13a50;
  border-radius: 0.2rem;
  margin-top: 0.15rem;
}

.popup .drawInfo {
  font-size: 0.32rem;
  color: #000;
  text-align: center;
  margin-top: 0.3rem;
}

.popup .drawImage {
  width: 3.5rem;
  height: 3rem;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 2rem;
}

.popup .drawImage.nothing {
  /*background-image:url("");*/
}

.popup .drawBtn {
  font-size: 0.3rem;
  color: #fff;
  text-align: center;
  line-height: 0.6rem;
  padding: 0 0.5rem;
  background: linear-gradient(to right, #0497e9, #39d0f8);
  border-radius: 1rem;
  position: absolute;
  bottom: 1rem;
}

.newPage {
  position: relative;
  width: 100%;
}

.pubBg {
  position: relative;
  width: 7.5rem;
  background-size: contain;
  background-repeat: no-repeat;
}

.newPage1 {
  height: 8.3rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/122724/27/13210/95830/5f69a1baE148ebd9e/a948136ae089cadd.jpg");
}

.newPage3 {
  height: 8.4rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/134383/11/12370/160556/5f890365E64f499c4/c3792fac2b306c0c.jpg");
}

.newPage4 {
  height: 4.8rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/162270/18/8625/120327/603c7d57Efda516a3/bc6d417a69e57ca8.jpg");
}

.newPage5 {
  height: 5.6rem;
  display: flex;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/213625/26/9276/234591/61cac1ccEf8baf399/b3079aacdc3f7b81.png")
    no-repeat;
  background-size: 100%;
}

.getMore {
  position: absolute;
  width: 2rem;
  height: 0.5rem;
  top: 17.6rem;
  left: 2.7rem;
  /*background-color: #0b78de;*/
}

.orderBtn.newPageOrderBtn {
  position: absolute;
  top: 3.78rem;
  right: 0.3rem;
}

.newPageNowCoupon {
  position: absolute;
  top: 1.9rem;
  left: 0.3rem;
  width: 6.9rem;
  height: 1.3rem;
}

.absNew {
  position: absolute;
  top: 6.9rem;
  left: 1.7rem;
  width: 4.1rem;
  height: 0.8rem;
}

.absTicket {
  position: absolute;
  top: 0rem;
  left: 0.5rem;
  width: 3.3rem;
  height: 3.3rem;
}

.absZero {
  position: absolute;
  top: 0rem;
  right: 0.4rem;
  width: 3.3rem;
  height: 3.3rem;
}

.absGold {
  position: absolute;
  top: 3.3rem;
  left: 0.5rem;
  width: 3.3rem;
  height: 3.6rem;
}

.absBaby {
  position: absolute;
  top: 3.3rem;
  right: 0.4rem;
  width: 3.3rem;
  height: 3.6rem;
}

.absUnlock {
  position: absolute;
  top: 6.9rem;
  left: 2.2rem;
  width: 3.2rem;
  height: 0.8rem;
}

.absShare {
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 7.5rem;
  height: 4.8rem;
}

.one-skuleft {
  /*position: absolute;*/
  /*top: 1rem;*/
  /*left: 0.5rem;*/
  margin-left: 0.4rem;
  margin-top: 1rem;
  width: 30%;
  height: 3.8rem;
}

.one-skucenter {
  /*position: absolute;*/
  /*top: 1rem;*/
  /*right: 0.2rem;*/
  margin-top: 1rem;
  width: 30%;
  height: 3.8rem;
}

.one-skuright {
  /*position: absolute;*/
  /*top: 5rem;*/
  /*left: 0.5rem;*/
  margin-top: 1rem;
  width: 30%;
  height: 3.8rem;
}

.three-skuleft {
  position: absolute;
  top: 10.3rem;
  left: 0.5rem;
  width: 3.2rem;
  height: 4.8rem;
}

.three-skuright {
  position: absolute;
  top: 10.3rem;
  right: 0.2rem;
  width: 3.5rem;
  height: 4.8rem;
}

.four-skuleft {
  position: absolute;
  top: 15.6rem;
  left: 0.5rem;
  width: 3.2rem;
  height: 5rem;
}

.four-skuright {
  position: absolute;
  top: 15.6rem;
  right: 0.2rem;
  width: 3.5rem;
  height: 5rem;
}

.oldPage1 {
  height: 5rem;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/157556/9/24831/343625/61cef023E15b2de6f/31ce90f4e1090e10.png")
    no-repeat;
  background-size: 100%;
}

.oldPage2 {
  height: 7.6rem;
}

.footer {
  height: 19rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/212025/20/9178/506239/61cac1cdE987f8f2c/44454536de31aaef.png")
    no-repeat;
  background-size: 100%;
}

.joinActivity {
  position: absolute;
  top: 2.5rem;
  width: 100%;
  height: 5rem;
}

.accumulatePoints {
  position: absolute;
  top: 7.7rem;
  width: 100%;
  height: 2.5rem;
  display: flex;
  /*background-color: rgba(76, 88, 11, .5);*/
}

.exchange {
  flex: 1;
}

.lotteryDraw {
  flex: 1;
}

.orderCount1 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/215939/5/9613/234742/61cf04ceE1a2399d1/bd9e674f738d754b.png")
    no-repeat;
  background-size: 100%;
}

.orderCount2 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/104377/31/19838/234957/61cf05a4Eff4a42ac/4e5f6a6c00417453.png")
    no-repeat;
  background-size: 100%;
}

.orderCount3 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/221044/39/7952/235656/61cf0627E31739e49/f7b5f30237d62197.png")
    no-repeat;
  background-size: 100%;
}

.orderCount4 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/157150/1/25662/236556/61cf0688Eb4e44602/22f38cc91e516d35.png")
    no-repeat;
  background-size: 100%;
}

.orderCount5 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/164706/27/23509/237025/61cf06d3E4a36bca1/31ae8ea6b5734670.png")
    no-repeat;
  background-size: 100%;
}

.orderCount6 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/213359/28/9708/233634/61cf0771Ebb2dd842/c71ea8caf1d96b3f.png")
    no-repeat;
  background-size: 100%;
}

.oldPage3 {
  height: 4.4rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/117853/23/3381/99333/5ea7d2caE5b2e0a7a/9f31e6006cb3eb30.jpg");
}

.oldPage4 {
  height: 7rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/119610/27/2013/180995/5ea7d2caEa124125e/b716cdc9e64f0efc.jpg");
}

.oldPage5 {
  height: 10.25rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/160716/4/5525/105848/601a6515E094ce137/ca4abf46da6dbb26.jpg");
}

.orderBtnGroup {
  position: absolute;
  right: 0.65rem;
  top: 0.62rem;
  width: 1.5rem;
  padding-top: 2.65rem;
}

.orderBtn {
  position: relative;
  width: 1.41rem;
  height: 0.55rem;
  margin: 0 auto 0.1rem;
}

/*未解锁*/
.orderBtn0 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/213745/27/9429/1813/61cc04cfE7870d67e/c4046dccb9d13a1e.png")
    no-repeat;
  background-size: 100%;
  border: none;
}

/*已开启*/
/*.orderBtn4 {*/
/*  background: url("./assets/openEnd.png") no-repeat;*/
/*  background-size: 100%;*/
/*  border: none;*/
/*}*/

/*已解锁可领取*/
.orderBtn1 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/220145/4/9290/1901/61cc0861E139835b8/159b419aa21b5bee.png")
    no-repeat;
  background-size: 100%;
  border: none;
}

/*已领取*/
.orderBtn2 {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/223096/31/7704/1545/61cc0861Ebdad99a5/1e454c6769565ff3.png")
    no-repeat;
  background-size: 100%;
  border: none;
}

/*无库存*/
.orderBtn3 {
  background: url("./assets/noStock.png") no-repeat;
  background-size: 100%;
  border: none;
}

/*未入会*/
/*.orderBtn2 {*/
/*  background: url("./assets/join.png") no-repeat;*/
/*  background-size: 100%;*/
/*  border: none;*/
/*}*/

.orderNowBtn {
  position: absolute;
  left: 0.3rem;
  width: 6.9rem;
  height: 1.8rem;
}

.newGetOrder {
  position: absolute;
  /* left: 0.3rem; */
  width: 7.5rem;
  height: 2.16rem;
  background: url("./assets/newMem.png") no-repeat;
  background-size: 100%;
}

.orderCount0 .orderNowBtn {
  top: 0.8rem;
  background: none;
  border: none;
}

.orderCount1 .orderNowBtn {
  top: 0.8rem;
}

.orderCount2 .orderNowBtn {
  top: 0.8rem;
}

.orderCount3 .orderNowBtn {
  top: 0.8rem;
}

.orderCount4 .orderNowBtn {
  top: 0.8rem;
}

.orderCount5 .orderNowBtn {
  top: 0.8rem;
}

.orderCount1 .orderBtnIndex1 {
  margin-top: 0.05rem;
}

.orderCount2 .orderBtnIndex2 {
  margin-top: 0.05rem;
}

.orderCount3 .orderBtnIndex3 {
  margin-top: 0.05rem;
}

.orderCount4 .orderBtnIndex4 {
  margin-top: 0.05rem;
}

.orderCount5 .orderBtnIndex5 {
  margin-top: 0.05rem;
}

.old-share {
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 7.5rem;
  height: 4.4rem;
}

.old-shop {
  position: absolute;
  top: 0rem;
  left: 0.3rem;
  width: 3.4rem;
  height: 3.4rem;
}

.hover-icon {
  position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.old-gold {
  position: absolute;
  top: 0rem;
  right: 0.3rem;
  width: 3.4rem;
  height: 3.4rem;
}

.old-lucky {
  position: absolute;
  top: 3.6rem;
  left: 0.3rem;
  width: 3.4rem;
  height: 3.4rem;
}

.old-baby {
  position: absolute;
  top: 3.6rem;
  right: 0.3rem;
  width: 3.4rem;
  height: 3.4rem;
}

.old-firstleft {
  position: absolute;
  top: 0rem;
  left: 0.3rem;
  width: 3.4rem;
  height: 4.9rem;
}

.old-firstright {
  position: absolute;
  top: 0rem;
  right: 0.3rem;
  width: 3.4rem;
  height: 4.9rem;
}

.old-secondleft {
  position: absolute;
  top: 5.2rem;
  left: 0.3rem;
  width: 3.4rem;
  height: 4.9rem;
}

.old-secondright {
  position: absolute;
  top: 5.2rem;
  right: 0.3rem;
  width: 3.4rem;
  height: 4.9rem;
}

.shop-area {
  width: 100%;
  height: 1.5rem;
  position: relative;
}

.shop-btn {
  background: url("./assets/gotoShop.png") no-repeat;
  background-size: 100%;
  position: absolute;
  left: calc(35%);
  bottom: calc(50% - 0.3rem);
  height: 0.54rem;
  width: 2.05rem;
  border: none;
}

.count-endtime {
  position: absolute;
  top: 3.8rem;
  width: 100%;
  text-align: center;
  color: #660180;
  font-size: 0.28rem;
}

.count-endtime2 {
  position: absolute;
  bottom: -0.15rem;
  width: 100%;
  text-align: center;
  color: #660180;
  font-size: 0.28rem;
}

.oldAvatar {
  display: block;
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 2.2rem;
  left: 0.3rem;
}

.oldNickName {
  position: absolute;
  width: 2rem;
  top: 2.6rem;
  left: 1.7rem;
  height: 0.24rem;
  line-height: 0.24rem;
  font-size: 0.21rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #004494;
}

.oldPoint {
  position: absolute;
  line-height: 0.24rem;
  width: 2rem;
  top: 3rem;
  left: 1.7rem;
  height: 0.24rem;
  font-size: 0.21rem;
  font-weight: bold;
  color: #004494;
}
</style>
