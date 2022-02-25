<template>
<!-- 入会礼包 -->
  <div class="Initiation">
      <ErrorPage v-if="activityStatus === 99"></ErrorPage>
      <ActivityNotStarted v-if="activityStatus === 0"></ActivityNotStarted>
      <ActivityIsOver v-if="activityStatus === 1"></ActivityIsOver>
      <AlreadyReceived v-if="activityStatus === 2" name="入会礼包每人只可领取一次，您已经领取过"></AlreadyReceived>
      <NoCondition v-if="activityStatus === 3"></NoCondition>
      <!-- 权益已领光 -->
      <NoPrize v-if="activityStatus === 4"></NoPrize>
      <!-- 领取成功之后，列表 -->
      <div v-if="activityStatus === 6" class="bg">
        <div class="first_top">
          <List3 :prizes="list" type="r"></List3>
        </div>
      </div>
  </div>
</template>

<script>
import { PointsService } from '@/http';
import ErrorPage from './components/Error.vue';
import ActivityNotStarted from './components/ActivityNotStarted.vue';
import ActivityIsOver from './components/ActivityIsOver.vue';
import AlreadyReceived from './components/AlreadyReceived.vue';
import NoCondition from './components/NoCondition.vue';
import NoPrize from './components/NoPrize.vue';
import List3 from './components/List3.vue';

export default {
  name: 'Initiation',
  components: {
    ErrorPage,
    ActivityNotStarted,
    ActivityIsOver,
    AlreadyReceived,
    NoCondition,
    NoPrize,
    List3,
  },
  data() {
    return {
      activityStatus: 5,
      form: {},
      list: [],
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    async getDetails() {
      try {
        const { data } = await PointsService.getInitiationGiftList({});
        if (data.memberActivityStatus == 1) {
          // 未开始
          this.activityStatus = 0;
        } else if (data.memberActivityStatus == 2) {
          // 已结束
          this.activityStatus = 1;
        } else if (data.memberActivityStatus == 19) {
          // 已领取
          this.activityStatus = 2;
        } else if (data.memberActivityStatus == 17) {
          // 不符合条件
          this.activityStatus = 3;
        } else if (data.memberActivityStatus == 18) {
          // 权益已领光
          this.activityStatus = 4;
        } else if (data.memberActivityStatus == -1) {
          // 活动太火爆了
          this.activityStatus = 99;
        } else {
          // 可领取
          this.getGifts();
        }
      } catch (err) {

      } finally {

      }
    },
    // 领取礼包
    async getGifts() {
      try {
        const { data } = await PointsService.getInitiationGiftResult({});
        this.list = data.giftList;
        this.activityStatus = 6;
      } catch (err) {
        this.$toast(err.message);
      } finally {

      }
    },
  },
};
</script>

<style scoped>
.Initiation {
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.title {
  font-size: 0.3rem;
  color: #303030;
  text-align: left;
  margin-bottom: 0.24rem;
}

.item {
  color: #666666;
  font-size: 0.24rem;
  text-align: left;
  margin-bottom: 0.1rem;
}
.bg {
    background: #8073ff url('./assets/r_bg.png') no-repeat;
    background-size: 100%;
    background-position: center -1rem;
    position: absolute;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
.first_top {
  margin-top: -0.2rem;
}
</style>
