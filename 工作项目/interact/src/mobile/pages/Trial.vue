<!--
 * @Description:会员试用
 * @Autor: hanzhiwei
 * @Date: 2021-01-25 10:28:55
 * @LastEditTime: 2021-10-27 11:01:24
 * @FilePath: \interact\src\mobile\pages\Trial.vue
-->
<template>
  <!-- 整个页面 -->
  <div class="trial-back"
       :style="`background-image:url(${config.repeatImg})`">
    <img :src="backImgCom"
         class="main-img">
    <div class="trial-page">
      <!-- 开卡弹窗 -->
      <open-card :isShowOpenCard="isShowOpenCard"
                 @openCardFn="openCardFn"
                 @close="isShowOpenCard = false" />

      <!-- 主图 -->
      <div class="main">
        <img :src="config.mainImg" />
      </div>

      <!-- 活动规则按钮 -->
      <div class="rules"
           v-lz-click="'18'"
           :style="config.ruleBtnStyle"
           @click="ruleBoxShowed = true"></div>

      <!-- 申请按钮 -->
      <div class="status-btn"
           :style="config.applyBtnStyle"
           @click="showAddress()"
           v-lz-click.isMain="'1'"></div>

      <!-- 活动规则弹窗 -->
      <bottom-box title="活动规则"
                  :visible.sync="ruleBoxShowed">
        <div class="rule-str"
             v-html="ruleStr"></div>
      </bottom-box>
      <!-- 报名填写地址 -->
      <bottom-box title="报名参与活动"
                  :visible.sync="addressShow">
        <address-edit @save="join"
                      save-button-text="保存收货地址" />
      </bottom-box>
      <!-- 申请成功弹窗 -->
      <van-popup class="success-popup"
                 v-model="showSuccessBox">
        <div class="success-modal">
          <div class="success-icon">
            <img src="../../assets/trial-success-icon.png" />
          </div>
          <div class="success-close"
               @click="showSuccessBox = false">
            <img src="../../assets/trial-close.png" />
          </div>
          <div class="text-firstLine">恭喜您申请成功</div>
          <div class="text-secondLine">将在3周内发货，请耐心等待</div>
          <div class="success-btn-box">
            <button class="success-btn"
                    @click="showSuccessBox = false">知道了</button>
          </div>
        </div>
      </van-popup>
      <!-- 申请失败弹窗 -->
      <van-popup class="error-popup"
                 v-model="showErrorBox">
        <div class="error-modal">
          <div class="result-box">
            <header>很抱歉</header>
            <div class="content">
              <img class="blank-pic"
                   src="../../assets/blank-box.png" />
              <p class="blank-tip">{{ errorMessage }}</p>
              <div class="btn-close"
                   @click="showErrorBox = false">关闭</div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { ActivityService, UserService } from '@/mobile/service';
import BottomBox from '../components/BottomBox';
import areaData from '@/mobile/data/vantArea';
import CONST from '@/utils/constant';
import jdTools from '../utils/jd.js';
import { Toast } from 'vant';
import OpenCard from '../components/OpenCard';
import LzEvent from 'lz-event-tracking/lib/vue';
import getJDSDK from '@/mobile/lib/jd-sdk';
import trialConfig from './trial/config';

const isIOS = getJDSDK().Client.isIOS();

