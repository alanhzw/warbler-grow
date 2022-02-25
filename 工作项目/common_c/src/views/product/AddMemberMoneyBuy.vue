<template>
  <!-- 积分加钱购 -->
  <div v-if="$store.state.showDetail" class="AddMemberMoneyBuy allpage">
    <i-swipe :swipers='details.showPicsParse'></i-swipe>
    <i-allDetial :details='details'></i-allDetial>
    <i-condition :conditions='details.supportLevels'></i-condition>
    <i-rules :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' :activityType='details.activityType' elemen
    tId="103" @exchange="exchange" @goBuy="goBuy"></i-button>
    <!-- 兑换成功弹窗 -->
    <i-dialog :showBuy='showBuy' :showFinish="showFinish" :text="tipMsg" @closeDialog="closeDialog"
              @goBuy="goBuy"></i-dialog>
    <!-- 兑换确认弹窗 -->
    <i-dialog :showConfirm='showConfirm' @closeDialog="closeDialog"
              @exchange="exchangeConfirm" :rightsName = 'details.rightsName'
              :tips = 'details.currentGradeNeedPoint'></i-dialog>
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
      showBuy: false,
      showConfirm: false,
      tipMsg: '',
      Imglist: [],
      // 积分加钱购
      details: {
        type: 6,
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
      const res = await PointsService.getPointsMoneyNew({
        activityId: this.$route.query.activityId,
      });
      this.details = {
        ...res.data,
        type: 6,
        currentGradeNeedMoney: Number(res.data.currentGradeNeedMoney).toFixed(2),
        showPrice: Number(res.data.showPrice).toFixed(2),
        supportLevels: res.data.supportLevels.replace('星', '级'),
        activityName: res.data.activityName.replace('星', '级'),
        showPicsParse: res.data.showPics.indexOf('[') > -1 ? JSON.parse(res.data.showPics) : [res.data.showPics],
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
    // 选中变色
    changeItem(prizeId) {
      this.options.forEach((element) => {
        element.select = element.prizeId === prizeId;
      });
    },
    // 选择规格
    selectItem(id, index) {
      this.submitForm.prizeId = id;
      this.$store.commit('setPrizeIndex', index);
      this.options.forEach((element) => {
        element.select = element.prizeId === id;
      });
    },
    // 新建收货地址
    newAddress(id, province) {
      if (!province) {
        this.showAddress = true;
      } else {
        sessionStorage.setItem('lz_address_name', 'ProductDetail');
        // 跳转地址选择页面
        this.$router.push({
          name: 'AddressSelect',
          query: {
            id,
          },
        });
      }
    },
    // 关闭弹窗
    closeDialog() {
      this.showFinish = false;
      this.showSuccess = false;
      this.showConfirm = false;
      this.showBuy = false;
    },
    // 去购买
    goBuy() {
      window.location.href = this.details.getSkuBuyAddress.skuBuyAddress;
    },
    // 立即兑换（确认框）
    async exchangeConfirm() {
      this.showConfirm = false;
      if (this.state === 2) {
        return;
      }
      this.state = 2;
      // 替换接口
      try {
        const res = await PointsService.exchangePointsMoneyNew(this.submitForm);
        this.details.status = 12;
        this.showBuy = true;
      } catch {

      } finally {
        this.state = 1;
        this.getDetail();
      }
    },
    // 立即兑换
    exchange() {
      if (this.details.status === 7) {
        this.showConfirm = true;
      } else if (this.details.status === 12) {
        this.goBuy();
      } else if (this.details.status === 1) {
        const toasr = '活动暂未开始';
        this.$toast(toasr);
      } else if (this.details.status === 2) {
        const toasr = '活动已结束';
        this.$toast(toasr);
      } else if (this.details.status === 11) {
        const toasr = `需要${this.details.supportLevels}才能参与`;
        this.$toast(toasr);
      } else if (this.details.status === 5) {
        const toasr = '您的积分不足';
        this.$toast(toasr);
      } else if (this.details.status === 3) {
        const toasr = '您来晚啦~权益已发放完毕';
        this.$toast(toasr);
      } else if (this.details.status === 23) {
        const toasr = '今日已兑换完毕，明日再来吧！';
        this.$toast(toasr);
      }
    },
  },
};
</script>
<style scoped>

</style>
