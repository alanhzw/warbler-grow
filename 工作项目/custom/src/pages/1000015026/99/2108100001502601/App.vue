<template>
  <div id='main'
       v-cloak>
    <div v-show='!prizeShow'>
      <div class='newPage'>
        <div class='pubBg oldPage1'>
          <button class='kvBtn'
                  style='top:0.7rem;'
                  @click='popupIndex = 1' />
          <button class='priceBtn'
                  style='top:1.2rem;'
                  @click='prizeShow = true' />
          <div class='count-endtime'
               v-if="nowTime < '2021.11.01'">
            优惠券领取后3日内有效
            <br />请尽快使用哟
          </div>
          <div class='count-endtime'
               v-if="nowTime >= '2021.11.10'&& nowTime < '2021.12.01'">（注意11.10-11.15优惠券不可用）
          </div>
          <div class='count-endtime2'
               v-if="nowTime >= '2021.11.10'&& nowTime < '2021.12.01'">11.16-11.30优惠券可用，需在此时段使用哦
          </div>
          <!-- <div class='count-endtime'
               v-if="nowTime >= '2021.12.01'">
          </div> -->
          <div class='count-endtime2'
               v-if="nowTime >= '2021.12.01'">优惠券需要在72h内使用哦
          </div>
        </div>
        <!--        <div style="position: relative;width: 7.5rem;height: 1rem;"></div>-->
        <div class='pubBg oldPage2'
             :class="['orderCount' + orderCount]">
          <button class='under-Btn'
                  @click='popupIndex = 1' />
          <div class='orderBtnGroup'>
            <div v-if='openStatus == false'
                 class='orderBtn orderBtn2'
                 @click='handleNoOpen'></div>
            <div v-if='openStatus == true'>
              <div class='orderBtn orderBtn4'
                   @click='couponBtn'></div>
              <!--              <div v-else class="orderBtn orderBtn1"></div>-->
            </div>
            <div v-for='(item,index) in awardConfigs.list'
                 :key='item.id'>
              <div class='orderBtn'
                   @click='handleSmallBtnClick(item)'
                   :class="['orderBtnIndex' + index, 'orderBtn' + btnStatus(item)]"></div>
            </div>
          </div>
          <div v-if='orderCount == 0'>
            <div v-if='openStatus == false'
                 class='orderNowBtn'
                 @click='handleNoOpen'></div>
            <div v-if='openStatus == true'>
              <div class='newGetOrder'
                   @click='handleNowCoupon'></div>
            </div>
          </div>
          <div v-else-if='orderCount == 5'
               class='orderNowBtn'></div>
          <div v-else-if='orderCount != 0'
               class='orderNowBtn'
               @click='handleNowCoupon'></div>
        </div>
        <!--<div class="pubBg newPage4">
          <track-button class="absShare" info="发起邀请"
                        url="https://lzkjdz-isv.isvjcloud.com/aptamil/inviteGetCoupon/activity?activityId=2101100000266801"
                        @click.native=""></track-button>
        </div>-->
        <div class='pubBg newPage5'>
          <div class='one-skuleft'
               @click='goToSku(1950744)'></div>
          <div class='one-skuright'
               @click='goToSku(1950749)'></div>
          <div class='two-skuleft'
               @click='goToSku(4548245)'></div>
          <div class='two-skuright'
               @click='goToSku(100009652703)'></div>
        </div>
        <div class='shop-area'>
          <button class='shop-btn'
                  @click='gotoShopPage(1000015026)' />
        </div>
      </div>
      <!--      弹窗蒙层-->
      <!--      <div class="popup-mask" v-show="popupIndex!==0" @click="popupIndex=0"></div>-->

      <!--      活动规则弹窗-->
      <div class='popup-mask'
           v-show='popupIndex == 1'>
        <div class='popup'>
          <pre style='white-space: pre-wrap;'
               class='context'
               v-html='rule'></pre>
          <button class='closeBtn'
                  @click='popupIndex = 0'></button>
        </div>
      </div>
    </div>
    <!-- <span class='hover-icon'
          style="right:0rem;top:8rem;width:1rem;height:1rem;background-image:url('//img10.360buyimg.com/imgzone/jfs/t1/170883/38/22251/702022/61725979E901bb604/6ed4c4c9f8589c27.gif')"
          @click='tracking'></span> -->
    <div v-show='prizeShow'
         class='prize-Kv'>
      <div class='prize-content'>
        <div v-if='giftList.length > 0'
             style='overflow-y: scroll;'>
          <div v-for='(it,index) in giftList'
               :key='index'
               class='prize-item'>
            <!--              <img :src="it.userImg ? it.userImg : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg'"-->
            <!--                   alt="头像">-->
            <div style='width: 3.5rem;'>{{ dateChange(it.createTime) }}</div>
            <div style='width: 3rem;'>{{ it.awardName }}</div>
          </div>
        </div>
        <div v-else>暂无获奖记录</div>
      </div>
      <div class='close-Prize'
           @click='prizeShow = false'></div>
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
// 会员等级
const orderCount = ref('');
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

