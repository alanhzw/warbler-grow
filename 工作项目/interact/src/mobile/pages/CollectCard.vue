<!--
 * @Description:会员集卡
 * @Autor: hanzhiwei
 * @Date: 2021-01-25 10:26:16
 * @LastEditTime: 2021-08-30 15:01:02
 * @FilePath: \interact\src\mobile\pages\CollectCard.vue
-->
<template>
  <div class="collect-card-page">
    <div class="draw-box-page">
      <div class="draw-top">

      </div>
      <div class="draw-bottom">
        <!-- 抽奖按钮 -->
        <div class="draw-btn"
             v-if="canDraw"
             @click="drawPrice()"
             v-lz-click.isMain="'12'">
          已集齐卡片,立即抽奖
        </div>
      </div>
    </div>
    <open-card :isShowOpenCard='isShowOpenCard'
               @openCardFn="openCardFn"
               @close="isShowOpenCard=false" />
    <!-- 主图 -->
    <div class="main">
      <img :src="mainPic">
    </div>
    <!-- 活动规则按钮 -->
    <div class="rules"
         v-lz-click="'18'"
         @click="ruleBoxShowed = true">
      <img :src="ruleImg">
      <p>活动规则</p>
    </div>
    <!-- 我的奖品按钮 -->
    <div class="my-price"
         v-lz-click="'19'"
         @click="getMyPrizes">
      <img :src="ruleImg">
      <p>我的奖品</p>
    </div>
    <!-- 分享活动按钮 -->
    <div class="share-btn"
         v-lz-click.isMain="'2'"
         @click="shareActivity()">
      <img :src="ruleImg">
      <p>分享活动</p>
    </div>
    <!-- 分享好友增加机会的文字 -->
    <div class="share-text">
      <p>分享好友增加抽卡机会</p>
    </div>
    <!-- 卡片列表 -->
    <div class="card-list">
      <div class="card-flex">
        <div class="card-item"
             v-for="item in cardList"
             :key="item.url">
          <div class="card-number"
               v-if='item.count && item.count>99'>
            {{99+"+"}}
          </div>
          <div class="card-number"
               v-if='item.count && item.count<99'>
            {{item.count}}
          </div>
          <div class="card-number"
               v-if='!item.count'>
            {{0}}
          </div>
          <img class="card-border"
               src="../../assets/collect-card-border.png">
          <img class="card-showImg"
               :src="`${CONST.IMAGE_PREFIX}${item.cardUrl}`">
        </div>
      </div>
    </div>
    <!-- 抽卡按钮 -->
    <div class="status-btn">
      <img :src="btnImg"
           @click="drawCard()"
           v-lz-click.isMain="'1'">
      <p class="draw-times"
         v-if="activityInfo.returnCode === 0 && activityInfo.restDrawCardTimes">( {{restDrawCardTimes &lt; 99 ? restDrawCardTimes : '99+'}} )</p>
    </div>

    <!-- 活动规则弹窗 -->
    <bottom-box title="活动规则"
                :visible.sync="ruleBoxShowed">
      <div class="rule-str"
           v-html="ruleStr"></div>
    </bottom-box>
    <!-- 中奖弹窗 -->
    <van-popup class="prize-dialog"
               v-model="prizeDialogShow">
      <div class="result-box-success"
           :style="{backgroundImage:backgroundImage}">
        <img class="btn-close-icon"
             @click="prizeDialogShow=false"
             src="../../assets/btn-close.png" />
        <!-- 奖项类型(1-优惠券；2-京豆；3-实物商品；4-积分) -->
        <div v-if='prizeInfo.prizeType===1'
             class="coupon-box">
          <img src="../../assets/prize-coupon.png"
               class="common-prize-coupon">
          <div><span class="money-icon">￥</span><span class="money-num">{{prizeInfo.couponDiscount}}</span></div>
        </div>
        <img src="../../assets/common-prize-bean.png"
             class="common-prize"
             v-if='prizeInfo.prizeType===2'>
        <img src="../../assets/common-prize-point.png"
             class="common-prize"
             v-if='prizeInfo.prizeType===4'>
        <div class="content">
          <img class="product-style"
               v-if='prizeInfo.prizeType===3'
               :src="`${CONST.IMAGE_PREFIX}${prizeInfo.prizePicture}`" />
          <p class="award-tip">恭喜您获得:</p>
          <p class="award-prize-name"
             v-if='prizeInfo.prizeType===1'>{{ prizeInfo.prizeName }}</p>
          <p class="award-prize-name"
             v-if='prizeInfo.prizeType===2'>{{ prizeInfo.prizeName }}</p>
          <p class="award-prize-name"
             v-if='prizeInfo.prizeType===3'>{{ prizeInfo.prizeName }}</p>
          <p class="award-prize-name"
             v-if='prizeInfo.prizeType===4'>{{ prizeInfo.prizeName }}</p>
          <!-- <p class="tips-bean">京豆已放到您的账户中，<span>京东APP-我的-京豆</span>中查看</p> -->
          <div v-if="prizeInfo.prizeType === 3"
               class="btn-close"
               @click.stop="addressShow = true">
            <div @click="addAddress()">填写邮寄地址</div>
          </div>
          <div v-else
               class="btn-close"
               @click="prizeDialogShow = false">关闭</div>
        </div>
      </div>
    </van-popup>
    <!-- 没中奖弹窗 -->
    <van-popup class="prize-dialog"
               v-model="noPrizeDialogShow">
      <div class="result-box">
        <header>很抱歉</header>
        <div class="content">
          <img class="blank-pic"
               src="../../assets/blank-box.png" />
          <p class="blank-tip">～ 您与奖品擦肩而过 ～</p>
          <div class="btn-close"
               @click="noPrizeDialogShow = false">关闭</div>
        </div>
      </div>
    </van-popup>
    <!-- 填写收货地址弹窗 -->
    <bottom-box title="邮寄地址"
                :visible.sync="addressShow">
      <address-edit :address-info='addressInfo'
                    save-button-text="确认提交"
                    @save="addAddr" />
    </bottom-box>
    <!-- 抽取卡片弹窗 -->
    <van-popup class="draw-card"
               v-model="cardShow">
      <div class="card-modal">
        <div v-if='cardInfo.cardUrl'
             class="card-show">
          <div class="blank-pic"
               :style="`background-image: url(${CONST.IMAGE_PREFIX}${cardInfo.cardUrl})`"></div>
          <div class="text-top">&nbsp;&nbsp;&nbsp;集齐<span> {{ cardList.length }} </span>张卡片记得抽奖</div>
          <img class="img-top"
               src="../../assets/collect-card-modal.png">
          <div class="text-bottom">{{cardInfo.cardName}}</div>
        </div>
        <div v-else
             class="card-show">
          <img class="img-top"
               src="../../assets/collect-no-card.png">
        </div>
        <img v-if='cardInfo.cardUrl'
             class="img-bottom"
             src="../../assets/collect-card-set.png"
             @click="cardShow = false">
        <br>
        <img class="img-close"
             src="../../assets/collect-card-colse.png"
             @click="cardShow = false">
      </div>
    </van-popup>
    <!-- 中奖记录弹窗 -->
    <bottom-box class="my-draw-prizes"
                title="中奖记录"
                :visible.sync="prizesBoxShowed">
      <div v-if="prizes.length === 0"
           class="blank-tip">您还未获得任何奖品</div>
      <div v-else>
        <div v-for="(prize, index) in prizes"
             class="prize-item"
             :key="`prize-${index}`">
          <div>
            <img class="prize-picture"
                 :src="`${CONST.IMAGE_PREFIX}${prize.prizePicture}`"
                 alt="">
            <div class="prize-type"
                 v-if="prize.prizeType ===2">京豆</div>
            <div class="prize-type"
                 v-if="prize.prizeType ===4">积分</div>
            <div class="prize-type"
                 v-if="prize.prizeType ===1">优惠券</div>
            <div class="prize-type"
                 v-if="prize.prizeType ===3">实物商品</div>
            <div class="person-info"
                 v-if="prize.prizeType ===3">收货人:{{prize.realName}} &nbsp; {{prize.mobile | telStr}}</div>
            <div class="prize-name">{{ prize.prizeName }}</div>
            <div class="award-time">获奖时间：{{ prize.awardTime }}</div>
          </div>
          <div v-if="prize.prizeType ===3"
               :class="`prize-status status-${prize.status}`">
            {{
              {
                f: "发放失败",
                s: "已发货",
                w: "待发货",
              }[prize.status]
            }}
            <div class="change-address">
              <div v-if='prize.status === "w" '
                   style="color:#118bff"
                   @click='updateAddress(prize)'>修改地址</div>
              <div v-if='prize.status === "s" '
                   style="clolr:#a0a0a0">修改地址</div>
            </div>
          </div>
        </div>
      </div>
    </bottom-box>
  </div>
