<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-12-09 16:40:37
 * @FilePath: \decoration\src\ctrls\MemberRight\Result.vue
-->
<template>
  <div class="ctrl-signle-row-figure-result"
       :class="{mb15: data.mb15}"
       v-lz-click='100'
       v-lz-floor="floorInfo">
    <div>
      <div class="header">
        <span class="text1">会员权益</span>
        <span class="text2"
              @click="ruleDetialShow = true ">等级说明></span>
      </div>
      <div class="body">
        <van-tabs color='#DBA153'>
          <van-tab v-for="(item,index) in data.levelState.levels"
                   :key='item.levelName'
                   :swipeable='true'
                   :title="item.levelName">
            <div class="gifts-list">
              <div v-for='gift in item.finallyArr'
                   :key='gift.rightsName'>
                <div v-if='gift.showRights'
                     @click='getMygift(gift,index)'
                     class="gifts-item">
                  <img v-if='gift.rightsIcon'
                       :src="`${CONST.IMAGE_PREFIX}${gift.rightsIcon}`"
                       class="right-right-icon">
                  <img v-else-if='gift.activityType===334'
                       :class="{'is-disabled':gift.status === 2 && isB==2}"
                       src="./assets/birth_gift.png"
                       class="right-right-icon">
                  <img src="./assets/level_gift.png"
                       :class="{'is-disabled':gift.status === 2 && isB==2}"
                       v-else-if='gift.activityType===333'
                       class="right-right-icon">
                  <img src="./assets/open_card.png"
                       :class="{'is-disabled':gift.status === 2 && isB==2}"
                       v-else-if='gift.activityType===335'
                       class="right-right-icon">
                  <img src="./assets/shoudan_gift.png"
                       :class="{'is-disabled':gift.status === 2 && isB==2}"
                       v-else-if='gift.activityType===336'
                       class="right-right-icon">
                  <img src="./assets/gouwu_points.png"
                       :class="{'is-disabled':gift.status === 2 && isB==2}"
                       v-else-if='gift.activityType==="购物积分"'
                       class="right-right-icon">
                  <img src="./assets/cus_gift.png"
                       v-else
                       class="right-right-icon">

                  <div>{{gift.rightsName}}</div>

                  <div class="draw-button-no"
                       v-if='gift.status === -1'>未解锁</div>
                  <div class="draw-button-no"
                       v-if='gift.status === 3'>已领取</div>
                </div>

              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <!-- 升级礼包弹窗 -->
    <van-overlay :show="gradeDetialShow"
                 v-if="gradeDetialShow"
                 z-index='1008'>
      <div class="gift-wrapper">
        <box :options="options"
             :gifts="gradeGiftList"
             backGround="grade"
             @confirm="close(333)" />
      </div>
    </van-overlay>

    <!-- 生日礼包弹窗 -->
    <van-overlay :show="birthDetialShow"
                 v-if="birthDetialShow"
                 z-index='1007'>
      <div class="gift-wrapper">
        <box :options="options"
             :gifts="birthGiftList"
             backGround="birth"
             @confirm="close(334)" />
      </div>
    </van-overlay>

    <!-- 开卡礼包弹窗 -->
    <van-overlay :show="openDetialShow"
                 v-if="openDetialShow"
                 z-index='1009'>
      <div class="gift-wrapper">
        <box :options="options"
             :gifts="openGiftList"
             backGround="openCard"
             @confirm="close(335)" />
      </div>
    </van-overlay>

    <!-- 首单礼包弹窗 -->
    <van-overlay :show="firstDetialShow"
                 v-if="firstDetialShow"
                 z-index='1006'>
      <div class="gift-wrapper">
        <box :options="options"
             :gifts="firstGiftList"
             backGround="first"
             @confirm="close(336)" />
      </div>
    </van-overlay>

    <!-- 规则弹出层 -->
    <van-popup v-model="ruleDetialShow"
               round
               closeable
               position="bottom"
               :style="{ height: '30%' }">
      <div class="rule-popup-box">
        <div class="rule-popup-title">
          会员等级规则说明
        </div>
        <div v-if='mgrMemberGrade == 2'
             class="rule-popup-rules">
          <p v-for='item in levelRule'
             :key='item.levelName'>{{item.levelName}} : {{item.info}}</p>
        </div>
        <div v-if='mgrMemberGrade == 1'
             class="rule-popup-rules">
          <p v-for='item in levelRule'
             :key='item.levelName'>{{item.customerLevelName}} : {{item.levelRule}}</p>
        </div>
        <div v-if='mgrMemberGrade == 0'
             class="rule-popup-rules">
          <p>暂无规则</p>
        </div>
      </div>
    </van-popup>

    <!-- 生日信息弹出层 -->
    <van-dialog v-model="addBirthDetialShow"
                title="填写生日信息"
                @confirm="saveBirthDay"
                show-cancel-button>
      <van-datetime-picker v-model="birthInfo"
                           ref='datetimePicker'
                           type="date"
                           :min-date="minDate"
                           :max-date="maxDate"
                           :show-toolbar='false'
                           title=''
                           visible-item-count='5' />
    </van-dialog>

  </div>
