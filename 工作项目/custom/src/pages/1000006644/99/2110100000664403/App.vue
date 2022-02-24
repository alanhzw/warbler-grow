<!--
 * @Author: 一尾流莺
 * @Description:【a2至初】品牌新客专享价
 * @Date: 2021-08-02 09:34:41
 * @LastEditTime: 2021-11-23 11:24:52
 * @FilePath: \custom\src\pages\1000006644\99\2110100000664403\App.vue
-->
<template>
  <!-- 【a2至初】品牌新客专享价 -->
  <div class='a2-page'
       v-if='isActivityOver !== 2'>
    <!-- 活动规则按钮 -->
    <div class='rule'
         @click='showRulePopup = true'></div>

    <!-- kv部分 -->
    <div class='kv'>
      <img src='./assets/background_0118.png'/>
    </div>

    <!-- 注册会员 -->
    <div class='register-member'>
      <img :src="require(`${new Date().getTime()>=1641916800000?'./assets/register_0111.png':'./assets/register.png'}`)"
           @click='go2OpenCard'/>
    </div>

    <!-- 第一步 -->
    <div class='first-step'>
      <!-- 立即填写按钮 -->
      <div class='fill-info'
           @click='fillInfo'></div>
      <img src='./assets/first.png'/>
      <!--      <img class="something"-->
      <!--           src="./assets/something.png" />-->
    </div>

    <!-- 第二步 -->
    <div class='second-step'>
      <!-- 联系客服按钮 -->
      <div class='contact'
           @click='contact'></div>
      <img src='./assets/new-second.png'/>
    </div>

    <!-- 第三步 -->
    <div class='three-step'>
      <img src='./assets/three.png'/>
    </div>

    <!-- 立即购买 -->
    <div class='goto-goods-info' v-if='isDate20220120'>
      <img src='./assets/400_0111.png'/>
    </div>

    <!-- 商品列表 -->
    <div>
      <div class='goods-list'>
        <div class='goods-item'
             v-for='item in newGoodsList'
             :key='item.sku'>
          <img :src='item.pic'/>
        </div>
      </div>
    </div>
    <!-- 第四步 -->
    <div class='four-step'>
      <img v-if='!isDate20220120' src='./assets/step_0118.png' >
      <img v-else src='./assets/step_0119.png' >
    </div>

    <!-- 活动规则弹窗 -->
    <van-popup v-model:show='showRulePopup'>
      <div class='rule-box'>
        <img class='rule-popup' v-if='!isDate20220120' src='./assets/rule_0118.png'>
        <img class='rule-popup' v-else src='./assets/rule_0119.png'>
      </div>
    </van-popup>

    <!-- 非品牌新客弹窗 -->
    <van-popup v-model:show='showNewPopup'>
      <div class='rule-box'
           @click='enterShop'>
        <img src='./assets/new.png'
             class='rule-popup'/>
        <div class='enter-shop-btn'
             @click='enterShop'></div>
      </div>
    </van-popup>

    <!-- 非品牌会员弹窗 -->
    <van-popup v-model:show='showOpenCardPopup'>
      <div class='rule-box'
           @click='go2OpenCard'>
        <img src='./assets/openCard.png'
             @click='go2OpenCard'
             class='rule-popup'/>
      </div>
    </van-popup>

    <!-- 个人信息弹窗 -->
    <van-popup v-model:show='showPersoalInfoPopup'>
      <div class='personal-info-box'>
        <input v-model='form.babyName'
               class='baby-name'
               maxlength='10'
               placeholder='宝宝名字'/>
        <input v-model='form.phone'
               type='tel'
               maxlength='11'
               class='baby-phone'
               placeholder='手机号码'/>
        <input v-model='form.verificationCode'
               type='tel'
               maxlength='8'
               class='baby-verificationCode'
               placeholder='验证码'/>
        <span class='baby-birthday-non'
              v-if='!form.babyBirthday'
              @click='showBirthDayPopup = true'>请选择日期</span>
        <span class='baby-birthday'
              v-else
              @click='showBirthDayPopup = true'>{{ form.babyBirthday }}</span>
        <span class='baby-verificationCodeTxt'
              :class='{ disabled: isDisabled }'
              @click='getverificationCode'>{{ form.verificationCodeTxt }}</span>
        <div class='click2authentication'
             @click='go2authentication'></div>
        <img src='./assets/personalInfo.png'/>
      </div>
    </van-popup>

    <!-- 申请成功弹窗 -->
    <van-popup v-model:show='showSuccessPopup'>
      <div class='personal-info-box'>
        <span class='user-name'>{{ nickName }}</span>
        <div class='go2contact'
             @click='contact'></div>
        <img src='./assets/passed.png'/>
      </div>
    </van-popup>

    <!-- 选择生日弹窗 -->
    <van-popup v-model:show='showBirthDayPopup'>
      <van-datetime-picker v-model='form.babyBirthday'
                           type='date'
                           @confirm='confirmBirthDay'
                           @cancel='cancelBirthDay'
                           @change='changeBirthDay'
                           title='选择日期'/>
    </van-popup>
  </div>

  <!-- 活动已结束 -->
  <div class='activity-over' v-else>
    <img src='./assets/activity_end.jpg'
         class='activity-over-img'/>
    <div class='activity-over-text1'>您来晚了,活动已经结束了</div>
    <div class='activity-over-text2'>下次记得早点来哦~</div>
    <div class='activity-over-btn'
         @click='enterShop'>进店逛逛
    </div>
  </div>
