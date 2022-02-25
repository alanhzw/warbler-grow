<template>
  <!-- 会员专享折扣 -->
  <div v-if="$store.state.showDetail" class="AddMemberMoneyBuy allpage">
    <i-swipe :swipers='details.showPicsParse'></i-swipe>
    <i-allDetial :details='details'></i-allDetial>
    <i-condition :conditions='details.supportLevels'></i-condition>
    <i-rules :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' :activityType='details.activityType' elementId="103" @exchange="exchange" @goBuy="goBuy"></i-button>
    <!-- 兑换成功弹窗 -->
    <i-dialog :showBuyDic='showBuyDic' :showFinish="showFinish" :text="tipMsg" @closeDialog="closeDialog"
              @goBuy="goBuy"></i-dialog>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import ISwipe from '@/components/ISwipe.vue';
import IAllDetial from '@/components/IAllDetialNt.vue';
import ICondition from '@/components/ICondition.vue';
import IRules from '@/components/IRules.vue';
import IDialog from '@/components/IDialog.vue';
import IButton from '@/components/IButton.vue';

export default {
  name: 'AddMemberMoneyBuy',
  components: {
    ISwipe,
    IAllDetial,
    ICondition,
    IRules,
    IDialog,
    IButton,
  },
  data() {
    return {
      form: {},
      showFinish: false,
      showBuyDic: false,
      tipMsg: '',
      Imglist: [],
      // 会员专享折扣
      details: {
        type: 7,
        currentGradeNeedPoint: '',
        nextGradeNeedPoint: '',
        isDaily: '',
        memberDaily: '',
        prizeName: '', // 奖品名称
        showPrice: '',
        supportLevels: '',
        status: 0, // 可兑换状态
        province: '',
        city: '',
        county: '',
        detailInfo: '',
        activityRule: '',
        mobile: '',
        isDefault: '',
        realName: '',
        addressId: '', // addressId
        customerId: '', // 0-常规地址，1-默认地址
        showPicsParse: ['//img10.360buyimg.com/imgzone/jfs/t1/112649/17/5556/4678/5eb4f6f2E08d0e9a6/dd86b4e3652f4e44.png'],
        discount: '', // 折扣
      },
      rules: '',
      state: 1, // 防止连点
      prizeIndex: 0,
      options: [{
        prizeName: '',
      }],
      showAddress: false,
    };
  },
  watch: {
    // 监听活动大时间  开始 与 结束
    'details.state': {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal === 1 && oldVal === 0) {
          this.getDetail();
        } else if (newVal === 2 && oldVal === 1) {
          this.getDetail();
        }
      },
    },
    'details.newDate': {
      deep: true,
      handler(newVal, oldVal) {
        if (this.details.startTime1) {
          if (oldVal <= this.details.startTime1 && newVal >= this.details.startTime1) {
            this.getDetail();
          }
          if (oldVal <= this.details.endTime1 && newVal >= this.details.endTime1) {
            this.getDetail();
          }
        } else {

        }
      },
    },
  },
  created() {
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await PointsService.getPrizeDetails({
        activityId: this.$route.query.activityId,
      });
      // 优惠价
      const salePrice = res.data.salePrice ? Number(res.data.salePrice) : 0;
      // 折扣
      let codiscount = Math.floor((salePrice / Number(res.data.showPrice)) * 1000) / 100;
      if (res.data.showPrice === null || Number(res.data.showPrice) === 0) {
        codiscount = Math.floor((salePrice / 1) * 1000) / 100;
      }
      this.details = {
        ...res.data,
        type: 7,
        salePrice: Number(res.data.salePrice).toFixed(2),
        showPrice: Number(res.data.showPrice).toFixed(2),
        discount: codiscount,
        supportLevels: res.data.supportLevelsName.replace('星', '级'),
        showPicsParse: res.data.showPics.indexOf('[') > -1 ? JSON.parse(res.data.showPics) : [res.data.showPics],
        ...this.$store.state.addressToProduct,
      };
      if ((new Date().getTime() < new Date(this.details.endTime).getTime()) && this.details.hasCycle === 2) {
        this.details.startTime1 = new Date(this.details.beginDate).getTime();
        this.details.endTime1 = new Date(this.details.endDate).getTime();
      }
      this.setIntervalNum = setInterval(() => {
        this.details.newDate = new Date().getTime();
        this.details = this.$core.dealFormDetail(this.setIntervalNum, this.details);
      }, 1000);
      this.state = 1;
    },
    // 关闭弹窗
    closeDialog() {
      this.showFinish = false;
      this.showBuyDic = false;
    },
    // 去购买
    goBuy() {
      this.showBuyDic = false;
      window.location.href = this.details.getSkuBuyAddress.skuBuyAddress;
    },
    // 立即兑换
    async exchange() {
      if (this.details.status === 12) {
        this.goBuy();
      }
      if (this.details.status === 1) {
        const toasr = '活动暂未开始';
        this.$toast(toasr);
        return;
      }
      if (this.details.status === 2) {
        const toasr = '活动已结束';
        this.$toast(toasr);
        return;
      }
      if (this.details.status === 20) {
        const toasr = '您来晚啦~权益已发放完毕';
        this.$toast(toasr);
        return;
      }
      if (this.details.status === 21) {
        const toasr = '您不符合参与条件';
        this.$toast(toasr);
        return;
      }
      if (this.state === 2) {
        return;
      }
      this.state = 2;
      // 替换接口
      try {
        const res = await PointsService.updPrizeNum({
          activityId: this.$route.query.activityId,
        });
        this.details.status = 12;
        this.showBuyDic = true;
      } catch {

      } finally {
        this.state = 1;
        this.getDetail();
      }
    },
  },
};
</script>
<style scoped>

</style>
