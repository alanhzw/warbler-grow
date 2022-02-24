<template>
  <div class='register-agree'>
    <div class='celebrity-wrapper'>
      <img class='person' src='../assets/celebrity@2x.png' alt='' />
    </div>
    <div class='slogan-wrapper'>您离SK-II护肤世界仅一步之遥。</div>
    <div class='terms-conditions-wrapper'>
      <van-checkbox v-model='checked' shape='square' checked-color='#EA0429'></van-checkbox>
      <div class='rule_box'>
        <div>我已阅读、充分理解并将遵守<a href='https://www.pg.com/zh_CN/terms_conditions/index.shtml'>《SK-II品牌会员服务协议》</a>及SK-II<a href='https://privacypolicy.pg.com/zhS/'>《消费者隐私政策》</a>的各条款内容，同意成为宝洁品牌会员。我已知悉并理解相关限制、免责条款或其他涉及会员重大权益的内容已经以加粗、加下划线等方式予以提示。</div>
        <div class='terms-conditions-text'>我已阅读、充分理解并将遵守<a @click='detailShow = true'>《SK-II NOW积分准则》</a>。</div>
      </div>
    </div>
    <div class='tips-wrapper'>*请接受条款和条件以继续</div>
    <div class='button-wrapper'>
      <van-button type='primary' :disabled='!checked' color='#EA0429' @click='onRegClick'>注册</van-button>
    </div>
  </div>
  <van-popup closeable v-model:show='detailShow' class='content_box' teleport="body">
    <div class='content'>
      <div class='title'> SK-II NOW积分准则</div>
      <div class='des_box'>
        <p>【积分资格】</p>
        加入SK-II会员并绑定“SK-II官方微信公众号”并获得NOW账户后可以获得开始积累“晶透水滴”。每位自然人消费者仅能注册一个NOW账户，微信号、QQ、天猫或京东帐号、手机号码等任一信息一致或指向同一用户的，视为同一个用户。若发现同一位消费者重复注册多个账户，第一个参与积分的账户参与积分结果有效，其余账户参与结果均视为无效，品牌方有权取消其注册和参与资格。
        <p>【积分获取与失效】</p>
        每名消费者在绑定“SK-II官方微信公众号”获得NOW 账户后，在天猫SK-II官方旗舰店、京东SK-II自营官方旗舰店或SK-II专柜购买SK-II正装商品，每消费1元可获得1个“晶透水滴”。每个NOW账户每个自然年内最多累计不超过80000个“晶透水滴”，超出部分将不会被计入。
        首次绑定SK-II NOW账户的消费者将获得100“晶透水滴”，且每个NOW账户仅可获得一次。您在SK-II柜台购买产品后第二天，或在天猫、京东官方旗舰店购买并确认收货后第15天，“晶透水滴”即可到账。实际到账情况以系统显示为准。
        “晶透水滴”按照入会后第一笔订单时间开始累计，有效期间为第一笔“晶透水滴”到账当天起365天，如果365天内消费者有任一正装产品购买记录，则全部“晶透水滴”可在该笔“晶透水滴”到账当天起继续再累积365天。如在第一笔晶透水滴到账当天起365天内无任一正装产品的购买记录，则“晶透水滴”会被清零且将不予任何补偿。
        <p>【积分兑换和捐赠】</p>
        “晶透水滴”仅可在SK-II官方公众号进行兑换制定礼品或捐赠。您可以在“晶透水滴”有效期内任意时间进行兑换或捐赠。您只能在兑换菜单中选择用“晶透水滴”兑换的礼品。每个NOW账户每个日历月仅限兑换3套同档礼品。积分兑换礼品数量有限，礼品数量以系统显示为准。礼品为非卖品，非因产品质量问题不予退换，不予开具发票。 SK-II 有权根据礼品供应情况不时更改兑换菜单的权利，请以兑换菜单显示为准，恕不另行通知。
        您可以选择在SK-II 柜台领取您的兑换品，或支付 9.9 元*的运费寄送到您指定地点。如果需要寄送，您需要提供正确有效的联系方式（包括收件人姓名、地址和电话）以供礼品寄送，寄送方式为由SK-II选择的普通快递。请确保您提供的联系方式正确，如因地址无效、电话无法联系等原因导致无法投递，将视为放弃礼品，且已兑换的“晶透水滴”将不予返还。
        我们建议您在前往 SK-II 柜台之前联系对应的美容顾问以咨询兑换礼品的库存。如果预约前往柜台兑换产品，您需要在预约提货日的 90 天内领取产品。如果您未在 90 天内领取，您的预订将被取消，已兑换的“晶透水滴”将不予退还。兑换一经确认或兑换邮费已支付, 则不可更改，已兑换的“晶透水滴”概不退还。如果由他人代您领取兑换礼品，请让他/她准备好预订时提供的预订码。“晶透水滴” 一旦兑换或捐赠概不退还。兑换品或捐赠一经确认，非因兑换产品质量问题将不予退换。
        凡以不正当手段（如作弊领取、恶意套取、刷信誉、虚假交易、扰乱系统、实施网络攻击等）获得“晶透水滴”或兑换礼品的用户，品牌有权终止其参与活动，并取消其因此获得的“晶透水滴”、停止发放礼品或追回已经发放的礼品，如给品牌造成损失的，品牌将保留向违规用户继续追索的权利；
        如遇不可抗力(包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动中存在大面积作弊行为、活动遭受严重网络攻击或因系统故障导致活动中奖名单大批量出错，活动不能正常进行的)，商家有权取消、修改或暂停本活动。
        SK-II有权在法律允许范围内对上述积分积累和兑换规则予以不时变更，并对上述规则进行法律允许范围内的解释。活动详情可以咨询4008302365。
      </div>
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import {
  ref, Ref, getCurrentInstance, watchEffect,
} from 'vue';
import { Checkbox as VanCheckbox, Button as VanButton, Popup as VanPopup } from 'vant';

