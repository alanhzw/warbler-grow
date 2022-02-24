<template>
  <!-- 活动规则弹窗 -->
  <div class="box">
    <img src="../assets/dialog-rule.png"
         class="popup">

    <!-- 规则 -->
    <div class="rule-view">
      <pre class="rule" v-html="rule"></pre>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog()"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

// const props = defineProps({ rule: String });
const rule = '一、活动承办方\n'
  + '本活动由伊利牛奶京东自营旗舰店承办\n'
  + '\n'
  + '二、活动开始时间\n'
  + '2021年8月31日00:00（注：所有与订单相关的权益皆为2021年8月31日00:00之后的订单计算）\n'
  + '\n'
  + '三、活动玩法\n'
  + '1. 非会员用户需要加入伊利京东自营旗舰店的品牌会员（以下简称会员）才可参与本活动。\n'
  + '2.会员可选择已开放的勋章馆，进入对应的勋章页面，查看自己所在勋章的成长任务，每个成长任务分为四个支线，每完成一个成长任务即可获得成长值，积攒成长值可获得图示对应的权益奖励。每个任务都跟勋章馆产品线相关（如下单3笔，需为下单舒化产品3笔计算）。\n'
  + '注：勋章馆权益以实际展示页面为主，如某些权益暂未开放，请敬请期待！\n'
  + '\n'
  + '四、注意事项\n'
  + '1、活动过程中，凡以不正当手段（如作弊领取、恶意套取、刷信誉、虚假交易、扰乱系统、实施网络攻击等）参与本次活动的用户，品牌有权终止其参与活动，并取消其获奖资格（如奖品已发放，有权追回），如给品牌造成损失的，品牌将保留向违规用户继续追索的权利。\n'
  + '2、如遇不可抗力(包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动中存在大面积作弊行为、活动遭受严重网络攻击或因系统故障导致活动中奖名单大批量出错，活动不能正常进行的)，品牌有权取消、修改或暂停本活动。\n'
  + '3、发放实物奖品前，品牌有权要求用户提供其姓名、地址、身份证、护照、参与活动京东帐号等证明用户符合本活动规则的材料信息，如用户所提供的信息不真实、不完整、失效或不合法的，视为放弃奖品，京东可不发放奖品。\n'
  + '4、实物赠品中奖者将于活动结束后5个工作日内通过会员活动页面内公示，请在页面显示出的弹窗内填写正确收货地址（一经提供，不可修改），逾期视为放弃奖品。品牌核实无误后将在30天内发出，请耐心等待，如有疑问请咨询店铺客服。\n'
  + '5、本活动所发放的优惠券、实物奖不得提现、不得转赠他人、不得为他人付款。\n'
  + '6、是否中奖以活动发布者后台统计结果为准。';
const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog', 'ruleDialog');
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .rule-view {
    margin: 0 auto;
    position: absolute;
    top: 0.8rem;
    width: 100%;
    height: 6rem;
    padding: 0.3rem;
    box-sizing: border-box;

    .rule {
      width: 100%;
      height: 5.1rem;
      overflow-y: auto;
      font-size: .26rem;
      text-align: left;
      white-space: break-spaces;
    }
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
