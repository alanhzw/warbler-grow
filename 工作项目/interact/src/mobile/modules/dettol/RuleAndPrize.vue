<template>
  <div class="rule-and-prizes-dettol"
       :style="options.style">
    <MyPrize :options="options || {}"
             :settings="settings"
             :userInfo="userInfo"
             :activityInfo="activityInfo"
             class="my-prize"></MyPrize>
    <MyRule :options="options || {}"
            :settings="settings"
            :userInfo="userInfo"
            :activityInfo="activityInfo"
            class="my-rule"></MyRule>
  </div>
</template>
<script>

import MyPrize from './MyQuoTaPrizes.vue';
import MyRule from './RuleQuotaPrize.vue';

export default {
  name: 'RuleAndPrize',
  components: {
    MyPrize,
    MyRule,
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
    settings: {
      default: () => ({}),
    },
    userInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {

    };
  },


  created() {
  },
  methods: {

  },
};
</script>
<style lang="scss">
.rule-and-prizes-dettol{
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-evenly;
    position: relative;
    .my-prize{
      .btn{
        display: inline-block;
        background-image: url("./assets/rule-button-bg.png");
        background-size: cover;
        border-radius: 4px;
        background-repeat: no-repeat;
        position: absolute;
        margin: 0rem;
        top: 0rem;
        right: 0.25rem;
        width: 3.4rem;
        height: 0.6rem;
        font-size: 0.3rem;
        line-height: 0.6rem;
        color: #0e822f;
        border-bottom: none;
        text-align: center;
      }
    }
    .my-rule{
      .btn{
        position: absolute;
        display: inline-block;
        background-size: cover;
        border-radius: 4px;
        background-repeat: no-repeat;
        background-image: url("./assets/rule-button-bg.png");
        margin: 0rem;
        top: 0rem;
        left: 0.25rem;
        width: 3.4rem;
        height: 0.6rem;
        font-size: 0.3rem;
        line-height: 0.6rem;
        color: #0e822f;
        border-bottom: none;
        text-align: center;
      }
    }
}
</style>
