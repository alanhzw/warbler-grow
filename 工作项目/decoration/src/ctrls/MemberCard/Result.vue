<template>
  <div class="ctrl-member-card-result" :class="{mb15: data.mb15}" v-lz-click='100' v-lz-floor="floorInfo" @click="openCard($event)">
    <div class="ctrl-member-card">
      <div v-if='isB==1'>
        <img class="bg-img" v-if="data && data.levels[0] && data.levels[0].pic && userLevel.pic !== ''" :src="`${CONST.IMAGE_PREFIX}${data.levels[0].pic}`">
        <img class="bg-img" v-else src="./assets/default.jpeg">
      </div>
      <div v-else>
        <img class="bg-img" v-if="userLevel && userLevel.pic && userLevel.pic !== ''" :src="`${CONST.IMAGE_PREFIX}${userLevel.pic}`">
        <img class="bg-img" v-else src="./assets/default.jpeg">
      </div>
      <div class="user-info" @click="go2UserCenter($event)">
        <img class="avatar" :src="user.imageUrl || defaultAvatar">
        <span class="name">{{user.nickname}} ></span>
        <span class="offset"></span>
        <span class="level">{{user.gradeName}}</span>
      </div>
      <div class="point-info" @click="go2PointHistory($event)">
        <span class="point">{{user.curPoint || 0}}</span>
        <img class="point-icon" src="./assets/point.png">
      </div>
    </div>
  </div>
</template>
<script>
import defaultAvatar from './assets/avatar.png';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';

export default {
  name: 'CtrlMemberCardResult',
  props: {
    data: {
      default: () => ({}),
    },
    user: {
      default: () => ({
        isDefault: true,
        imageUrl: defaultAvatar,
        nickname: '会员昵称',
        curPoint: 300,
        grade: 1,
        gradeName: '一星会员',
        openCardLink: '',
        autoGive: 0,
        // openCardStatus: 1,
        openedCard: true,
      }),
    },
    pageTask: {
      default: false,
    },
    memberInfo: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      defaultAvatar,
      // 获取设备 1是客户端 2是移动端
      isB: sessionStorage.getItem('LZ_CRM_CLIENT_TYPE'),
    };
  },
  computed: {
    userLevel() {
      if (this.user.isDefault) {
        return this.data.levels[this.data.lIndex] || {};
      }
      return this.data.levels[this.user.grade - 1 || 0] || {};
    },
    shopId() {
      return this.$route.params.shopId;
    },
  },
  created() {
    if (this.user.autoGive === 1 && this.user.received === 1 && this.user.activityId && this.user.activityId !== '' && !this.giftGot) {
      this.getMemberGift(this.userLevel);
    }
    console.log('🚀🚀~ userLevel:', this.userLevel);
  },
  methods: {
    openCard(evt) {
      if ((!this.memberInfo.openedCard) && this.memberInfo.openCardLink && this.memberInfo.openCardLink !== '') {
        // this.beforeLeave(this.memberInfo.openCardLink, evt)
        window.location.href = this.memberInfo.openCardLink;
      }
    },
    // 进入个人中心
    go2UserCenter(evt) {
      // this.beforeLeave('/mobile/index.html#/user/center', evt)
      window.location.href = `/mobile/index.html#/user/center?shopId=${this.shopId}`;
    },
    // 查看积分流水
    go2PointHistory(evt) {
      // this.beforeLeave('/mobile/index.html#/points/history', evt)
      window.location.href = `/mobile/index.html#/points/history?shopId=${this.shopId}`;
    },
  },
};
</script>
<style lang="scss">
@import '../style/common_ctrl';

.ctrl-member-card-result {
  position: relative;
  @extend .ctrl;
  .ctrl-member-card {
    position: relative;
    margin-bottom: -5px;
    .bg-img {
      width: 7.5rem;
      height: 3.75rem;
    }
    .user-info {
      position: absolute;
      top: 1.3rem;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 0.8rem;

      .avatar {
        width: 0.44rem;
        height: 0.44rem;
        border-radius: 50%;
        vertical-align: top;
      }
      .name {
        font-size: 0.24rem;
        margin-left: 0.1rem;
      }
      .level {
        font-size: 0.24rem;
      }
      .offset {
        flex: 1;
      }
    }
    .point-info {
      position: absolute;
      top: 2.2rem;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 0.8rem;
      .point {
        font-size: 0.6rem;
        font-weight: 800;
        margin-left: 0.54rem;
        margin-right: 0.2rem;
      }
      .point-icon {
        width: 0.3rem;
        height: 0.3rem;
        vertical-align: top;
      }
    }
  }
  .open-card {
    .btn-open-card {
      background-color: red;
      margin: 0.2rem;
      color: $WHITE;
      font-size: 0.24rem;
      line-height: 0.8rem;
      border-radius: 4px;
    }
  }

  /* 礼包弹窗 */
  .gift-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    .gift-box {
      width: 5.6rem;
      height: 6.4rem;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .gift-list {
      padding-top: 2.8rem;
    }
    .gift-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1rem;
      line-height: 1rem;
      padding: 0 0.5rem;
      .icon {
        height: 0.8rem;
        vertical-align: top;
        margin-right: 0.05rem;
      }
      .amount {
        font-size: 0.48rem;
        color: #3399FF;
        font-weight: 800;
        margin-right: 0.05rem;
      }
      .unit {
        font-size: 0.3rem;
        color: $FONT_MAIN_BLACK;
      }
      .offset {
        flex: 1;
      }

      .right {
        color: $FONT_MINOR_GRAY;
        font-size: 0.2rem;
      }
    }
    .btn-gift {
      width: 4.4rem;
      height: 1rem;
      margin-top: -0.5rem;
    }
  }
}
</style>
