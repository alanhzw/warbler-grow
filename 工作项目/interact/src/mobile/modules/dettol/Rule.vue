<template>
  <div class="dettol-rule">
    <span class="btn"
          v-lz-click="'18'"
          @click="showRule">活动规则 ></span>
    <bottom-box title="活动规则"
                :visible.sync="ruleBoxShowed">
      <div class="rule-str"
           v-html="lines"></div>
    </bottom-box>
  </div>
</template>
<script>
import { ActivityService } from '@/mobile/service';
import BottomBox from './BottomBox';
import getJDSDK from '@/mobile/lib/jd-sdk';

const isIOS = getJDSDK().Client.isIOS();
export default {
  name: 'DettolRule',
  components: {
    BottomBox,
  },
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    event: {
      default: () => ({}),
    },
  },
  data() {
    return {
      ruleBoxShowed: false,
      text: '',
    };
  },
  computed: {
    lines() {
      if (this.text) {
        let txt = this.text;
        if (isIOS) {
          txt += '<br/><br/>本次活动为商家自发举办，与苹果公司及APP Store无关。';
          return txt.replace(/\n/g, '<br/>');
        }
        return txt.replace(/\n/g, '<br/>');
      }
      return '暂无规则';
    },
  },
  watch: {
    'event.name': function() {
      if (this.event.name === 'prizeShowed') {
        this.ruleBoxShowed = false;
      }
    },
  },
  created() {
  },
  methods: {
    async showRule() {
      if (this.text == '') {
        await this.getRuleText();
      }
      this.$emit('event', { name: 'ruleShowed' });
      this.ruleBoxShowed = true;
    },
    async getRuleText() {
      const { data } = await ActivityService.getActivityRule({
        activityId: this.activityInfo.activityId, // 活动ID
        activityType: this.activityInfo.activityType, // 活动ID
      });
      this.text = data;
    },
  },
};
</script>
<style lang="scss">
.dettol-rule {
  height: 0.6rem;

  .btn {
    position: absolute;
    margin: 0 0.3rem ;
    top: 5rem;
    right: 50%;
    width: 2rem;
    height: 0.6rem;
    background-color: #f6fbf7;
    border-radius: 0.3rem;
    font-size: 0.3rem;
    line-height: 0.6rem;
    color: #0e822f;
    text-align: center;
  }
  .rule-text {
    color: #333333;
    font-size: 0.24rem;
    line-height: 0.48rem;
    text-align: left;
    margin: 0.2rem;
    word-break: break-all;
  }
  .rule-str {
    width: 100%;
    word-wrap: break-word;
    text-align: left;
  }
}
</style>
