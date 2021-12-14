<!--
 * @Description:个人中心主页
 * @Autor: hanzhiwei
 * @Date: 2021-01-04 15:47:40
 * @LastEditTime: 2021-01-08 14:57:41
 * @FilePath: \SNActivity\src\views\personalCenter\Center.vue
-->
<template>
  <div class="personal-center-box">
    <Header :userInfo="userInfo" :unionld="unionld" :shopId="shopId" />
    <div class="list">
      <!-- <van-cell title="礼包发放记录" is-link @click="toRecords(1)" /> -->
      <!-- <van-cell title="会员权益领取记录" is-link @click="toRecords(2)" /> -->
      <van-cell title="积分兑换记录" is-link @click="toRecords(3)" />
      <van-cell title="活动获奖记录" is-link @click="toRecords(4)" />
      <van-cell title="收货地址管理" is-link @click="toAddressManage()" />
    </div>
  </div>
</template>

<script>
// 引入头部
import Header from '@/components/common/PersonalCenterHeader.vue';
// 引入封装api
import { personalCenterService } from '@/axios/apis';


export default {
  name: '',
  components: {
    Header
  },
  data () {
    return {
      unionld: this.$route.query.unionld || '', // 用户pin
      shopId: this.$route.query.shopId || '', // 店铺id
      entrance: this.$route.query.entrance || '', // 入口  积分兑换 pointsExchange
      userInfo: {}, // 个人信息
      linkUrls: ['GiftRecords', 'MemberCouponRecords', 'PointsRecords', 'WinRecord'], // 跳转的路由
    };
  },
  methods: {
    /**
     * @description: 获取个人信息
     */
    async getCustomerInfo () {
      await personalCenterService['getCustomerInfo']({
        shopId: this.shopId,
        snUnionId: this.unionld,
      }).then(({ data }) => {
        if (data.result) {
          this.userInfo = data.data.userInfo;
        } else {
          this.$toast(data.errorMessage);
        }
      });
    },
    /**
     * @description: 前往地址管理页面
     */
    toAddressManage () {
      this.$router.push({
        name: 'ManageAddress',
        query: {
          unionld: this.unionld,
          shopId: this.shopId
        }
      });
    },
    /**
     * @description: 前往各种管理页面  1 礼包发放  2会员权益领取  3积分兑换  4活动获奖
     */
    toRecords (type) {
      this.$router.push({
        path: `/personalCenter/records/${type}`,
        query: {
          unionld: this.unionld,
          shopId: this.shopId,
          type: type
        }
      });
    }
  },
  mounted () {
    // 如果是从积分兑换进来的 可以直接调接口查询
    if (this.entrance === 'pointsExchange') {
      this.getCustomerInfo();
    }
  }
};
</script>

<style lang="scss">
.personal-center-box {
  .list {
    margin-top: 0.2rem;

    .van-cell {
      border-bottom: 0px;
      margin-top: 1px;
      display: flex;
      align-items: center;
    }
  }
}
</style>