const detailShow = ref(false);
const checked: Ref<number> = ref(false);
const ctx = getCurrentInstance();
watchEffect(async () => {
  checked.value = false;
});
const onRegClick = () => {
  ctx.emit('reg');
};

</script>

<style lang='scss' scoped>
@use "sass:math";

@function px2rem($px) {
  $rem: 100px;
  @return math.div($px, $rem)+rem;
}

$gap: px2rem(16px);

.register-agree {
  text-align: center;
  -webkit-overflow-scrolling: auto;

  .celebrity-wrapper {
    background: transparent url("../assets/celebrity-drop@2x.png") no-repeat center center;
    background-size: px2rem(272px) px2rem(265.5px);
    width: px2rem(266.46px);
    height: px2rem(260.19px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 px2rem(26.38px);
    margin: auto auto $gap;

    .person {
      width: px2rem(201.5px);
      height: px2rem(200.5px);
      border-radius: 100%;
    }
  }

  .slogan-wrapper {
    padding: 0 px2rem(26.38px);
    font-size: px2rem(32px);
    line-height: px2rem(36px);
    text-align: center;
    letter-spacing: -0.02em;
    color: #202020;
    margin-bottom: $gap;
  }

  .terms-conditions-wrapper {
    padding: 0 px2rem(26.38px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $gap;

    .rule_box {
      width: 3rem;
      text-align: left;
      color: #999999;
      font-size: px2rem(11px);
      margin-left: .1rem;
      //position: relative;
      //left: .1rem;
    }

    .terms-conditions-text {
      color: #999999;
      font-size: px2rem(11px);
      white-space: nowrap;
      a {
        text-decoration: underline;
      }
    }
  }

  .tips-wrapper {
    padding: 0 px2rem(26.38px);
    white-space: nowrap;
    margin-bottom: $gap;
    font-size: px2rem(10px);
    color: #EA0429;
  }

  .button-wrapper {
    .van-button {
      border: none;
      height: px2rem(72px);
      width: 100%;
      white-space: nowrap;
      font-size: px2rem(16px);
    }

    .van-button--disabled {
      background: #EAEAEA !important;
      color: #202020 !important;
    }
  }
}

.content_box {
  .content {
    border-radius: .1rem;
    font-size: .16rem;
    text-align: left;
    width: 3.75rem;
    height: 100%;

    .title {
      text-align: center;
      margin: 0.3rem auto .2rem;
      font-size: .28rem;
      color: #404040;
    }

    .des_box {
      padding: 0 .15rem .15rem .15rem;
      margin-top: .25rem;
      color: #404040;
      font-size: .12rem;
    }
  }
}
.van-checkbox{
  overflow: unset;
}
a:link,a:visited,a:hover,a:active{
  color: #999;
}
</style>
