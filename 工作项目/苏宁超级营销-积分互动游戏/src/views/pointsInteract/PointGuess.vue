<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-21 09:43:14
 * @LastEditTime: 2021-01-13 17:33:12
 * @FilePath: \SNActivity\src\views\pointsInteract\PointGuess.vue
-->

<template>
  <div class="point-guess-views" :class='{maxHeight:isShowSunCode}'>
    <!-- 开卡 -->
    <OpenCard />
    <!-- 太阳码 小程序跳转 -->
    <img :src="form.sunCode" v-if="isShowSunCode" class="sun-code">

    <div class="header-box">
      <!-- 店铺名字 -->
      <a :href="`https://shop.m.suning.com/${form.shopInfo.sid}.html`">{{form.shopInfo.shopName}}</a>
      <!-- 游戏记录按钮 -->
      <div class="game-record" @click="showGuessRecord()">游戏记录</div>
      <!-- 头部背景图 -->
      <div class="header-bg-box">
        <img src="@/assets/img/header-bg.png" class="header-bg">
      </div>
    </div>

    <div class="middle-box">
      <!-- 用户名积分余额 -->
      <div class="info">
        <p class="info-name"><img :src="form.userInfo.headPicURL">{{form.userInfo.nickName}}</p>
        <p class="info-point"><img src="@/assets/img/point.png"><span>积分余额: </span><span class="point-num">{{form.myPoints}}</span><span>积分</span></p>
      </div>
      <!-- 下注区 -->
      <div class="guess-back">
        <img src="@/assets/img/guess-back.png" class="guess-bg">
        <p v-if="status === '1' " class="guess-title">请选择积分筹码</p>
        <p v-if="status === '2' " class="guess-title">请选择大或小区下注</p>
        <p v-if="status === '3' " class="guess-title">点击X符号取消下注</p>
        <div class="guess-big-box" @click="wager('1')">
          <div class="guess-big" :class="{shaking:isShakeing}">大</div>
          <div class="choose-big-box" v-if="status === '3' && pointGuessForm.bigOrSmall ==='1' ">
            <img class="big-img" v-if="status === '3'" :src="require('@/assets/img/points-'+pointGuessForm.selectedPoints+'.png')">
            <img class="close-points" src="@/assets/img/points-close.png" @click="cancleWager()">
          </div>
        </div>
        <div class="guess-small-box" @click="wager('0')">
          <div class="guess-small" :class="{shaking:isShakeing}">小</div>
          <div class="choose-small-box" v-if="status === '3' && pointGuessForm.bigOrSmall ==='0'">
            <img class="small-img" v-if="status === '3'" :src="require('@/assets/img/points-'+pointGuessForm.selectedPoints+'.png')">
            <img class="close-points" src="@/assets/img/points-close.png" @click="cancleWager()">
          </div>
        </div>
      </div>
      <!-- 筹码区 -->
      <div class="points-choose-box">
        <div class="points-choose-item" v-for="(item,index) in pointsIconList" :key="item.num" :class="{active:isActive == index}" @click="choosePoints(index)">
          <img :src="require('@/assets/img/points-'+item.num+'.png')">
        </div>
      </div>

      <!-- 骰子 -->
      <div class="dice-box">
        <div class="dice" :class="[getDiceStatus]">
        </div>
      </div>

      <!-- 开始按钮 -->
      <div class="time-limit-box" v-if="pointGuessForm.activityContent.limitTimes">今天剩余<span class="time-limit-span">
          {{ restCount }}</span>次开奖机会</div>
      <div v-if="status === '3' " class="begin-btn-true" @click="beginGuess()">
        点击开始
      </div>
      <div v-else class="begin-btn-false">
        下注后开始
      </div>
      <!-- 关注店铺 -->
      <div class="follow-shop-box" @click='followShop()'>
        <el-checkbox v-model="form.followShopChecked" @change="changeFollowShopChecked()">
          <span class="text">同时关注{{form.shopInfo.shopName}}</span>
        </el-checkbox>
      </div>
    </div>

    <div class="bottom-box">
      <!-- 游戏规则标题 -->
      <div class="rule-title">
        <span class="left"></span>
        <span class="title">游戏规则</span>
        <span class="right"></span>
      </div>
      <!-- 规则内容 -->
      <div class="rule-content">
        <div class="content" v-html='ruleHtml'>

        </div>
      </div>
    </div>

    <div v-if='pointGuessForm.isShowPriceModal'>
      <!-- 中奖弹窗 -->
      <div v-if='pointGuessForm.guessResult.rewardPoint' class="price-modal">
        <div class="black-shadow"></div>
        <div class="price-content">
          <div class="price-wrap">
            <div class="close-img" @click="closePriceModel()"></div>
            <div class="header">
              <p class="shopName">{{form.shopInfo.shopName}}</p>
              <img class="points-img" src="@/assets/img/price-point.png">
            </div>
            <div class="body">
              <div class="text1">恭喜您中了</div>
              <div class="text2">{{pointGuessForm.guessResult.rewardPoint}}积分</div>
              <div class="text3">积分已放到您的账户中，可在<span class="text4">店铺会员页</span>中查看</div>
            </div>
            <div class="footer-win">
              <a class="share" href="#" @click="share()">立即分享</a>
              <a class="toShop" :href="`https://shop.m.suning.com/${form.shopInfo.sid}.html`">进店逛逛</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 未中奖弹窗 -->
      <div v-else class="price-modal">
        <div class="black-shadow"></div>
        <div class="price-content">
          <div class="price-wrap">
            <div class="close-img" @click="closePriceModel()"></div>
            <div class="header none-bg">
              <img class="points-img" src="@/assets/img/price-lose.png">
            </div>
            <div class="body">
              <div class="text1">很抱歉</div>
              <div class="text2">未中奖</div>
              <div class="text3">中奖不是最终的追求,重要的是开心咯</div>
              <a class="toShop" :href="`https://shop.m.suning.com/${form.shopInfo.sid}.html`">进店逛逛</a>
            </div>
            <div class="footer-lose">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏记录 -->
    <div class="game-record-modal" v-if="pointGuessForm.isShowGuessRecord">
      <div class="black-shadow"></div>
      <div class="record-content">
        <div class="record-wrap">
          <div class="header">
            <div class="close-record-model" @click="closeRecordModel"></div>

            <div class="header-title">
              游戏记录
            </div>
          </div>
          <div class="body">
            <div class="modal-body">
              <table>
                <thead>
                  <tr>
                    <th style="width:45%;">参与时间</th>
                    <th style="width:15%;">下注</th>
                    <th style="width:20%;">中奖状态</th>
                    <th style="width:20%;">奖励积分</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item) in pointGuessForm.recordList.list" :key="item.partakeTime">
                    <td style="width:45%;">{{item.partakeTime | timeFormat("yyyy-mm-dd-hh-mm")}}</td>
                    <td style="width:15%;">{{item.point}}</td>
                    <td style="width:20%;">{{item.status==1?"猜中":"未猜中"}}</td>
                    <td style="width:20%;">{{item.rewardPoint==null?0:item.rewardPoint}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="record-text" v-if="pointGuessForm.recordList.count!=pointGuessForm.recordList.list.length" @click="showGuessRecord()">
                点击查看更多（{{pointGuessForm.recordList.list.length + "/" + pointGuessForm.recordList.count}}）
              </div>
              <div class="record-text" v-else>已全部显示（{{pointGuessForm.recordList.list.length + "/" + pointGuessForm.recordList.count}}）</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 调用map辅助函数
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
// 引入苏宁方法
import getSn from '@/assets/js/suning.js';
const { galaxie, isSnApp, isMiniApp } = getSn();
// 引入axios配置文件
import axios from '@/axios/index';
import OpenCard from '@/components/pointsInteract/OpenCard.vue';
export default {
  components: {
    OpenCard,
  },
  data () {
    return {
      isShakeing: false, // 字体是否开始摇晃
      status: '1', // 当前状态  1未选择筹码  2已选择筹码未下注  3已下注
      isActive: '-1', // 当前筹码是否被选中
      pointsIconList: [ // 积分筹码列表
        {
          num: '5',
        },
        {
          num: '10',
        },
        {
          num: '20',
        },
        {
          num: '50',
        }
      ]
    };
  },
  mounted () {
    // 初始化
    this.$nextTick(() => {
      this.init();
      this.setShareInfo({
        posterUrl: 'https://uimgproxy.suning.cn/uimg1/sop/commodity/PlJO93jhXjf9LOC0KdIF0g.jpg',
        iconUrl: 'https://uimgproxy.suning.cn/uimg1/sop/commodity/zp5WlLSP1u4WD6Lzxt1Ifw.jpg',
        title: '积分猜大小',
        baseUrl: `${process.env.VUE_APP_BASEURL}activity/pointGuess/`,
      });
    });
  },
  computed: {
    ...mapState('pointGuess', ['pointGuessForm']),
    ...mapState(['form']),
    ...mapGetters('pointGuess', ['restCount']),
    // 获取当前骰子的状态 ready 准备  moving旋转中   end 结果
    getDiceStatus () {
      if (this.pointGuessForm.diceStatus === 1) {
        return 'ready';
      } else if (this.pointGuessForm.diceStatus === 2) {
        return 'moving';
      } else {
        return 'end' + this.pointGuessForm.guessResult.dice;
      }
    },
    isShowSunCode () {
      if (process.env.NODE_ENV === 'loacl') {
        return false;
      }
      if (!isSnApp && !isMiniApp) {
        return true;
      } else {
        return false;
      }
    },
    ruleHtml () {
      return this.pointGuessForm.activityContent.rule.replace(/\n/, '').replace(/\n/g, '<br/>');
    }
  },
  methods: {
    ...mapActions('pointGuess', ['getActivityContent', 'guess', 'getRecordList']),
    ...mapActions(['followShop', 'getShopInfo', 'getOpenCard', 'getMyPoints', 'getUserInfo', 'share', 'getSunCode']),
    ...mapMutations(['changeFollowShopChecked', 'setPin', 'setActivityId', 'setShareInfo']),
    ...mapMutations('pointGuess', ['setBigOrSmall', 'setSelectedPoints', 'setDiceStatus', 'setIsShowPriceModal', 'setIsShowGuessRecord', 'setRecordList', 'setRecordPageNo']),
    init () {
      galaxie.user.getUnionId(async (err, unionld) => {
        if (process.env.NODE_ENV === 'loacl') {
          unionld = process.env.VUE_APP_PIN;
        }
        if (err) {
          // eslint-disable-next-line new-cap
          this.$toast(err);
        } else if (unionld) {
          // 保存活动id
          this.setActivityId(this.$route.params.activityId);
          // 保存pin
          this.setPin(unionld);
          // 获取活动信息
          await this.getActivityContent();
          // 获取太阳码
          this.getSunCode();
          // 获取店铺信息
          this.getShopInfo();
          // 获取我的积分
          this.getMyPoints();
          // 获取用户信息
          this.getUserInfo();
          // 判断是否开卡
          this.getOpenCard();
          // 触发埋点
          this.accessLog();
        } else {
          // eslint-disable-next-line new-cap
          this.$toast('获取pin失败');
        }

      }, true);
    },
    /**
    * @description: 选择筹码
    * @param {*} index  当前选择的筹码索引
    */
    choosePoints (index) {
      // 只有当前处于 未选择筹码 状态  才可以选择筹码
      if (this.status === '1') {
        // 当前选择的筹码变大
        this.isActive = index;
        // 给筹码赋上值 当前选择的是多大面额的筹码
        this.setSelectedPoints(this.pointsIconList[index].num);
        // 状态置为  2已选择筹码未下注
        this.status = '2';
        // 文字开始摇晃
        this.isShakeing = true;
      }

    },
    /**
     * @description:  开始下注
     * @param {*} val 压大还是压小
     */
    wager (val) {
      // 只有当前处于 已选择筹码未下注 状态  才可以下注
      if (this.status === '2') {
        // 当前下注的是大还是小
        this.setBigOrSmall(val);
        // 状态置为 已下注
        this.status = '3';
        // 停止摇晃
        this.isShakeing = false;
      } else {
        return false;
      }
    },
    /**
     * @description: 取消下注
     */
    cancleWager () {
      // 清空筹码面额
      this.setSelectedPoints('-1');
      // 状态置为  未选择筹码
      this.status = '1';
      // 筹码取消放大
      this.isActive = '-1';
      // 字体开始摇晃
      // this.isShakeing = true;
    },
    /**
     * @description: 开始游戏
     */
    beginGuess () {
      let endTime = new Date(this.pointGuessForm.activityContent.endTimeStr).getTime();
      let startTime = new Date(this.pointGuessForm.activityContent.startTimeStr).getTime();

      let nowTime = new Date().getTime();
      if (endTime < nowTime) {
        this.$toast('活动已结束!');
        return false;
      }
      if (startTime > nowTime) {
        this.$toast('活动未开始!');
        return false;
      }
      if (this.form.myPoints < this.pointGuessForm.selectedPoints) {
        // eslint-disable-next-line new-cap
        this.$toast('积分不足!');
        return false;
      }
      if (this.restCount <= 0 && this.pointGuessForm.activityContent.limitTimes) {
        // eslint-disable-next-line new-cap
        this.$toast('开奖次数不足!');
        return false;
      }
      if (this.pointGuessForm.diceStatus === 1) {
        this.guess();
        // 修改骰子的状态为旋转中
        this.setDiceStatus(2);
      }
    },
    /**
     * @description: 关闭奖品弹窗 初始化活动数据
     */
    closePriceModel () {
      // 关闭奖品弹窗
      this.setIsShowPriceModal(false);
      // 骰子状态置为准备
      this.setDiceStatus(1);
      // 筹码面额置为空
      this.setSelectedPoints('-1');
      // 取消下注
      this.setBigOrSmall('-1');
      // 状态置为未选择筹码
      this.status = '1';
      // 筹码回复原来大小
      this.isActive = '-1';
    },
    /**
     * @description: 展示游戏记录弹窗
     */
    showGuessRecord () {
      // 获取游戏记录列表
      this.getRecordList();
      // 打开游戏记录弹窗
      this.setIsShowGuessRecord(true);
    },
    /**
     * @description: 关闭游戏记录弹窗
     */
    closeRecordModel () {
      // 关闭游戏记录弹窗
      this.setIsShowGuessRecord(false);
      // 清空游戏记录列表
      this.setRecordList([]);
      // 游戏记录查询页数重置为1
      this.setRecordPageNo(1);
    },
    /**
      * @description: 埋点
      */
    async accessLog () {
      let subType = '';
      if (isSnApp) {
        subType = 'app';
      } else if (isMiniApp) {
        subType = 'wx';
      }
      let res = await axios({
        method: 'post',
        url: '/api/common/accessLog',
        data: {
          activityId: this.form.activityId, // 活动id
          code: 41, // 业务类型
          mixPin: this.form.pin, // 用户pin
          pageUrl: window.location.href, // 当前无线页面地址
          pin: this.form.pin, // 用户pin
          subType: subType, // 子类型
          venderId: this.form.userId, // 店铺id
        },
      });
    },
  }
};
</script>

<style lang='scss'>
.point-guess-views {
  background-color: #28045e;
  background-image: url('../../assets/img/pointGuessBg.png');
  background-size: content;
  background-repeat: no-repeat;
  position: relative;
  padding: 0.3rem 0.4rem;
  max-width: 750px;
  min-height: 100vh;

  .sun-code {
    width: 100vw;
    min-height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999;
  }

  .header-box {
    a {
      font-size: 0.24rem;
      color: rgb(255, 243, 90);
    }

    .game-record {
      border: 1px solid #5bd5f6;
      color: #5bd5f6;
      line-height: 0.48rem;
      width: 1.4rem;
      text-align: center;
      border-radius: 4px;
      font-size: 0.24rem;
      float: right;
    }

    .header-bg-box {
      width: 5.61rem;
      margin-left: auto;
      margin-right: auto;
      height: 3.78rem;

      .header-bg {
        border: 0;
        max-width: 100%;
      }
    }
  }

  .middle-box {
    padding-top: 0.1rem;

    .info {
      display: flex;
      justify-content: space-between;

      p {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.2rem;
        color: white;

        img {
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 50%;
          margin-right: 0.1rem;
        }
      }

      .point-num {
        padding-top: 0.04rem;
        color: rgb(242, 60, 60);
      }
    }

    .guess-back {
      width: 100%;
      padding-top: 0.2rem;
      position: relative;

      * {
        position: absolute;
      }

      .guess-bg {
        border: 0;
        max-width: 100%;
        position: relative;
      }

      .guess-title {
        position: absolute;
        font-size: 0.24rem;
        top: 0.24rem;
        color: #cfb88b;
        left: 50%;
        transform: translateX(-50%);
      }

      .guess-big-box {
        position: absolute;
        width: 50%;
        height: 100%;
        left: 0;
        top: 0;

        .guess-big {
          color: #7f2241;
          font-size: 0.6rem;
          position: absolute;
          top: 0.96rem;
          left: 0.46rem;
          font-weight: bold;
        }

        .choose-big-box {
          width: 0.97rem;
          height: 1.04rem;
          position: absolute;
          left: 1.6rem;
          top: 0.9rem;

          img {
            border: 0;
            max-width: 100%;
          }
        }
      }

      .guess-small-box {
        position: absolute;
        width: 50%;
        height: 100%;
        right: 0;
        top: 0;

        .guess-small {
          color: #766f6a;
          font-size: 0.6rem;
          position: absolute;
          top: 0.96rem;
          right: 0.4rem;
          font-weight: bold;
        }

        .choose-small-box {
          width: 0.97rem;
          height: 1.04rem;
          position: absolute;
          right: 1.6rem;
          top: 0.9rem;

          img {
            border: 0;
            max-width: 100%;
          }
        }
      }

      .close-points {
        position: absolute;
        width: 0.32rem;
        top: 0;
        right: 0;
      }

      @keyframes tada {
        0% {
          -webkit-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
        }

        10%,
        20% {
          -webkit-transform: scale(0.9) rotate(-3deg);
          -ms-transform: scale(0.9) rotate(-3deg);
          transform: scale(0.9) rotate(-3deg);
        }

        30%,
        50%,
        70%,
        90% {
          -webkit-transform: scale(1.1) rotate(3deg);
          -ms-transform: scale(1.1) rotate(3deg);
          transform: scale(1.1) rotate(3deg);
        }

        40%,
        60%,
        80% {
          -webkit-transform: scale(1.1) rotate(-3deg);
          -ms-transform: scale(1.1) rotate(-3deg);
          transform: scale(1.1) rotate(-3deg);
        }

        100% {
          -webkit-transform: scale(1) rotate(0);
          -ms-transform: scale(1) rotate(0);
          transform: scale(1) rotate(0);
        }
      }

      .shaking {
        animation: tada 1s infinite;
      }
    }

    .points-choose-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0.3rem 0.3rem;

      div {
        width: 0.97rem;
        height: 1.04rem;
      }

      img {
        border: 0;
        max-width: 100%;
      }

      .active {
        transform: scale(1.4);
      }
    }

    .begin-btn-false {
      --bgColorBegin: #e6e6e6;
      --bgColorEnd: #cccccc;
      --textColor: #999999;
      width: 6.6rem;
      border-radius: 0.45rem;
      background: linear-gradient(var(--bgColorBegin), var(--bgColorEnd));
      color: var(--textColor);
      font-size: 0.36rem;
      line-height: 0.9rem;
      text-align: center;
      margin: 0.2rem auto;
    }

    .begin-btn-true {
      --bgColorBegin: #ff5853;
      --bgColorEnd: #dd2546;
      --textColor: #fff;
      width: 6.6rem;
      border-radius: 0.45rem;
      background: linear-gradient(var(--bgColorBegin), var(--bgColorEnd));
      color: var(--textColor);
      font-size: 0.36rem;
      line-height: 0.9rem;
      text-align: center;
      margin: 0.2rem auto;
    }

    .time-limit-box {
      font-size: 0.24rem;
      line-height: 0.32rem;
      text-align: center;
      color: #fff;
      .time-limit-span {
        color: rgb(242, 60, 60);
      }
    }

    .follow-shop-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.2rem;

      .el-checkbox__inner {
        border-radius: 50%;
      }

      .text {
        color: white;
        font-size: 0.32rem;
      }
    }

    .dice-box {
      display: flex;
      justify-content: center;
      .dice {
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
        top: 3.5rem;
        background-size: 100%;
      }

      .ready {
        animation: readyRotateIn 1s;
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t14596/96/2188990943/17174/a3a45e0f/5a78668bN30c288f8.png');
      }
      .moving {
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t19129/231/426516753/70155/db5fd4f1/5a78668bNf4559ee7.png');
        animation: movingDice 0.4s steps(4) infinite;
      }
      @keyframes readyRotateIn {
        0% {
          transform-origin: center;
          transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
          animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          opacity: 0;
        }
        40% {
          transform-origin: center;
          opacity: 1;
          transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)
            rotate(-200deg);
          animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
        }
        to {
          transform-origin: center;
          opacity: 1;
        }
      }
      @keyframes movingDice {
        from {
          background-position: 0 0;
        }

        to {
          background-position: 0 100%;
        }
      }
      .end1 {
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t16087/150/2019041475/15710/d0e41d0/5a78668bN0e57bfe6.png') !important;
        animation: tada 1s;
      }

      .end2 {
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t14356/354/2167565867/16607/3b661c1/5a78668cN960929f4.png') !important;
        animation: tada 1s;
      }

      .end3 {
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t16885/247/438272867/16179/c234d837/5a78668cNbcf5f26f.png') !important;
        animation: tada 1s;
      }

      .end4 {
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t16279/96/1916958641/16909/71ffcf55/5a78668cN1c12ed0f.png') !important;
        animation: tada 1s;
      }

      .end5 {
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t18631/179/462131108/17357/2cff87bc/5a78668cN12b03c68.png') !important;
        animation: tada 1s;
      }

      .end6 {
        background-image: url('https://img10.360buyimg.com/imgzone/jfs/t18508/194/460327619/17294/4725ff16/5a78668cNc9ba88de.png') !important;
        animation: tada 1s;
      }
    }
  }

  .bottom-box {
    margin: 0.5rem 0.4rem;

    .rule-title {
      text-align: center;
      font-size: 0.3rem;
      position: relative;

      .left {
        position: absolute;
        left: 0;
        right: 50%;
        top: 8px;
        height: 1px;
        text-align: left;
      }

      .right {
        position: absolute;
        left: 50%;
        right: 0;
        top: 8px;
        height: 1px;
        text-align: right;
      }

      .title {
        text-align: center;
        font-size: 0.3rem;
        color: white;
      }

      .left:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: -50%;
        height: 1px;
        background: #fff;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }

      .left:after {
        content: '';
        position: absolute;
        top: -2px;
        right: 18.5%;
        width: 8px;
        height: 8px;
        border: 1px solid #fff;
        border-radius: 100%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }

      .right:after {
        content: '';
        position: absolute;
        top: -2px;
        left: 21.5%;
        width: 8px;
        height: 8px;
        border: 1px solid #fff;
        border-radius: 100%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }

      .right:before {
        content: '';
        position: absolute;
        top: 0;
        left: -50%;
        right: 0;
        height: 1px;
        background: #fff;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 100% 100%;
      }
    }

    .rule-content {
      padding: 0.3rem 0;
      line-height: 0.5rem;
      font-size: 0.24rem;

      .content {
        margin-top: 0.2rem;
        color: white;
        line-height: 0.5rem;
        font-size: 0.24rem;
      }
    }
  }

  .price-modal {
    .black-shadow {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.85);
      height: 100%;
      z-index: 1000;
    }

    .price-content {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      z-index: 1000;

      .price-wrap {
        width: 5.27rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10%;

        .close-img {
          width: 0.5rem;
          height: 0.5rem;
          background-image: url('../../assets/img/price-close.png');
          position: absolute;
          right: -0.2rem;
          top: 1.4rem;
          z-index: 1;
          background-size: cover;
        }

        .header {
          background-image: url('../../assets/img/price-bg.png');
          width: 5.27rem;
          height: 4.42rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;

          .shopName {
            margin-top: 0.6rem;
            font-size: 0.2rem;
            color: rgb(51, 51, 51);
            z-index: 5;
            position: absolute;
            bottom: 1.9rem;
            width: 100%;
            text-align: center;
          }

          .points-img {
            position: absolute;
            top: 1.7rem;
            border: 0;
            max-width: 100%;
          }
        }

        .none-bg {
          background-image: url('');
        }

        .body {
          margin-top: -1px;
          padding: 0.36rem;
          text-align: center;
          background: #fff;

          .text1 {
            color: rgb(242, 60, 60);
            font-size: 0.3rem;
          }

          .text2 {
            color: rgb(242, 60, 60);
            font-size: 0.48rem;
          }

          .text3 {
            margin-top: 0.2rem;
            color: rgb(153, 153, 153);
            font-size: 0.2rem;
          }

          .text4 {
            color: rgb(242, 60, 60);
          }

          .toShop {
            display: block;
            height: 0.9rem;
            line-height: 0.9rem;
            font-size: 0.42rem;
            background: rgb(245, 98, 100);
            color: rgb(255, 255, 255);
            text-decoration: none;
            border-radius: 3px;
            margin-top: 0.3rem;
          }
        }

        .footer-win {
          padding: 0 0.36rem 0.86rem 0.36rem;
          border-radius: 0 0 10px 10px;
          text-align: center;
          background: #fff;
          margin-top: -2px;

          .share {
            float: left;
          }

          .toShop {
            float: right;
          }

          .toShop,
          .share {
            width: 50%;
            color: #666;
            font-size: 0.3rem;
            text-decoration: none;
          }
        }

        .footer-lose {
          margin-top: -2px;
          padding: 0 0.36rem 0.16rem 0.36rem;
          border-radius: 0 0 10px 10px;
          text-align: center;
          background: #fff;
        }
      }
    }
  }
  .game-record-modal {
    .black-shadow {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.85);
      height: 100%;
      z-index: 1000;
    }

    .record-content {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      z-index: 1000;

      .record-wrap {
        width: 6rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20%;

        .header {
          height: 1.65rem;
          text-align: center;
          background-image: url('../../assets/img/guess-record-bg.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;

          .close-record-model {
            width: 1rem;
            height: 1rem;
            position: absolute;
            right: 0;
            top: 0;
          }

          .header-title {
            width: 100%;
            text-align: center;
            font-size: 0.48rem;
            position: absolute;
            top: 0.4rem;
          }
        }

        .body {
          height: 5rem;
          background-color: white;
          margin-top: -2px;
          border-radius: 0 0 10px 10px;
          overflow: auto;

          .modal-body {
            table {
              font-size: 0.2rem;
              text-align: center;
              width: 100%;
            }
            thead {
              margin-bottom: 10px;
            }
            .record-text {
              margin: 0.1rem auto;
              width: 100%;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
.maxHeight {
  min-height: 5vh;
  max-height: 95vh;
  overflow: hidden;
}
</style>