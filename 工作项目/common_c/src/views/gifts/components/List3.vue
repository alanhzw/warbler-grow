<template>
  <!-- 列表 -->
  <div class="giftList">
    <img v-if="type === 'up'" class="up_title" src='../assets/up_title.png'/>
    <img v-if="type === 'f'" class="up_title" src='../assets/f_title.png'/>
    <img v-if="type === 'r'" class="up_title" src='../assets/r_title.png'/>
    <div v-for="(gift) in prizes" :key="gift" class="line">
      <div class="item">
        <div class="icon1" :style="`background-image: url(${icons[gift.resType - 1]})`"></div>
        <img class="icon2" src="../assets/border.png">
        <div class="prize_type">{{['优惠券', '京豆', '', '积分','促销令牌','红包','礼品卡','京东E卡','PLUS会员','爱奇艺会员'][gift.resType - 1]}}</div>
        <div class="prize_name">
          <span class="amount"  v-if="gift.resType !== 9 && gift.resType !== 10">{{gift.prizeName}}</span>
          <!-- <span class="unit">{{['元优惠券', '个京豆', '', '积分','促销令牌','元红包','礼品卡','张E卡','京东PLUS会员','爱奇艺会员'][gift.resType - 1]}}</span> -->
        </div>
        <div class="prize_msg">{{iconsMsg[gift.resType - 1]}}</div>
      </div>
      <img v-if="gift.resType == 9 || gift.resType == 10" class="right1" src="../assets/qvjihuo.png" @click="someurl"/>
      <div v-else class="right2">已发放</div>
    </div>
  </div>
</template>

<script>

// 礼包内容的icon 1-优惠券， 2-京豆，3-实物 4-积分 5-促销令牌 6-红包  7-礼品卡 8-E卡  9-plus会员  10-爱奇艺会员
export default {
  name: 'giftList',
  props: ['prizes', 'type'],
  data() {
    return {
      icons: [
        require('../assets/coupon.png'),
        require('../assets/u_bean.png'),
        null,
        require('../assets/u_point.png'),
        null,
        require('../assets/red.png'),
        null,
        require('../assets/e-card.png'),
        require('../assets/PLUS.png'),
        require('../assets/u_aqy.png'),
      ],
      iconsMsg: [
        '领券购物更优惠',
        '购物可抵扣现金',
        null,
        '',
        null,
        '',
        null,
        '',
        'PLUS会员购物更实惠',
        '爱奇艺会员大片随心看',
      ],
    };
  },
  methods: {
    someurl() {
      window.location.href = 'http://asset-m.jd.com/';
    },
  },
};
</script>

<style scoped>
.giftList {
    width: 92%;
    margin-left: 4%;
    margin-top: 6.2rem;
    margin-bottom: 1rem;
}
.up_title {
  width: 100%;
  margin-bottom: -0.1rem;
}
.line {
    width: 100%;
    height: 1.4rem;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    color: #ffd292;
    align-items: center;
    font-size: 0.26rem;
    margin-bottom: 1px;
    position: relative;
}
.icon1 {
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 0.21rem;
    left: 0.2rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.icon2 {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    top: 0.1rem;
    left: 0.1rem;
}
.prize_type {
  width: 1.2rem;
  color: #fff;
  font-size: 0.20rem;
  text-align: center;
  position: absolute;
  top: 0.98rem;
  left: 0.1rem;
}
.prize_name {
  position: absolute;
  top: 0.3rem;
  left: 1.5rem;
  color: #f2270c;
  font-size: 0.32rem;
}
.prize_msg {
  position: absolute;
  top: 0.8rem;
  left: 1.5rem;
  color: #d9d9d9;
  font-size: 0.24rem;
}
.item {
    display: flex;
    justify-content: space-between;
}
.right1 {
    width: 1.2rem;
    height: 0.44rem;
    margin-right: 0.2rem;
}
.right2 {
    width: 1.6rem;
    text-align: center;
    font-size: 0.24rem;
    color: #ffa161;
}
</style>
