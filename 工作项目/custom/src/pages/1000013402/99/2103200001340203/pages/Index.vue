<template>
  <div class="yili">
    <!-- banner -->
    <div class="banner">
      <img class="bg" src="../assets/home-banner.png"/>

      <!-- 返回勋章馆 -->
      <img @click="toPushRouter()" class="back-index" src="../assets/back-index.png"/>

      <!-- 当前成长值 -->
      <div class="grow-num">
        <div>当前成长值：</div>
        <div class="num">{{ baseDate.points }}</div>
        <img @click="$router.push('/GrowthDetails')" class="icon" src="../assets/question-icon.png"/>
      </div>

      <!-- 进度条 -->
<!--      <div class="grow-progress">-->
<!--        <div class="progress-bg">-->
<!--          <div class="progress-active" :style="{ width: growNumWidthOf100+'%'}">-->
<!--&lt;!&ndash;            <div class="progress-pointer">{{ growNum }}</div>&ndash;&gt;-->
<!--          </div>-->
<!--          <div class="toast-num" v-if="growNumWidthOf100 > 18">{{ toastNum }}</div>-->
<!--        </div>-->
<!--        <div class="between-num" v-if="toastNum - growNum> 0">还差{{ toastNum - growNum }}升至下一级</div>-->
<!--        <div class="between-num" v-else>您已满级！</div>-->
<!--      </div>-->

      <div class="grow-progress-bg">
        <div class="line transition" :style="nowWidth"></div>
        <img class="progress-spot" v-if="isShowShot"
             src="../assets/home-line-star.png"/>
        <div class="grow-middle" v-if="baseDate.level - baseDate.points > 0">还差{{baseDate.level - baseDate.points}}点升至下一级</div>
        <div class="grow-middle" v-else>您已满级！</div>
        <div class="number"><span style="color: #ff6839;">{{ baseDate.points }}</span><span style="color: #084b39;">/{{ baseDate.level }}</span></div>
        <!--全部权益入口-->
        <div @click="$router.push('/AllRights')" class="all-rights"></div>
      </div>
      <!-- 查看全部权益 -->
<!--      <img @click="$router.push('/AllRights')" class="all-equities" src="../assets/home-all-equities.png"/>-->
      <div class="growth-equities">
        <div class="achieve-title"></div>
        <div class="achieve-nowrap" v-if="nowEnjoyEquitiesList.length > 0">
<!--          <div class="achieve-item" v-if="isUnreceived" @click="$router.push('/AllRights')">-->
<!--            <img src="//img10.360buyimg.com/imgzone/jfs/t1/168147/17/20049/7669/607e7bf5E22c67add/61125ce51b39aa29.png"/>-->
<!--            <div class="color-wear" style="font-size: 0.24rem;margin-top: .09rem">权益礼包</div>-->
<!--            <img class="gif"-->
<!--                 src="//img10.360buyimg.com/imgzone/jfs/t1/178599/30/90/106029/607ea5eaEc1f80aa4/ef1abec54957d659.gif"/>-->
<!--          </div>-->
          <div class="achieve-item" v-for="(item, index) in nowEnjoyEquitiesList" :key="index" @click="$router.push('/AllRights')">
            <div style="position: relative;height: .8rem">
              <div :class="{'opacity-icon':item.status === '0'}"></div>
              <img :src="item.icon"/>
            </div>
            <div class="color-wear">{{ item.name }}</div>
            <div class="points-toast">{{ item.points }}解锁</div>
