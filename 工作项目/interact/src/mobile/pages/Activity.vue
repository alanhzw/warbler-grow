<template>
  <div id="page-interact-activity"
       :style="pageStyle">
    <open-card :isShowOpenCard='isShowOpenCard'
               @openCardFn="openCardFn"
               @close="isShowOpenCard=false" />
    <div v-for="(m, idx) in tpl.modules"
         :key="`module-${idx}`">
      <component ref="componentItem"
                 @getActivityInfo='getActivityInfo'
                 v-if="!m.enableStatus || m.enableStatus.includes(activityInfo.status)"
                 :is="m.componentName"
                 :options="m.options || {}"
                 :settings="settings"
                 :userInfo="userInfo"
                 :activityInfo="activityInfo"
                 @update="update"
                 :event="event"
                 @event="listener" />
    </div>
  </div>
</template>

<script>
import activitySettings from '@/mobile/data/ActivitySettings';
import OpenCard from '../components/OpenCard';
import CONST from '@/utils/constant';
import { ActivityService, UserService } from '@/mobile/service';
import Moment from 'moment';
import { Toast } from 'vant';
import '../modules';
import { mapMutations } from 'vuex';
import LzEvent from 'lz-event-tracking/lib/vue';
import setHeaderShare from '@/utils/jdShare/index';

const channelsMap = {
  501: 8501,
  502: 8502,
  503: 8503,
  504: 8504,
  505: 8505,
  506: 8506,
  507: 8507,
  508: 8508,
};

