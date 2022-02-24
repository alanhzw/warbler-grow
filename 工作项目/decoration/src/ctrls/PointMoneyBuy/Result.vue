<template>
  <div class="ctrl-point-money-buy-result"
       :class="{ mb15: data.mb15 }">
    <div v-if="data.showTitle && activities.length > 0"
         class="header">{{ data.title }}</div>
    <div class="activities"
         v-if="activities.length > 0">
      <div v-for="activity in activities"
           :key="`c-activity-${activity.activityId}`"
           class="activity-item"
           v-lz-click="103"
           v-lz-floor="floorInfo"
           @click="go2Link(activity.activityUrl)">
        <div class="activity-avatar-box">
          <span class="activity-not-begin"
                v-if="activity.activityStatus == 1">未开始</span>
          <span class="activity-not-begin"
                v-if="activity.activityStatus == 3">已结束</span>
          <span class="activity-not-begin"
                v-if="activity.activityStatus == 4">暂停</span>
          <span class="activity-lever"
                v-if="activity.activityStatus == 2">
            <p>{{ levels[activity.supportLevels - 1] ? levels[activity.supportLevels - 1].levelName : '' }}{{ levels.length > 0 && levels.length - 1 > activity.supportLevels - 1 ? '及以上' : '' }}</p>
          </span>
          <img class="activity-avatar"
               :src="`${CONST.IMAGE_PREFIX}${activity.showPics}`" />
        </div>
        <div class="activity-name">{{ activity.activityName }}</div>
        <div class="activity-price">
          {{ activity.integralMin }}积分
          <span class="red">+{{ activity.discountPriceMin }}元</span>
        </div>
        <div class="activity-level">{{ activity.levelName }}以上会员可用</div>
      </div>
    </div>
  </div>
</template>

<script>
import PageService from '@mobile/service';
import CONST from '@/utils/constant';
import Service from '@/business/service';
import { LzLoading } from '@/utils/UI';
import utils from '@/utils';
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
  computed: {
    activities() {
      if (this.data.showExpire) {
        return this.data.activities;
      }
      return this.data.activities.filter(a => new Date((a.endTime || '').replace(/-/gi, '/')) > new Date());
    },
  },
  data() {
    return {
      levels: [],
      CONST,
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
          isNow: 1, // 当前活动
          pageNo: 1, // 第一页
          pageSize: 9999, // 如果是手动选择代表每页条数   自动选择代表显示的数量
          total: 0,
          shopId: this.data.cShopId, // 店铺ID
          isHidden: +this.data.showExpire,
          searchActivityType: [321],
        };
        // 声明一个临时数组
        const dataArr = [];
        const activityIds = this.data.activities;
        activityIds.forEach((item, index, arr) => {
          arr[index] = item.activityId;
        });
        // ②如果是客户端,调取b端接口
        if (isB == 1) {
          const { data } = await Service.getPointMoneyBuyActivities({
            ...params,
            activityIds,
            isHidden: 1,
          });
          activityIds.forEach((activity) => {
            const pre = data.find(item => item.activityId == activity);
            if (pre) {
              dataArr.push(pre);
            }
          });
        } else {
          // ②如果是移动端,调取c端接口
          const { data } = await PageService.getPointMoneyBuyActivities({
            ...params,
            activityIds,
            shopId: this.data.cShopId,
          });
          activityIds.forEach((activity) => {
            const pre = data.find(item => item.activityId == activity);
            if (pre) {
              dataArr.push(pre);
            }
          });
        }
        this.data.activities = dataArr;
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

.ctrl-point-money-buy-result {
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

  .activities {
    background-color: $WHITE;
    border-radius: 0.08rem;
    padding: 0.3rem;
    margin: 0 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .activity-item {
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
}
</style>
