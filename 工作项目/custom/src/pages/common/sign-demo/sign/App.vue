<template>
  <div class="main-kv">
    <!--活动规则-->
    <div class="myRule-btn" @click="showRules"></div>
    <!--签到键-->
    <div class="draw-sign-ctn">
      <div v-if="signRecord.lastSignDate == null || signRecord.lastSignDate != nowDay"
           class="draw-sign-btn" @click="sign">立即点击签到 > </div>
      <div v-if="signRecord.lastSignDate == nowDay" class="draw-sign-btn">今日已签到</div>
    </div>
    <!--  日历主体-->
    <div class="sign-content">
      <div class="suday">
        {{day}}
      </div>
      <div class="date-sign">
        <div>
          连续签 <span style="font-size:0.3rem ">{{signRecord.contiSignNum}}</span> 天
        </div>
        <div>
          累计签 <span>{{signRecord.totalSignNum}}</span> 天
        </div>
      </div>
      <div class="sign-plate" ref="plate">
        <div class="draw-sign-week">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
        <div class="draw-sign-day">
          <template v-for="(it, index) in dateList" :key="index">
<!--            <span v-if="it.isDisabled"-->
<!--                  :class="{disabled: it.isDisabled, isign: it.isign, isgift: it.isgift}"></span>-->
            <span :class="{disabled: it.isDisabled, isign: it.isign, isgift: it.isgift}">{{it.day}}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>

<!--  &lt;!&ndash;  分享好友&ndash;&gt;-->
<!--  &lt;!&ndash;  <div class="share-area">&ndash;&gt;-->
<!--  &lt;!&ndash;    <div class="share-btn" :class="{gray:!shareStatus}" @click="share"></div>&ndash;&gt;-->
<!--  &lt;!&ndash;  </div>&ndash;&gt;-->

<!--  &lt;!&ndash;  弹窗组件&ndash;&gt;-->
<!--  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">-->
<!--    <open-card-window @openCard="toOpen" @closeMem="closeWindow" v-if="windowName === 'openWin'"></open-card-window>-->
<!--    <rule-window @closeRule="closeWindow" :myRule="rule" v-if="windowName === 'ruleWin'"></rule-window>-->
<!--    <fix-info-window @commitInfo="commitInfo" @closeFix="closeWindow" v-if="windowName === 'fixInfoWin'"></fix-info-window>-->
<!--    <no-quality @memPage="goActivity" @closeNoQ="closeWindow" v-if="windowName === 'noQualityWin'"></no-quality>-->
<!--  </Popup>-->

</template>

<script lang='ts' setup>
import './css/common.scss';
import { computed, inject, nextTick, Ref, ref } from 'vue';
import { CountDown, Popup, Toast } from 'vant';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import { reportClick, reportJoinEvent } from '@/utils/trackEvent/jdReport';
// import OpenCardWindow from './components/opencardWindow.vue';
// import RuleWindow from './components/ruleWindow.vue';
// import FixInfoWindow from './components/fixInfoWindow.vue';
// import NoQuality from './components/noQuality.vue';
import { BaseInfo } from '@/types/BaseInfo';
// import { callShare, gotoShopPage, gotoSkuPage } from '@/utils';

