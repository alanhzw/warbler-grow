<template>
  <div v-if="activityInfo.activityType == 506 || activityInfo.activityType == 507 || activityInfo.isAccord == 1">
    <div v-if="!isOver"
         class="my-prizes"
         :style="options.boxStyle">
      <div class=""
           v-if="prizes.length > 0">
        <p v-if="prizes[prizeIndex].lockingType == 2"
           class="prizes-header">消费满{{prizes[prizeIndex].prizeQuota}}元解锁</p>
        <div v-else-if="prizes[prizeIndex].prizeStatus < 3">
          <p v-if="activityInfo.activityType == 501 || activityInfo.activityType == 503"
             class="prizes-header">已解锁</p>
          <!-- <p v-else class="prizes-header">恭喜您获得</p> -->
        </div>
        <img class="my-prize"
             :src="`${CONST.IMAGE_PREFIX}${prizes[prizeIndex].prizePicture}`" />
        <div class="my-prize-name">{{ prizes[prizeIndex].prizeName }}</div>
        <img v-if="prizes.length > 1"
             class="arrow arrow-l"
             src="../../assets/arrow-l.png"
             @click="prizeIndex = (prizes.length + prizeIndex - 1) % prizes.length" />
        <img v-if="prizes.length > 1"
             class="arrow arrow-r"
             src="../../assets/arrow-r.png"
             @click="prizeIndex = (prizes.length + prizeIndex + 1) % prizes.length" />
        <span class="btn"
              v-if="prizes[prizeIndex].prizeStatus == 1"
              v-lz-click.isMain="'16'"
              @click="getPrize">领取奖品</span>
        <span class="btn disable"
              v-if="prizes[prizeIndex].prizeStatus == 2"
              @click="toast('奖品已领取')">已领取</span>
        <span class="btn disable"
              v-if="prizes[prizeIndex].prizeStatus == 3"
              @click="toast('奖品已领光')">已领光</span>
        <span class="btn disable"
              v-if="prizes[prizeIndex].prizeStatus == 4"
              @click="toast('奖品未解锁')">领取奖品</span>
      </div>
      <div v-else
           class="no-prizes-tip">
        <!-- <img class="my-prize" src="@/assets/empty.png" /> -->
        <!-- <p class="prizes-header" v-if="activityInfo.status === 3">您还未获得任何奖品</p> -->
        <!-- <p class="prizes-header" v-if="activityInfo.status === 4">抱歉，您与奖品插肩而过</p> -->

        <p v-if="activityInfo.isAccord == 1"
           class="prizes-header">您还未获得任何奖品</p>
        <p v-else
           class="prizes-header">您不符合活动参与条件</p>
        <img class="blank-box"
             :src="options.blankBox" />
      </div>

      <van-popup class="prize-dialog"
                 v-model="prizeDialogShow">
        <div class="result-box">
          <header>恭喜您获得</header>
          <div class="content">
            <div class="blank-pic"
                 :style="`background-image: url(${CONST.IMAGE_PREFIX}${prizeInDialog.prizePicture})`"></div>
            <p class="award-prize-name">{{ prizeInDialog.prizeName }}</p>
            <div v-if="prizeInDialog.prizeType === 3"
                 class="btn-close"
                 v-lz-click="'23'"
                 @click.stop="achieveBoxShowed = true">填写地址</div>
            <div v-else
                 class="btn-close"
                 @click="prizeDialogShow = false">关闭</div>
          </div>
        </div>
      </van-popup>

      <bottom-box title="领取奖品"
                  :visible.sync="achieveBoxShowed">
        <address-edit save-button-text="领取"
                      @save="addAddr" />
      </bottom-box>
    </div>
  </div>
</template>
<script>
import CONST from '@/utils/constant';
import areaData from '@/mobile/data/vantArea';
import BottomBox from '../components/BottomBox';
import { ActivityService } from '@/mobile/service';
import LzMsg from '@/mobile/utils/LzMsg';