</template>

<script setup lang='ts'>
import {
  computed, ref, onMounted, reactive,
  inject,
} from 'vue';
import {
  Popup as VanPopup, Toast, DatetimePicker as VanDatetimePicker,
} from 'vant';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import new174 from './assets/new174.png';
import new189 from './assets/new189.png';
import new278 from './assets/new278.png';
import new318 from './assets/new318.png';
import new438 from './assets/new438.png';
import new99 from './assets/new99.png';

const isDate20220120 = ref(false);

// 商品列表  固定的四个
const
  newGoodsList = reactive([
    // {
    //   pic: new99, // 商品图
    //   sku: 99, // 商品sku
    // },
    // {
    //   pic: new438, // 商品图
    //   sku: 100, // 商品sku
    // },
    {
      pic: new174,
      sku: 101,
    },
    {
      pic: new318,
      sku: 102,
    },
    {
      pic: new278,
      sku: 104,
    },
    {
      pic: new189,
      sku: 105,
    },
  ]);

// 基本信息
const baseInfo: any = inject('baseInfo');
const isOpenCard: boolean = inject('isOpenCard') as boolean;

// 活动是否结束的状态
const isActivityOver = ref(1);
// 表单信息
const form = reactive({
  babyName: '',
  phone: '',
  babyBirthday: '',
  verificationCode: '',
  verificationCodeTxt: '点击获取验证码',
});
// 用户昵称
const nickName = ref('阿桑大事大撒旦');
// 短信验证码倒计时
const countdown = ref(-1);
// 发送短信按钮的颜色
const isDisabled = computed(() => countdown.value > -1); // 底部button是否可以点击
// 不符合规则弹窗
const showRulePopup = ref(false);
// 不是品牌新客弹窗
const showNewPopup = ref(false);
// 不是品牌会员弹窗
const showOpenCardPopup = ref(false);
// 个人信息弹窗
const showPersoalInfoPopup = ref(false);
// 选择生日弹窗
const showBirthDayPopup = ref(false);
// 申请成功弹窗
const showSuccessPopup = ref(false);
// 是否申请过令牌
const isGetToken = ref(0);

// 需要更换页面的时间
const pageTime = ref('2022-01-01');

// 进店逛逛
const enterShop = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000006644';
};

