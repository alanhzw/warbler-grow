<template>
  <div>
    <div v-if="gradeInfo.filter(g => g.autoGive != 1).length > 0" class="ctrl-upgrade-grade-result" :class="{mb15: data.mb15}">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="g in gradeInfo.filter(g => g.autoGive != 1)" :key="`level-${g.memberRating}`">
          <div class="btn-open" :class="{disable: g.received === 2 || g.giftGot == -1 || g.giftGot == 1 }">
            <img class="banner" alt='' :src="`${CONST.IMAGE_PREFIX}${data.pics[g.memberRating - 1]}`" v-lz-click='100' v-lz-floor="floorInfo" @click="g.received === 1 && getGift(g)">
            <img v-if="g.received === 2 && g.memberActivityStatus === 6" class="mark" src="./assets/cover-unpass.png">
            <img v-if="(g.received === 2 && g.memberActivityStatus === 4) || g.giftGot == 1" class="mark" src="./assets/cover-got.png">
            <img v-if="(g.received === 2 && g.memberActivityStatus === 18) || g.giftGot == -1" class="mark" src="./assets/cover-no-rest.png">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-overlay :show="giftDetialShow" v-if="giftDetialShow" z-index='999'>
      <div class="gift-wrapper">
        <!-- <component :is="giftTplKey" :options="options" :gifts="giftList" @confirm="close" /> -->
        <box :options="options" :gifts="giftList" @confirm="close" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import Box from './components/Box';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';
import Service from '@/mobile/service';
import BService from '@/business/service';

// 等级礼包的弹窗从模版中引用
// 相应的模版开发完上传到npm仓库，通过npm install安装到本地
// import {
//   UpgradeGift
// } from 'lz-crm-vue-template';

// // 安装到本地，注册对应的组件
// Vue.use(UpgradeGift);


let giftAutoGotted = false;

export default {
  name: 'CtrlUpgradeGiftResult',
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
    user: {
      default: () => ({}),
    },
    pageTask: {
      default: false,
    },
    gradeInfo: {
      default: () => [],
    },
    memberInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      giftTplKey: 'LzTplUg',
      giftDetialShow: false,
      giftList: [],
      tasks: [],
      options: {},
      flag: true,
    };
  },
  watch: {
    gradeInfo(info) {
      if (info.length > 0) {
        this.getGradeGift();
      }
    },
    pageTask(val) {
      if (val) {
        this.getGradeGift();
      }
    },
  },

  computed: {},
  created() {
    this.getLevels();
  },
  methods: {
    // 获取会员等级设置
    async getLevels() {
      if (sessionStorage.getItem('LZ_CRM_CLIENT_TYPE') === '1') {
        const { data } = await BService.getLevels();
        for (let i = 0; i < data.levels.length; i++) {
          this.gradeInfo.push({
            memberRating: i + 1,
          });
        }
      }
    },
    getGradeGift() {
      if (giftAutoGotted) {
        return;
      }
      if (this.gradeInfo.length > 0 && (this.memberInfo.received !== 1 || (this.memberInfo.autoGive !== 1 || this.pageTask))) {
        this.tasks = this.gradeInfo.filter(g => g.autoGive === 1 && g.received === 1 && g.activityId && g.activityId !== '' && g.giftGot != -1 && this.user.grade === g.memberRating);
        if (this.tasks.length > 0) {
          giftAutoGotted = true;
          this.requestGetGift();
        }
      }
    },
    close() {
      this.giftDetialShow = false;
      setTimeout(() => this.requestGetGift(), 300);
    },
    getGift(g) {
      if (g.giftGot == -1 || g.giftGot == 1) {
        return;
      }
      this.tasks = [g];
      this.requestGetGift();
    },
    async requestGetGift() {
      if (!this.flag) {
        return;
      }
      if (sessionStorage.getItem('LZ_CRM_CLIENT_TYPE') === '1') {
        return;
      }
      if (this.tasks.length === 0) {
        return;
      }
      try {
        this.flag = false;
        const grade = this.tasks.shift();
        const {
          data,
        } = await Service.getMemberGift({
          activityId: grade.activityId,
        });

        grade.giftGot = 1;
        if (data.giftGetStatus === 0) {
          if (data.giftList.length > 0) {
            this.giftTplKey = data.templateKey;
            if (data.configJson) {
              try {
                this.options = JSON.parse(data.configJson);
              } catch (e) {
                this.options = {};
              }
            }
            this.giftList = data.giftList;
            this.giftDetialShow = true;
          } else {
            // 领导的礼包是空的
            grade.giftGot = -1;
            LzMsg.fail('很抱歉，礼包已经领光');
          }
        } else if (data.giftGetStatus === 1) {
          // 礼包已经完
          grade.giftGot = -1;
          LzMsg.fail('很抱歉，礼包已经领光');
        } else if (data.giftGetStatus === 2) {
          // 只能领取一次
          grade.giftGot = 1;
          LzMsg.fail('每个等级的等级礼包只能够领取一次');
        }
      } catch (e) {
        if (e.message == '活动已结束') {
          grade.giftGot = -1;
        }
        LzMsg.fail(e.message);
      } finally {
        this.flag = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-upgrade-grade-result {
  // @extend .ctrl;
  padding: 0 0.3rem;

  .btn-open {
    position: relative;
    width: 6.9rem;
    height: 2.4rem;

    .banner {
      width: 100%;
      height: 100%;
    }

    .mark {
      position: absolute;
      display: none;
      width: 1.64rem;
      height: 1.42rem;
      right: 0.75rem;
      bottom: 0.15rem;
    }

    &.disable {
      .banner {
        filter: brightness(0.5);
      }

      .mark {
        display: block;
      }
    }
  }
}

/* 礼包弹窗 */
.gift-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
</style>
