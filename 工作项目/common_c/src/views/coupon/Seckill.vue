<template>
  <!-- 优惠券 -->
  <div v-if="$store.state.showDetail" class="DiscountCouponSeckill allpage">
    <i-banner :banners='details'></i-banner>
    <i-bzzzik :product='details'></i-bzzzik>
    <i-condition :conditions='details.supportLevels'></i-condition>
    <i-rules :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' elementId="102" @exchange="exchange"></i-button>

    <!-- 兑换成功弹窗 -->
    <i-dialog :showFinish="showFinish" :showSuccess="showSuccess" :text="tipMsg" @closeDialog="closeDialog"></i-dialog>

    <!-- 开卡弹窗 -->
    <i-openCard :isShowOpenCard="isShowOpenCard" @closeCardDialog="closeCardDialog"
                @toHandler="toOpenCardLink"></i-openCard>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import { openCard } from '@/assets/js/openCard';
import IOpenCard from '@/components/IOpenCard.vue';
import IBanner from '@/components/IBanner.vue';
import ICondition from '@/components/ICondition.vue';
import IRules from '@/components/IRules.vue';
import IDialog from '@/components/IDialog.vue';
import IButton from '@/components/IButton.vue';
import IBzzzik from '@/components/IBzzzik.vue';

export default {
  mixins: [openCard],
  name: 'DiscountCouponSeckill',
  components: {
    IBanner,
    ICondition,
    IRules,
    IDialog,
    IButton,
    IBzzzik,
    IOpenCard,
  },
  data() {
    return {
      form: {},
      showFinish: false,
      showSuccess: false,
      tipMsg: '',
      details: {
        startTime: '',
        endTime: '',
        type: 1, // 1.优惠券 2.京豆 3.实物
        number: '',
        couponValidateDay: '',
        couponDiscount: '',
        couponQuota: '',
        rangeType: '', // 1-店铺券，2-商品券
        couponTypec: '',
        currentGradeNeedPoint: '',
        nextGradeNeedPoint: '',
        isDaily: '',
        memberDaily: '',
        supportLevels: '',
        activityRule: '',
        status: 0, // 可兑状态
        id: '',
      },
      state: 1,
      setIntervalNum: '',
    };
  },
  watch: {
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
          if (new Date().getTime() >= new Date(this.details.startTime).getTime()) {
            // 未开始 ->  进行中
            if (oldVal <= this.details.startTime1 && newVal >= this.details.startTime1) {
              this.getDetail();
              // 下一期  新加一个字段perStatus 0：可兑 1：不可兑  取消自动刷新
              // 如果可兑换 this.details.status === 7
              // 不可兑换 状态不变
            }
            // 进行中 ->  已结束
            if (oldVal <= this.details.endTime1 && newVal >= this.details.endTime1) {
              this.getDetail();
            }
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
      clearInterval(this.setIntervalNum);
      const res = await PointsService.getSeckillCouponDetail({
        activityId: this.$route.query.activityId,
      });
      this.details = { ...res.data, type: 1 };
      // 活动未结束， 每日兑换周期 2
      // 每日开始时间
      // 每日结束时间
      if ((new Date().getTime() < new Date(this.details.endTime).getTime()) && this.details.hasCycle === 2) {
        this.details.startTime1 = new Date(this.details.beginDate).getTime();
        this.details.endTime1 = new Date(this.details.endDate).getTime();
      }
      this.details = this.$core.dealForm(this.setIntervalNum, this.details);
      this.setIntervalNum = setInterval(() => {
        this.details = this.$core.dealForm(this.setIntervalNum, this.details);
      }, 1000);
      this.getOpenCard(this.details.groupId, this.details.shopId, this.details.channelId);
    },
    // 关闭弹窗
    closeDialog() {
      this.showAddress = false;
      this.showFinish = false;
      this.showSuccess = false;
    },
    // 立即兑换
    async exchange() {
      // 防连点
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      // 兑换接口 参数this.details.id
      try {
        const res = await PointsService.immediatelyChangeCoupon({
          activityId: this.details.activityId,
          prizeId: this.details.prizeId,
        }, { needVisable: false });
        this.showSuccess = true;
        this.tipMsg = this.$store.state.msg[2];
      } catch {

      } finally {
        this.state = 1;
        this.getDetail();
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.setIntervalNum);
  },
};
</script>
<style scoped>

</style>