</template>

<script>
import { ActivityService, UserService } from '@/mobile/service';
import { mapMutations } from 'vuex';
import BottomBox from '../components/BottomBox';
import areaData from '@/mobile/data/vantArea';
import CONST from '@/utils/constant';
import jdTools from '../utils/jd.js';
import { Toast } from 'vant';
import OpenCard from '../components/OpenCard';
import LzEvent from 'lz-event-tracking/lib/vue';
import getJDSDK from '@/mobile/lib/jd-sdk';

const isIOS = getJDSDK().Client.isIOS();

export default {
  components: {
    BottomBox,
    OpenCard,
  },
  data() {
    return {
      areaData,
      CONST,
      openCardInfo: {}, // 开卡信息
      isShowOpenCard: false, // 是否展示开卡弹窗
      btnState: true, // 防止连击 true 可点击  false不可点击
      prizes: [], // 我的奖品列表
      prizesBoxShowed: '', // 中奖记录弹窗
      prizeInfo: '', // 获奖弹窗的内容
      prizeDialogShow: false, // 展示奖品弹窗
      noPrizeDialogShow: false, // 未获奖弹窗
      ruleBoxShowed: false, // 规则弹窗
      cardInfo: '', // 单个卡片的详情
      cardShow: false, // 获得卡片弹窗
      mainPic: '', // 主图
      ruleImg: require('../../assets/collect-rule.png'), // 活动规则
      canDraw: false, // 是否可以抽奖
      activityId: this.$route.params.activityId,
      activityType: this.$route.params.type,
      activityInfo: {}, // 活动详情
      addressShow: false, // 地址弹窗
      cardList: [],
      addOrUpdate: 1, // 1是新增,2是更改
      recordId: '', // 奖品id
      addressInfo: {
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail: '',
      },
    };
  },
  filters: {
    telStr(value) {
      if (value) {
        return `${value.substr(0, 3)}****${value.substr(7)}`;
      }
      return '';
    },
  },
  computed: {
    backgroundImage() {
      if (this.prizeInfo.prizeType == 3) {
        return `url(${require('@/assets/common-prize-bg2.png')})`;
      }
      return `url(${require('@/assets/common-prize-bg.png')})`;
    },
    // 能否抽卡，0代表能抽卡，1-不符合参与条件，2-活动未开始，3-活动已结束，4-当日抽卡次数已用完
    btnImg() {
      if (this.activityInfo.returnCode === 0) {
        if (this.activityInfo.restDrawCardTimes) {
          return require('@/assets/collect-btn-draw.png');
        }
        return require('@/assets/collect-btn-draws.png');
      }
      if (this.activityInfo.returnCode === 1) {
        return require('@/assets/collect-btn-noway.png');
      }
      if (this.activityInfo.returnCode === 2) {
        return require('@/assets/collect-btn-notBegin.png');
      }
      if (this.activityInfo.returnCode === 3) {
        return require('@/assets/collect-btn-end.png');
      }
      if (this.activityInfo.returnCode === 4) {
        return require('@/assets/collect-btn-noChance.png');
      }
    },
    // 活动规则
    ruleStr() {
      if (this.activityInfo.activityRule) {
        let txt = this.activityInfo.activityRule;
        if (isIOS) {
          txt += '<br/><br/>本次活动为商家自发举办，与苹果公司及APP Store无关。';
          return txt.replace(/\n/g, '<br/>');
        }
        return txt.replace(/\n/g, '<br/>');
      }
      return '暂无规则';
    },
    // 剩余抽奖次数
    restDrawCardTimes() {
      if (this.activityInfo.restDrawCardTimes) {
        return this.activityInfo.restDrawCardTimes;
      }
      return '';
    },
  },

  methods: {
    // 根据地址名查找地址的id
    findAddressCord(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value));
    },
    ...mapMutations(['setEnterLoading', 'setLoading']),
    // 收货地址自定义校验
    addAddress() {
      this.prizeDialogShow = false;
      this.addOrUpdate = 1;
    },
    updateAddress(prize) {
      this.addOrUpdate = 2;
      this.addressInfo = {
        name: prize.realName,
        tel: prize.mobile,
        province: prize.province,
        city: prize.city,
        county: prize.county,
        addressDetail: prize.address,
      };
      this.addressShow = true;
      this.prizesBoxShowed = false;
      this.recordId = prize.recordId;
    },
    // 开卡
    openCardFn() {
      if (this.openCardInfo.openCardLink.indexOf('rn_channelId') > -1) {
        window.location.href = `${this.openCardInfo.openCardLink.split('rn_channelId=')[0]}rn_channelId=8504&rn_returnUrl=${window.location.href}`;
      } else {
        window.location.href = `${this.openCardInfo.openCardLink.split('channel=')[0]}channel=8504&returnUrl=${window.location.href}`;
      }
    },
    async getMemberStatus() {
      const { data } = await UserService.getMemberStatus({
        shopId: this.$route.params.shopId,
      });
      this.openCardInfo = data;

      if (!data.openedCard) {
        this.isShowOpenCard = true;
      }
    },
    validator(key, val) {
      console.log(val.length);
      if (key === 'name' && val.length > 10) {
        return '姓名过长';
      }
      console.log(key);
      if (key === 'addressDetail' && val.length > 50) {
        return '详细地址过长';
      }
    },
    // 获取活动详情
    async getActivityInfo() {
      const { data } = await ActivityService.getCollectCardActivityDetails({
        activityId: this.$route.params.activityId, // 活动ID
      });
      this.activityInfo = {
        ...data,
      };
      try {
        jdTools.setHeaderShare({
          title: data.shareText,
          imageUrl: `${CONST.IMAGE_PREFIX}${data.sharePic}`,
        });
      } catch (e) {
        console.log(e);
      }
      this.cardList = data.activityCollectCardInfoDTOS;
      document.title = data.activityName;
      UserService.getUserInfo({
        shopId: data.shopId,
        groupId: data.groupId,
      }).then(({ data }) => {
        this.userInfo = data;
        LzEvent.setBaseInfo({
          shopId: this.$route.params.shopId, // 店铺标识，不可以为空
          customerId: this.userInfo.customerId, // C端用户唯一身份标识customerId，不可以为空
          nickName: this.userInfo.nickname, // 用户昵称，不可以为空
          // 以下信息京东数据回流的时候需要使用
          // jdActivityId: 'jdActivityId001', // 调用JOS创建活动接口返回的活动id
          // siteId: 'JA2019_2132395', // 京东侧注册的网站id
          // userPin: '', // 京东用户pin
          // shareUserPin: '', // 如果是分享进入的本页面需要分享人的标识
        });
      });
    },
    // 判断是否能抽奖
    async judgeCanDraw() {
      const { data } = await ActivityService.collectCardDrawCheck({
        activityId: this.$route.params.activityId, // 活动ID
      });
      this.canDraw = data;
    },
    // 进行抽卡
    async drawCard() {
      if (!this.btnState || this.activityInfo.returnCode !== 0) {
        return false;
      }
      this.btnState = false;
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const { data } = await ActivityService.drawcard({
        activityId: this.$route.params.activityId, // 活动ID
      });
      this.cardInfo = {
        ...data,
      };
      if (data.cardOk) {
        this.cardShow = true;
      } else {
        this.cardShow = true;
      }
      this.getActivityInfo();
      this.judgeCanDraw();
      this.btnState = true;
      Toast.clear();
    },
    // 进行抽奖
    async drawPrice() {
      if (!this.btnState) {
        return false;
      }
      this.btnState = false;
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      const { data } = await ActivityService.collectCardDrawStart({
        activityId: this.$route.params.activityId, // 活动ID
      });
      this.prizeInfo = {
        ...data,
      };
      if (data.drawOk) {
        this.prizeDialogShow = true;
      } else {
        this.noPrizeDialogShow = true;
      }
      this.getActivityInfo();
      this.judgeCanDraw();
      this.btnState = true;
      Toast.clear();
    },
    // 填写地址
    async addAddr(data) {
      if (this.addOrUpdate === 1) {
        await ActivityService.addUserCostAllTotalAddress({
          activityId: this.activityId, // 活动ID
          activityType: 504,
          phone: data.tel, // 电话号
          realName: data.name, // 真实姓名
          province: data.province, // 省
          city: data.city, // 城市
          county: data.county, // 区县
          address: data.addressDetail, // / 详细地址信息
          recordId: this.prizeInfo.recordId,
        });
      } else {
        await ActivityService.addUserCostAllTotalAddress({
          activityId: this.activityId, // 活动ID
          activityType: 504,
          phone: data.tel, // 电话号
          realName: data.name, // 真实姓名
          province: data.province, // 省
          city: data.city, // 城市
          county: data.county, // 区县
          address: data.addressDetail, // / 详细地址信息
          recordId: this.recordId,
        });
      }
      this.addressShow = false;
      Toast('保存成功');
    },
    // 分享活动
    async shareActivity() {
      // todo
      try {
        jdTools.shareWithCmdword({
          title: this.activityInfo.shareText,
          imageUrl: `${CONST.IMAGE_PREFIX}${this.activityInfo.sharePic}`,
        });
      } catch (error) {
        // window.open(`https://www.baidu.com/s?wd=${error}`);
        // this.newLog(error);
        console.log(error);
      }
      await ActivityService.saveCardShareRecord({
        activityId: this.activityId, // 活动ID
      });
      this.getActivityInfo();
    },
    // 查询模板信息
    async getTemplate() {
      const { data } = await ActivityService.getCTemplateInstanceDetail({
        instanceId: this.activityInfo.tplId, // 活动ID
      });
      const newMainPic = JSON.parse(data.configJson).mainPic;
      if (newMainPic) {
        this.mainPic = `${CONST.IMAGE_PREFIX}${newMainPic}`;
      } else {
        this.mainPic = require('../../assets/collect-mainPic.png');
      }
    },
    // 获取我的奖品
    async getMyPrizes() {
      this.prizesBoxShowed = true;
      const { data } = await ActivityService.getCollectCardDrawRecordForC({
        activityId: this.activityId, // 活动ID
      });
      this.prizes = data;
    },
    newLog(err) {
      const text = `%c${err}`;
      return console.log(text, 'color:#fff;background:red;font-size:30px');
    },
  },
  async created() {
    await this.getMemberStatus();
    this.judgeCanDraw();
    await this.getActivityInfo();
    await this.getTemplate();
    this.setEnterLoading(false);
    this.setLoading(false);
  },
};
</script>

