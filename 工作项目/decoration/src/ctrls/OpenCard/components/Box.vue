<template>
  <div class="member-gift-common">
    <div class="gift-box" @click.stop :style="{backgroundImage: `url(${bg})`}">
      <div class="gift-list">
        <div class="gift-item" v-for="(gift, index) in gifts" :key="`gift-${index}`">
          <img class="icon" :src="icons[gift.resType - 1]">
          <span class="amount">{{gift.sendNumPerson}}</span>
          <span class="unit">{{['元优惠券', '个京豆', '', '积分'][gift.resType - 1]}}</span>
          <span class="offset"></span>
          <span class="right">已获得</span>
        </div>
      </div>
    </div>
    <img class="btn-gift" :src="btn" @click="$emit('confirm')">
  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import CONST from '@/utils/constant';

// 礼包内容的icon 1-优惠券， 2-京豆， 4-积分
const icons = [
  require('../assets/gift-coupon.png'),
  require('../assets/gift-bean.png'),
  null,
  require('../assets/gift-point.png'),
];

const defaultOptions = {
  // 背景图片
  bg: require('../assets/bg-member.png'),
  // 确认按钮
  btn: require('../assets/btn-i-know.png'),
};

export default {
  name: 'CommonMemberGift',
  props: {
    options: {
      type: Object,
      // 默认是个空对象
      default: () => ({}),
    },
    gifts: {
      type: Array,
      default: () => [
        {
          resType: 1,
          sendNumPerson: 100,
        }, {
          resType: 2,
          sendNumPerson: 100,
        }, {
          resType: 4,
          sendNumPerson: 100,
        },
      ],
    },

  },
  data() {
    return {
      icons,
    };
  },
  computed: {
    bg() {
      return this.options.bg ? `${CONST.IMAGE_PREFIX}${this.options.bg}` : defaultOptions.bg;
    },
    btn() {
      return this.options.btn ? `${CONST.IMAGE_PREFIX}${this.options.btn}` : defaultOptions.btn;
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.member-gift-common {
  position: relative;
  width: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .gift-box {
    width: 5.6rem;
    height: 6.4rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .gift-list {
    padding-top: 2.8rem;
  }
  .gift-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.5rem;
    .icon {
      height: 0.8rem;
      vertical-align: top;
      margin-right: 0.05rem;
    }
    .amount {
      font-size: 0.48rem;
      color: #3399FF;
      font-weight: 800;
      margin-right: 0.05rem;
    }
    .unit {
      font-size: 0.3rem;
      color: $FONT_MAIN_BLACK;
    }
    .offset {
      flex: 1;
    }

    .right {
      color: $FONT_MINOR_GRAY;
      font-size: 0.2rem;
    }
  }
  .btn-gift {
    width: 4.4rem;
    height: 1rem;
    margin-top: -0.5rem;
  }
}
</style>
