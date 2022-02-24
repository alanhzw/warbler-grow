<template>
  <div class="dettol-my-draw-prizes-dettol">
    <span class="btn"
          v-lz-click.isMain="'19'"
          @click="getMyPrizes">您的订单 ></span>
    <bottom-box title="您的订单"
                :visible.sync="prizesBoxShowed">
      <div v-if="prizes.length === 0"
           class="blank-tip">暂无订单</div>
      <div v-else>
        <div class="order-item"
             style="font-size:0.28rem;font-weight:700">

          <div style='width:30%;text-align: left;'>订单编号</div>
          <div style='width:47%;text-align: center;'
               v-if="activityInfo.activityType == 506 || activityInfo.activityType == 501">下单时间</div>
          <div style='width:47%;text-align: center;'
               v-if="activityInfo.activityType == 507">支付时间</div>
          <div style='width:28%;text-align: right;'
               v-if="activityInfo.activityType == 506 || activityInfo.activityType == 501">实付金额(元)</div>
          <div style='width:28%;text-align: right;'
               v-if="activityInfo.activityType == 507">订单金额(元)</div>
        </div>
        <div class="order-item"
             style="font-size:0.25rem"
             v-for="item in prizes"
             :key="item.ordId">
          <div style='width:30%;text-align: left;'>{{ item.ordId }}</div>
          <div style='width:40%;text-align: center;'>{{ item.showOrderDate }}</div>
          <div style='width:25%;text-align: right;'>{{ item.ordAmt }}</div>
        </div>
      </div>
    </bottom-box>
  </div>
</template>
<script>
import BottomBox from './BottomBox';
import { ActivityService } from '@/mobile/service';
import areaData from '@/mobile/data/vantArea';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';
import { Toast } from 'vant';
import Moment from 'moment';

export default {
  name: 'DettolMyDrawPrizes',
  components: {
    BottomBox,
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
    event: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      prizesBoxShowed: false,
      prizes: [],
      addOrUpdate: 1, // 1是新增,2是更改
      recordId: '', // 奖品id
      prizeIndex: '',
      areaData,
      addrForm: {},
      prizeSelected: {},
    };
  },
  filters: {
    telStr(value) {
      if (value) {
        return `${value.substr(0, 3)}****${value.substr(7)}`;
      }
      return '';
    },
  },
  computed: {},
  methods: {
    async getMyPrizes() {
      try {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await ActivityService[this.settings.apis.getMyOrders]({
          activityId: this.activityInfo.activityId, // 活动ID
          shopId: this.activityInfo.shopId, // 活动ID
          groupId: this.activityInfo.groupId, // 活动ID
          orderStartTime: Moment(this.activityInfo.orderStartTime).format('YYYY-MM-DD HH:mm:ss'),
          orderEndTime: Moment(this.activityInfo.orderEndTime).format('YYYY-MM-DD HH:mm:ss'),
          activityType: this.activityInfo.activityType,
          awardStartTime: Moment(this.activityInfo.awardStartTime).format('YYYY-MM-DD HH:mm:ss'),
          priceLimit: this.activityInfo.priceLimit,
        });

        this.prizes = data;
        this.$emit('event', { name: 'prizeShowed' });
        this.prizesBoxShowed = true;
        Toast.clear();
      } catch (error) {
        Toast.clear();
        LzMsg.error(error.message);
      }
    },
  },
};
</script>
<style lang="scss">
.dettol-my-draw-prizes-dettol {
  height: 0.6rem;

  .btn {
    position: absolute;
    margin: 0 0.3rem;
    top: 11rem;
    right: 0;
    height: 0.5rem;
    font-size: 0.3rem;
    line-height: 0.6rem;
    color: #d6f0df;
    border-bottom: 1px #d6f0df solid;
    text-align: center;
  }
  .rule-str {
    width: 100%;
    word-wrap: break-word;
  }
  .rule-text {
    color: #333333;
    font-size: 0.24rem;
    line-height: 0.48rem;
    text-align: left;
    margin: 0.2rem;
  }
  .blank-tip {
    font-size: 0.24rem;
    color: #333333;
    padding: 0.4rem;
  }
  .prize-item {
    background: url("../../../assets/my-prize-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 125%;
    margin: 0.1rem;
    padding: 0.1rem 0.4rem 1.1rem 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .prize-name {
      position: absolute;
      left: 1.2rem;
      top: 0.6rem;
      color: #ff3333;
      font-size: 0.3rem;
      text-align: left;
    }
    .prize-type {
      color: #999999;
      font-size: 0.2rem;
      text-align: left;
    }
    .change-address {
      width: 150%;
      position: absolute;
      right: 0rem;
      top: 0.4rem;
      color: #999999;
      font-size: 0.2rem;
      text-align: right;
    }
    .person-info {
      position: absolute;
      right: 0.2rem;
      top: 0.1rem;
      color: #999999;
      font-size: 0.2rem;
      text-align: right;
    }
    .award-time {
      position: absolute;
      left: 1.2rem;
      top: 1rem;
      color: #999999;
      font-size: 0.2rem;
      text-align: left;
    }
    .prize-picture {
      position: absolute;
      top: 0.7rem;
      left: 0.2rem;
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      border: 1px solid #999999;
    }
    .prize-status {
      position: absolute;
      top: 0.6rem;
      right: 0.2rem;
      font-size: 0.24rem;
    }
    .status-f {
      color: #ff3333;
    }
    .status-s {
      color: #00bb66;
    }

    .status-w {
      color: #ff9900;
    }
  }
  .order-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-bottom: 1px dashed #999999;
    padding: 0.1rem 0;
  }
}

.addr-detail-box {
  background-color: #ffffff;
  border-radius: 0.16rem;
  font-size: 0.28rem;
  line-height: 0.8rem;
  text-align: left;
  padding: 0.4rem;
  p {
    margin: 0;
  }
  p + p {
    border-top: 1px solid #eeeeee;
  }
}
</style>