<style lang='scss'>
.collect-card-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  .draw-box-page {
    background: url('../../assets/collect-bg-long.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    width: 100%;
    min-height: 100vh;
    left: 0;
    top: 0;
    z-index: 0;
    .draw-top {
      width: 100%;
      height: 13rem;
      // background-color: red;
    }
    .draw-btn {
      background: url('../../assets/collect-candraw.png');
      background-size: cover;
      height: 0.8rem;
      width: 100%;
      position: absolute;
      bottom: 0rem;
      left: 0;
      line-height: 0.8rem;
      color: #ffa687;
    }
  }

  .main {
    position: absolute;
    width: 100%;
    img {
      width: 100%;
      position: absolute;
      top: 0rem;
      left: 0rem;
    }
  }

  .share-btn {
    position: absolute;
    top: 1.2rem;
    right: 0rem;
    img {
      width: 1.5rem;
      position: absolute;
      right: -0.25rem;
      top: 0.2rem;
    }
    p {
      width: 1.1rem;
      position: absolute;
      right: 0.04rem;
      top: 0.02rem;
      color: #ffffff;
      font-size: 0.26rem;
    }
  }
  .rules {
    img {
      width: 1.5rem;
      position: absolute;
      right: -0.25rem;
      top: 0.2rem;
    }
    p {
      width: 1.1rem;
      position: absolute;
      right: 0.04rem;
      top: 0.02rem;
      color: #ffffff;
      font-size: 0.26rem;
    }
  }

  .my-price {
    position: absolute;
    top: 0.6rem;
    right: 0rem;
    img {
      width: 1.5rem;
      position: absolute;
      right: -0.25rem;
      top: 0.2rem;
    }
    p {
      width: 1.1rem;
      position: absolute;
      right: 0.04rem;
      top: 0.02rem;
      color: #ffffff;
      font-size: 0.26rem;
    }
  }

  .rule-str {
    width: 100%;
    word-wrap: break-word;
    text-align: left;
  }

  .share-text {
    position: absolute;
    top: 8rem;
    width: 100%;
    p {
      display: inline-block;
      width: 100%;
      color: #751e00;
    }
  }

  .card-list {
    width: 100%;
    position: absolute;
    top: 9.3rem;

    .card-flex {
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      width: 95%;
      margin: 0 auto;

      .card-item {
        position: relative;
        .card-showImg {
          width: 1.2rem;
          height: 1.6rem;
          margin: 0 0.1rem;
        }
        .card-border {
          position: absolute;
          z-index: 3;
          right: -0.05rem;
          top: -0.3rem;
          width: 1.4rem;
          height: 2.1rem;
          margin: 0 0.1rem;
        }
        .card-number {
          position: absolute;
          z-index: 6;
          right: -0.1rem;
          top: -0.3rem;
          width: 0.6rem;
          height: 0.6rem;
          background: url('../../assets/collect-card-number.png');
          background-repeat: no-repeat;
          background-size: contain;
          line-height: 0.5rem;
          color: #7c2e0b;
        }
      }
    }
  }

  .status-btn {
    position: absolute;
    height: 1rem;
    width: 100%;
    left: 0;
    top: 11.2rem;
    display: flex;
    justify-content: center;
    img {
      width: 60%;
    }
    .draw-times {
      position: absolute;
      top: -0.1rem;
      left: 4.5rem;
      color: #f5e0af;
    }
  }
  .my-draw-prizes {
    .btn {
      position: absolute;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .rule-text {
      color: #333333;
      font-size: 0.24rem;
      line-height: 0.48rem;
      text-align: left;
      margin: 0.2rem;
    }
    .blank-tip {
      font-size: 0.24rem;
      color: #333333;
      padding: 0.4rem;
    }
    .prize-item {
      background: url('../../assets/my-prize-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 125%;
      margin: 0.1rem;
      padding: 0.1rem 0.4rem 1.1rem 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .prize-name {
        position: absolute;
        left: 1.2rem;
        top: 0.6rem;
        color: #ff3333;
        font-size: 0.3rem;
        text-align: left;
      }
      .prize-type {
        color: #999999;
        font-size: 0.2rem;
        text-align: left;
      }
      .change-address {
        width: 150%;
        position: absolute;
        right: 0rem;
        top: 0.4rem;
        color: #999999;
        font-size: 0.2rem;
        text-align: right;
      }
      .person-info {
        position: absolute;
        right: 0.2rem;
        top: 0.1rem;
        color: #999999;
        font-size: 0.2rem;
        text-align: right;
      }
      .award-time {
        position: absolute;
        left: 1.2rem;
        top: 1rem;
        color: #999999;
        font-size: 0.2rem;
        text-align: left;
      }
      .prize-picture {
        position: absolute;
        top: 0.7rem;
        left: 0.2rem;
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        border: 0.01rem solid #999999;
      }
      .prize-status {
        position: absolute;
        top: 0.6rem;
        right: 0.2rem;
        font-size: 0.24rem;
      }
      .status-f {
        color: #ff3333;
      }
      .status-s {
        color: #00bb66;
      }

      .status-w {
        color: #ff9900;
      }
    }
  }

  .draw-card {
    width: 100%;
    background-color: transparent;
    .card-modal {
      position: relative;
      .card-show {
        position: relative;
        .no-card {
          position: absolute;
          top: 3.6rem;
          width: 100%;
          font-size: 0.5rem;
        }
        .blank-pic {
          position: absolute;
          top: 2.6rem;
          left: 50%;
          transform: translateX(-50%);
          width: 3rem;
          height: 3rem;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        .img-top {
          width: 90%;
        }
        .text-top {
          position: absolute;
          top: 2rem;
          // left: 2rem;
          width: 100%;
          span {
            font-size: 0.4rem;
            color: #b62f00;
          }
        }
        .text-bottom {
          width: 100%;
          position: absolute;
          top: 5.9rem;
          left: 0;
        }
      }

      .img-bottom {
        width: 70%;
      }
      .img-close {
        width: 10%;
      }
    }
  }

  .prize-dialog {
    background-color: transparent;
  }
  .result-box {
    width: 5.4rem;
    background-color: #f2f2f2;
    border-radius: 0.2rem;
    padding: 0.2rem;

    header {
      font-size: 0.36rem;
      color: #333333;
      margin: 0.3rem;
    }
    .content {
      background-color: #ffffff;
      border-radius: 0.1rem;
      padding: 0.3rem;

      .blank-pic {
        margin-top: 0.3rem;
        height: 1.83rem;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
      .blank-tip {
        font-size: 0.3rem;
        color: #333333;
      }
      .btn-close {
        height: 0.8rem;
        line-height: 0.8rem;
        background-color: #e2231a;
        border-radius: 0.05rem;

        font-size: 0.3rem;
        color: #ffffff;
      }
      .award-tip {
        font-size: 0.3rem;
        color: #ff9900;
      }
      .award-prize-name {
        font-size: 0.3rem;
        font-weight: 600;
        color: #e2231a;
      }
    }
  }
  .result-box-success {
    width: 6rem;
    height: 8.5rem;
    // background-image: url('../../assets/common-prize-bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
    * {
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    .common-prize {
      width: 2rem;
      height: 2rem;
      top: 1.74rem;
    }
    .product-style {
      width: 2rem;
      top: 2rem;
    }
    .coupon-box {
      position: relative;
      .money-icon {
        width: 2rem;
        position: absolute;
        top: 2rem;
        left: 1.8rem;
        color: #ffd971;
        font-size: 0.4rem;
      }
      .money-num {
        width: 2rem;
        position: absolute;
        top: 2rem;
        left: 2.7rem;
        color: #ffd971;
        font-size: 1rem;
      }
    }

    .tips-bean {
      position: absolute;
      top: 0;
      width: 100%;
    }
    .common-prize-coupon {
      width: 3rem;
      height: 2rem;
      top: 1.74rem;
    }

    .btn-close {
      width: 5rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #e2231a;
      border-radius: 0.05rem;
      top: 6.5rem;
      font-size: 0.3rem;
      color: #ffffff;
    }
    .btn-close-icon {
      position: absolute;
      height: 0.3rem;
      width: 0.3rem;
      top: 0.8rem;
      left: 95%;
    }
    .award-tip {
      font-size: 0.35rem;
      color: #ff9900;
      top: 4rem;
      font-weight: 700;
    }
    .award-prize-name {
      font-size: 0.6rem;
      color: #e2231a;
      top: 4.3rem;
      font-weight: 700;
    }
  }
  .bottom-box {
    z-index: 2001;
  }
  .van-popup--bottom.van-popup--round {
    z-index: 30000;
  }
}
</style>