<!--            <div class="color-wear" style="font-size: 0.2rem">{{ item.points }}成长值可享</div>-->
          </div>
        </div>

        <div v-else style="text-align: center;padding-top: 1rem;color: #0a4a39;">当前暂无权益</div>
      </div>

    </div>

    <!-- 成长历程 -->
    <div class="grow-process">
      <!-- 标题 -->
      <img class="title" src="../assets/home-grow-title.png"/>
      <!-- 详细规则 -->
      <div @click="ruleShow = true" class="detail-rule"></div>
      <!-- 内容 -->
      <div class="content">
        <!-- tab -->
        <div class="tab">
          <div v-for="(item,index) in tabList" :key="index" @click="changeTab(index + 1)"
               class="item" :class="{'item-active':tabIndex === index + 1}">
            {{ item }}
          </div>
        </div>
        <!-- 历程列表 -->
        <div class="process-list">
          <div class="process" v-for="(item,index) in processList" :key="index">
            <img :src="item.icon" :class="{'gray':item.status==='0'}" @click="$router.push(`/TaskDetails?id=${item.id}`)"/>
<!--            <div class="process-title">{{ item.a }}</div>-->
            <div class="process-content">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>

<!--    规则弹窗-->
    <div class="showMaskBlack" v-show="ruleShow">
      <div class="context">
        <div class="rule-content">
          <pre style="text-align: left;white-space: pre-wrap" v-html="rule"></pre>
          <button class="backBtn" @click="ruleShow = false"/>
          <button class="closeBtn" @click="ruleShow = false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, inject, onMounted, Ref, computed,
} from 'vue';
import { Popup as vanPopup, Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 活动子品牌 - 伊利 优酸乳
const sonBrand = 'yousuanru';
// 是否开卡表示是否注册
const isOpenCarded = inject('isOpenCard');
// 活动规则
const rule = `一、活动承办方
本活动由伊利牛奶京东自营旗舰店承办
二、活动开始时间
2021年8月31日00:00（注：所有与订单相关的权益皆为2021年8月31日00:00之后的订单计算）
三、活动玩法
1. 非会员用户需要加入伊利京东自营旗舰店的品牌会员（以下简称会员）才可参与本活动。
2.会员可选择已开放的勋章馆，进入对应的勋章页面，查看自己所在勋章的成长任务，每个成长任务分为四个支线，每完成一个成长任务即可获得成长值，积攒成长值可获得图示对应的权益奖励。每个任务都跟勋章馆产品线相关（如下单3笔，需为下单优酸乳产品3笔计算）。
注：勋章馆权益以实际展示页面为主，如某些权益暂未开放，请敬请期待！
四、注意事项
1、活动过程中，凡以不正当手段（如作弊领取、恶意套取、刷信誉、虚假交易、扰乱系统、实施网络攻击等）参与本次活动的用户，品牌有权终止其参与活动，并取消其获奖资格（如奖品已发放，有权追回），如给品牌造成损失的，品牌将保留向违规用户继续追索的权利。
2、如遇不可抗力(包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动中存在大面积作弊行为、活动遭受严重网络攻击或因系统故障导致活动中奖名单大批量出错，活动不能正常进行的)，品牌有权取消、修改或暂停本活动。
3、发放实物奖品前，品牌有权要求用户提供其姓名、地址、身份证、护照、参与活动京东帐号等证明用户符合本活动规则的材料信息，如用户所提供的信息不真实、不完整、失效或不合法的，视为放弃奖品，京东可不发放奖品。
4、实物赠品中奖者将于活动结束后5个工作日内通过会员活动页面内公示，请在页面显示出的弹窗内填写正确收货地址（一经提供，不可修改），逾期视为放弃奖品。品牌核实无误后将在30天内发出，请耐心等待，如有疑问请咨询店铺客服。
5、本活动所发放的优惠券、实物奖不得提现、不得转赠他人、不得为他人付款。
6、是否中奖以活动发布者后台统计结果为准。`;
// 当前成长值
const growNum = ref('');
// 当前成长等级
const growlevel = ref('');
// 是否显示光效
const isShowShot = ref(true);
// 进度条 阶段总分数
const toastNum = 120;
// 判断是否有未领取权益
const isUnreceived = ref(false);
// 当前进度条长度
const nowWidth = ref('');
// 规则弹窗开关
const ruleShow = ref(false);

// 满值是：100，当前是80，结果就是20%；
// 满值是：1000，当前是80,（80 / 1000）* 100
// const growNumWidthOf100 = computed(() => 100 - ((growNum / toastNum) * 100));

const baseDate = ref([]);

const processList = ref([]);

const nowEnjoyEquitiesList = ref([]);

/* ---------------------------------  tab  ------------------------------- */
const tabList = ['全部', '历程', '消费'];
const tabIndex = ref(1);

/* --------------------------------------------------------------------------- */
// 跳转勋章馆
const toPushRouter = () => {
  window.location.href = 'https://lzkjdz-isv.isvjd.com/wx/dingzhi/yili/medal/index?activityId=2103200001340201';
};
// 获取成长历程;
const getGrowAchievement = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/growth/list', {
    brand: sonBrand,
    cjwxPin: window.sessionStorage.getItem('LZ_JD_USER_PIN'),
    type: tabIndex.value,
  }).then((res) => {
    if (res.success) {
      processList.value = res.data;
    }
  }).finally(() => {
    Toast.clear();
  });
};