export default {
  name: 'Activity',
  components: {
    OpenCard,
  },
  data() {
    return {
      CONST,
      isShowOpenCard: false,
      activityInfo: {
        hasGotInfo: false,
        activityId: this.$route.params.activityId,
        activityType: this.$route.params.type,
      },
      openCardInfo: {},
      userInfo: {},
      settings: {},
      tpl: {
        modules: [],
      },
      event: {},
    };
  },
  computed: {
    pageStyle() {
      const style = {};
      // 背景颜色
      if (typeof this.tpl.bgColor === 'string') {
        // 单一颜色
        style.backgroundColor = this.tpl.bgColor;
      } else if (Array.isArray(this.tpl.bgColor)) {
        if (this.tpl.bgColor.length === 1) {
          // 单一颜色
          style.backgroundColor = this.tpl.bgColor[0];
        } else {
          // 渐变颜色
          style.backgroundImage = `linear-gradient(${this.tpl.bgColor.join(',')})`;
        }
      }
      return style;
    },
  },
  async created() {
    this.getMemberStatus();
    this.settings = await activitySettings.getActivitySettings(this.$route.params.type);
    await this.getActivityInfo();
    this.setEnterLoading(false);
    this.setLoading(false);
    setTimeout(() => this.activityInfo.hasGotInfo = true, 300);
  },
  mounted() {
  },
  watch: {},
  methods: {
    // 开卡
    openCardFn() {
      if (this.openCardInfo.openCardLink.indexOf('rn_channelId') > -1) {
        window.location.href = `${this.openCardInfo.openCardLink.split('rn_channelId=')[0]}rn_channelId=${channelsMap[this.$route.params.type]}&rn_returnUrl=${window.location.href}`;
      } else {
        window.location.href = `${this.openCardInfo.openCardLink.split('channel=')[0]}channel=${channelsMap[this.$route.params.type]}&returnUrl=${window.location.href}`;
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
    getUserInfo(data) {
      const version = data.tplId;
      UserService.getUserInfo({
        shopId: data.shopId,
        groupId: data.groupId,
      }).then(({ data }) => {
        this.userInfo = data;
        const nodeMap = {
          501: '100006002',
          502: '100006003',
          503: '100006004',
          504: '100006001',
          505: '100006005',
          506: '100006006',
          507: '100006007',
          508: '100006008',
        };
        const nodeId = nodeMap[this.$route.params.type] || null;
        LzEvent.setBaseInfo({
          shopId: this.$route.params.shopId, // 店铺标识，不可以为空
          customerId: this.userInfo.customerId, // C端用户唯一身份标识customerId，不可以为空
          nickName: this.userInfo.nickname, // 用户昵称，不可以为空
          version, // 版本号，可以为空
          nodeId,
          // 以下信息京东数据回流的时候需要使用
          // jdActivityId: 'jdActivityId001', // 调用JOS创建活动接口返回的活动id
          // siteId: 'JA2019_2132395', // 京东侧注册的网站id
          // userPin: '', // 京东用户pin
          // shareUserPin: '', // 如果是分享进入的本页面需要分享人的标识
        });
      });
    },
    // 查询模板信息
    async getTemplate(instanceId = 't200803113612242313') {
      const { data } = await ActivityService.getCTemplateInstanceDetail({
        instanceId,
      });
      const config = JSON.parse(data.configJson) || {};


      console.log('🚀🚀~ data.templateKey:', data.templateKey);


      // 滴露的第一套模板
      const dettol0Arr = [
        'LzTplQuotaDrawDettol', // 消费满额抽奖（实付金额，交易完成）
        'LzTplQuotaDrawAllDet', // 消费满额抽奖（订单金额，付款完成）
        'QuotaPrizeAutoDettol', // 消费满额有礼(手动领取)
        'QuotaPrizeDettol', // 消费满额有礼(自动发放)
        'QuotaAmountRankDetto', // 消费金额排名有礼
        'QuotaTimeRankDettol', // 消费时间排名有礼
      ];
      if (dettol0Arr.includes(data.templateKey)) {
        config.theme = 'dettol0';
      }

      const durex0Arr = [
        'DurexQuotaDrawAll',
      ];
      if (durex0Arr.includes(data.templateKey)) {
        config.theme = 'durex0';
      }


      return config;
    },
    async getActivityInfo() {
      const { data } = await ActivityService[this.settings.apis.getInfo]({
        activityId: this.$route.params.activityId, // 活动ID
      });

      this.getUserInfo(data);
      this.activityInfo = {
        ...this.activityInfo,
        ...data,
      };
      console.log('🚀🚀~ this.activityInfo:', this.activityInfo);
      try {
        // JD.setHeaderShare({
        //   title: data.shareText,
        //   imageUrl: `${CONST.IMAGE_PREFIX}${data.sharePic}`,
        // });
        setHeaderShare({
          type: '2',
          title: this.activityInfo.shareText,
          imageUrl: `${CONST.IMAGE_PREFIX}${this.activityInfo.sharePic}`,
        });
      } catch (e) {
        console.log('设置分享出错');
        console.log(e);
      }

      const config = await this.getTemplate(data.tplId);
      this.tpl = this.settings.tpls[config.theme || 'default'] || {};
      if (config.mainPic) {
        this.tpl.modules.filter(m => m.componentName === 'MainPic').forEach(m => m.options.pic = `${CONST.IMAGE_PREFIX}${config.mainPic}`);
        this.tpl.modules.filter(m => m.componentName === 'DurexMainPic').forEach(m => m.options.pic = `${CONST.IMAGE_PREFIX}${config.mainPic}`);
      }
      // 消费时间排名有礼 6 是已结束其他的 4是已结束
      if (this.activityInfo.activityType == 507) {
        if (data.status == 6) {
          Toast({
            // duration: 0,
            message: '活动已结束',
            // forbidClick: true,
            // closeOnClick: true,
          });
        }
      } else if (data.status === 4) {
        Toast({
          // duration: 0,
          message: '活动已结束',
          // forbidClick: true,
          // closeOnClick: true,
        });
      }

      const timeKeys = ['awardEndTime', 'awardStartTime', 'createTime', 'enrollEndTime', 'enrollStartTime', 'orderEndTime', 'orderStartTime', 'activityStartTime', 'activityEndTime'];
      timeKeys.forEach((key) => {
        if (data[key]) {
          data[key] = Moment(data[key]).format('YYYY/MM/DD HH:mm:ss');
        }
      });


      this.activityInfo = {
        ...this.activityInfo,
        ...data,
      };
      document.title = data.activityName;
      // this.activityInfo.status = 6;
    },
    update() {
      this.getActivityInfo();
      console.log(this.$refs.componentItem);
      this.$refs.componentItem.forEach((c) => {
        if (typeof c.update === 'function') {
          c.update();
        }
      });
    },
    listener(event) {
      this.event = { ...event };
    },
    ...mapMutations(['setEnterLoading', 'setLoading']),
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';
#page-interact-activity {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
</style>