// 奖品信息
const prizeList = () => {
  cjwxRequest.post('/old/welfare/myPrize', {
    activityId: activityNew.value,
    actorUuid: actorUuid.value,
    pageNo: '1',
    pageSize: '10',
  })
    .then((res) => {
      // eslint-disable-next-line no-param-reassign
      /* res = {
        count: 6,
        data: [
          {
            awardContent: null,
            awardName: '1499-150优惠券',
            awardType: 1,
            createTime: 1630483198000,
          },
          {
            awardContent: null,
            awardName: '1499-150优惠券',
            awardType: 1,
            createTime: 1630483198000,
          },
          {
            awardContent: null,
            awardName: '1499-150优惠券',
            awardType: 1,
            createTime: 1630483198000,
          },
          {
            awardContent: null,
            awardName: '1499-150优惠券',
            awardType: 1,
            createTime: 1630483198000,
          },
          {
            awardContent: null,
            awardName: '1499-150优惠券',
            awardType: 1,
            createTime: 1630483198000,
          },
          {
            awardContent: null,
            awardName: '1499-150优惠券',
            awardType: 1,
            createTime: 1630483198000,
          },
          {
            awardContent: null,
            awardName: '1499-150优惠券',
            awardType: 1,
            createTime: 1630483198000,
          },
        ],
        errorMessage: '',
        result: true,
      }; */
      if (res.result) {
        giftList.value = res.data;
      } else {
        Toast(res.errorMessage);
      }
    });
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

// 未开卡状态
const handleNoOpen = () => {
  // Toast('您还没有开通会员卡哦');
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000015026&shopId=1000015026&venderType=1&channel=7016&returnUrl=${window.location.href}`;
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

// 领奖
const ajaxGetCouponJump = (awardId: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/old/welfare/receivePrize', {
    activityId: activityNew.value,
    actorUuid: actorUuid.value,
    awardId,
  })
    .then((res) => {
      if (res.result) {
        if (res.errorMessage) {
          Toast(res.errorMessage);
        } else {
          Toast('领取成功');
          // eslint-disable-next-line no-use-before-define
          getActivityInfo();
          // btnStatus(1);
          // window.location.reload();
        }
        // window.location.href = res.data.awardContent;
      } else {
        Toast(res.errorMessage);
      }
      // console.log(res);
    })
    .finally(() => {
      Toast.clear();
    });
};

const handleNowCoupon = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000015026&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&ad_od=share&utm_user=plusmember&gx=RnEwwGUIbTHZmtRP--tzWwSmp8GMlKg03S4T';
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

// 主接口
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/old/welfare/activityContent', {
    pin: userPin,
    activityId: activityNew.value,
    shareUuid: friendUuid.value,
    ignore: ignoreState.value,
  })
    .then((res) => {
      // eslint-disable-next-line no-param-reassign
      // res = {
      //   count: 0,
      //   data: {
      //     jdActivityId: 0,
      //     miniShareImage: '',
      //     name: '会员闯关优惠活动',
      //     point: 1000,
      //     rule: '规则规则',
      //     shareContent: '分享内容',
      //     shareImage: '',
      //     shareTitle: '分享标题',
      //     actor: {
      //       actorUuid: '5a021a3f637d4b689fc37ef9de24f4e5',
      //       initialOpenStatus: true,
      //       jdNick: 'jd_XSvGCQCFgTRL',
      //       openStatus: false,
      //       orderCount: 0,
      //       pin: 'lr8PqT+bO2uP/yIMyEy4kvkaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw',
      //       pinImg: null,
      //     },
      //     awardConfigs: [
      //       {
      //         awardName: '优惠券1',
      //         awardNum: 100,
      //         awardSendNum: 0,
      //         awardType: 10,
      //         createTime: 1629698236000,
      //         id: 41,
      //         isRemaining: 1,
      //         receiveStatus: -1,
      //         unlockOrderCount: 1,
      //       },
      //       {
      //         awardName: '优惠券2',
      //         awardNum: 100,
      //         awardSendNum: 0,
      //         awardType: 10,
      //         createTime: 1629698236000,
      //         id: 42,
      //         isRemaining: 1,
      //         receiveStatus: -1,
      //         unlockOrderCount: 2,
      //       },
      //       {
      //         awardName: '优惠券3',
      //         awardNum: 100,
      //         awardSendNum: 0,
      //         awardType: 10,
      //         createTime: 1629698236000,
      //         id: 43,
      //         isRemaining: 1,
      //         receiveStatus: -1,
      //         unlockOrderCount: 3,
      //       },
      //       {
      //         awardName: '优惠券4',
      //         awardNum: 100,
      //         awardSendNum: 0,
      //         awardType: 10,
      //         createTime: 1629698236000,
      //         id: 44,
      //         isRemaining: 1,
      //         receiveStatus: -1,
      //         unlockOrderCount: 4,
      //       },
      //       {
      //         awardName: '优惠券5',
      //         awardNum: 100,
      //         awardSendNum: 0,
      //         awardType: 10,
      //         createTime: 1629698236000,
      //         id: 45,
      //         isRemaining: 1,
      //         receiveStatus: -1,
      //         unlockOrderCount: 5,
      //       },
      //     ],
      //   },
      //   errorMessage: '',
      //   result: true,
      // };
      if (res.result) {
        actor.list = res.data.actor;
        awardConfigs.list = res.data.awardConfigs;
        orderCount.value = res.data.actor.orderCount;
        openStatus.value = res.data.actor.openStatus;
        actorUuid.value = res.data.actor.actorUuid;
        if (Number(orderCount.value) >= 5) {
          orderCount.value = '5';
        }

        // if (that.openStatus==false){
        //   that.gotoOpencard();
        // }

        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      } else {
        Toast(res.errorMessage);
      }
      prizeList();
    })
    .finally(() => {
      Toast.clear();
    });
};

// 活动ID转译
const getFullActInfo = () => {
  cjwxRequest.get('/common/brand/getFullActInfoVo', {
    params: {
      activityId: activityOld,
    },
  })
    .then((data) => {
      activityNew.value = data.data.shareTitle;
      ignoreState.value = data.data.transferUrl2;
      getActivityInfo();
    })
    .finally(() => {
      Toast.clear();
    });
};

// 执行活动ID编译
getFullActInfo();

// 执行主接口
// getActivityInfo();
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

.close-Prize {
  position: absolute;
  width: 0.62rem;
  height: 0.62rem;
  background: url("./assets/closeBtn.png") no-repeat;
  background-size: 100%;
  bottom: 1rem;
  left: 3.4rem;
}

.prize-Kv {
  width: 7.5rem;
  height: 13.28rem;
  position: relative;
  background: url("./assets/prize-main.png") no-repeat;
  background-size: cover;
}

.prize-content {
  width: 100%;
  height: 7rem;
  position: relative;
  margin-top: 4.5rem;
  display: flex;
  align-content: start;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  color: #6d0189;
  /*font-weight: bold;*/
}

.prize-item {
  display: flex;
  text-align: start;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
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
  background: #e6e1e7;
}

#main .kvBtn {
  width: 1.45rem;
  height: 0.37rem;
  position: absolute;
  right: 0;
  padding: 0;
  background: url("./assets/ruleBtn.png") no-repeat;
  background-size: 100%;
  border: none;
}

#main .priceBtn {
  width: 1.45rem;
  height: 0.37rem;
  position: absolute;
  right: 0;
  padding: 0;
  background: url("./assets/myprice.png") no-repeat;
  background-size: 100%;
  border: none;
}

.under-Btn {
  width: 1.82rem;
  height: 0.5rem;
  position: absolute;
  bottom: 0.4rem;
  left: 2.7rem;
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
  height: 7.9rem;
  background: #fff;
  border: 0.08rem solid #fff;
  border-radius: 0.3rem;
  position: fixed;
  top: calc(50% - 7.9rem / 2);
  left: calc(50% - 7.06rem / 2);
}

.popup .closeBtn {
  width: 0.6rem;
  height: 0.6rem;
  background: url("./assets/closeBtn.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  border: none;
}

.popup .context {
  position: relative;
  padding: 0.2rem 0 0 0.2rem;
  width: 6.4rem;
  margin: 0 auto;
  height: 7.5rem;
  overflow: scroll;
  color: #63226e;
  /* word-break: keep-all; */
  white-space: pre-wrap;
  font-size: 0.22rem;
  font-family: sans-serif;
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
  height: 9.13rem;
  background: url("./assets/skuList.png") no-repeat;
  background-size: cover;
}s

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
  position: absolute;
  top: 1rem;
  left: 0.5rem;
  width: 3.2rem;
  height: 3.8rem;
}

.one-skuright {
  position: absolute;
  top: 1rem;
  right: 0.2rem;
  width: 3.5rem;
  height: 3.8rem;
}

.two-skuleft {
  position: absolute;
  top: 5rem;
  left: 0.5rem;
  width: 3.2rem;
  height: 4rem;
}

.two-skuright {
  position: absolute;
  top: 5rem;
  right: 0.2rem;
  width: 3.5rem;
  height: 4rem;
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
  height: 8.3rem;
  background: url("./assets/head.png") no-repeat;
  background-size: cover;
  margin-bottom: 0.3rem;
}

.oldPage2 {
  height: 7rem;
  margin-bottom: .2rem;
}

.orderCount0 {
  background: url("./assets/level0.png") no-repeat;
  background-size: 100%;
}

.orderCount1 {
  background: url("./assets/level1.png") no-repeat;
  background-size: 100%;
}

.orderCount2 {
  background: url("./assets/level2.png") no-repeat;
  background-size: 100%;
}

.orderCount3 {
  background: url("./assets/level3.png") no-repeat;
  background-size: 100%;
}

.orderCount4 {
  background: url("./assets/level4.png") no-repeat;
  background-size: 100%;
}

.orderCount5 {
  background: url("./assets/level5.png") no-repeat;
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
  right: 0.1rem;
  top: 0.62rem;
  width: 1.41rem;
  padding-top: 1.95rem;
}

.orderBtn {
  position: relative;
  width: 1.3rem;
  height: 0.55rem;
  margin: 0 auto 0.38rem;
}

/*未解锁*/
.orderBtn-1 {
  background: url("./assets/unlock.png") no-repeat;
  background-size: 100%;
  border: none;
}

/*已开启*/
.orderBtn4 {
  background: url("./assets/openEnd.png") no-repeat;
  background-size: 100%;
  border: none;
}

/*已解锁可领取*/
.orderBtn0 {
  background: url("./assets/collect.png") no-repeat;
  background-size: 100%;
  border: none;
}

/*已领取*/
.orderBtn1 {
  background: url("./assets/received.png") no-repeat;
  background-size: 100%;
  border: none;
}

/*无库存*/
.orderBtn-2 {
  background: url("./assets/noStock.png") no-repeat;
  background-size: 100%;
  border: none;
}

/*未入会*/
.orderBtn2 {
  background: url("./assets/join.png") no-repeat;
  background-size: 100%;
  border: none;
}

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
  top: 0.18rem;
  background: none;
  border: none;
}

.orderCount1 .orderNowBtn {
  top: 0.18rem;
}

.orderCount2 .orderNowBtn {
  top: 0.18rem;
}

.orderCount3 .orderNowBtn {
  top: 0.18rem;
}

.orderCount4 .orderNowBtn {
  top: 0.18rem;
}

.orderCount5 .orderNowBtn {
  top: 0.18rem;
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
</style>