export default {
  data() {
    return {
      openCardInfo: {}, // 开卡信息
      isShowOpenCard: false, // 是否展示开卡弹窗
      showSuccessBox: false, // 成功的弹窗
      showErrorBox: false, // 失败的弹窗
      errorMessage: '', // 失败的提示语
      ruleBoxShowed: false, // 规则弹窗
      addressShow: false, // 地址弹窗
      activityInfo: {
        activityId: this.$route.params.activityId,
        activityType: this.$route.params.type,
        returnCode: 0,
      },
      userInfo: {},
      areaData,
      CONST,
      config: {
        mainImg: '',
      },
      templateKey: 'test',
    };
  },
  components: {
    BottomBox,
    OpenCard,
  },
  computed: {
    // （0：符合条件，1：活动未开始，2：活动已结束，3：不符合参与条件，4：已经参与，5：库存不足）
    backImgCom() {
      const bottonStyle = {
        0: () => trialConfig[this.templateKey].apply,
        1: () => trialConfig[this.templateKey].notStart,
        2: () => trialConfig[this.templateKey].end,
        3: () => trialConfig[this.templateKey].notAllow,
        4: () => trialConfig[this.templateKey].hasApply,
        5: () => trialConfig[this.templateKey].none,
      };
      const getBottonStyle = code => bottonStyle[code]();
      return getBottonStyle(this.activityInfo.returnCode);
    },
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
  },
  methods: {

    // 开卡
    openCardFn() {
      if (this.openCardInfo.openCardLink.indexOf('rn_channelId') > -1) {
        window.location.href = `${this.openCardInfo.openCardLink.split('rn_channelId=')[0]}rn_channelId=8508&rn_returnUrl=${window.location.href}`;
      } else {
        window.location.href = `${this.openCardInfo.openCardLink.split('channel=')[0]}channel=8508&returnUrl=${window.location.href}`;
      }
    },
    // 地址弹窗验证器
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
    // 获取开卡信息
    async getMemberStatus() {
      const { data } = await UserService.getMemberStatus({
        shopId: this.$route.params.shopId,
      });
      this.openCardInfo = data;

      if (!data.openedCard) {
        this.isShowOpenCard = true;
      }
    },
    // 获取活动详情
    async getActivityInfo() {
      const { data } = await ActivityService.getTrialActivityDetails({
        activityId: this.$route.params.activityId, // 活动ID
      });
      this.activityInfo = {
        ...this.activityInfo,
        ...data,
      };
      document.title = data.activityName;
      try {
        jdTools.setHeaderShare({
          title: data.shareText,
          imageUrl: `${CONST.IMAGE_PREFIX}${data.sharePic}`,
        });
      } catch (e) {
        console.log(e);
      }
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
    // 参加活动
    async join(item) {
      this.addressShow = false;
      const { data } = await ActivityService.drawFreeSampLing({
        activityId: this.$route.params.activityId, // 活动ID
        mobile: item.tel, // 电话号
        realName: item.name, // 真实姓名
        province: item.province, // 省
        city: item.city, // 城市
        county: item.county, // 区县
        address: item.addressDetail, // / 详细地址信息
      });
      if (data.returnCode === 0) {
        // 成功
        this.showSuccessBox = true;
      } else if (data.returnCode === 4) {
        // 重复参与
        this.showErrorBox = true;
        this.errorMessage = '~ 您已申请过了,不能重复申请 ~';
      } else if (data.returnCode === -1) {
        // 不符合参与条件
        this.showErrorBox = true;
        this.errorMessage = '~ 您申请未通过 ~';
      } else if (data.returnCode === 5) {
        // 试用品已领完
        this.showErrorBox = true;
        this.errorMessage = '~ 试用品已领完 ~';
      } else {
        // 试用品已领完
        this.showErrorBox = true;
        this.errorMessage = '~ 活动已结束 ~';
      }
      await this.getActivityInfo();
    },
    // 显示添加地址弹窗
    showAddress() {
      if (this.activityInfo.returnCode === 0) {
        this.addressShow = true;
      }
      if (this.activityInfo.returnCode === 1) {
        Toast.fail('活动未开始');
      }
      if (this.activityInfo.returnCode === 2) {
        Toast.fail('活动已结束');
      }
      if (this.activityInfo.returnCode === 3) {
        Toast.fail('您不符合参与条件');
      }
      if (this.activityInfo.returnCode === 4) {
        Toast.fail('您已申请过了,不能重复申请');
      }
      if (this.activityInfo.returnCode === 5) {
        Toast.fail('试用品已领完');
      }
    },
    // 查询模板信息
    async getTemplate() {
      const { data } = await ActivityService.getCTemplateInstanceDetail({
        instanceId: this.activityInfo.tplId, // 活动ID
      });
      this.config = trialConfig[data.templateKey];
      this.templateKey = data.templateKey;
      // this.templateKey = 'TrialDurex1';
      // this.config = trialConfig.TrialDurex1;
      // 如果接口返回值有主图就用 没有就默认的
      const newMainPic = JSON.parse(data.configJson).mainPic;
      if (newMainPic) {
        this.config.mainImg = `${CONST.IMAGE_PREFIX}${newMainPic}`;
      }
    },
  },
  async created() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    await this.getMemberStatus();
    await this.getActivityInfo();
    await this.getTemplate();
    Toast.clear();
  },
};
</script>

<style lang='scss'>
body{
  background: #090806;
  overflow-x: hidden;
}
.trial-back{
  width: 100vw;
  min-height: 100vh;
  background-repeat: repeat-y;
  background-size: contain;
  position: relative;
  .main-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
.trial-page {
  width: 100vw;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  .status-btn {
    position: absolute;
    display: flex;
    justify-content: center;
  }
  .rules {
    position: absolute;
  }

  .rule-str {
    width: 100%;
    word-wrap: break-word;
    text-align: left;
  }
  .success-popup,
  .error-popup {
    width: 100%;
    background-color: transparent;
  }
  .main {
    position: absolute;
    width: 100%;
    img {
      width: 100%;
      position: absolute;
      top: 0rem;
      left: 0;
    }
  }
  .bottom-box {
    z-index: 2001;
  }
  .van-popup--bottom.van-popup--round {
    z-index: 30000;
  }
  .success-modal {
    margin: 0 auto;
    width: 80%;
    height: 10rem;
    background: url("../../assets/trial-success.png");
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;

    .success-icon {
      position: absolute;
      width: 100%;
      top: 2.5rem;
      img {
        width: 2rem;
      }
    }

    .success-close {
      position: absolute;
      right: 0.2rem;
      top: 0.8rem;
      img {
        width: 0.3rem;
      }
    }
    .text-firstLine {
      width: 100%;
      color: #ff9900;
      position: absolute;
      top: 4.9rem;
      font-size: 0.36rem;
    }
    .text-secondLine {
      width: 100%;
      color: #e2231a;
      position: absolute;
      top: 5.5rem;
      font-size: 0.24rem;
    }
    .success-btn-box {
      width: 100%;
      position: absolute;
      top: 6.5rem;

      .success-btn {
        width: 80%;
        height: 1rem;
        color: #fff;
        background-color: #e2231a;
        border: #e2231a;
        border-radius: 5px;
      }
    }
  }
  .error-modal {
    display: flex;
    justify-content: center;
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
  }
}
</style>
