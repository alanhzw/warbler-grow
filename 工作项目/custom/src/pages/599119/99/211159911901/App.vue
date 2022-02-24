/**
* @Description:caoshijie
* @Date: 2021/11/17
* @Description: 京东科技 一键领取优惠券
* @FilePath:src\pages\599119\99\211159911901\App.vue
*/
<template>
  <!--  背景图-->
  <img style='width: 100%;' src='./assets/bg.jpg' alt=''>
  <Overlay class='overlay' v-model:show='showModal' :lock-scroll='false' @touchmove.self.prevent>
    <!--    服务声明-->
    <div class='wrapper' v-if='serviceStatement'>
      <div class='title'>服务声明</div>
      <div class='tips'>
        企业微信专属百元礼活动的京东优惠券及服务由民生银行委托北京京东世纪贸易有限公司提供。该活动奖品的提供与发放将在客户与北京京东世纪贸易有限公司之间直接发生法律关系，微信授权仅获取客户微信昵称用于用户身份识别行为，活动中客户输入的手机号码仅用于领奖使用不作为任何其他商业用途，中国民生银行仅为相关信息链接和相关支付结算服务，不提供任何形式的担保和承诺
      </div>
      <div class='check_info'>
        <input type='checkbox' v-model='checkedInfo'>
        <div class='check_msg'> 请仔细阅读 <span class='check_treaty' @click='authorization = true,serviceStatement = false'>《个人授权协议》</span>和<span class='check_treaty' @click='disclaimers= true,serviceStatement = false'>《免责声明》</span>，勾选后点击同意即可参与抽奖活动。</div>
      </div>
      <div class='return_btn' @click='goBack'>不同意</div>
      <div class='agree_btn' @click='goNewPage'>同意</div>
    </div>
    <!--    免责声明-->
    <div class='wrapper' v-if='disclaimers'>
      <div class='title'>免责声明</div>
      <div class='disclaimers_info tips'>
        1.任何由于网络问题、技术漏洞、黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常运行的不可抗力而造成的非正常获赠奖品视为无效，中国民生银行均得免责。<br/>
        2.鉴于互联网之特殊性质，活动期间若发生黑客攻击、电信部门技术调整导致重大影响、病毒侵袭、网络故障、微信平台、宽带、域名解析故障或其他网络设备或技术提供商的服务延迟、服务障碍或任何其他类似事件，致使活动无法正常进行，在法律法规允许的范围内中国民生银行不承担相关责在。<br/>
        3.活动如因系统维护或升级将暂停服务，中国民生银行将提前公告通知。暂停服务期间给用户造成的一切不便与损失，在法律法规允许的范围内中国民生银行均得免责。<br/>
        4.若因用户个人原因导致的活动奖励领取错误或不能领取，在法律法规允许的范围内中国民生银行不承担任何责任。<br/>
        5.由于用户自身参与活动方式不当或不正确而导致不能参与活动，在法律法规允许的范围内中国民生银行不承担任何责任。<br/>
        6.凡以任何方式参加本次活动的，视为自愿接受本免责声明的约束。<br/>
        7.本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。<br/>
        本次活动最终解释权在法律法规允许范围内归中国民生银行所有。
        活动详情可咨询中国民生银行7*24小时服务热线：95568。
      </div>
      <div class='agree_btn disclaimers_btn' @click='serviceStatement= true,disclaimers = false'>我知道了</div>
    </div>
<!--    个人授权协议-->
    <div class='wrapper' v-if='authorization'>
      <div class='title'>个人授权协议</div>
      <div class='disclaimers_info tips'>
        1.活动期间，客户在参与活动前授权的微信昵称以及参与活动中提供的手机号码，都是参与活动需要提供的必要信息，（微信昵称授权是进行用户身份识别，手机号码用于奖品发放，若您提供的信息不完整，则无法参与此活动或无法领取奖品。）<br/>
        2.活动期间，北京京东世纪贸易有限公司通过合法渠道和手段收集、存储、使用客户个人信息。民生银行应当依照相关法律法规的规定要求北京京东世纪贸易有限公司妥善保存保管客户信息，除用于识别客户二次抽奖行为与发放奖品外，不得作用于其他任何商业用途，不得以任何形式向任何第三方透露，否则，应承担相应的法律责任。
      </div>
      <div class='agree_btn disclaimers_btn' @click='serviceStatement= true,authorization = false'>我知道了</div>

    </div>
  </Overlay>
</template>

<script setup lang='ts'>
import { Overlay, Toast } from 'vant';
import { onDeactivated, onMounted, ref } from 'vue';

const showModal = ref(true);
const serviceStatement = ref(true);
const checkedInfo = ref(false);
const disclaimers = ref(false);
const authorization = ref(false);
const goNewPage = () => {
  if (!checkedInfo.value) {
    Toast('请勾选协议。');
    return;
  }
  checkedInfo.value = false;
  window.location.href = 'https://pro.m.jd.com/mall/active/3KwFR9vmVBmFjttTgYjUuRE4RufE/index.html?showhead=no';
};
const goBack = () => {
  window.history.back();
};
</script>
<style>
/*修改滚动条样式*/
div::-webkit-scrollbar{
  display: none;
}
</style>
<style lang='scss' scoped>
.wrapper {
  width: 5.6rem;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .28rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-radius: .06rem;
  box-sizing: border-box;

  .title {
    font-size: .36rem;
    line-height: .5rem;
    text-align: center;
    margin-bottom: .23rem;
  }

  .tips {
    font-size: .28rem;
    line-height: .4rem;
  }

  .check_info {
    margin-top: .4rem;
    color: #666;
    font-size: .24rem;
    margin-bottom: .6rem;

    input {
      vertical-align: middle;
    }

    .check_msg {
      display: inline;
      vertical-align: middle;
    }

    .check_treaty {
      color: #0404c5;
      text-decoration: underline;
    }
  }

  .agree_btn {
    width: 2.4rem;
    line-height: 0.75rem;
    background-color: #e93323;
    border-radius: 0.07rem;
    color: #fff;
    text-align: center;
    display: inline-block;
  }

  .return_btn {
    margin-right: .14rem;
    display: inline-block;
    width: 2.4rem;
    line-height: 0.75rem;
    border-radius: 0.07rem;
    border: solid 0.01rem #e93323;
    color: #e93323;
    text-align: center;
  }
  .disclaimers_info{
    max-height:5.6rem ;
    overflow-y: auto;
  }
  .disclaimers_btn{
    width: 100%;
    margin-top: .2rem;
  }
}
</style>
