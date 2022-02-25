<template>
  <!-- 列表 -->
  <div class="giftList">
    <div v-for="(gift) in prizes" :key="gift" class="line">
      <div class="item">
        <div class="icon" :style="`background-image: url(${icons[gift.resType - 1]})`"></div>
        <!-- <img class="icon" :src="icons[gift.resType - 1]"> -->
        <div>
          <span class="amount">{{gift.prizeName}}</span>
           <!-- <span class="unit">{{['元优惠券', '个京豆', '', '积分','促销令牌','元红包','礼品卡','张E卡','张plus会员','张爱奇艺会员'][gift.resType - 1]}}</span> -->
        </div>
      </div>
      <div v-if="gift.resType == 9 || gift.resType == 10" class="right1" @click="someurl">去激活</div>
      <div v-else class="right2">已发放</div>
    </div>
  </div>
</template>

<script>

// 礼包内容的icon 1-优惠券， 2-京豆，3-实物 4-积分 5-促销令牌 6-红包  7-礼品卡 8-E卡  9-plus会员  10-爱奇艺会员
export default {
  name: 'giftList',
  props: ['prizes'],
  data() {
    return {
      icons: [
        require('../assets/gift-coupon.png'),
        require('../assets/bean.png'),
        null,
        require('../assets/point.png'),
        null,
        require('../assets/gift-redPack.png'),
        null,
        require('../assets/gift-eCard.png'),
        require('../assets/gift-plus.png'),
        require('../assets/aqy.png'),
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
    width: 100%;
    height: 100%;
    padding: 0.2rem;
    position: absolute;
    overflow-y: auto;
    box-sizing: border-box;
}
.line {
    display: flex;
    justify-content: space-between;
    color: #ffd292;
    height: 0.7rem;
    line-height: 0.6rem;
    font-size: 0.26rem;
    margin-bottom: 0.2rem;
}
.icon {
    width: 0.56rem;
    height: 0.6rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 0.1rem;
}
.item {
    display: flex;
    justify-content: space-between;
}
.right1 {
    font-size: 0.24rem;
    width: 1rem;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: center;
    border: 1px solid #ffd292;
    border-radius: 0.3rem;
    margin-top: 0.1rem;
}
.right2 {
    width: 1rem;
    text-align: center;
    font-size: 0.24rem;
    color: #ffffff;
}
</style>
