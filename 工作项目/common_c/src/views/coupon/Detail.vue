<template>
  <!-- 优惠券 -->
  <div v-if="$store.state.showDetail" class="DiscountCouponDetail allpage">
    <i-banner :banners='details'></i-banner>
    <i-allDetial :details='details'></i-allDetial>
    <i-condition :conditions='details.supportLevels'></i-condition>
    <i-rules :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' elementId="101" @exchange="exchange"></i-button>

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
import IAllDetial from '@/components/IAllDetial.vue';
import ICondition from '@/components/ICondition.vue';
import IRules from '@/components/IRules.vue';
import IDialog from '@/components/IDialog.vue';
import IButton from '@/components/IButton.vue';

export default {
  mixins: [openCard],
  name: 'DiscountCouponDetail',
  components: {
    IBanner,
    IAllDetial,
    ICondition,
    IRules,
    IDialog,
    IButton,
    IOpenCard,
  },
  data() {
    return {
      setIntervalNum: 0,
      form: {},
      showFinish: false,
      showSuccess: false,
      tipMsg: '',
      details: {
        type: 1, // 1.优惠券 2.京豆 3.实物
        number: '',
        couponValidateDay: '',
        couponDiscount: '',
        couponBeginTime: '',
        couponEndTime: '',
        couponQuota: '',
        rangeType: '', // 1-店铺券，2-商品券
        couponType: '',
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
          if (new Date().getTime() >= new Date(this.details.startTime).getTime()) {
            if (oldVal <= this.details.startTime1 && newVal >= this.details.startTime1) {
              this.getDetail();
            }
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
      // 传入 id
      try {
        const res = await PointsService.getCouponDetail({
          activityId: this.$route.query.activityId,
        });
        this.details = { ...res.data, type: 1 };
        if ((new Date().getTime() < new Date(this.details.endTime).getTime()) && this.details.hasCycle === 2) {
          this.details.startTime1 = new Date(this.details.beginDate).getTime();
          this.details.endTime1 = new Date(this.details.endDate).getTime();
        }
        this.setIntervalNum = setInterval(() => {
          this.details.newDate = new Date().getTime();
          this.details = this.$core.dealFormDetail(this.setIntervalNum, this.details);
        }, 1000);
      } catch {

      } finally {
        this.getOpenCard(this.details.groupId, this.details.shopId, this.details.channelId);
        this.state = 1;
      }
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
      // 兑换接口
      try {
        const res = await PointsService.exchangeCoupon({
          activityId: this.details.activityId,
          prizeId: this.details.prizeId,
        }, {
          needVisable: false,
        });
        this.showSuccess = true;
        this.tipMsg = this.$store.state.msg[2];
      } catch {

      } finally {
        this.getDetail();
        this.state = 1;
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
