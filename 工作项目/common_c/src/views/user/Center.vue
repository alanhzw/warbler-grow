<template>
  <div class="UserCenter allpage">
    <i-personalTitle :msg='msg' :shopId='shopId'></i-personalTitle>
    <div class="list">
      <!-- <van-cell is-link title="礼包发放记录" @click="linkUrl(0)"/> -->
      <!-- <van-cell is-link title="会员权益领取记录" @click="linkUrl(1)"/> -->
      <!-- <van-cell is-link title="积分兑换记录" @click="linkUrl(2)"/>
      <van-cell is-link title="活动获奖记录" @click="linkUrl(3)"/> -->
      <van-cell is-link title="获奖记录" @click="linkUrl(5)"/>
      <van-cell is-link title="收货地址管理" @click="linkUrl(4)"/>
      <van-cell title=""/>
    </div>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IPersonalTitle from '@/components/IPersonalTitle.vue';

export default {
  name: 'PersonalCenter',
  components: {
    IPersonalTitle,
  },
  data() {
    return {
      linkUrls: ['GiftRecords', 'MemberCouponRecords', 'PointsRecords', 'WinRecord', 'AddressManage', 'UserRecord'],
      msg: {
        name: '',
        curPoint: '',
        imageUrl: '',
        grade: '',
      },
      shopId: '',
    };
  },
  mounted() {
    // 获取个人信息
    this.shopId = this.$route.query.shopId ? this.$route.query.shopId : sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId');
    sessionStorage.setItem('LZ_CRM_CUSTOMER_ShopId', this.shopId);
    this.getForm();
  },
  methods: {
    getForm() {
      PointsService.getPersonDetail().then((res) => {
        this.msg = res.data;
      }).catch(() => {

      });
    },
    linkUrl(v) {
      if (!this.linkUrls[v]) {
        return;
      }
      this.$router.push({
        name: this.linkUrls[v],
      });
    },
  },
};
</script>
<style scoped>
.UserCenter >>> .van-cell {
  height: 0.9rem;
}

.UserCenter >>> .van-cell:not(:last-child)::after {
  border-bottom: none;
}

.list {
  margin-top: 0.20rem;
}

.list >>> .van-cell {
  border-bottom: 0px;
  margin-top: 1px;
  display: flex;
  align-items: center;
}

.list >>> span {
  float: left;
}

.list .grey >>> span {
  color: #dedede;
}

</style>