// Toast.allowMultiple();
// 分享渠道
const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 遮罩
const maskShow = ref(false);
// 弹窗名称
const windowName = ref('');
// 规则
const rule = ref('');
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const { activityId, venderId, shopId, endTime } = baseInfo;
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 后台签到数据
const signRecord = ref({});
const nowDay = ref('');
// 日历数据
const dateList = ref([]);
const day = ref('');
const day1 = ref('');
const systime = ref();
const strr = ref();
// -----------------------------------------------------------------------------------
// 开启弹窗
const openWindow = (name: string) => {
  windowName.value = name;
  maskShow.value = true;
};
// 关闭弹窗
const closeWindow = () => {
  maskShow.value = false;
};
// 获取活动信息;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${activityId}`)
    .then((res: { data: { rule: string; }; }) => {
      if (res.data) {
        const rules = res.data.rule.split('\r');
        rule.value = rules.join('<br/>');
      }
    });
};
// -----------------------------------------------------------------------------------
// 执行签到
const signUp = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      // 表明有礼物得到
      // if (data.gift != null) {
      //     vm.gift = data.gift;
      //     vm.shiwu.addressId = data.addressId;
      // }
      // 显示已签到弹窗
      // vm.showGongxi();

      // 重新获取信息
      // getActivityContent(vm, vm.systime);

    } else {
      Toast(res.errorMessage);
    }
  });
};
// 分享好友
// const share = () => {
//   // if (!isOpenCarded) {
//   //   openWindow('openWin');
//   //   return;
//   // }
//   callShare({
//     type: baseInfo.shareType,
//     title: '抽手机，赢大奖',
//     // imageUrl: actList.value.shareImg as string,
//     shareUrl: `${window.location.origin}/m/1000085868/99/2112100008586801/?helpUuid=${myUuid.value}` as string,
//     // afterShare: sharePoint,
//     channel: shareChannel.join(','),
//   });
// };

