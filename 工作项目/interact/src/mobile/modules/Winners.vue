<template>
  <div v-if="!isBeforeStart" class="winners" :style="options.boxStyle">
    <div class="list">
      <div class="blank-tip" v-if="winners.length === 0">暂无记录</div>
      <div v-else class="queue" :class="{marquee: marquee}">
        <div v-for="(winner, index) in winnersInlist" :key="`winner-${index}`" class="winner">
          <img class="winner-avatar" src="@/assets/avatar.png">
          <span>{{ winner.nickName }}</span>
          <span class="offset" />
          <span>获得</span>
          <span class="red">{{ winner.prizeName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ActivityService } from '@/mobile/service';

export default {
  name: 'Winners',
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
      if (this.winners.length > this.listLength) {
        return [...this.winners, ...this.winners].slice(
          this.startIndex,
          this.startIndex + this.listLength + 2,
        );
      }
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
  mounted() {},
  methods: {
    update() {
      this.getWinners();
    },
    startMarquee() {
      if (this.interval > 0) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        this.marquee = true;
        setTimeout(() => {
          this.startIndex = (this.startIndex + 1) % this.winners.length;
          this.marquee = false;
        }, 600);
      }, 1000);
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
.winners {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0 auto;
  box-sizing: border-box;
  .list {
    height: 100%;
    overflow: hidden;

    .blank-tip {
      height: 100%;
      color: #ffffff;
      font-size: 0.24rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .winner {
      background-color: #ffffff;
      line-height: 0.4rem;
      border-radius: 0.04rem;
      margin-bottom: 0.1rem;
      padding: 0.3rem;
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
    top: -1.1rem;
    // top: 0;
    transition: all 0.5s linear;
  }
}
</style>
