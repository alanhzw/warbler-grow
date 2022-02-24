<template>
  <div class="dettol-my-draw-prizes-dettol">
    <span class="btn"
          v-lz-click.isMain="'19'"
          @click="getMyPrizes">我的奖品 ></span>
    <bottom-box title="中奖记录"
                :visible.sync="prizesBoxShowed">
      <div v-if="prizes.length === 0"
           class="blank-tip">您还未获得任何奖品</div>
      <div v-else>
        <div v-for="(prize, index) in prizes"
             class="prize-item"
             :key="`prize-${index}`">
          <div>
            <img class="prize-picture"
                 :src="`${CONST.IMAGE_PREFIX}${prize.prizePicture}`"
                 alt="">
            <div class="prize-type"
                 v-if="prize.prizeType ===2">京豆</div>
            <div class="prize-type"
                 v-if="prize.prizeType ===4">积分</div>
            <div class="prize-type"
                 v-if="prize.prizeType ===1">优惠券</div>
            <div class="prize-type"
                 v-if="prize.prizeType ===3">实物商品</div>
            <div class="person-info"
                 v-if="prize.prizeType ===3 && prize.mobile">收货人:{{prize.realName}} &nbsp; {{prize.mobile | telStr}}</div>
            <div class="prize-name">{{ prize.prizeName }}</div>
            <div class="award-time">获奖时间：{{ prize.awardTime }}</div>
          </div>
          <div v-if="prize.prizeType ===3"
               :class="`prize-status status-${prize.status}`">
            {{
              {
                f: "发放失败",
                s: "已发货",
                w: "待发货",
              }[prize.status]
            }}
            <div class="change-address">
              <div v-if='prize.status === "w" && !prize.mobile'
                   style="color:#118bff"
                   v-lz-click.isMain="'23'"
                   @click='updateAddress(prize)'>填写地址</div>
              <div v-else
                   style="clolr:#a0a0a0"
                   @click="showAddress(prize)">查看地址</div>
            </div>
          </div>
        </div>
      </div>
    </bottom-box>

    <bottom-box title="领取奖品"
                :visible.sync="achieveBoxShowed"
                @update:visible="prizesBoxShowed=true">
      <address-edit save-button-text="领取"
                    @save="addAddr" />
    </bottom-box>
    <bottom-box title="领取奖品"
                :visible.sync="achieveBoxShowed"
                @update:visible="prizesBoxShowed=true">
      <address-edit save-button-text="领取"
                    @save="addAddr" />
    </bottom-box>
    <bottom-box title="地址信息"
                :visible.sync="addressDetailShowed">
      <div class="addr-detail-box">
        <p>姓名：{{prizeSelected.realName}}</p>
        <p>电话：{{prizeSelected.mobile}}</p>
        <p>地区：{{prizeSelected.province}}{{prizeSelected.city}}{{prizeSelected.country}}</p>
        <p class="rule-str">详细地址：{{prizeSelected.address}}</p>
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
      achieveBoxShowed: false,
      addressDetailShowed: false,
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
  watch: {
    'event.name': function() {
      if (this.event.name === 'ruleShowed') {
        this.prizesBoxShowed = false;
      }
    },
  },
  methods: {
    // 新增地址
    addAddress() {
      this.addOrUpdate = 1;
    },
    showAddress(prize) {
      this.prizeSelected = {
        ...prize,
      };
      this.addressDetailShowed = true;
    },
    // 修改地址
    updateAddress(prize) {
      this.addOrUpdate = 2;
      this.achieveBoxShowed = true;
      this.prizesBoxShowed = false;
      this.prizeSelected = {
        ...prize,
      };
    },
    async addAddr(data) {
      try {
        await ActivityService[this.settings.apis.addAddr]({
          recordId: this.prizeSelected.recordId,
          activityId: this.activityInfo.activityId, // 活动ID
          activityType: this.activityInfo.activityType,
          phone: data.tel, // 电话号
          realName: data.name, // 真实姓名
          province: data.province, // 省
          city: data.city, // 城市
          country: data.county, // 区县
          address: data.addressDetail, // / 详细地址信息
          prizeIndex: this.prizeSelected.prizeIndex, // 本地的prizeIndex和服务端的prizeIndex可能不一致
        });
        // this.$emit('update');
        await this.getMyPrizes();
        this.achieveBoxShowed = false;
      } catch (e) {
        LzMsg.error(e.message);
      }
    },
    async getMyPrizes() {
      try {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        const { data } = await ActivityService[this.settings.apis.getMyPrizes]({
          activityId: this.activityInfo.activityId, // 活动ID
          shopId: this.activityInfo.shopId, // 活动ID
          groupId: this.activityInfo.groupId, // 活动ID
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
    border-bottom:1px #d6f0df solid;
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
    background: url('../../../assets/my-prize-bg.png');
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
