<!--
 * @Description:实物发货详情页
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 18:58:47
 * @LastEditTime: 2021-01-08 11:54:50
 * @FilePath: \SNActivity\src\views\personalCenter\GoodsSendDetail.vue
-->
<template>
  <div class="goods-send-detail-box">
    <div v-if="form.dealStatus === -1" class="bg-white"></div>
    <div class="bg" :class="[bgStyle]">
      <p>{{statusText}}</p>
    </div>

    <div class="contain">
      <div class="top-side">
        <van-icon v-if="form.dealStatus === -1" name="location-o" color="#a7a7a7" size="0.4rem" />
        <van-icon v-else name="location-o" color="#0481ff" size="0.4rem" />
        <div class="info">
          <div class="name-phone">{{realNameStr}} &nbsp;&nbsp;&nbsp; {{mobileStr}}</div>
          <div class="address" v-if="form.province">{{form.province + '' + form.city}}{{form.county ? form.county : ''}}{{form.detailInfo}}</div>
        </div>
      </div>
      <div class="bottom-side">
        <van-icon v-if="form.dealStatus === -1" name="point-gift-o" color="#a7a7a7" size="0.4rem" />
        <van-icon v-else name="point-gift-o" color="#0481ff" size="0.4rem" />
        <div class="position">
          <div class="product-name">
            <span>{{form.prizeName}}</span>
          </div>
          <div class="product-log" v-if="form.dealStatus == 1">
            <span class="logistics">物流：{{form.deliverName}}</span>
            <span>运单号：{{form.deliverNo}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入封装api
import { personalCenterService } from '@/axios/apis';
export default {
  name: '',
  data () {
    return {
      pin: this.$route.query.pin || '', // 用户pin
      shopId: this.$route.query.shopId || '', // 店铺id
      orderCode: this.$route.query.orderCode || '', // 订单id
      form: {
        realName: '', // 姓名
        mobile: '', // 电话号
        province: '', // 省
        city: '', // 市
        county: '', // 区
        detailInfo: '', // 详细地址
      },
    };
  },
  computed: {
    realNameStr () {
      return this.form.realName.slice(0, 1) + '**';
    },
    mobileStr () {
      return (this.form.mobile + '').slice(0, 3) + '****' + (this.form.mobile + '').slice(7, 11);
    },
    addressStr () {
      return this.form.province + this.form.city + this.form.county + this.form.detailInfo;
    },
    statusText () {
      if (this.form.dealStatus === -1) {
        return '已取消';
      } else if (this.form.dealStatus === 0) {
        return '未发货';
      } else if (this.form.dealStatus === 1) {
        return '已发货';
      } else if (this.form.dealStatus === 9) {
        return '已完成';
      } else {
        return '';
      }
    },
    bgStyle () {
      if (this.form.dealStatus === -1) {
        return 'bgUrl-1';
      } else if (this.form.dealStatus === 0) {
        return 'bgUrl-2';
      } else if (this.form.dealStatus === 1) {
        return 'bgUrl-3';
      } else if (this.form.dealStatus === 9) {
        return 'bgUrl-4';
      } else {
        return 'bgUrl-1';
      }
    }
  },
  methods: {
    // 获取实物发货详情
    async getDetails () {
      let { data } = await personalCenterService['getDetails']({
        orderCode: this.orderCode,
        shopId: this.shopId,
        pin: this.pin
      });
      this.form = data.data;
    },
  },
  mounted () {
    this.getDetails();
  }
};
</script>

<style lang="scss">
.goods-send-detail-box {
  .bg-white {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.2);
    z-index: 100;
  }
  .bg {
    margin-top: 0.24rem;
    width: 100%;
    background: #ffffff;
    height: 2rem;
    padding: 0.3rem;
    box-sizing: border-box;
  }
  .bg p {
    font-size: 0.3rem;
    text-align: left;
    line-height: 0.7rem;
    color: #ffffff;
  }
  .bgUrl-1 {
    background: url('../../assets/img/detail-bg-gray.png') no-repeat;
    background-size: 100% 100%;
  }
  .bgUrl-2 {
    background: url('../../assets/img/detail-bg-red.png') no-repeat;
    background-size: 100% 100%;
  }
  .bgUrl-3 {
    background: url('../../assets/img/detail-bg-blue.png') no-repeat;
    background-size: 100% 100%;
  }
  .bgUrl-4 {
    background: url('../../assets/img/detail-bg-green.png') no-repeat;
    background-size: 100% 100%;
  }

  .contain {
    width: 100%;
    position: fixed;
    padding: 0.3rem;
    top: 1.2rem;
    box-sizing: border-box;

    .van-icon {
      display: flex;
      align-items: center;
      padding-right: 0.3rem;
    }

    .top-side {
      background: #ffffff;
      width: 100%;
      min-height: 2rem;
      border-radius: 0.1rem;
      display: flex;
      justify-content: flex-start;
      padding: 0.3rem;
      box-sizing: border-box;

      .info {
        width: 5rem;

        .name-phone {
          font-size: 0.32rem;
          color: #333333;
          font-weight: bold;
          text-align: left;
          padding: 0.2rem 0 0.1rem 0;
        }

        .address {
          text-align: left;
          color: #a7a7a7;
          font-size: 0.24rem;
          width: 80%;
        }
      }
    }

    .bottom-side {
      margin-top: 0.24rem;
      background: #ffffff;
      width: 100%;
      min-height: 2rem;
      border-radius: 0.1rem;
      padding: 0.3rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;

      .position {
        width: 100%;
        padding-right: 0.3rem;

        .product-name {
          display: flex;
          color: #333333;
          justify-content: space-between;
          font-size: 0.28rem;
          line-height: 0.6rem;
          text-align: left;
        }

        .product-log {
          text-align: left;
          color: #a7a7a7;
          font-size: 0.24rem;
          width: 100%;
        }

        .logistics {
          padding: 0.06rem;
          background: #f2f2f2;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>