const changeTab = (index: number) => {
  tabIndex.value = index || 1;
  getGrowAchievement();
};

// 获取当前成长值享受权益
const getNowEnjoyEquities = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/memberNowRights', {
    brand: sonBrand,
    cjwxPin: window.sessionStorage.getItem('LZ_JD_USER_PIN'),
  }).then((res) => {
    // eslint-disable-next-line no-param-reassign
    /* res = {
      msg: '调用成功！',
      success: true,
      total: 1,
      data: [
        {
          icon: '//img10.360buyimg.com/imgzone/jfs/t1/178355/25/4/5794/607e4451Ed47e4bb9/d10307ca337037f2.png',
          id: null,
          isEffective: null,
          name: '专属客服',
          percent: null,
          points: 50,
          status: '0',
          type: null,
        },
        {
          icon: '//img10.360buyimg.com/imgzone/jfs/t1/178355/25/4/5794/607e4451Ed47e4bb9/d10307ca337037f2.png',
          id: null,
          isEffective: null,
          name: '专属客服',
          percent: null,
          points: 50,
          status: '0',
          type: null,
        },
        {
          icon: '//img10.360buyimg.com/imgzone/jfs/t1/178355/25/4/5794/607e4451Ed47e4bb9/d10307ca337037f2.png',
          id: null,
          isEffective: null,
          name: '专属客服',
          percent: null,
          points: 50,
          status: '0',
          type: null,
        },
        {
          icon: '//img10.360buyimg.com/imgzone/jfs/t1/178355/25/4/5794/607e4451Ed47e4bb9/d10307ca337037f2.png',
          id: null,
          isEffective: null,
          name: '专属客服',
          percent: null,
          points: 50,
          status: '0',
          type: null,
        },
        {
          icon: '//img10.360buyimg.com/imgzone/jfs/t1/178355/25/4/5794/607e4451Ed47e4bb9/d10307ca337037f2.png',
          id: null,
          isEffective: null,
          name: '专属客服',
          percent: null,
          points: 50,
          status: '0',
          type: null,
        },
        {
          icon: '//img10.360buyimg.com/imgzone/jfs/t1/178355/25/4/5794/607e4451Ed47e4bb9/d10307ca337037f2.png',
          id: null,
          isEffective: null,
          name: '专属客服',
          percent: null,
          points: 50,
          status: '0',
          type: null,
        },
      ],
    }; */

    if (res.success) {
      nowEnjoyEquitiesList.value = res.data;
      if (res.data.filter((item: { isEffective: string; }) => item.isEffective === '0').length > 0) {
        isUnreceived.value = true;
      } else {
        isUnreceived.value = false;
      }
    } else {
      Toast(res.errorMsg);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 获取成长值进度条
const getProcessWidth = () => {
  const processNum = (Number(baseDate.value.points) / Number(baseDate.value.level)) * 5.85;
  console.log(processNum);
  // 判断是进度条
  // if (index === '1') {
  // 超过当前阶段最大值时 限制长度

  if (Number(baseDate.value.points) >= Number(baseDate.value.level)) {
    const maxWidth = 'width:5.85rem';
    isShowShot.value = false;
    nowWidth.value = maxWidth;
    // return maxWidth;
  }
  const width = `width:${Number(processNum.toFixed(2))}rem`;
  // 进度条超过一定长度不显示光效/没有分数的时候不显示
  if (Number(processNum.toFixed(2)) > 5.5 || Number(baseDate.value.points) === 0) {
    isShowShot.value = false;
  }
  nowWidth.value = width;
};

// 用户初始化;
const getUserInit = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/init', {
    brand: sonBrand,
    cjwxPin: window.sessionStorage.getItem('LZ_JD_USER_PIN'),
  }).then((res) => {
    if (res.success) {
      baseDate.value = res.data;
      // 获取成长历程列表
      getGrowAchievement();
      // 获取当前成长值享受权益
      getNowEnjoyEquities();
      // 获取进度条
      getProcessWidth();
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 主接口 获取活动信息;
const getUserBasicMessage = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/base', {
    brand: sonBrand,
    cjwxPin: window.sessionStorage.getItem('LZ_JD_USER_PIN'),
  }).then((res) => {
    // eslint-disable-next-line no-param-reassign
    /* res = {
      msg: '调用成功！',
      success: true,
      total: 1,
      data: {
        achievePoints: null,
        content: null,
        createTime: null,
        equityIcon: null,
        gmv: null,
        icon: null,
        id: 'a133316a084248b5ad25913baa185324',
        isEffective: null,
        isLock: null,
        jingdou: null,
        level: 120,
        medalId: null,
        message: null,
        name: null,
        percent: null,
        points: 112,
        process: null,
        rightsId: null,
        skinId: '',
        sonEquities: null,
        sonTasks: null,
        status: null,
        type: null,
      },
    }; */
    if (res.success) {
      if (res.data) {
        // 已初始化用户，直接赋值
        baseDate.value = res.data;
        growNum.value = res.data.points;
        growlevel.value = res.data.level;
        console.log(baseDate.value);
        // 获取当前成长值享受权益
        getNowEnjoyEquities();
        // 获取成长历程列表
        getGrowAchievement();
        // 获取进度条
        getProcessWidth();
      } else {
        // 未初始化用户，进行初始化
        getUserInit();
      }
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 如果没入会，点击按钮 先跳转入会
if (!isOpenCarded) {
  // openDialog('memberDialog');
}

// 获取用户基本信息
getUserBasicMessage();

</script>

<style lang='scss' scoped>
  .yili {
    position: relative;
    text-align: center;
    background: url('../assets/main-bg.png') no-repeat;
    background-size: 100%;

    .showMaskBlack{
      background: rgba(0, 0, 0, 0.7);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;

      .context{
        padding-top: 1.5rem;
        position: relative;
        width: 6.8rem;
        height: 6.4rem;
        background: url('../assets/rule-content.png') no-repeat;
        background-size: 100%;

        .rule-content{
          height: 3.8rem;
          width: 86%;
          overflow-y: scroll;
          margin-left: .5rem;

          .backBtn {
            position: absolute;
            width: 3.5rem;
            height: .9rem;
            background: none;
            border: none;
            top: 5.5rem;
            left: 1.7rem;
          }
          .closeBtn{
            width: 0.6rem;
            height: 0.6rem;
            position: absolute;
            top: 0;
            right: 0;
            background: none;
            border: none;
          }
          }
        }
      }
    .banner {
      position: relative;

      .bg {
        width: 7rem;
        margin-top: .3rem;
      }

      .back-index {
        width: 1.64rem;
        position: absolute;
        top: 0.21rem;
        left: 0.85rem;
      }

      .grow-num {
        width: 100%;
        line-height: .3rem;
        text-align: center;
        position: absolute;
        bottom: 5.5rem;
        font-size: .3rem;
        color: #084b39;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .num {
          font-size: 0.45rem;
          font-weight: bold;
        }

        .icon {
          width: .3rem;
          margin-left: .1rem;
        }
      }

      /*成长值享权益*/
      .growth-equities {
        height: 3rem;
        position: absolute;
        /* left: 0rem; */
        /*background: url(//img10.360buyimg.com/imgzone/jfs/t1/155800/28/15227/8178/604acaccEb0307e8d/50ca945427922e5f.png) no-repeat;*/
        /*background-size: 100%;*/
        width: 100%;
        bottom: 1rem;

        img {
          width: 1rem;
          background-size: 100%;
          position: absolute;
          z-index: 1;
        }
      }
      .opacity-icon{
        background: url('../assets/lock-icon.png') no-repeat;
        background-size: 100%;
        height: 1rem;
        width: 1rem;
        position: absolute;
        left: .86rem;
        z-index: 10;
      }

      .opacity {
        opacity: 0.37;
      }

      /*文字颜色渐变*/
      .color-wear {
        color: #0a4a39;
        font-size: 0.25rem;
        margin-top: 0.09rem;
        margin-left: .5rem;
        padding-top: 0.3rem;
        width: 1.5rem;
        text-align: center;
        overflow: auto;
      }
      .achieve-title{
        background: url('../assets/home-allrights-title.png') no-repeat;
        background-size: 100%;
        height: .76rem;
        width: 4.14rem;
        margin: -.3rem auto;
      }
      .achieve-nowrap {
        width: 90%;
        margin: 0 auto;
        padding-top: 0.3rem;
        padding-bottom: 0.1rem;
        /* margin-top: 0.2rem; */
        overflow-x: scroll;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

      .achieve-item {
        width: 1.7rem;
        text-align: center;
        padding: 0.1rem 0;
        margin-top: 0.15rem;
        position: relative;
        display: inline-block;

        .gif {
          width: 0.9rem;
          background-size: 100%;
          position: absolute;
          bottom: 0.3rem;
        }

        .points-toast {
          width: .66rem;
          height: .25rem;
          background: url('../assets/lock-toast.png') no-repeat;
          background-size: 100%;
          color: #ffffff;
          font-size: 0.17rem;
          text-align: center;
          /* padding: 0.02rem 0.06rem 0.02rem 0.4rem; */
          position: absolute;
          top: 0.2rem;
          left: 1.6rem;
          z-index: 15;
        }
      }

      /*进度条*/
      .grow-progress-bg {
        width: 5.85rem;
        /*margin-left: 0.25rem;*/
        height: 0.52rem;
        /*margin-top: 1rem;*/
        padding: 0.065rem 0.06rem 0 0.065rem;
        position: absolute;
        display: flex;
        left: .8rem;
        bottom: 4.7rem;
        background: url('../assets/home-progress-bg.png') no-repeat;
        background-size: 100%;

        .line {
          width: 0;
          height: 0.41rem;
          background: url('../assets/home-progress-line.png') no-repeat;
          background-size: 100% .15rem;
        }
        .grow-middle{
          position: absolute;
          left: 1.5rem;
          top: 0.4rem;
          color: #333333;
          font-size: 0.2rem;
          text-align: center;
          width: 3rem;
        }
        .number {
          font-size: 0.3rem;
          position: absolute;
          bottom: -.2rem;
          right: 0;
          color: #ffffff;
          line-height: 0.45rem;
          font-weight: bold;
        }
        .all-rights{
          position: absolute;
          bottom: 1.4rem;
          width: 1.8rem;
          height: 0.44rem;
          right: -.15rem;
          background: url('../assets/home-allrights.png') no-repeat;
          background-size: 100%;
        }

        .jiangbei {
          position: absolute;
          top: -.65rem;
          left: 0;
        }

        .progress-spot {
          height: 0.18rem;
          width: 0.2rem;
          background-repeat: no-repeat;
          margin-top: -0.08rem;
        }

        .progress-spot_ {
          width: .3rem;
          background-size: 100%;
          position: absolute;
          left: .05rem;
          bottom: -.16rem;
        }
      }
      .transition {
        transition-duration: 0.2s;
        transition-timing-function: linear;
      }

      .grow-progress {
        width: 100%;
        position: absolute;
        bottom: 4.6rem;

        .progress-bg {
          width: 5.34rem;
          height: .38rem;
          border-radius: .5rem;
          background: url("../assets/home-progress-bg.png") no-repeat;
          background-size: 100% 100%;
          margin: 0 auto;
          position: relative;

          .progress-active {
            width: 1rem;
            height: .38rem;
            border-radius: .5rem;
            background: #dbecff;
            position: absolute;
            top: 0;
            right: 0;

            .progress-pointer {
              width: .48rem;
              height: .48rem;
              line-height: .48rem;
              border-radius: .5rem;
              color: #1236aa;
              font-size: .25rem;
              font-weight: 900;
              background: url("../assets/point-icon.png") no-repeat;
              background-size: 100% 100%;
              position: absolute;
              top: -.05rem;
              left: -.3rem;
              z-index: 1;
            }
          }

          .toast-num {
            position: absolute;
            top: .1rem;
            right: .2rem;
            font-size: .18rem;
            color: #012c7e;
          }
        }

        .between-num {
          margin-top: .1rem;
          font-size: .2rem;
          color: #1c2580;
        }
      }
    }

    .all-equities {
      width: 6.8rem;
      position: absolute;
      right: .4rem;
      top: 10rem;
    }

    .grow-process {
      position: relative;
      margin-top: 1.3rem;

      .title {
        position: absolute;
        width: 4.11rem;
        right: 1.5rem;
        top: 1.8rem;
      }

      .detail-rule {
        position: absolute;
        right: .5rem;
        top: 1rem;
        background: url('../assets/rule-btn.png') no-repeat;
        background-size: 100%;
        width: 1.8rem;
        height: .44rem;
      }

      .content {
        background: url("../assets/home-grow-bg.png") no-repeat;
        background-size: 100% 100%;
        width: 6.9rem;
        height: 16.01rem;
        margin: -2.4rem auto;
        padding: 0.43rem 0.46rem;
        box-sizing: border-box;

        .tab {
          width: 5.45rem;
          height: .5rem;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          margin: 2.4rem auto 0;
          line-height: .5rem;
          align-content: center;
          /*border-bottom: 2px #dcf2ff solid;*/

          .item {
            width: 1.5rem;
            height: .5rem;
            font-size: .21rem;
            color: #2aab27;
            font-family: MicrosoftYaHei-Bold;
            text-shadow: 0 0 0 #ffffff, 1px 1px #ffffff, -1px 1px #ffffff, 1px -1px #ffffff, -1px -1px #ffffff;
          }

          .item-active {
            font-weight: 900;
            color: #084b39;
            border-bottom: 2px #084b39 solid;
            font-size: .25rem;
          }
        }

        .process-list {
          float: left;
          margin-top: .15rem;

          .process {
            width: 1.7rem;
            height: 2.5rem;
            text-align: center;
            margin: .1rem .13rem;
            float: left;

            img {
              width: 1.35rem;
              height: 1.41rem;
            }

            .process-title {
              width: 1.7rem;
              height: .44rem;
              line-height: .44rem;
              background: url("../assets/home-process-btn.png") no-repeat;
              background-size: 100% 100%;
              text-align: center;
              font-family: SourceHanSansCN-Bold;
              font-size: 0.24rem;
              font-weight: 900;
              color: #ffffff;
              margin-top: -.2rem;
            }

            .process-content {
              width: 1.7rem;
              color: #084b39;
              font-size: .17rem;
              margin-top: .15rem;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
</style>