export default {
  name: 'MyPrizesManual',
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
  },
  computed: {
    prizes() {
      const list = Array.isArray(this.activityInfo.getUserAwardsRespDTOS) ? this.activityInfo.getUserAwardsRespDTOS : [];
      if (list.length > 1) {
        list.sort((p1, p2) => p1.prizeIndex - p2.prizeIndex);
      }
      return list;
    },
    isOver() {
      if (this.activityInfo.activityType == 506) {
        return this.activityInfo.status == 4 || new Date() > new Date(this.activityInfo.awardEndTime);
      }
      return false;
    },
  },
  data() {
    return {
      CONST,
      areaData,
      prizeIndex: 0,
      achieveBoxShowed: false,
      prizeDialogShow: false,
      prizeInDialog: {},
      recordId: '',
      gettingFlag: false,
      // prizes: []
    };
  },
  created() {
  },
  methods: {
    toast(str) {
      LzMsg.error(str);
    },
    async getPrize() {
      if (this.gettingFlag) {
        return;
      }
      if (this.activityInfo.activityType == 502 && this.prizes[this.prizeIndex].prizeType == 3) {
        // 实物商品
        this.achieveBoxShowed = true;
      } else {
        this.gettingFlag = true;
        try {
          const { data } = await ActivityService[this.settings.apis.getPrize]({
            activityId: this.activityInfo.activityId, // 活动ID
            prizeIndex: this.prizes[this.prizeIndex].prizeIndex, // 本地的prizeIndex和服务端的prizeIndex可能不一致
            prizeType: this.prizes[this.prizeIndex].prizeType,
          });
          this.$emit('update');
          this.prizeInDialog = { ...this.prizes[this.prizeIndex] };
          this.prizeDialogShow = true;
          this.recordId = data.recordId;
          this.gettingFlag = false;
        } catch (e) {
          this.$emit('update');
          this.gettingFlag = false;
          LzMsg.error(e.message);
        }
      }
    },
    addAddr(data) {
      ActivityService[this.settings.apis.addAddr]({
        recordId: this.recordId,
        activityId: this.activityInfo.activityId, // 活动ID
        activityType: this.activityInfo.activityType,
        phone: data.tel, // 电话号
        realName: data.name, // 真实姓名
        province: data.province, // 省
        city: data.city, // 城市
        country: data.county, // 区县
        address: data.addressDetail, // / 详细地址信息
        prizeIndex: this.prizes[this.prizeIndex].prizeIndex, // 本地的prizeIndex和服务端的prizeIndex可能不一致
      }).then(() => {
        this.$emit('update');
        this.achieveBoxShowed = false;
        this.prizeInDialog = { ...this.prizes[this.prizeIndex] };
        this.prizeDialogShow = false;
      }).catch((e) => {
        LzMsg.error(e.message);
      });
    },
  },
};
</script>
<style lang="scss">
.my-prizes {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  text-align: center;
  .arrow {
    position: absolute;
    top: 2rem;
    height: 1rem;
    &.arrow-l {
      left: 0;
    }
    &.arrow-r {
      right: 0;
    }
  }
  .prizes-header {
    color: #ffffff;
    font-size: 0.3rem;
  }
  .no-prizes-tip {
    position: relative;
    .blank-box {
      width: 2.77rem;
      height: 1.83rem;
      margin-top: 0.4rem;
    }
  }
  .my-prize {
    height: 1.83rem;
    margin-top: 0.4rem;
  }
  .my-prize-name {
    color: #ffd396;
    font-size: 0.3rem;
  }
  .btn {
    position: absolute;
    background-image: url(../../assets/btn-enable.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    top: 4rem;
    left: 50%;
    line-height: 0.6rem;
    transform: translate(-50%, -50%);
    width: 3.28rem;
    height: 0.8rem;
    color: #e2231a;
    font-weight: 800;
    &.disable {
      background-image: url(../../assets/btn-disable.png);
    }
  }
}
</style>
