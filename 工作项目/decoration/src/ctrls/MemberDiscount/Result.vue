<template>
  <div class="ctrl-member-discount-result"
       :class="{ mb15: data.mb15 }">
    <div v-if="data.showTitle && discounts.length > 0"
         class="header">{{ data.title }}</div>
    <div class="discounts"
         v-if="discounts.length > 0">
      <div v-for="discount in discounts"
           :key="discount.id"
           class="discount-item"
           v-lz-click="104"
           v-lz-floor="floorInfo"
           @click="go2Link(discount.activityUrl)">
        <div class="activity-avatar-box">
          <span class="activity-not-begin"
                v-if="discount.beginStatus == 1">未开始</span>
          <span class="activity-not-begin"
                v-if="discount.beginStatus == 3">已结束</span>
          <span class="activity-not-begin"
                v-if="discount.beginStatus == 4">暂停</span>
          <span class="activity-lever"
                v-if="discount.beginStatus == 2">
            <p>{{ levels[discount.supportLevels - 1] ? levels[discount.supportLevels - 1].levelName : '' }}{{ levels.length > 0 && levels.length - 1 > discount.supportLevels - 1 ? '及以上' : '' }}</p>
          </span>

          <img class="activity-avatar"
               :src="`${CONST.IMAGE_PREFIX}${discount.showPics}`" />
        </div>
        <!-- <div class="discount-thumb">
          <img class="product-pic"
               :src="`${CONST.IMAGE_PREFIX}${discount.showPics}`" />
        </div> -->
        <div class="discount-name"
             style="text-align:center">{{ discount.activityName }}</div>
        <div class="discount-name"
             style="color:#B9934A;text-align:center;font-size:0.25rem">优惠价：{{ discount.wareData && discount.wareData[0].salePrice }}</div>
        <div class="discount-name"
             style="text-align:center;margin-bottom:0.2rem">京东价：{{ discount.wareData && discount.wareData[0].showPrice }}</div>
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
import CONST from '@/utils/constant';

const isB = sessionStorage.getItem('LZ_CRM_CLIENT_TYPE');

export default {
  name: 'CtrlMemberdiscountResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },
  },
  computed: {
    discounts() {
      if (this.data.showExpire || isB == 1) {
        return this.data.discounts;
      }
      return this.data.discounts.filter(c => c.beginStatus < 3);
    },
  },
  data() {
    return {
      CONST,
      shopId: Number(utils.getShopId()),
      levels: [],
    };
  },
  async created() {
    await this.getShopLevels();

    this.getActivitiesList();
  },
  methods: {
    // 获取会员信息
    async getShopLevels() {
      const isB = sessionStorage.getItem('LZ_CRM_CLIENT_TYPE');

      if (isB == 1) {
        Service.getShopLevels().then(({
          data,
        }) => {
          this.levels = data.levels.map(l => ({
            level: l.level,
            levelName: l.levelName,
            pic: '',
          }));
        });
      } else {
        PageService.getShopLevels({
          shopId: this.$route.params.shopId,
        }).then(({
          data,
        }) => {
          this.levels = data.levels.map(l => ({
            level: l.level,
            levelName: l.levelName,
            pic: '',
          }));
        });
      }
    },
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
          searchActivityType: [322],
        };
        // 声明一个临时数组
        const dataArr = [];
        const activityIds = this.data.discounts;
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
        this.data.discounts = dataArr;
        console.log('🚀🚀~ dataArr:', dataArr);
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
@import "../style/common_ctrl";
@import "~lz-crm/style/variables";

.ctrl-member-discount-result {
  // @extend .ctrl;
  font-size: 0.32rem;
  text-align: left;
  align-items: center;
  word-break: break-word;
  .activity-lever {
    background-color: #3399ff;
    position: absolute;
    left: 0;
    font-size: 0.16rem;
    padding: 2px 5px;
    z-index: 1;
    transform-origin: 0 0 0;
    transform: scale(0.7);
    p {
      margin: 0;
    }
  }
  .activity-not-begin {
    background-color: #ff9900;
    position: absolute;
    left: 0;
    font-size: 0.16rem;
    padding: 2px 5px;
    z-index: 1;
    transform-origin: 0 0 0;
    transform: scale(0.7);
  }
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

  .discounts {
    background-color: $WHITE;
    border-radius: 0.08rem;
    padding: 0.3rem;
    margin: 0 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .discount-item {
    padding: 0;
    margin: 0;
  }

  .discount-thumb {
    position: relative;
    width: 3rem;
    height: 3rem;

    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    .discount-amount {
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

    .discount-type {
      position: absolute;
      font-size: 0.2rem;
      color: #333333;
      right: 0.35rem;
      top: 0.08rem;
    }

    .discount-limit {
      position: absolute;
      font-size: 0.2rem;
      left: 1.3rem;
      top: 0.95rem;
      letter-spacing: 0px;
      color: #333333;
    }

    .discount-range-type {
      position: absolute;
      font-size: 0.3rem;
      left: 1.6rem;
      top: 0.5rem;
      letter-spacing: 0px;
      color: #333333;
    }

    .product-pic {
      width: 100%;
      height: 100%;

      // border: 1px solid #333333;
    }
  }

  .discount-name {
    width: 3rem;
    font-size: 0.24rem;
    margin-top: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }

  .discount-item {
    .activity-avatar-box {
      position: relative;

      .activity-avatar {
        width: 3rem;
        height: 3rem;
      }
    }

    .activity-name {
      overflow: hidden;
      width: 3rem;
      font-size: 0.24rem;
      text-align: center;
    }

    .activity-level,
    .activity-price {
      text-align: center;
      font-size: 0.24rem;
      color: #b9934a;

      .red {
        color: #3399ff;
      }
    }

    .activity-level {
      margin-bottom: 0.2rem;
    }
  }
}
</style>
