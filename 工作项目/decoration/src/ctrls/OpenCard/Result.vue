<template>
  <div>
    <div class="ctrl-open-card-result" :class="{mb15: data.mb15}" v-if="show">
      <img class="btn-open" alt='' :src="`${CONST.IMAGE_PREFIX}${data.pic}`" v-lz-click='100' v-lz-floor="floorInfo" @click="getMemberGift">
    </div>
    <van-overlay :show="giftDetialShow" v-if="giftDetialShow" z-index='999'>
      <div class="gift-wrapper">
        <!-- <component :is="giftTplKey" :options="options" :gifts="giftList" @confirm="close"/> -->
        <box :options="options" :gifts="giftList" @confirm="close" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import Vue from 'vue';
import Service from '@mobile/service';
import Box from './components/Box';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';

// // 开卡礼包的弹窗从模版中引用
// // 相应的模版开发完上传到npm仓库，通过npm install安装到本地
// import { MemberGift } from 'lz-crm-vue-template';

// // 安装到本地，注册对应的组件
// Vue.use(MemberGift);

export default {
  name: 'CtrlOpenCardResult',
  components: {
    Box,
  },
  props: {
    data: {
      default: () => ({}),
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
      giftTplKey: 'LzTplMg',
      giftGot: false,
      giftDetialShow: false,
      giftList: [],
      options: {},
      flag: true,
    };
  },
  watch: {
    /**
     * 如果是自动发放的情况，c端页面自动发起领取
     */
    'memberInfo.autoGive': function (val) {
      if (val === 1) {
        if (this.memberInfo.received === 1 && this.memberInfo.activityId && this.memberInfo.activityId !== '' && !this.giftGot) {
          this.getMemberGift();
        }
      }
    },
  },

  computed: {
    /**
     * 判断按钮是否显示，显示的条件如下：
     * 1、如果是B端，那么说明是装修页面，必显示 sessionStorage.getItem('LZ_CRM_CLIENT_TYPE') === '1'
     * 2、如果不是自动领取（autoGive === 2） 礼包可以领取（received === 1） 活动id存在并不为空（activityId）并且还未领取（giftGot=false）
     */
    show() {
      return sessionStorage.getItem('LZ_CRM_CLIENT_TYPE') === '1' || (this.memberInfo.received === 1 && this.memberInfo.autoGive === 2 && this.memberInfo.activityId && this.memberInfo.activityId !== '' && !this.giftGot);
    },
  },
  created() { },
  methods: {
    close() {
      this.giftDetialShow = false;
      setTimeout(() => {
        this.$emit('changePageTask');
      }, 300);
    },
    async getMemberGift() {
      if (!this.flag) {
        return;
      }
      try {
        this.flag = false;
        const { data } = await Service.getMemberGift({
          activityId: this.memberInfo.activityId,
        });
        this.giftGot = true;
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
            this.giftGot = true;
            LzMsg.fail('很抱歉，礼包已经领光');
          }
        } else if (data.giftGetStatus === 1) {
          // 礼包已经完
          this.giftGot = true;
          LzMsg.fail('很抱歉，礼包已经领光');
        } else if (data.giftGetStatus === 2) {
          // 只能领取一次
          this.giftGot = true;
          LzMsg.fail('开卡礼包只能够领取一次');
        }
      } catch (e) {
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

.ctrl-open-card-result {
  // @extend .ctrl;
  padding: 0 0.3rem;
  .btn-open {
    width: 100%;
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
