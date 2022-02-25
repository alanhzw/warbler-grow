<template>
  <!-- 积分加钱兑换物品 -->
  <div v-if="$store.state.showDetail" class="AddMoneyBuy allpage">
    <i-swipe :swipers='details.showPicsParse'></i-swipe>
    <i-allDetial :details='details' :jdUrl='details.getSkuBuyAddress.skuBuyAddress'></i-allDetial>
    <i-condition :conditions='details.supportLevels'></i-condition>
    <i-rules :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' elementId="103" @exchange="exchange" @goBuy="goBuy"></i-button>

    <!-- 兑换成功弹窗 -->

    <i-dialog :showBuy='showBuy' :showFinish="showFinish" :text="tipMsg" @closeDialog="closeDialog"
              @goBuy="goBuy"></i-dialog>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import ISwipe from '@/components/ISwipe.vue';
import IAllDetial from '@/components/IAllDetial.vue';
import ICondition from '@/components/ICondition.vue';
import IRules from '@/components/IRules.vue';
import IDialog from '@/components/IDialog.vue';
import IButton from '@/components/IButton.vue';

export default {
  name: 'AddMoneyBuy',
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
      showBuy: false,
      tipMsg: '',
      Imglist: [],
      // 积分加钱购
      details: {
        type: 5,
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
      },
      rules: '',
      state: 1, // 防止连点
      // 兑换数据
      submitForm: {},
      prizeIndex: 0,
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
      const res = await PointsService.getPointsMoney({
        activityId: this.$route.query.activityId,
      });
      this.details = {
        ...res.data,
        type: 5,
        showPicsParse: res.data.showPics.indexOf('[') > -1 ? JSON.parse(res.data.showPics) : [res.data.showPics],
        // showPicsParse: res.data.showPics ? JSON.parse(res.data.showPics) : ,
        ...this.$store.state.addressToProduct,
      };
      // 提交时的参数
      this.submitForm = {
        activityId: this.details.activityId,
        prizeId: this.details.prizeId,
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
      this.showSuccess = false;
    },
    // 去购买
    goBuy() {
      window.location.href = this.details.getSkuBuyAddress.skuBuyAddress;
    },
    // 立即兑换
    async exchange() {
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      // 替换接口
      try {
        const res = await PointsService.exchangePointsMoney(this.submitForm);
        this.details.status = 12;
        this.showBuy = true;
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