// 跳转开卡
const toOpen = () => {
  const returnUrl = encodeURIComponent(`${window.location.origin}/m/1000088382/99/2112100008838201/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000088382&shopId=1000088382&channel=8076&returnUrl=${returnUrl}`;
};
// 签到判断
const sign = () => {
  reportJoinEvent();
  if (!isOpenCarded) {
    toOpen();
  }
  signUp();
};
// const getSkuList = () => {
//   Toast.loading({
//     message: '加载中...',
//     forbidClick: true,
//   });
//   cjwxRequest.post('/act/common/findSkus', {
//     actId: activityId,
//     userId: shopId,
//     type: 99,
//   }).then((res) => {
//     if (res.isOk) {
//       res.skus.forEach((item: { logo: string | string[]; }) => {
//         if (item.logo.indexOf('360buyimg') === -1) {
//           item.logo = `https://img10.360buyimg.com/imgzone${item.logo}`;
//         }
//       });
//       skusList.value = res.skus;
//     } else {
//       Toast(res.msg);
//     }
//   });
// };

// 格式化日历列表
const getDateList = (signArr, giftArr, str) => {
  const date = str ? new Date(str) : new Date();
  // 当前是哪一年
  const year = date.getFullYear();
  // 当前是哪个月，注意这里的月是从0开始计数的
  const month = date.getMonth();

  // 当前月的第一天的日期
  const firstDay = new Date(year, month, 1);

  // 第一天是星期几
  const weekday = firstDay.getDay();

  // 求当前月一共有多少天
  // new Date(year,month+1,0) ： month+1是下一个月，day为0代表的是上一个月的最后一天，即我们所需的当前月的最后一天。
  // getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
  const days = new Date(year, month + 1, 0).getDate();
  // 上一月天数
  const prevDays = new Date(year, month, 0).getDate();
  // 下一月天数
  const nextDays = new Date(year, month + 2, 0).getDate();

  // console.log(prevDays, days, nextDays);

  // 总共6行，6*7 = 42，总共42格
  // 计算上一个月在这个月有几天占位
  const pixPrevDays = weekday === 7 ? 0 : weekday;

  // 计算下一个月在这个月有几天占位
  const pixNextDays = 42 - days - pixPrevDays;

  // console.log(pixPrevDays, pixNextDays);

  const arr = [];

  // 写入上一个月占位的天数
  const prevStartDay = prevDays - pixPrevDays + 1;
  for (let i = 0; i < pixPrevDays; i += 1) {
    arr.push({
      day: (prevStartDay + i),
      year,
      month,
      isDisabled: true,
      isign: false,
      isgift: false,
    });
  }

  // 写入本月天数
  for (let j = 0; j < days; j += 1) {
    // 写已签到日期
    let flag = false;
    for (let n = 0, nlen = signArr.length; n < nlen; n += 1) {
      const dayNumber = signArr[n];
      const dayJMonth = (month + 1) >= 10 ? (month + 1) : `0${month + 1}`;
      const dayJDay = (j + 1) >= 10 ? (j + 1) : `0${j + 1}`;
      const dayJTime = year.toString() + dayJMonth.toString() + dayJDay.toString();
      if (dayNumber === dayJTime) {
        flag = true;
      }
    }

    // 写已获奖日期
    let flagGift = false;
    for (let fg = 0, fglen = giftArr.length; fg < fglen; fg += 1) {
      const dayFgNumber = giftArr[fg];
      const dayflagGiftMonth = (month + 1) >= 10 ? (month + 1) : `0${month + 1}`;
      const dayflagGiftDay = (j + 1) >= 10 ? (j + 1) : `0${j + 1}`;
      const dayflagGiftTime = year.toString() + dayflagGiftMonth.toString() + dayflagGiftDay.toString();
      if (dayFgNumber === dayflagGiftTime) {
        flagGift = true;
      }
    }

    arr.push({
      day: (j + 1),
      year,
      month: month + 1,
      isDisabled: false,
      isign: flag,
      isgift: flagGift,
    });
  }

  // 写入下一个月占位的天数
  for (let m = 0; m < pixNextDays; m += 1) {
    arr.push({
      day: (m + 1),
      year,
      month: month + 2,
      isDisabled: true,
      isign: false,
      isgift: false,
    });
  }
  // console.log(arr);

  return arr;
};

// 活动信息
const activityContent = (sysTime) => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  // });
  cjwxRequest.post('/qqstar/growth/sign/activityContent', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    res = {
      result: true,
      data: {
        signDetail: {},
        wxSignRecord: {
          nicknameShow: null,
          id: '2b18aaa77e5744468636fb4e8728a4f5',
          venderId: 1000361242,
          actId: 'f5b1664a79dc4b30b493cdb86e4f5670',
          actName: '成长站每日签到',
          nick: 'YkWbAHvlcn+GCc06KyxFEE7oeVP9kq2pYSH90mYt4m3fwcJlClpxrfmVYaGKuquQkdK3rLBQpEQH9V4tdrrh0w==',
          phone: '',
          midUrl: 'http://storage.360buyimg.com/i.imageUpload/6a645f3438303666623636653066336531353637333231333832373234_mid.jpg',
          pin: 'YkWbAHvlcn+GCc06KyxFEE7oeVP9kq2pYSH90mYt4m3fwcJlClpxrfmVYaGKuquQkdK3rLBQpEQH9V4tdrrh0w==',
          lastSignDate: null,
          contiSignNum: 0,
          totalSignNum: 0,
          createTime: null,
          updateTime: null,
          remark: null,
        },
        followDays: 30,
        drawVo: {
          content: [
            {
              id: 953166,
              name: '50京豆',
              type: 6,
              position: 1,
              drawTime: null,
              showImage: null,
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: '0.50',
              itemId: null,
              addressStatus: null,
            },
            {
              id: 953167,
              name: '100京豆',
              type: 6,
              position: 2,
              drawTime: null,
              showImage: null,
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: '1.00',
              itemId: null,
              addressStatus: null,
            },
            {
              id: 953168,
              name: '布鲁可英雄-城市英雄',
              type: 7,
              position: 3,
              drawTime: null,
              showImage: 'https://img10.360buyimg.com/imgzone/jfs/t1/206666/19/7307/196801/617b41f0E92876440/a12f6f70955ce59b.jpg',
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: '32.00',
              itemId: null,
              addressStatus: null,
            },
            {
              id: 953169,
              name: '10积分',
              type: 9,
              position: 4,
              drawTime: null,
              showImage: null,
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: null,
              itemId: null,
              addressStatus: null,
            },
            {
              id: 953170,
              name: '20积分',
              type: 9,
              position: 5,
              drawTime: null,
              showImage: null,
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: null,
              itemId: null,
              addressStatus: null,
            },
            {
              id: 953171,
              name: '恐龙的诞生',
              type: 7,
              position: 6,
              drawTime: null,
              showImage: 'https://img10.360buyimg.com/imgzone/jfs/t1/200921/15/13695/151743/617b41f0Ea0d47815/ba7d2fe47454f586.jpg',
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: '38.00',
              itemId: null,
              addressStatus: null,
            },
            {
              id: 953172,
              name: '飞利浦电动牙刷',
              type: 7,
              position: 7,
              drawTime: null,
              showImage: 'https://img10.360buyimg.com/imgzone/jfs/t1/210662/9/7183/122237/617b41f0E7be2a7ee/fc0c3d4f81f7139a.jpg',
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: '158.00',
              itemId: null,
              addressStatus: null,
            },
            {
              id: 0,
              name: '谢谢参与!',
              type: 0,
              position: 0,
              drawTime: null,
              showImage: null,
              realValue: null,
              value: null,
              addressId: null,
              needWriteAddress: null,
              priceInfo: null,
              itemId: null,
              addressStatus: null,
            },
          ],
          id: '6640a9c25aa04415aafcb8d2a2369d2a',
          rule: '1、抽奖时间：2021-10-27 09:59 至 2021-11-26 09:59；\r\n2、抽奖机会：\r\n（1）初次赠送抽奖机会 99 次；\r\n（2）每人每天最多抽奖99次，活动期间每人累计抽奖不超过99次；\r\n3、订单信息可能稍有延迟，抽奖机会将尽快发放；\r\n4、预售订单需支付尾款后才能参与此活动；\r\n5、奖品数量有限，先到先得；\r\n6、若用户存在刷奖等恶意行为，一经发现将取消抽奖资格（如奖品已经发放，有权追回奖品）；\r\n注：奖品发放形式：\r\n实物奖：\r\n（1）中奖客户信息收集：页面弹屏提示中奖客户提供收货地址、号码和奖项；(超过1小时未填写对应收货信息，视为放弃)；\r\n（2）实物奖采取寄送方式发放，获奖用户需在开奖后填写姓名、联系电话、详细地址信息。如因用户原因无法联系上，即奖品作废不再补发，或如用户未填写真实有效的信息或填写收货信息不详，均视为放弃奖品；\r\n虚拟产品奖：\r\n（1）京豆、红包：中奖后系统预计24小时内自动发放至账户；\r\n（2）优惠券：中奖后需手动领取，预计24小时到账；\r\n【活动参与主体资格】\r\n（1）每位自然人用户仅能使用一个京东账号参与活动，微信号、QQ、京东帐号、手机号码等任一信息一致或指向同一用户的，视为同一个用户，则第一个参与本活动的账号参与结果有效，其余账号参与结果均视为无效。\r\n（2）若发现同一位用户使用不同账号重复参与活动，承办方有权取消其参与资格。\r\n【注意事项】\r\n（1）活动过程中，凡以不正当手段（如作弊领取、恶意套取、刷信誉、虚假交易、扰乱系统、实施网络攻击等）参与本次活动的用户，商家有权终止其参与活动，并取消其参与资格（如优惠已发放，商家有权追回），如给商家造成损失的，商家将保留向违规用户继续追索的权利。\r\n（2）如遇不可抗力(包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动中存在大面积作弊行为、活动遭受严重网络攻击或因系统故障导致活动中奖名单大批量出错，活动不能正常进行的)，商家有权取消、修改或暂停本活动。\r\n（3）是否获得优惠以活动发布者后台统计结果为准。\r\n',
          canDrawTimes: 0,
          hasJoinMan: 0,
          userId: 1000361242,
          styleId: null,
          member: null,
          drawConsume: 0,
          hasAddcartGive: false,
          needFollow: false,
          hasFollow: false,
        },
        rule: '1、活动时间：2021-11-01 00:00 - 2021-11-30 23:59。\r\n2、每累计签到3天，即可获得抽奖机会一次。\r\n3、达到累计签到天数并抽取奖品后，抽奖机会将会重新计算。\r\n4、加入成长站方可参与活动。\r\n5、抽奖成功后有机会获得奖品，也有可能会与奖品擦肩而过（奖品数量有限，先到先得）。\r\n6、若用户存在刷奖等恶意行为，一经发现将取消抽奖资格（如奖品已经发放，有权追回奖品）。\r\n7、奖品发放形式\r\n实物奖：\r\n（1）中奖客户信息收集：页面弹屏提示中奖客户提供收货地址、号码和奖项；(超过1小时未填写对应收货信息，视为放弃)。\r\n（2）实物奖采取寄送方式发放，获奖用户需在开奖后填写姓名、联系电话、详细地址信息。如因用户原因无法联系上，即奖品作废不再补发，或如用户未填写真实有效的信息或填写收货信息不详，均视为放弃奖品。\r\n虚拟产品奖：\r\n（3）京豆：中奖后系统预计24小时内自动发放至账户。\r\n（4）积分：中奖后系统预计24小时内自动发放至账户。\r\n8、活动参与主体资格\r\n（1）每位自然人用户仅能使用一个京东账号参与活动，微信号、QQ、京东帐号、手机号码等任一信息一致或指向同一用户的，视为同一个用户，则第一个参与本活动的账号参与结果有效，其余账号参与结果均视为无效。\r\n（2）若发现同一位用户使用不同账号重复参与活动，承办方有权取消其参与资格。\r\n9、注意事项\r\n（1）活动过程中，凡以不正当手段（如作弊领取、恶意套取、刷信誉、虚假交易、扰乱系统、实施网络攻击等）参与本次活动的用户，商家有权终止其参与活动，并取消其参与资格（如优惠已发放，商家有权追回），如给商家造成损失的，商家将保留向违规用户继续追索的权利。\r\n（2）如遇不可抗力(包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动中存在大面积作弊行为、活动遭受严重网络攻击或因系统故障导致活动中奖名单大批量出错，活动不能正常进行的)，商家有权取消、修改或暂停本活动。\r\n（3）是否获得优惠以活动发布者后台统计结果为准。\r\n',
      },
      count: 0,
      errorMessage: '',
    };
    if (res.result) {
      const reg = /[\u4e00-\u9fa5]/g;
      // vm.priceList = compareData(data.data.drawVo);
      // priceList = res.data.drawVo;
      signRecord.value = res.data.wxSignRecord;

      const arr = [];
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in res.data.signDetail) {
        arr.push(key);
      }
      const giftArr = [];
      // 实现日历列表
      dateList.value = getDateList(arr, giftArr, sysTime);
      console.log(dateList.value);
      // vm.statusList = data.data.statusList;
      // res.data.drawVo.content.forEach((item, index) => {
      //   if (item.type === 9) {
      //     item.name = item.name.replace(reg, '');
      //   }
      // });
    } else {
      Toast(res.errorMessage);
    }
    // Toast.clear();
  });
};
// 获取系统时间
const getSystime = () => {
  cjwxRequest.post('/common/getSystime', {}).then((res) => {
    if (res.isOk) {
      const weekStr = `星期${'日一二三四五六'.charAt(new Date().getDay())}`;
      const a = new Date();
      nowDay.value = dayjs(res.systime).format('YYYYMMDD');
      day.value = `${dayjs(res.systime).format('YYYY年MM月DD日')} ${weekStr}（今天）`;
      day1.value = dayjs(res.systime).format(`${a.getMonth() + 1}月${a.getDate()}日`);
      // console.log(data.systime);
      systime.value = res.systime;
      strr.value = weekStr;

      activityContent(res.systime);
      console.log(day1.value);
    } else {
      Toast(res.errorMessage);
    }
  });
};