</template>

<script>
import { Dialog } from 'vant';
import PageService from '@mobile/service';
import Box from './components/Box.vue';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';
import utils from '@/utils';
// 获取设备 1是客户端 2是移动端
const isB = sessionStorage.getItem('LZ_CRM_CLIENT_TYPE');

export default {
  name: 'CtrlTextResult',
  components: {
    Box,
  },
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST, // 常量
      finallyArr: [], // 最终的权利列表
      userInfo: {}, // 用户信息
      isB, // 是不是b端  1是客户端 2是移动端
      gradeDetialShow: false, // 等级礼包弹窗
      birthDetialShow: false, // 生日礼包弹窗
      openDetialShow: false, // 开卡礼包弹窗
      firstDetialShow: false, // 首单礼包弹窗
      ruleDetialShow: false, // 规则弹窗
      addBirthDetialShow: false, // 添加生日弹窗
      options: {}, // 配置项
      giftList: [], // 奖品列表
      birthInfo: new Date(), // 生日
      birthGiftList: [], // 生日礼包奖品列表
      gradeGiftList: [], // 等级礼包奖品列表
      firstGiftList: [], // 首购礼包奖品列表
      openGiftList: [], // 开卡礼包奖品列表
      levelRule: {}, // 等级规则
      mgrMemberGrade: 0, // 会员等级管理状态:0-未开启；1-京东方式；2-isv方式
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      isAutoGetGrade: false,
      isAutoGetFirst: false,
      isAutoGetOpen: false,
      isAutoGetBirth: false,
      autoGiftList: {
        open: false,
        grade: false,
        first: false,
        birth: false,
      },
    };
  },
  computed: {
    // 获取shopid
    shopId() {
      return this.$route.params.shopId || utils.getShopId();
    },
  },
  async created() {
    this.init();
  },
  methods: {
    // 页面初始化
    async init() {
      this.concatGifts();
      if (isB === '2') {
        this.getVenderLevelRule();
        await this.getUserInfo();
        await Promise.allSettled([
          this.getBirthDayGiftList(),
          this.getGradeGiftList(),
          this.getFirstBuyGiftList(),
          this.getJoinMemberGiftList(),
        ]);
        await this.setUnlock();
        this.autoGetMyGift();
      }
    },
    // 获取会员信息
    async getUserInfo() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getUserInfo({ shopId: this.shopId });
        this.userInfo = data;
      } catch (error) {
        LzMsg.fail(error.message);
        console.log('🚀🚀~ error:', error);
      } finally {
        LzMsg.clear();
      }
    },
    // 合并奖项
    concatGifts() {
      this.data.levelState.levels.forEach((item) => {
        item.finallyArr = item.rightsList.concat(item.customRightsList);
      });
    },

    // 根据等级设置未解锁
    async setUnlock() {
      await this.data.levelState.levels.forEach((item, index) => {
        if (this.userInfo.grade < index + 1) {
          item.finallyArr.forEach((act) => {
            act.status = -1;
          });
        }
      });
    },

    // 自动领取奖品
    autoGetMyGift() {
      let giftLevel = 0;
      console.log('🚀🚀~ this.data.levelState.levels:', this.data.levelState.levels);
      this.data.levelState.levels.forEach((item) => {
        item.rightsList.forEach((fina) => {
          // 等级礼包
          if (fina.status === 1 && fina.activityType === 333 && fina.autoReceive) {
            giftLevel += 1;
          }
          // 生日礼包
          if (fina.status === 1 && fina.activityType === 334 && fina.autoReceive) {
            this.isAutoGetBirth = true;
            this.getBirthDayGiftResult();
          }
          // 入会礼包
          if (fina.status === 1 && fina.activityType === 335 && fina.autoReceive) {
            this.isAutoGetOpen = true;
            this.getJoinMemberGiftResult();
          }
          // 首购礼包
          if (fina.status === 1 && fina.activityType === 336 && fina.autoReceive) {
            this.isAutoGetFirst = true;
            this.getFirstBuyPackResult();
          }
        });
      });
      if (giftLevel > 0) {
        this.isAutoGetGrade = true;
        this.getGradeGiftResult(giftLevel);
      }
    },
    // 获取生日礼包
    async getBirthDayGiftList() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getBirthDayGiftList({ shopId: this.shopId });
        this.data.levelState.levels.forEach((item, index) => {
          if (this.userInfo.grade >= index + 1) {
            item.finallyArr.forEach((fina) => {
              if (fina.activityType === 334) {
                fina.status = data.status;
              }
            });
          }
        });
      } catch (error) {
        console.log('🚀🚀~ error:', error);
        LzMsg.fail(error.message);
      } finally {
        LzMsg.clear();
      }
    },

    // 获取首购礼包
    async getFirstBuyGiftList() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getFirstBuyGiftList({ shopId: this.shopId });
        this.data.levelState.levels.forEach((item, index) => {
          if (this.userInfo.grade >= index + 1) {
            item.finallyArr.forEach((fina) => {
              if (fina.activityType === 336) {
                fina.status = data.status;
              }
            });
          }
        });
      } catch (error) {
        LzMsg.fail(error.message);
        console.log('🚀🚀~ error:', error);
      } finally {
        LzMsg.clear();
      }
    },
    // 获取开卡礼包
    async getJoinMemberGiftList() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getJoinMemberGiftList({ shopId: this.shopId });
        this.data.levelState.levels.forEach((item, index) => {
          if (this.userInfo.grade >= index + 1) {
            item.finallyArr.forEach((fina) => {
              if (fina.activityType === 335) {
                fina.status = data.status;
              }
            });
          }
        });
      } catch (error) {
        LzMsg.fail(error.message);
        console.log('🚀🚀~ error:', error);
      } finally {
        LzMsg.clear();
      }
    },
    // 获取等级礼包
    async getGradeGiftList() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getGradeGiftList({ shopId: this.shopId });
        this.data.levelState.levels.forEach((item, index) => {
          if (this.userInfo.grade >= index + 1) {
            item.finallyArr.forEach((fina) => {
              if (fina.activityType === 333) {
                fina.status = data.upGradeList[index].status;
              }
            });
          }
        });
      } catch (error) {
        LzMsg.fail(error.message);
        console.log('🚀🚀~ error:', error);
      } finally {
        LzMsg.clear();
      }
    },
    // 领取礼物
    getMygift(gift, index) {
      if (gift.activityType === 334 && gift.status == 1) {
        this.getBirthDayGiftResult();
      } else if (gift.activityType === 333 && gift.status == 1) {
        this.getGradeGiftResult(index + 1);
      } else if (gift.activityType === 335 && gift.status == 1) {
        this.getJoinMemberGiftResult();
      } else if (gift.activityType === 336 && gift.status == 1) {
        this.getFirstBuyPackResult();
      } else if (!gift.activityType) {
        this.go2Link(gift.rightsLink);
      }
    },
    // 领取生日礼包
    async getBirthDayGiftResult() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getBirthDayGiftResult({ shopId: this.shopId });
        if (data.birthDayStatus === 1) {
          //
          this.birthGiftList = data.giftList;
          this.autoGiftList.birth = true;
          if (!this.autoGiftList.first || !this.autoGiftList.first) {
            this.birthDetialShow = true;
          }
        }
        if (data.birthDayStatus === 2) {
          this.addBirthDetialShow = true;
        }
      } catch (error) {
        LzMsg.fail(error.message);
        console.log('🚀🚀~ error:', error);
      } finally {
        LzMsg.clear();
        this.getBirthDayGiftList();
      }
    },
    // 领取入会礼包
    async getJoinMemberGiftResult() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getJoinMemberGiftResult({ shopId: this.shopId });
        this.openGiftList = data.giftList;
        this.openDetialShow = true;
        this.autoGiftList.open = true;
      } catch (error) {
        LzMsg.fail(error.message);
        console.log('🚀🚀~ error:', error);
      } finally {
        LzMsg.clear();
        this.getJoinMemberGiftList();
      }
    },
    // 领取首购礼包
    async getFirstBuyPackResult() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getFirstBuyPackResult({ shopId: this.shopId });
        this.firstGiftList = data.giftList;
        this.autoGiftList.first = true;
        if (!this.isAutoGetFirst || !this.autoGiftList.grade) {
          this.firstDetialShow = true;
        }
      } catch (error) {
        LzMsg.fail(error.message);
        console.log('🚀🚀~ error:', error);
      } finally {
        LzMsg.clear();
        this.getFirstBuyGiftList();
      }
    },
    // 领取等级礼包
    async getGradeGiftResult(level) {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getGradeGiftResult({ shopId: this.shopId, level });
        this.gradeGiftList = data.giftList;
        this.autoGiftList.grade = true;

        if (!this.isAutoGetGrade || !this.autoGiftList.open) {
          this.gradeDetialShow = true;
        }
      } catch (error) {
        console.log('🚀🚀~ error:', error);
        LzMsg.fail(error.message);
      } finally {
        LzMsg.clear();
        this.getGradeGiftList();
      }
    },
    // 关闭礼包弹窗
    close(type) {
      if (type === 335) {
        this.openDetialShow = false;
        this.autoGiftList.open = false;
        if (this.autoGiftList.grade) {
          this.gradeDetialShow = true;
        }
      }
      if (type === 333) {
        this.gradeDetialShow = false;
        this.autoGiftList.grade = false;
        if (this.autoGiftList.first) {
          this.firstDetialShow = true;
        }
      }
      if (type === 336) {
        this.firstDetialShow = false;
        this.autoGiftList.first = false;

        if (this.autoGiftList.birth) {
          this.birthDetialShow = true;
        }
      }
      if (type === 334) {
        this.autoGiftList.birth = false;
        this.birthDetialShow = false;
      }
    },
    // 获取商家等级规则
    async getVenderLevelRule() {
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await PageService.getVenderLevelRule({ shopId: this.shopId });
        this.mgrMemberGrade = data.mgrMemberGrade;
        if (data.mgrMemberGrade == 1) {
          this.levelRule = data.groupData;
        } else if (data.mgrMemberGrade == 2) {
          //
          this.levelRule = JSON.parse(data.levelJson);
          this.levelRule.forEach((rule) => {
            if (rule.desc) {
              rule.info = rule.desc;
            } else {
              rule.info = `交易次数不少于${rule.minOrderNum}次或消费金额不少于${rule.minOrderAmount}元`;
            }
          });
          console.log('🚀🚀~ this.levelRule:', this.levelRule);
        } else {
          this.mgrMemberGrade = 0;
          this.levelRule = '暂无规则';
        }
        this.rule = data;
      } catch (error) {
        console.log('🚀🚀~ error:', error);
        // 数据加载失败
        Dialog.confirm({
          title: '提示',
          message: '数据加载失败',
          confirmButtonText: '重试',
        })
          .then(() => {
            this.getVenderLevelRule();
          })
          .catch(() => {
            // on cancel
            this.ruleDetialShow = false;
          });
      } finally {
        LzMsg.clear();
      }
    },
    // 保存生日信息
    async saveBirthDay() {
      const datetimePicker = this.$refs.datetimePicker.getPicker().getValues();
      this.birthInfo = datetimePicker.join('-');
      try {
        LzMsg.loading({
          message: '加载中...',
          forbidClick: true,
        });
        await PageService.saveBirthDay({ shopId: this.shopId, birthDay: this.birthInfo });
        await this.getBirthDayGiftResult();
        this.addBirthDetialShow = false;
      } catch (error) {
        console.log('🚀🚀~ error:', error);
        LzMsg.fail(error.message);
      } finally {
        LzMsg.clear();
      }
    },
    // 链接跳转
    go2Link(url) {
      window.location.href = url;
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-signle-row-figure-result {
  position: relative;
  margin: 0 0.2rem;

  .van-tabs--line .van-tabs__wrap{
    // height: 28px;
  }
  // background-color: #fff;

  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.1rem;

    .text1{
      font-size: 0.32rem;
      font-weight: 700;
    }

    .text2{
      color:#686868;
      font-size: 0.26rem;
    }

  }

  .body{
    padding:0.1rem 0.2rem;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
  }

  .gifts-list{
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    margin-top: 0.05rem;

    .gifts-item{
      min-width: 1.5rem;
      height: 2.2rem;
      margin: 0.2rem 0.09rem;
      background: #F9F9F9;
      border: 1px solid #F8E9D0;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      font-size: 0.24rem;
    }

    .right-right-icon{
      width: 0.8rem;
      height: 0.8rem;

    }

    .draw-button{
      width: 1rem;
      border-radius: 8px;
      border: 1px solid #C59C4A;
      color:#C59C4A;
      text-align: center;
    }
    .draw-button-no{
      width: 1rem;
      border-radius: 8px;
      border: 1px solid #C59C4A;
      color:#C59C4A;
      opacity: 0.6;
      text-align: center;
    }
  }
    /* 升级礼包弹窗 */
  .gift-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }
  .rule-popup-box{
    padding: 0.3rem 0 0 0.3rem;

    .rule-popup-title{
      font-size: 0.32rem;
    }

    .rule-popup-rules{
      text-align: left;
      font-size: 0.26rem;
    }
  }

  .is-disabled{
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
  }
}
</style>
