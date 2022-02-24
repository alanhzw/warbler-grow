<template>
  <div v-if="!isBeforeStart"
       class="dettle-winners"
       :style="options.boxStyle">
    <img class="title-img"
         src="./assets/swiper-title-winners.png">
    <div class="list">
      <div class="blank-tip"
           v-if="winners.length === 0">暂无记录</div>
      <div v-else
           class="queue"
           :class="{marquee: marquee}">
        <div v-for="(winner, index) in winnersInlist"
             :key="`winner-${index}`"
             class="winner">
          <img class="winner-avatar"
               src="@/assets/avatar.png">
          <span style="color:#0e822f">{{ winner.nickName }}</span>
          <span class="offset" />
          <span style="color:#0e822f">抽中了</span>
          <span style="color:#0e822f">{{ winner.prizeName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ActivityService } from '@/mobile/service';

export default {
  name: 'DettolWinners',
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
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        }, {
          nickName: '用**4',
          prizeName: '优惠券',
        },

      ];
    } else {
      this.getWinners();
    }
  },
  mounted() { },
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
.dettle-winners {
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
    height: 4rem;
    overflow: auto;
    border-radius: 0.16rem;
    background-color: #f1f8f3;
    margin-top: 0.1rem;

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
    top: 0;
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
}
</style>
