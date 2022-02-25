<template>
  <!-- 积分兑换礼品卡 -->
  <div v-if="$store.state.showDetail" class="GiftCard allpage">
    <!-- 礼品卡活动图片展示 -->
    <div >
      <img  class="yhq-title-group" :src="details.showPicsParse"/>
    </div>
    <!-- 礼品卡内容 -->
    <i-allDetial :details='details'></i-allDetial>
    <!-- 兑换条件 -->
    <i-condition :conditions='details.supportLevelsName'></i-condition>
    <!-- 兑换规则 -->
    <i-rules :rules='details.activityRule'></i-rules>
    <!-- 兑换按钮（带状态） -->
    <i-button :bg='details.status' :activityType='details.activityType' elementId="103" @exchange="exchange" @goBuy="goBuy"></i-button>
    <!-- 兑换成功弹窗 -->
    <i-dialog :showKnow="showKnow"
              @closeDialog="closeDialog"
              @goBuy="toKnow"
              >
    </i-dialog>
    <!-- 兑换确认弹窗 -->
    <i-dialog :showConfirm='showConfirm' @closeDialog="closeDialog"
              @exchange="exchangeConfirm" :prizeName = 'details.cardName'
              :tips = 'details.currentGradeNeedPoint'></i-dialog>
  </div>
</template>
<script>
import { PointsService } from '@/http'; // 引入接口
import IAllDetial from '@/components/IAllDetialNt.vue'; // 引入奖品细节
import ICondition from '@/components/ICondition.vue'; // 引入兑奖条件
import IRules from '@/components/IRules.vue'; // 引入兑奖规则
import IDialog from '@/components/IDialog.vue'; // 引入兑奖弹窗
import IButton from '@/components/IButton.vue'; // 引入兑奖btn

export default {
  name: 'giftCard',
  // 引入插件
  components: {
    IAllDetial,
    ICondition,
    IRules,
    IDialog,
    IButton,
  },
  data() {
    return {
      showConfirm: false,
      clientWidth: document.body.clientWidth,
      // 知道了弹窗
      showKnow: false,
      // 弹窗展示文字
      tipMsg: '',
      // 积分兑换礼品卡
      details: {
        // 礼品卡图片
        showPicsParse: '//img10.360buyimg.com/imgzone/jfs/t1/112649/17/5556/4678/5eb4f6f2E08d0e9a6/dd86b4e3652f4e44.png',
        // 活动类型
        type: 8,
        // 当前等级需要积分
        currentGradeNeedPoint: '',
        // 下一等级需要积分
        nextGradeNeedPoint: '',
        // 会员积分日
        memberDayPoints: '',
        // 权益名称
        rightsName: '',
        isDaily: '',
        prizeName: '', // 奖品名称
        showPrice: '',
        supportLevels: '',
        supportLevelsName: '',
        status: 0, // 可兑换状态
        detailInfo: '',
        // 活动规则
        activityRule: '',
        isDefault: '',
      },
      rules: '',
      state: 1, // 防止连点
      // 兑换数据
      submitForm: {},
      prizeIndex: 0,
      options: [{
        prizeName: '',
      }],
    };
  },
  // 未知得监听
  watch: {
    // 监听活动大时间  开始 与 结束
    'details.state': {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal === 1 && oldVal === 0) {
          this.getGiftCardInfo();
        } else if (newVal === 2 && oldVal === 1) {
          this.getGiftCardInfo();
        }
      },
    },
    'details.newDate': {
      deep: true,
      handler(newVal, oldVal) {
        if (this.details.startTime1) {
          if (oldVal <= this.details.startTime1 && newVal >= this.details.startTime1) {
            this.getGiftCardInfo();
          }
          if (oldVal <= this.details.endTime1 && newVal >= this.details.endTime1) {
            this.getGiftCardInfo();
          }
        } else {

        }
      },
    },
  },
  created() {
    this.getGiftCardInfo();
  },
  mounted() {
    console.log('进入积分兑换礼品卡');
  },
  methods: {
    // 获取奖品详情
    async getGiftCardInfo() {
      const res = await PointsService.getGiftCardInfo({
        activityId: this.$route.query.activityId,
      });
      if (res.data.supportLevels === '1') {
        res.data.supportLevelsName = '一星会员及以上';
      } else if (res.data.supportLevels === '2') {
        res.data.supportLevelsName = '二星会员及以上';
      } else if (res.data.supportLevels === '3') {
        res.data.supportLevelsName = '三星会员及以上';
      } else if (res.data.supportLevels === '4') {
        res.data.supportLevelsName = '四星会员及以上';
      } else if (res.data.supportLevels === '5') {
        res.data.supportLevelsName = '五星会员';
      }
      this.details = {
        ...res.data,
        type: 8,
        showPicsParse: res.data.prizePicture,
        ...this.$store.state.addressToProduct,
      };
      // 提交时的参数
      this.submitForm = {
        activityId: this.details.activityId,
        prizeId: this.details.prizeId,
        grade: Number(this.details.supportLevels),
        cardName: this.details.cardName,
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
      this.showConfirm = false;
      this.showKnow = false;
    },
    // 立即兑换
    exchange() {
      if (this.details.status === 7) {
        this.showConfirm = true;
      } else if (this.details.status === 1) {
        const toasr = '活动暂未开始';
        this.$toast(toasr);
      } else if (this.details.status === 2) {
        const toasr = '活动已结束';
        this.$toast(toasr);
      } else if (this.details.status === 11) {
        const toasr = `需要${this.details.supportLevelsName}才能参与`;
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
      } else if (this.details.status === 24) {
        const toasr = '今日已兑换，明日再来吧！';
        this.$toast(toasr);
      } else if (this.details.status === 4) {
        const toasr = '兑换成功';
        this.$toast(toasr);
      }
    },
    // 立即兑换（确认框）
    async exchangeConfirm() {
      try {
        const res = await PointsService.exchangeGiftCard(this.submitForm);
        this.showKnow = true;
      } catch {

      } finally {
      }
    },
    // 我知道了
    toKnow() {
      this.closeDialog();
      this.getGiftCardInfo();
    },
  },
};
</script>
<style scoped>

.yhq-title-group {
  position: relative;
  border-radius: 10px;
  margin-top:15px;
  margin-bottom:15px;
  width:92%;
  height:92%
}

</style>