// 查看商品
const enterSku = (skuId: number) => {
  window.location.href = `https://wq.jd.com/item/view?sku=${skuId}`;
};
// 400g
const go400g = () => {
  window.location.href = 'https://item.jd.com/100017591045.html';
};
// 去开卡
const go2OpenCard = () => {
  const link = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000006644&shopId=1000006644&venderType=1&channel=7013&returnUrl=${link}`;
};

// 获取活动状态
const getActivityStatus = async () => {
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    // 返回  activityStatus  1：正常，2：活动结束，3：活动未开始
    // applyStatus  1：已领过；0：未领过
    const { data } = await cjwxRequest.post('/a2/newcus/timevalidate', {
      activityId: baseInfo.activityId,
      venderId: baseInfo.venderId,
      pin: baseInfo.pin,
    });
    isActivityOver.value = data.activityStatus;
    nickName.value = data.nickName;
    isGetToken.value = data.applyStatus;
    // 测试活动结束
    isActivityOver.value = 1;
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  } finally {
    Toast.clear();
  }
};
// 获取两个日期之间的差值
const getDayDiff = (date1: any, date2: any, unit: any) => {
  const myDate1 = typeof date1 === 'string' && date1.includes('-') ? date1.replace(/-/g, '/') : date1;
  const myDate2 = typeof date2 === 'string' && date2.includes('-') ? date2.replace(/-/g, '/') : date2;
  const map = {
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000,
    ms: 1,
  };
  return Math.abs((new Date(myDate2) as any - new Date(myDate1) as any) / (map[unit]) as any);
};

// 填写信息
const fillInfo = () => {
  if (!isOpenCard) {
    showOpenCardPopup.value = true;
    return false;
  }
  if (isGetToken.value) {
    showSuccessPopup.value = true;
    showPersoalInfoPopup.value = false;
  } else {
    showPersoalInfoPopup.value = true;
  }
  return true;
};

// 联系客服
const contact = () => {
  if (!isOpenCard) {
    showOpenCardPopup.value = true;
    return false;
  }
  window.location.href = 'https://jdcs.m.jd.com/pop/chat?venderId=1000006644';
  return true;
};

// 获取验证码
const getverificationCode = async () => {
  if (!form.phone) {
    Toast('请填写手机号码');
    return false;
  }
  if (countdown.value > -1) {
    return false;
  }
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res: any = await cjwxRequest.post('/a2/newcus/sendVerificationCode', {
      activityId: baseInfo.activityId,
      phone: form.phone,
      pin: baseInfo.pin,
    });
    if (res.isOk) {
      countdown.value = 60;
      const timer = setInterval(() => {
        form.verificationCodeTxt = `已发送短信(${countdown.value})`;
        countdown.value -= 1;
        if (countdown.value < 0) {
          window.clearInterval(timer);
          form.verificationCodeTxt = '点击获取验证码';
          countdown.value = -1;
        }
      }, 1000);
    } else if (res.msg) {
      Toast.fail(res.msg);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  } finally {
    Toast.clear();
  }
  return true;
};

// 确认生日的回调
const confirmBirthDay = (value: any) => {
  // 格式化
  let time: any = new Date(value);
  const Y = `${time.getFullYear()}-`;
  const M = `${time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1}-`;
  const D = `${time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}`;
  time = Y + M + D;
  form.babyBirthday = time.trim();
  showBirthDayPopup.value = false;
};

// 取消生日的回调
const cancelBirthDay = () => {
  form.babyBirthday = '';
  showBirthDayPopup.value = false;
};

// 修改生日的回调
const changeBirthDay = () => {
  form.babyBirthday = '';
};

// 去认证
const go2authentication = async () => {
  if (!form.babyName) {
    Toast('请填写宝宝名字');
    return false;
  }
  if (!form.phone) {
    Toast('请填写手机号码');
    return false;
  }
  if (!form.verificationCode) {
    Toast('请填写验证码');
    return false;
  }
  if (!form.babyBirthday) {
    Toast('请选择预产期或宝宝生日');
    return false;
  }
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res: any = await cjwxRequest.post('/a2/newcus/tokenRealization', {
      activityId: baseInfo.activityId,
      venderId: baseInfo.venderId,
      cjwxPin: baseInfo.pin,
      phone: form.phone,
      babyBirthday: form.babyBirthday,
      babyName: form.babyName,
      verificationCode: form.verificationCode,
      adSource: baseInfo.adSource,
    });
    // 测试认证结果
    // showNewPopup.value = true;
    // showPersoalInfoPopup.value = false;
    // showSuccessPopup.value = true;

    if (res.result) {
      // flag：1：正常，0：不符合条件
      if (res.data.flag === 0) {
        showNewPopup.value = true;
        showPersoalInfoPopup.value = false;
      }
      if (res.data.flag === 1) {
        nickName.value = res.data.nickName;
        showSuccessPopup.value = true;
        showPersoalInfoPopup.value = false;
      }
    } else {
      Toast.fail(res.errorMessage);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  } finally {
    Toast.clear();
  }
  return true;
};

onMounted(async () => {
  // 2022-01-20 12:00:00 准时上线
  if (new Date().getTime() >= 1642651200000) {
    isDate20220120.value = true;
  }

  await getActivityStatus();
  if (isActivityOver.value !== 2) {
    if (!isOpenCard) {
      showOpenCardPopup.value = true;
    }
  }

  if (isDate20220120.value) {
    newGoodsList.unshift(
      {
        pic: new99, // 商品图
        sku: 99, // 商品sku
      },
      {
        pic: new438, // 商品图
        sku: 100, // 商品sku
      },
    );
  }
});

</script>

<style lang='scss'>
@font-face {
  font-family: "Yuanti SC";
  src: url("./assets/STYuanti-SC-Regular.woff2") format("woff2"),
  url("./assets/STYuanti-SC-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

body {
  background: url("./assets/repeat.png") repeat-y;
  background-size: 100%;
}

.a2-page {
  width: 100vw;
  position: relative;

  img {
    width: 100%;
  }

  .rule {
    position: absolute;
    right: 0rem;
    top: 0rem;
    width: 1.5rem;
    height: 0.7rem;
  }

  .kv {
    width: 100%;
    height: 9.6rem;
  }

  .register-member {
    width: 88%;
    margin: 0 auto;
    margin-top: 0rem;
  }

  .first-step {
    position: relative;
    width: 88%;
    margin: 0 auto;
    margin-top: 0.2rem;

    .fill-info {
      position: absolute;
      top: 5.3rem;
      left: 2.3rem;
      width: 2rem;
      height: 0.5rem;
    }

    .something {
      position: absolute;
      display: block;
      width: 2.9rem;
      height: 0.25rem;
      top: -3.25rem;
      left: 1.85rem;
    }
  }

  .second-step {
    position: relative;
    width: 88%;
    margin: 0 auto;
    margin-top: 0.2rem;

    .contact {
      position: absolute;
      top: 3.8rem;
      left: 2.3rem;
      width: 2rem;
      height: 0.5rem;
    }
  }

  .three-step {
    width: 88%;
    margin: 0 auto;
    margin-top: 0.1rem;
  }

  .goto-goods-info {
    width: 88%;
    margin: 0 auto;
    margin-top: 0.1rem;
  }

  .goods-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 88%;
    margin: 0 auto;
    margin-top: 0.3rem;

    .goods-item {
      img {
        width: 3.2rem;
      }
    }
  }

  .four-step {
    width: 88%;
    margin: 0 auto;
    margin-top: 0.1rem;
  }

  .rule-box {
    position: relative;

    .rule-popup {
      width: 6.5rem;
    }

    .enter-shop-btn {
      position: absolute;
      bottom: 0.5rem;
      left: 0.9rem;
      width: 5rem;
      height: 1rem;
    }
  }

  .van-popup {
    background-color: transparent;
  }

  .personal-info-box {
    width: 100vw;
    height: 15rem;
    position: relative;
    background: url("./assets/line.png") repeat-y;
    background-size: 100%;

    img {
      width: 100%;
      background-size: contain;
      position: absolute;
      top: 0;
    }

    .go2contact {
      width: 3rem;
      height: 1rem;
      position: absolute;
      z-index: 9999;
      top: 10.7rem;
      left: 2.2rem;
    }

    .user-name {
      color: #82348e;
      display: inline-block;
      width: 100vw;
      text-align: center;
      position: absolute;
      z-index: 9999;
      top: 6.4rem;
      left: 0rem;
      font-size: 0.5rem;
      font-weight: 700;
      font-family: "Yuanti SC", "Yuanti SC";
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  .baby-name {
    top: 3.32rem;
    left: 1.5rem;
    z-index: 9999;
    position: absolute;
  }

  .baby-phone {
    top: 4.3rem;
    left: 1.5rem;
    z-index: 9999;
    position: absolute;
  }

  .baby-verificationCode {
    top: 5.3rem;
    left: 1.5rem;
    z-index: 9999;
    position: absolute;
  }

  .baby-birthday {
    z-index: 9999;
    position: absolute;
    left: 3.2rem;
    top: 6.46rem;
    font-size: 0.26rem;
    color: #f9efc5;
    display: inline-block;
    width: 3rem;
    text-align: left;
  }

  .baby-birthday-non {
    z-index: 9999;
    position: absolute;
    left: 3.2rem;
    top: 6.42rem;
    font-size: 0.26rem;
    color: #f9efc5;
    display: inline-block;
    width: 3rem;
    text-align: left;
  }

  .baby-verificationCodeTxt {
    z-index: 9999;
    position: absolute;
    left: 4.5rem;
    top: 5.3rem;
    font-size: 0.26rem;
    color: #f9efc5;
    display: inline-block;
    width: 2.5rem;
    text-align: center;
  }

  .click2authentication {
    z-index: 9999;
    position: absolute;
    left: 0.5rem;
    top: 7.5rem;
    font-size: 0.26rem;
    color: #f9efc5;
    display: inline-block;
    width: 6.5rem;
    height: 0.5rem;
    text-align: center;
  }

  input {
    z-index: 9999;
    position: absolute;
    border: none;
    font-size: 0.28rem;
    background-color: transparent;
    color: #f9efc5;

    &::-webkit-input-placeholder {
      color: #f9efc5;
    }
  }

  .disabled {
    color: #bbbbbb !important;
    border: none !important;
    border-radius: 4px !important;
  }
}

.activity-over {
  width: 100vw;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .activity-over-img {
    width: 4.5rem;
    height: 4.5rem;
  }

  .activity-over-text1 {
    margin-top: 0.5rem;
  }

  .activity-over-text2 {
    margin-top: 0.2rem;
    font-size: 0.4rem;
    color: rgb(102, 102, 102);
  }

  .activity-over-btn {
    width: 4.4rem;
    height: 0.9rem;
    margin-top: 0.2rem;
    line-height: 0.9rem;
    font-size: 0.4rem;
    text-align: center;
    color: rgb(255, 255, 255);
    background: rgb(0, 136, 223);
    border-radius: 0.55rem;
  }
}
</style>
