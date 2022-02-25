<template>
  <!-- 优惠券 -->
  <div v-if="$store.state.showDetail" class="VIPOnly allpage">
    <i-banner :banners='details'></i-banner>
    <i-allDetial :details='details'></i-allDetial>
    <i-condition :conditions='details.supportLevels' :isMemberCoupon='details.isMemberCoupon'></i-condition>
    <i-rules :isMemberCoupon='details.isMemberCoupon' :rules='details.activityRule'></i-rules>
    <i-button :bg='details.status' elementId="104" @exchange="exchange"></i-button>

    <!-- 兑换成功弹窗 -->
    <i-dialog :showFinish="showFinish" :showSuccess="showSuccess" :text="tipMsg" @closeDialog="closeDialog"></i-dialog>

  </div>
</template>
<script>
import IBanner from '@/components/IBanner.vue';
import IAllDetial from '@/components/IAllDetial.vue';
import ICondition from '@/components/ICondition.vue';
import IRules from '@/components/IRules.vue';
import IDialog from '@/components/IDialog.vue';
import IButton from '@/components/IButton.vue';
import { PointsService } from '@/http';
import setHeaderShare from '@/utils/jdShare';
import constant from '@/utils/constant';

export default {
  name: 'VIPOnly',
  components: {
    IBanner,
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
      showSuccess: false,
      msg: ['请填写收货地址', '权益已兑完', '权益兑换成功'],
      tipMsg: '',
      details: {
        type: 4, // 1.优惠券 2.京豆 3.实物 4.会员专享券
        couponValidateDay: '', // 领取多少日内有效
        couponDiscount: '', // 折扣金额
        couponQuota: '', // 满多少元使用
        rangeType: '', // 1-店铺券，2-商品券
        couponType: '', //  0-京券 1-东券
        supportLevels: '', // 等级
        isMemberCoupon: true, // 会员专享优惠券的特殊处理
        activityRule: '', // 领取规则
        status: 0, // 可兑状态
        id: '',
      },
      state: 1, // 防连点
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      // 传入 id
      const res = await PointsService.getMemberCouponDetail({
        activityId: this.$route.query.activityId,

      });
      this.details = {
        type: 4,
        isMemberCoupon: true,
        ...res.data,
      };
      // 设置头部分享
      setHeaderShare({
        // 分享方式，如果不守则，默认值："H5"
        type: constant.SHARE_TYPE,
        // 分享标题，如果不设置，默认值："请您参与活动"
        title: this.details.activityName,
        // 分享图片, 如果不设置，默认值："defaultShareImg"
        imageUrl: `${constant.IMAGE_PREFIX}${this.details.showPicsParse}`,
      });
      this.state = 1;
      this.getOpenCard(this.details.groupId, this.details.shopId, this.details.channelId);
    },
    // 关闭弹窗
    closeDialog() {
      this.showAddress = false;
      this.showFinish = false;
      this.showSuccess = false;
    },
    // 立即领取
    async exchange() {
      // 防连点
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      // 兑换接口
      try {
        const res = await PointsService.exchangeMemberCoupon({
          activityId: this.details.activityId,
          prizeId: this.details.prizeId,
        }, {
          needVisable: false,
        });
        this.tipMsg = this.$store.state.msg[3];
        this.showSuccess = true;
      } catch {

      } finally {
        this.getDetail();
        this.state = 1;
      }
    },
  },
};
</script>
<style scoped>

</style>
