<template>
  <div class="ctrl-point-money-buy-result"
       :class="{mb15: data.mb15}">
    <div v-if="data.showTitle && (coupons.length > 0 || products.length > 0 || beans.length > 0)"
         class="header">{{data.title}}</div>

    <div class="coupons"
         v-if="coupons.length > 0">
      <div v-for="coupon in coupons"
           :key="`c-coupon-${coupon.id}`"
           class="coupon-item"
           v-lz-click='102'
           v-lz-floor="floorInfo"
           @click="go2Link(coupon)">
        <span class="activity-not-begin"
              v-if='coupon.beginStatus == 1'>未开始</span>
        <span class="activity-not-begin"
              v-if='coupon.beginStatus == 3'>已结束</span>
        <span class="activity-not-begin"
              v-if='coupon.beginStatus == 4'>暂停</span>
        <span class="activity-lever"
              v-if="coupon.beginStatus==2">
          <p>{{levels[coupon.supportLevels-1] ? levels[coupon.supportLevels-1].levelName : ''}}{{levels.length > 0 && levels.length - 1 > coupon.supportLevels-1 ? '及以上' : ''}}</p>
        </span>

        <div class="coupon-thumb">
          <span class="coupon-amount">{{coupon.couponDiscount}}</span>
          <div class="coupon-range-type">{{['', '店铺券', '商品券'][coupon.rangeType]}}</div>
          <div class="coupon-type">{{['京券', '东券'][coupon.couponType]}}</div>
          <div v-if="coupon.couponQuota > 0"
               class="coupon-limit">满{{coupon.couponQuota}}元可用</div>
          <div v-else
               class="coupon-limit">无使用限制</div>
        </div>
        <div class="seckill-bar">
          <span v-if="coupon.beginStatus == 1"
                class="label ">预告</span>
          <span v-if="coupon.beginStatus == 2"
                class="label">秒杀</span>
          <span v-if="coupon.beginStatus == 3"
                class="label">结束</span>
          <span v-if="coupon.beginStatus == 4"
                class="label">预告</span>

          <div class="time">
            <van-count-down class="style-count-down"
                            v-if="coupon.beginStatus == 3"
                            :time="Date.now() - Date.now()"
                            format="DD天HH时mm分ss秒" />
            <van-count-down class="style-count-down"
                            v-if="coupon.beginStatus == 1"
                            :time="Moment(coupon.startTime).valueOf() - Date.now()"
                            format="DD天HH时mm分ss秒" />

            <!-- <span v-if="coupon.beginStatus == 1" class="label preview">{{Moment(coupon.startTime).format('DD天HH时mm分ss秒')}}</span> -->
            <van-count-down class="style-count-down"
                            @finish='getPointActivities()'
                            v-if="coupon.beginStatus == 2  || coupon.beginStatus == 4"
                            :time="Moment(coupon.endTime).valueOf() - Date.now()"
                            format="DD天HH时mm分ss秒" />
          </div>
        </div>
        <div class="coupon-name">{{coupon.activityName}}</div>
        <p class="activity-desc">兑换积分：{{coupon.exchangeWay === 1 ? getPointRange(coupon.exchangeMemberPointNum, coupon.supportLevels) :coupon.exchangePointNum}}</p>
      </div>
    </div>

    <div class="activities"
         v-if="products.length > 0">
      <div v-for="activity in products"
           :key="`c-activity-${activity.activityId}`"
           class="activity-item"
           v-lz-click='102'
           v-lz-floor="floorInfo"
           @click="go2Link(activity)">
        <span class="activity-not-begin"
              v-if='activity.beginStatus == 1'>未开始</span>
        <span class="activity-not-begin"
              v-if='activity.beginStatus == 3'>已结束</span>
        <span class="activity-not-begin"
              v-if='activity.beginStatus == 4'>暂停</span>

        <span class="activity-lever"
              v-if="activity.beginStatus==2">
          <p>{{levels[activity.supportLevels-1] ? levels[activity.supportLevels-1].levelName : ''}}{{levels.length > 0 && levels.length - 1 > activity.supportLevels-1 ? '及以上' : ''}}</p>
        </span>
        <img class="activity-avatar"
             :src="`${CONST.IMAGE_PREFIX}${JSON.parse(activity.showPics)[0]}`">
        <div class="seckill-bar">
          <span v-if="activity.beginStatus == 1"
                class="label ">预告</span>
          <span v-if="activity.beginStatus == 2"
                class="label">秒杀</span>
          <span v-if="activity.beginStatus == 3"
                class="label">结束</span>
          <span v-if="activity.beginStatus == 4"
                class="label">预告</span>

          <div class="time">
            <van-count-down class="style-count-down"
                            v-if="activity.beginStatus == 3"
                            :time="Date.now() - Date.now()"
                            format="DD天HH时mm分ss秒" />
            <!-- <span v-if="activity.beginStatus == 1" class="label preview">{{Moment(activity.startTime).format('DD天HH时mm分ss秒')}}</span> -->
            <van-count-down class="style-count-down"
                            v-if="activity.beginStatus == 1"
                            :time="Moment(activity.startTime).valueOf() - Date.now()"
                            format="DD天HH时mm分ss秒" />

            <van-count-down class="style-count-down"
                            @finish='getPointActivities()'
                            v-if="activity.beginStatus == 2  || activity.beginStatus == 4"
                            :time="Moment(activity.endTime).valueOf() - Date.now()"
                            format="DD天HH时mm分ss秒" />
          </div>
        </div>
        <div class="activity-name">{{activity.activityName}}</div>
        <p class="activity-desc">兑换积分：{{activity.exchangeWay === 1 ? getPointRange(activity.exchangeMemberPointNum, activity.supportLevels) :activity.exchangePointNum}}</p>
      </div>
    </div>

    <div class="activities"
         v-if="beans.length > 0">
      <div v-for="activity in beans"
           :key="`c-activity-${activity.activityId}`"
           class="activity-item"
           v-lz-click='102'
           v-lz-floor="floorInfo"
           @click="go2Link(activity)">
        <span class="activity-not-begin"
              v-if='activity.beginStatus == 1'>未开始</span>
        <span class="activity-not-begin"
              v-if='activity.beginStatus == 3'>已结束</span>
        <span class="activity-not-begin"
              v-if='activity.beginStatus == 4'>暂停</span>

        <span class="activity-lever"
              v-if="activity.beginStatus==2">
          <p>{{levels[activity.supportLevels-1] ? levels[activity.supportLevels-1].levelName : ''}}{{levels.length > 0 && levels.length - 1 > activity.supportLevels-1 ? '及以上' : ''}}</p>
        </span>
        <img class="bean-avatar"
             src="../assets/bean.png">
        <div class="seckill-bar">
          <span v-if="activity.beginStatus == 1"
                class="label ">预告</span>
          <span v-if="activity.beginStatus == 2"
                class="label">秒杀</span>
          <span v-if="activity.beginStatus == 3"
                class="label">结束</span>
          <span v-if="activity.beginStatus == 4"
                class="label">预告</span>

          <div class="time">

            <!-- <span v-if="activity.beginStatus == 1" class="label preview">{{Moment(activity.startTime).format('DD天HH时mm分ss秒')}}</span> -->
            <van-count-down class="style-count-down"
                            v-if="activity.beginStatus == 1"
                            :time="Moment(activity.startTime).valueOf() - Date.now()"
                            format="DD天HH时mm分ss秒" />

            <van-count-down class="style-count-down"
                            v-if="activity.beginStatus == 3"
                            :time="Date.now() - Date.now()"
                            format="DD天HH时mm分ss秒" />
            <van-count-down class="style-count-down"
                            @finish='getPointActivities()'
                            v-if="activity.beginStatus == 2  || activity.beginStatus == 4"
                            :time="Moment(activity.endTime).valueOf() - Date.now()"
                            format="DD天HH时mm分ss秒" />
          </div>
        </div>
        <span class="send-num-person">{{activity.sendNumPerson}}</span>
        <div class="activity-name">{{activity.activityName}}</div>
        <p class="activity-desc">兑换积分：{{activity.exchangeWay === 1 ? getPointRange(activity.exchangeMemberPointNum, activity.supportLevels) :activity.exchangePointNum}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';
import PageService from '@mobile/service';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';
import Service from '@/business/service';
import utils from '@/utils';
import { LzLoading } from '@/utils/UI';

// 获取设备 1是客户端 2是移动端
const isB = sessionStorage.getItem('LZ_CRM_CLIENT_TYPE');
export default {
  name: 'CtrlPointMoneyBuyResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      Moment,
      labels: ['距离活动开始还有：', '距离活动结束还有：', '活动已结束'],
      levels: [],
      shopId: Number(utils.getShopId()),
    };
  },
  computed: {
    products() {
      if (this.data.showExpire || isB == 1) {
        return this.data.products;
      }
      // return this.data.products;

      return this.data.products.filter(a => new Date(a.endTime) > new Date());
    },
    coupons() {
      if (this.data.showExpire || isB == 1) {
        return this.data.coupons;
      }
      return this.data.coupons.filter(a => new Date(a.endTime) > new Date());
    },
    beans() {
      if (this.data.showExpire || isB == 1) {
        return this.data.beans;
      }
      return this.data.beans.filter(a => new Date(a.endTime) > new Date());
    },
  },
  created() {
    console.log('🚀🚀~ this,data:', this.data);
    // if (isB == 2) {
    //   this.data.products = []
    //   this.data.beans = []
    //   this.data.coupons = []
    // }
    this.getShopLevels();
    this.getPointActivities();
    console.log('🚀🚀~ this.data.products:', this.data.products);
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
    // 给活动列表赋值
    assignmentList(arr) {
      if (this.data.type == 311) {
        this.data.products = arr;
      } else if (this.data.type == 312) {
        this.data.coupons = arr;
      } else if (this.data.type == 313) {
        this.data.beans = arr;
      }
    },
    // 获取活动列表
    async getPointActivities() {
      const loading = LzLoading.start();

      try {
        // 定义参数
        const params = {
          exchangeStatus: -9, // 全部
          isNow: 0, // 当前活动
          pageNo: 1, // 第一页
          pageSize: this.data.showNum, // 如果是手动选择代表每页条数   自动选择代表显示的数量
          searchActivityType: [this.data.type], // 活动类型
          shopId: this.data.activityShopId || this.shopId, // 店铺ID
          selectType: +this.data.selectType, // 选择方式  1 手动选择  2自动选择
          sortType: +this.data.sortType, // 排序方式  1 创建时间倒序
          isHidden: '',
        };

        // 声明一个临时数组
        let dataArr = [];
        // ①先判断选择类型 如果是自动选择 则每次调取查询列表的接口进行赋值 参数不需要传活动id的数组
        if (this.data.selectType == 2) {
          // ②如果是客户端,调取b端接口
          if (isB == 1) {
            const { data } = await Service.getPointActivities(params);
            dataArr = data;
          } else {
            // ②如果是移动端,调取c端接口
            const { data } = await PageService.getPointActivities({
              ...params,
              shopId: this.$route.params.shopId,
              exchangeStatus: -1,
            });
            dataArr = data;
          }
          this.assignmentList(dataArr);
        } else {
          // ①先判断选择类型 如果是手动选择
          // ②如果是b端   则每次调取查询列表的接口进行赋值 参数需要传活动id的数组

          let activityIds = [];
          if (this.data.type == 311) {
            activityIds = this.data.products;
          } else if (this.data.type == 312) {
            activityIds = this.data.coupons;
          } else if (this.data.type == 313) {
            activityIds = this.data.beans;
          }
          activityIds.forEach((item, index, arr) => {
            arr[index] = item.activityId;
          });
          if (isB == 2) {
            const { data } = await PageService.getPointActivities({
              ...params,
              activityIds,
              shopId: this.$route.params.shopId,
              pageSize: 10,
              isHidden: +this.data.showExpire,
            });
            activityIds.forEach((activity) => {
              const pre = data.find(item => item.activityId == activity);
              if (pre) {
                dataArr.push(pre);
              }
            });
          } else {
            const { data } = await Service.getPointActivities({
              ...params,
              activityIds,
              shopId: this.data.activityShopId || this.shopId,
              pageSize: 10,
              isHidden: 1,
            });
            activityIds.forEach((activity) => {
              const pre = data.find(item => item.activityId == activity);
              if (pre) {
                dataArr.push(pre);
              }
            });
          }
          this.assignmentList(dataArr);
          console.log('🚀🚀~ dataArr:', dataArr);
        }
      } catch (error) {
        console.log('🚀🚀~ error:', error);
      } finally {
        loading.close();
      }
    },
    getPointRange(levelsStr, startLevel) {
      try {
        // 根据可兑换的最小等级筛选出来符合条件的等级设置信息
        const points = JSON.parse(levelsStr).filter(level => +level.level >= +startLevel).map(l => l.point);
        // 获取最大值和最小值
        const min = Math.min(...points);
        const max = Math.max(...points);
        if (min === max) {
          // 如果最大值和最小值相等就返回一个数字
          return min;
        }
        // 最大值最小值不等返回一个范围
        return `${min}-${max}`;
      } catch (e) {
        // 解析数据的时候报错了
        return '按照等级设置';
      }
    },
    go2Link(activity) {
      if (new Date(activity.startTime) > new Date()) {
        LzMsg.fail('活动未开始');
      } else if (new Date(activity.endTime) < new Date()) {
        LzMsg.fail('活动已结束');
      } else {
        const url = activity.activityUrl;
        if (typeof url === 'string' && url !== '') {
          window.location.href = url;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-point-money-buy-result {
  // @extend .ctrl;
  font-size: 0.32rem;
  text-align: left;
  align-items: center;
  word-break: break-word;

  .activity-lever {
    background-color: #3399FF;
    position: absolute;
    left: 0;
    font-size: 0.16rem;
    padding: 2px 5px;
    z-index: 1;
    color: #ffffff;
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
    color: #ffffff;
    padding: 2px 5px;
    z-index: 1;
    transform-origin: 0 0 0;
    transform: scale(0.7);
  }

  .seckill-bar {
    width: 3rem;
    height: 0.5rem;
    background-image: url('../assets/bg-seckill-bar.png');
    background-size: 100% 100%;

    margin-top: -0.1rem;
    font-size: 0.2rem;
    position: relative;

    .label {
      width: 0.8rem;
      margin-left: 0.1rem;
      margin-right: 0.05rem;
      color: #ffffff;
      text-align: center;
      position: absolute;
      top: 0.1rem;
      left: -0.02rem;
    }
    .preview {
      width: 2.3rem;
      left: 0.3rem;
      top: 0;
    }

    .time {
      text-align: right;
      position: absolute;
      top: 0.1rem;
      right: -0.2rem;
      transform-origin: 0 0 0;
      transform: scale(0.8);
      width: 2.5rem;

      .van-count-down {
        color: #ffffff;
        font-size: 0.2rem;
      }
    }
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

  .activities {
    background-color: $WHITE;
    border-radius: 0.08rem;
    padding: 0.3rem;
    margin: 0 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    .send-num-person {
      position: absolute;
      top: 0.6rem;
      left: 0.5rem;
      color: white;
      z-index: 1;
    }

    .activity-item {
      position: relative;
      .activity-avatar {
        width: 3rem;
        height: 3rem;
      }

      .bean-avatar {
        width: 3rem;
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
          color: #3399FF;
        }
      }

      .activity-level {
        margin-bottom: 0.3rem;
      }
    }
  }

  .activity-desc {
    text-align: center;
    font-size: 0.24rem;
    color: #b9934a;
    margin-top: 0;
    margin-bottom: 0.2rem;
  }

  .coupons {
    background-color: $WHITE;
    border-radius: 0.08rem;
    padding: 0.3rem;
    margin: 0 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  }

  .coupon-item {
    position: relative;
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
      left: 1.6rem;
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
    text-align: center;
    white-space: nowrap;
    word-break: break-all;
  }
}
</style>
