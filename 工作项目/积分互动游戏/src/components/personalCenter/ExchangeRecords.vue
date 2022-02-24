<!--
 * @Description:积分兑换记录
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 13:40:21
 * @LastEditTime: 2021-01-11 10:18:01
 * @FilePath: \SNActivity\src\components\personalCenter\ExchangeRecords.vue
-->
<template>
  <div class="exchange-records-box">
    <van-cell v-for="(item) in dataList" :key="item.id">
      <div class="list">
        <!-- 实物商品 -->
        <van-icon v-if="item.activityType == 301" name="point-gift-o" color="#666666" size="0.5rem" />
        <!-- 优惠券 -->
        <van-icon v-else-if="item.activityType == 302" name="coupon-o" color="#666666" size="0.5rem" />
        <!-- 云钻 -->
        <van-icon v-else-if="item.activityType == 303" name="gem-o" color="#666666" size="0.5rem" />

        <div class="item-detail">
          <div class=left>
            <div class="top">
              <p class="p1" v-if="item.activityType===301">{{item.activityName}}</p>
              <p class="p2" v-else>{{item.activityName}}</p>
              <span v-if="item.activityType===301" :class="{'grey': item.dealStatus==0 || item.dealStatus==-1, 'green': item.dealStatus==1 || item.dealStatus==9}">
                {{arrfilter.find(v => v.id===item.dealStatus).text}}
              </span>
            </div>
            <p class="bottom">{{item.createTime}}</p>
          </div>
          <div class="right" @click="goDetail(item)" v-if="item.activityType===301">
            <span>{{item.realNameStr}} {{item.mobileStr}}</span>
            <van-icon name="arrow" />
          </div>
        </div>

      </div>
    </van-cell>

  </div>
</template>

<script>
export default {
  name: '',
  props: {
    dataList: {
      default: () => ([]),
    },
  },
  data () {
    return {
      unionld: this.$route.query.unionld || '', // 用户pin
      shopId: this.$route.query.shopId || '', // 店铺id
      // 状态列表
      arrfilter: [{
        id: 0,
        text: '待发货'
      }, {
        id: 1,
        text: '已发货'
      }, {
        id: 9,
        text: '已完成'
      }, {
        id: -1,
        text: '已取消'
      }],
    };
  },
  methods: {
    // 跳转到详情页面
    goDetail (item) {
      if (!item.orderCode) {
        this.$toast('订单编号为空，无法查询');
        return;
      }
      this.$router.push({
        name: 'GoodsSendDetail',
        query: {
          pin: this.unionld,
          shopId: this.shopId,
          orderCode: item.orderCode
        }
      });
    }
  }
};
</script>

<style lang="scss">
.exchange-records-box {
  .van-cell__value--alone {
    border-bottom: 1px solid #c5c5c5;
  }
  .list {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: start;

    .van-icon {
      padding: 0.24rem;
    }

    .item-detail {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .left {
        .top {
          font-size: 0.25rem;
          color: #909090;
          height: 0.4rem;
          margin-top: 0.1rem;
          display: flex;

          .p1 {
            display: inline-block;
            max-width: 1.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .p2 {
            display: inline-block;
            width: 80vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          span {
            font-size: 0.22rem;
            margin-left: 0.1rem;
            padding: 0 0.04rem;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .grey {
            background: #f2f2f2;
            color: #a5a5a5;
          }
          .green {
            background: #e0f1e9;
            color: #5cca99;
          }
        }

        .bottom {
          font-size: 0.24rem;
          color: #a7a7a7;
        }
      }

      .right {
        font-size: 0.24rem;
        color: #a7a7a7;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        overflow: hidden;

        .van-icon {
          padding: 0.04rem;
        }

        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>