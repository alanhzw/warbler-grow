<template>
  <div class="ctrl-member-coupon-result" :class="{mb15: data.mb15}">
    <div v-if="data.showTitle && coupons.length > 0" class="header">{{data.title}}</div>
    <div class="coupons" v-if="coupons.length > 0">
      <div v-for="coupon in coupons" :key="`c-coupon-${coupon.id}`" class="coupon-item" v-lz-click='104' v-lz-floor="floorInfo" @click="go2Link(coupon.activityUrl)">
        <div class="coupon-thumb">
          <span class="coupon-amount">{{coupon.couponDiscount}}</span>
          <div class="coupon-range-type">{{['', '店铺券', '商品券'][coupon.rangeType]}}</div>
          <div class="coupon-type">{{['京券', '东券'][coupon.couponType]}}</div>
          <div v-if="coupon.couponQuota > 0" class="coupon-limit">满{{coupon.couponQuota}}元可用</div>
          <div v-else class="coupon-limit">无使用限制</div>
        </div>
        <div class="coupon-name">{{coupon.activityName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 获取设备 1是客户端 2是移动端
import PageService from '@mobile/service';
import Service from '@/business/service';
import { LzLoading } from '@/utils/UI';
import utils from '@/utils';

const isB = sessionStorage.getItem('LZ_CRM_CLIENT_TYPE');

export default {
  name: 'CtrlMemberCouponResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },
  },
  computed: {
    coupons() {
      if (this.data.showExpire || isB == 1) {
        return this.data.coupons;
      }
      return this.data.coupons.filter(c => c.beginStatus < 3);
    },
  },
  data() {
    return {
      shopId: Number(utils.getShopId()),
    };
  },
  created() {
    this.getActivitiesList();
  },
  methods: {
    go2Link(url) {
      if (typeof url === 'string' && url !== '') {
        window.location.href = url;
      }
    },
    // 获取活动列表
    async getActivitiesList() {
      const loading = LzLoading.start();
      try {
        // 定义参数
        const params = {
          exchangeStatus: -9, // 全部
          isNow: 0, // 当前活动
          pageNo: 1, // 第一页
          pageSize: 9999, // 如果是手动选择代表每页条数   自动选择代表显示的数量
          total: 0,
          shopId: this.data.cShopId, // 店铺ID
          isHidden: +this.data.showExpire,
          searchActivityType: [321],
        };
        // 声明一个临时数组
        const dataArr = [];
        const activityIds = this.data.coupons;
        activityIds.forEach((item, index, arr) => {
          arr[index] = item.activityId;
        });
        // ②如果是客户端,调取b端接口
        if (isB == 1) {
          const { data } = await Service.getMemberCoupons({
            ...params,
            activityIds,
          });
          activityIds.forEach((activity) => {
            dataArr.push(data.find(item => item.activityId == activity));
          });
        } else {
          // ②如果是移动端,调取c端接口
          const { data } = await PageService.getMemberCoupons({
            ...params,
            activityIds,
            shopId: this.data.cShopId,
          });
          activityIds.forEach((activity) => {
            dataArr.push(data.find(item => item.activityId == activity));
          });
        }
        this.data.coupons = dataArr;
      } catch (error) {
        console.log('🚀🚀~ error:', error);
      } finally {
        loading.close();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-member-coupon-result {
  // @extend .ctrl;
  font-size: 0.32rem;
  text-align: left;
  align-items: center;
  word-break: break-word;

  .header {
    background-image: url(../assets/bg-title.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 4.6rem 0.14rem;
    text-align: center;
    font-size: 0.36rem;
    line-height: 0.48rem;
    letter-spacing: 0px;
    color: #333333;
    margin: 0.1rem;
  }

  .coupons {
    background-color: $WHITE;
    border-radius: 0.08rem;
    padding: 0.3rem;
    margin: 0 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .coupon-item {
    padding: 0;
    margin: 0;
  }

  .coupon-thumb {
    position: relative;
    width: 3rem;
    height: 1.6rem;
    background-image: url(../assets/bg-coupon.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    .coupon-amount {
      font-size: 0.5rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0.2rem;
      width: 1.1rem;
      text-align: center;
      // background-color: red;
      color: #f7c878;
    }

    .coupon-type {
      position: absolute;
      font-size: 0.2rem;
      color: #333333;
      right: 0.35rem;
      top: 0.08rem;
    }

    .coupon-limit {
      position: absolute;
      font-size: 0.2rem;
      left: 1.3rem;
      top: 0.95rem;
      letter-spacing: 0px;
      color: #333333;
    }

    .coupon-range-type {
      position: absolute;
      font-size: 0.3rem;
      left: 1.6rem;
      top: 0.5rem;
      letter-spacing: 0px;
      color: #333333;
    }
  }

  .coupon-name {
    width: 3rem;
    font-size: 0.24rem;
    margin-top: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    margin-bottom: 0.3rem;
  }
}
</style>