getActivityInfo();
// activityContent();
// getSkuList();
getSystime();
</script>

<style lang='scss'>
.main-kv{
  background: url("./assets/sign-kv.png") no-repeat;
  background-size: 100%;
  width: 100%;
  position: relative;

  .draw-sign-ctn {
    margin-top: 3.4rem;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .draw-sign-btn {
      width: 4.72rem;
      height: .86rem;
      text-align: center;
      font-size: 0.4rem;
      font-weight: 600;
      color: #fff;
      background: url('./assets/sign-btn.png') no-repeat;
      background-size: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .sign-content {
    text-align: center;
    width: 6.91rem;
    height: 7rem;
    margin: .5rem auto;
    background: url('./assets/calendar-area.png') no-repeat;
    background-size: 100%;
    position: relative;

    .suday {
      padding-top: 0.2rem;
      color: #ffffff;
    }
  }
  .date-sign {
    width: 4rem;
    height: 0.65rem;
    line-height: 0.65rem;
    margin: 0.2rem auto 0;
    font-size: 0.35rem;
    color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #000000;
    border-radius: .15rem;
  }

  .date-sign .text {
    display: inline-block;
    background: #fff;
    border-radius: 50%;
    width: .6rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
  }
  .sign-plate {
    width: 6.2rem;
    height: 4.15rem;
    display: inline-block;
    margin: -0.4rem auto 0;
    position: relative;
    top: 0.3rem;
    z-index: 2;
  }
  .draw-sign-week {
    font-size: 0.35rem;
    padding-top: .2rem;
    height: 0.6rem;
    width: 6.1rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
  }

  .draw-sign-week span {
    font-size: 0.35rem;
    margin-left: .3rem;
    height: 0.6rem;
    width: 6.1rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    font-family: Arial, Helvetica, sans-serif;
  }

  .draw-sign-day {
    line-height: 0.5rem;
    margin-top: 0.14rem;
    margin-left: .08rem;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
  }

  .draw-sign-day span {
    width: 0.56rem;
    height: 0.5rem;
    line-height: 0.5rem;
    /* float: left; */
    /* margin-right: 0.15rem; */
    /* margin-left: 0.15rem; */
    font-size: 0.3rem;
    color: #263238;
    margin: .1rem .15rem 0;
  }

  .draw-sign-day span.disabled {
    opacity: .3;
  }

  .draw-sign-day span.isign {
    color: #FFF;
    width: 0.56rem;
    height: .5rem;
    background-color: #faa143;
    border-radius: 1rem;
    margin: .08rem .15rem 0;
  }
  .footer{
    background: url("./assets/sign-foot.png") no-repeat;
    background-size: 100%;
    width: 100%;
    height: .86rem;
  }
}

.gray-cover {
  background-color: rgba(0, 0, 0, .4);
}

.red-span {
  color: #e40909;
}

//.main-kv {
//  position: relative;
//  width: 100%;
//  margin: 0;
//  background: url("./assets/kv.png") no-repeat;
//  background-size: 100%;
//  color: #54320b;
//  -webkit-text-size-adjust:none;
//
//  .save-money-area{
//    position: relative;
//    width: 100%;
//    margin-top: 9.2rem;
//    display: flex;
//    flex-direction: column;
//    justify-content: center;
//    align-items: center;
//
//    .save-money-tile{
//      background: url("./assets/coupon-title.png") no-repeat;
//      background-size: 100%;
//      width: 3.62rem;
//      height: .46rem;
//    }
//    .save-money-coupon{
//      background: url("./assets/coupon.png") no-repeat;
//      background-size: 100%;
//      width: 7.08rem;
//      height: 2.47rem;
//      margin-top: 0.1rem;
//    }
//  }
//  .old-customer-prize{
//    position: relative;
//    width: 100%;
//    display: flex;
//    flex-direction: column;
//    justify-content: center;
//    align-items: center;
//
//    .old-customer-title{
//      background: url("./assets/act2-title.png") no-repeat;
//      background-size: 100%;
//      width: 5.42rem;
//      height: .47rem;
//      margin: .3rem auto;
//    }
//    .old-customer-area{
//      background: url("./assets/act2.png") no-repeat;
//      background-size: 100%;
//      width: 7.04rem;
//      height: 10.29rem;
//      font-size: 0.26rem;
//      position: relative;
//      display: flex;
//      flex-direction: column;
//      align-items: center;
//
//      .rule-btn {
//        position: absolute;
//        width: 1.2rem;
//        height: 0.4rem;
//        top: 0.9rem;
//        right: 0.28rem;
//        border-radius: 0.5rem 0 0 0.5rem;
//        font-size: 0.23rem;
//        display: flex;
//        align-items: center;
//        justify-content: center;
//        background-color: rgba(255, 255, 255, 0.9);
//        border-right-width: 0;
//        font-weight: 600;
//      }
//      .remain-num{
//        width: 100%;
//        text-align: center;
//        margin-top: 4.9rem;
//        font-weight: 600;
//        display: flex;
//        justify-content: center;
//        align-items: center;
//
//        >span{
//          width: .3rem;
//          height: .3rem;
//          background-color: #FFFFFF;
//          color: #e40909;
//          margin:0 .05rem;
//        }
//      }
//      .dotted{
//        background: url("./assets/dotted.png") no-repeat;
//        background-size: 100%;
//        width: 5.74rem;
//        height: 0.1rem;
//        margin: 0.1rem auto;
//      }
//      .old-customer-step{
//        background-color: #e40909;
//        color: #FFFFFF;
//        padding: 0.05rem 0.25rem;
//        font-size: .23rem;
//      }
//      .old-customer-text{
//        font-size: .17rem;
//        font-weight: 600;
//        margin: 0.13rem auto;
//      }
//      .book-btn{
//        border-radius: 1rem;
//        background-color: #ff9600;
//        width: 1.5rem;
//        height: 0.4rem;
//        display: flex;
//        justify-content: center;
//        align-items: center;
//        font-size: .23rem;
//        color: #FFFFFF;
//        margin-bottom: .2rem;
//      }
//      .fix-btn{
//        border-radius: 1rem;
//        background-color: #ff9600;
//        width: 1.5rem;
//        height: 0.4rem;
//        display: flex;
//        justify-content: center;
//        align-items: center;
//        font-size: .23rem;
//        color: #FFFFFF;
//        margin: .2rem auto;
//      }
//    }
//  }
//}

//曝光商品
//.sku-bg {
//  /* background-color: #de300b; */
//  width: 7.5rem;
//  margin: .5rem auto 0.5rem;
//  position: relative;
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//  /* border-radius: 0.1rem; */
//  /* border-bottom: 0.1rem solid #ffc50b; */
//
//  .sku-bg-title {
//    background: url("./assets/act3.png") no-repeat;
//    background-size: 100%;
//    width: 1.71rem;
//    height: 0.45rem;
//  }
//
//  .sku-area {
//    width: 96%;
//    margin: 0.1rem auto 0.3rem;
//    display: flex;
//    flex-wrap: wrap;
//    justify-content: flex-start;
//    align-items: center;
//
//    .sku-item {
//      background: url("./assets/act3-item.png") no-repeat;
//      background-size: 100%;
//      width: 2.4rem;
//      height: 2.61rem;
//      display: flex;
//      flex-direction: column;
//      align-items: center;
//      font-size: .2rem;
//      font-weight: 600;
//      color: #54320b;
//
//      > img {
//        width: 82%;
//        height: 1.5rem;
//        margin-top: 0.2rem;
//        border-radius: .1rem;
//      }
//
//      .sku-top {
//        overflow: hidden;
//        white-space: nowrap;
//        text-overflow: ellipsis;
//        word-break: break-all;
//        width: 80%;
//        margin-top: .05rem;
//      }
//
//      .sku-btn {
//        width: 1.5rem;
//        height: 0.3rem;
//        border-radius: 1rem;
//        background-image: linear-gradient(90deg, #875115, #5e390f);
//        border: none;
//        color: #f7e6cf;
//        margin-top: 0.03rem;
//        display: flex;
//        justify-content: center;
//        align-items: center;
//      }
//    }
//  }
//}
// 查看更多
//.see-more{
//  background: url("./assets/more.png") no-repeat;
//  background-size: 100%;
//  width: 4.25rem;
//  height: 0.94rem;
//  margin-bottom: 1rem;
//}

//.wrapper {
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  height: 100%;
//  width: 7.5rem;
//}

</style>
