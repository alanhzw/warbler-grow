<!--
 * @Description:会员权益领取记录
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 13:40:35
 * @LastEditTime: 2021-01-08 18:47:14
 * @FilePath: \SNActivity\src\components\personalCenter\MemberRecords.vue
-->
<template>
  <div class="member-records">
    <van-cell v-for="(item) in dataList" :key="item.id">
      <div class="item">
        <van-icon name="coupon-o" color="#666666" size="0.5rem" />
        <div class="item-details">
          <div class="left-details">
            <div class="font-top">
              <p>{{item.activityName}}</p>
            </div>
            <p class="font-all">{{item.createTime}}</p>
          </div>
          <div class="right-details">
            <span class="green">领取成功</span>
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
      // dataList: ''
    };
  },
  methods: {

  },
  mounted () {
    // 测试数据
    // this.dataList = [{
    //   activityName: '会员专享优惠券2021-01-05',
    //   activityType: 321,
    //   createTime: '2021-01-05 09:47:42',
    //   resType: 1,
    // }];
  }
};
</script>

<style lang="scss">
.member-records {
  .van-cell {
    height: 1rem;
    padding: 0 0.24rem;
    box-sizing: border-box;
  }

  .item {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: start;

    .van-icon {
      padding: 0.24rem;
    }

    .item-details {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .left-details {
        .font-top {
          font-size: 0.25rem;
          color: #909090;
          height: 0.4rem;
          margin-top: 0.1rem;
          display: flex;

          p {
            display: inline-block;
            width: 60vw;
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
        }

        .font-all {
          font-size: 0.24rem;
          color: #a7a7a7;
        }
      }
      .right-details {
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

        .green {
          padding: 0 5px;
          background: #e0f1e9;
          color: #5cca99;
        }
      }
    }
  }
}
</style>