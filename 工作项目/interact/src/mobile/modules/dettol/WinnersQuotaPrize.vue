<template>
  <div v-if="!isBeforeStart"
       class="dettle-winners-quota"
       :style="options.boxStyle">
    <img class="title-img"
         src="./assets/swiper-title-winners.png">
    <div class="prizes-and-rule">
      <MyPrize :options="options || {}"
               :settings="settings"
               :userInfo="userInfo"
               :activityInfo="activityInfo"
               class="my-prize"></MyPrize>
      <MyOrders :options="options || {}"
                :settings="settings"
                :userInfo="userInfo"
                :activityInfo="activityInfo"
                class="my-rule"></MyOrders>
    </div>
    <div class="list">
      <div class="list-container">
        <div class="blank-tip"
             v-if="winners.length === 0">暂无记录</div>
        <div v-else
             class="queue"
             :class="{marquee: marquee}">
          <div v-for="(winner, index) in winnersInlist"
               :key="`winner-${index}`"
               class="winner">
            <span style="padding-left:0.25rem">no.{{index+1}}</span>
            <span style="padding-left:1.5rem">{{ winner.nickName }}</span>
            <span class="offset" />
            <!-- <span>抽中了</span> -->
            <span>{{ winner.prizeName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ActivityService } from '@/mobile/service';
import MyPrize from './MyQuoTaPrizes.vue';
import MyRule from './RuleQuotaPrize.vue';
import MyOrders from './MyOrders';


export default {
  name: 'DettolWinners',
  components: {
    MyPrize,
    MyRule,
    MyOrders,
  },
  props: {
    options: {
      default: () => ({}),
    },
    userInfo: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
    previewMode: {
      default: false,
    },
  },
  computed: {
    isBeforeStart() {
      return new Date() < new Date(this.activityInfo.enrollStartTime);
    },
    winnersInlist() {
      // if (this.winners.length > this.listLength) {
      //   return [...this.winners, ...this.winners].slice(
      //     this.startIndex,
      //     this.startIndex + this.listLength + 2,
      //   );
      // }
      return this.winners;
    },
  },
  data() {
    return {
      interval: -1,
      startIndex: 0,
      marquee: false,
      listLength: 5,
      page: {
        pageNo: 1,
        pageSize: 30,
      },
      winners: [],
    };
  },
  created() {
    if (this.previewMode) {
      this.winners = [
        {
          nickName: '用**1',
          prizeName: '积分100',
        }, {
          nickName: '用**2',
          prizeName: '京豆200',
        }, {
          nickName: '用**3',
          prizeName: '测试实物商品',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        },
      ];
    } else {
      this.getWinners();
    }
  },
  methods: {
    update() {
      this.getWinners();
    },
    startMarquee() {
      if (this.interval > 0) {
        clearInterval(this.interval);
      }
      // this.interval = setInterval(() => {
      //   this.marquee = true;
      //   setTimeout(() => {
      //     this.startIndex = (this.startIndex + 1) % this.winners.length;
      //     this.marquee = false;
      //   }, 600);
      // }, 1000);
    },
    async getWinners(pageNo = this.page.pageNo) {
      const page = {
        ...this.page,
        pageNo,
      };
      const { data } = await ActivityService[this.settings.apis.getWinners]({
        activityId: this.activityInfo.activityId, // 活动ID
        shopId: this.activityInfo.shopId, // 活动ID
        groupId: this.activityInfo.groupId, // 活动ID
        ...page,
      });
      this.winners = data;
      if (this.winners.length > 5) {
        this.startMarquee();
      }
    },
  },
};
</script>
<style lang="scss">
.dettle-winners-quota {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto;
  box-sizing: border-box;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
  .title-img {
    width: 4.6rem;
  }
  .list {
    width: 7rem;
    height: 4rem;
    overflow: auto;
    border-radius: 0.16rem;
    // background-color: #f1f8f3;
    background-image: url("./assets/winners-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 0.3rem;
    position: relative;
    .list-container{
      width: 100%;
      position: absolute;
      height: 3.2rem;
      bottom: 0;
      overflow: auto;
    }
    .blank-tip {
      height: 100%;
      font-size: 0.24rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .winner {
      border-bottom: dotted 1px #999999;
      line-height: 0.4rem;
      border-radius: 0.04rem;
      margin-bottom: 0.1rem;
      margin: 0 0.3rem;
      padding: 0.2rem 0;
      display: flex;
      justify-content: space-between;
      font-size: 0.24rem;
      color: #333333;
      .winner-avatar {
        height: 0.4rem;
        margin-right: 0.2rem;
      }
      .offset {
        flex: 1;
      }
      .red {
        color: #ff3333;
      }
    }
  }
  .queue {
    position: relative;
    top: 0rem;
  }
  .marquee {
    top: -0.8rem;
    // top: 0;
    transition: all 0.5s linear;
  }
  .show-prize {
    position: absolute;
    font-weight: 700;
    top: -0.1rem;
    left: 0;
    color: #0e822f;
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
    line-height: 26px;
  }

  .prizes-and-rule{
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
        right: 0;
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
        left: 0;
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
}
</style>
