<!--
 * @Description:海报组件  目前支持:优惠券,云钻
 * @Autor: hanzhiwei
 * @Date: 2020-12-28 17:55:20
 * @LastEditTime: 2020-12-30 16:17:12
 * @FilePath: \SNActivity\src\components\pointsExchange\Banner.vue
-->
<template>
  <div class="banner-box">
    <div class="banner-bg" :style="options.style">
      <div class="banner-coupon" v-if="options.type === 2">
        <div class="banner-coupon-top">
          <div class="banner-coupon-left">
            <div class="money-icon">￥</div>
            <div class="money-number">{{activityInfo.couponDiscount}}</div>
            <div class="coupon-info">
              <p class="info-1">活动专享券</p>
              <p class="info-2">满{{activityInfo.couponQuota}}元使用</p>
            </div>
          </div>
        </div>
        <div class="banner-coupon-bottom">
          <span v-if='activityInfo.expireType == 1'>有效期：领取之日 {{activityInfo.couponValidateDay}} 天内</span>
          <span v-else>有效期：{{(activityInfo.couponBeginTime ? (activityInfo.couponBeginTime).slice(0,16) : '') + '至' +(activityInfo.couponEndTime ? (activityInfo.couponEndTime).slice(0,16): '')}}</span>
          <span v-if="activityInfo.rangeType == 1">全店使用</span>
          <span v-else>部分商品使用</span>
        </div>
      </div>
      <div class="banner-brilliant" v-if="options.type === 3">
        <div class="num">{{activityInfo.sendNumPerson}}</div>
        <div class="text">云钻</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  data () {
    return {

    };
  },
  methods: {

  }
};
</script>

<style lang="scss">
.banner-box {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.24rem;

  & > div {
    width: 100%;
    height: 100%;
  }

  .banner-bg {
    background-size: 100% 100%;

    .banner-coupon {
      width: 100%;
      height: 100%;

      .banner-coupon-top {
        width: 100%;
        height: 1.6rem;
        box-sizing: border-box;
        padding: 0 0.4rem;
        display: flex;
        justify-content: space-between;

        .banner-coupon-left {
          height: 100%;
          display: flex;
          justify-self: start;
          color: #ffffff;

          .money-icon {
            font-size: 0.2rem;
            line-height: 1.6rem;
          }

          .money-number {
            line-height: 1.6rem;
            font-size: 0.9rem;
          }

          .coupon-info {
            font-size: 0.24rem;
            margin-left: 0.2rem;
            margin-top: 0.4rem;

            .info-1 {
              font-size: 0.3rem;
              text-align: left;
            }

            .info-2 {
              text-align: left;
            }
          }
        }

        .banner-coupon-right {
          margin-top: 0.7rem;
          height: 0.4rem;
          width: 0.8rem;
          background: #ffffff;
          color: #ff3333;
          font-size: 0.24rem;
          text-align: center;
          line-height: 0.42rem;
          border-radius: 0.05rem;
        }
      }

      .banner-coupon-bottom {
        display: flex;
        justify-content: space-between;
        color: #a7a7a7;
        padding: 0 0.2rem;
        font-size: 0.22rem;
        height: 1rem;
        margin-top: 0.3rem;
      }
    }

    .banner-brilliant {
      width: 100%;
      height: 100%;

      .num {
        display: inline-block;
        height: 2.52rem;
        color: #ffffff;
        line-height: 2.52rem;
        font-size: 1rem;
        margin-left: 0.8rem;
      }

      .text {
        display: inline-block;
        font-size: 0.28rem;
        height: 2.52rem;
        color: #ffffff;
        line-height: 2.52rem;
        margin-left: 0.1rem;
      }
    }
  }
}
</style>