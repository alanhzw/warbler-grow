<template>
  <div class="draw">
    <div v-if="isOver">
      <p v-if="activityInfo.activityType == 505"
         style="color: #ffffff">活动结束时间{{Moment(activityInfo.activityEndTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
      <p style="margin-bottom: 1rem; color: #ffffff">活动已结束</p>
    </div>
    <div v-if="activityInfo.activityType == 505 && activityInfo.status == 2">
      <p style="color: #ffffff">活动开始时间{{activityInfo.activityStartTime}}</p>
      <p style="margin-bottom: 1rem; color: #ffffff">活动未开始</p>
    </div>
    <big-wheel ref="bigWheel"
               class="big-wheel-wrapper"
               :prizes="prizes"
               @roll="startRoll"
               :options="options || {}"
               :settings="settings" />
    <div v-if="activityInfo.isAccord==2"
         class="remain-time"
         style="margin-bottom: 0.2rem">不满足参与条件</div>
    <div v-else-if="activityInfo.status == 3">
      <div class="remain-time">
        <span>还有</span>
        <span class="value">{{ activityInfo.remainingTimes }}</span>
        <span>次抽奖机会</span>
      </div>
      <div class="draw-info">
        <div>
          <span>有效消费金额</span>
          <span class="value">{{ activityInfo.consumptionAmount }}</span>
          <span>元，共获得</span>
          <span class="value">{{ activityInfo.giveTimes || 0 }}</span>
          <span>次抽奖机会</span>
        </div>
        <div v-if="activityInfo.maxDraw >= 0">
          <span>您最多可获得</span>
          <span class="value">{{ activityInfo.maxDraw }}</span>
          <span>次抽奖机会</span>
        </div>
      </div>
    </div>

    <van-popup class="prize-dialog"
               v-model="prizeDialogShow">
      <div class="result-box-success"
           :style="{backgroundImage:backgroundImage}">
        <img class="btn-close-icon"
             @click="prizeDialogShow = false"
             src="../../assets/btn-close.png" />
        <!-- 奖项类型(1-优惠券；2-京豆；3-实物商品；4-积分) -->
        <div v-if='prizeInDialog.prizeType===1'
             class="coupon-box">
          <img src="../../assets/prize-coupon.png"
               class="common-prize-coupon">
          <div><span class="money-icon">￥</span><span class="money-num">{{prizeInDialog.couponDiscount}}</span></div>
        </div>
        <img src="../../assets/common-prize-bean.png"
             class="common-prize"
             v-if='prizeInDialog.prizeType===2'>
        <img src="../../assets/common-prize-point.png"
             class="common-prize"
             v-if='prizeInDialog.prizeType===4'>
        <div class="content">
          <img class="product-style"
               v-if='prizeInDialog.prizeType===3'
               :src="`${CONST.IMAGE_PREFIX}${prizeInDialog.prizePicture}`" />
          <p class="award-tip">恭喜您获得:</p>
          <p class="award-prize-name"
             v-if='prizeInDialog.prizeType===1'>{{ prizeInDialog.prizeName }}</p>
          <p class="award-prize-name"
             v-if='prizeInDialog.prizeType===2'>{{ prizeInDialog.prizeName }}</p>
          <p class="award-prize-name"
             v-if='prizeInDialog.prizeType===3'>{{ prizeInDialog.prizeName }}</p>
          <p class="award-prize-name"
             v-if='prizeInDialog.prizeType===4'>{{ prizeInDialog.prizeName }}</p>
          <!-- <p class="tips-bean">京豆已放到您的账户中，<span>京东APP-我的-京豆</span>中查看</p> -->
          <div v-if="prizeInDialog.prizeType === 3"
               class="btn-close"
               @click="addressShow = true">
            <div @click="prizeDialogShow = false"
                 v-lz-click.isMain="'23'">填写邮寄地址</div>
          </div>
          <div v-else
               class="btn-close"
               @click="prizeDialogShow = false">关闭</div>
        </div>
      </div>
    </van-popup>

    <van-popup class="prize-dialog"
               v-model="noPrizeDialogShow">
      <div class="result-box">
        <header>很抱歉</header>
        <div class="content">
          <img class="blank-pic"
               src="../../assets/blank-box.png" />
          <p class="blank-tip">～ 您与奖品擦肩而过 ～</p>
          <div class="btn-close"
               @click="noPrizeDialogShow = false">关闭</div>
        </div>
      </div>
    </van-popup>
    <bottom-box title="填写收货地址"
                :visible.sync="addressShow">
      <address-edit save-button-text="确认提交"
                    @save="addAddr" />
    </bottom-box>
  </div>
</template>
<script>
import BottomBox from '../components/BottomBox';
import { ActivityService } from '@/mobile/service';
import BigWheel from '@/mobile/components/BigWheel';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';
import areaData from '@/mobile/data/vantArea';
import Moment from 'moment';

let drawing = false;

export default {
  name: 'Draw',
  components: {
    BottomBox,
    BigWheel,
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
    isOver() {
      if (this.activityInfo.activityType == 502) {
        return new Date() > new Date(this.activityInfo.awardEndTime);
      } else if (this.activityInfo.activityType == 505) {
        return new Date() > new Date(this.activityInfo.activityEndTime);
      }
      return false;
    },
    backgroundImage() {
      if (this.prizeInDialog.prizeType == 3) {
        return `url(${require('@/assets/common-prize-bg2.png')})`;
      }
      return `url(${require('@/assets/common-prize-bg.png')})`;
    },
    prizes() {
      const prizesArray = Array.isArray(this.activityInfo.prizeLists)
        ? this.activityInfo.prizeLists.map(prize => ({
          ...prize,
          prizePicture: `${CONST.IMAGE_PREFIX}${prize.prizePicture}`,
        }))
        : [];
      // https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4168069553,752156939&fm=26&gp=0.jpg
      const prizeList = Array(8).fill({
        isEmpty: true,
        prizePicture:
          '',
        prizeName: '谢谢参与',
      });
      // 处理数据,初始数据六个位置全部是谢谢参与  根据位置信息替换相应位置的谢谢参与
      for (let i = 0; i < prizesArray.length; i++) {
        if (prizesArray[i].position) {
          prizeList.splice(prizesArray[i].position - 1, 1, prizesArray[i]);
        }
      }
      return prizeList;
    },
  },
  data() {
    return {
      CONST,
      Moment,
      areaData,
      prizeDialogShow: false,
      addressShow: false,
      prizeInDialog: {
        // prizeType: 3,
        // prizeName: "hhhh",
        // prizePicture: "jfs/t1/111040/17/18029/45016/5f60efc4E2ff87c6d/258d87a9ed4cdf6d.png",
        // prizePicture: "jfs/t1/123107/19/13039/154433/5f687af6Ee78607d5/a585992783ac3f5e.jpg",
      },
      noPrizeDialogShow: false,
    };
  },

  methods: {
    test() {
      this.$refs.bigWheel.roll(3);
    },
    startRoll() {
      if (this.isOver) {
        LzMsg.fail('活动已结束');
        return;
      }
      if (this.activityInfo.isAccord === 2) {
        return LzMsg.fail('很遗憾，您不满足参与条件');
      }
      if (drawing) {
        return;
      }
      drawing = true;
      ActivityService[this.settings.apis.draw]({
        activityId: this.activityInfo.activityId,
        activityType: this.activityInfo.activityType,
        shopId: this.activityInfo.shopId,
        groupId: this.activityInfo.groupId,
        grade: this.activityInfo.grade,
      })
        .then(({ data }) => {
          // if ()
          this.activityInfo.remainingTimes = data.canDrawTimes;
          setTimeout(() => {
            this.$emit('update');
          }, 5000);
          let target = 0;
          if (data.drawOk) {
            target = data.position - 1;
          } else {
            for (let i = 0; i < this.prizes.length; i++) {
              if (this.prizes[i].isEmpty) {
                target = i;
              }
            }
          }
          console.log(target);
          // const target = this.prizes.filter(p => p.isEmpty)
          this.$refs.bigWheel
            .roll(target)
            .then(() => {
              if (data.drawOk) {
                this.prizeInDialog = {
                  ...data,
                };
                this.prizeDialogShow = true;
                drawing = false;
              } else {
                this.noPrizeDialogShow = true;
                drawing = false;
              }
            })
            .catch((e) => {
              console.log(e.message);
              drawing = false;
            });
        })
        .catch((e) => {
          LzMsg.fail(e.message);
          drawing = false;
        });
    },
    addAddr(data) {
      ActivityService[this.settings.apis.addAddr]({
        activityId: this.activityInfo.activityId, // 活动ID
        activityType: this.activityInfo.activityType,
        phone: data.tel, // 电话号
        realName: data.name, // 真实姓名
        province: data.province, // 省
        city: data.city, // 城市
        country: data.county, // 区县
        address: data.addressDetail, // / 详细地址信息
        recordId: this.prizeInDialog.recordId,
      })
        .then(() => {
          this.$emit('update');
          this.addressShow = false;
          this.prizeDialogShow = false;
        })
        .catch((e) => {
          LzMsg.error(e.message);
        });
    },
  },
};
</script>
<style lang="scss">
.draw {
  .big-wheel-wrapper {
    position: relative;
    margin: -0.6rem auto 0.4rem;
    width: 7rem;
    height: 7rem;
    overflow: hidden;
  }

  .result-box-success {
    width: 6rem;
    height: 8.5rem;
    // background-image: url('../../assets/common-prize-bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
    * {
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    .common-prize {
      width: 2rem;
      height: 2rem;
      top: 1.74rem;
    }
    .product-style {
      width: 2rem;
      top: 2rem;
    }
    .coupon-box {
      position: relative;
      .money-icon {
        width: 2rem;
        position: absolute;
        top: 2rem;
        left: 1.8rem;
        color: #ffd971;
        font-size: 0.4rem;
      }
      .money-num {
        width: 2rem;
        position: absolute;
        top: 2rem;
        left: 2.7rem;
        color: #ffd971;
        font-size: 1rem;
      }
    }

    .tips-bean {
      position: absolute;
      top: 0;
      width: 100%;
    }
    .common-prize-coupon {
      width: 3rem;
      height: 2rem;
      top: 1.74rem;
    }

    .btn-close {
      width: 5rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #e2231a;
      border-radius: 0.05rem;
      top: 6.5rem;
      font-size: 0.3rem;
      color: #ffffff;
    }
    .btn-close-icon {
      position: absolute;
      height: 0.3rem;
      width: 0.3rem;
      top: 0.8rem;
      left: 95%;
    }
    .award-tip {
      font-size: 0.35rem;
      color: #ff9900;
      top: 4rem;
      font-weight: 700;
    }
    .award-prize-name {
      font-size: 0.6rem;
      color: #e2231a;
      top: 4.3rem;
      font-weight: 700;
    }
  }

  .remain-time {
    color: #ffd0a9;
    font-size: 0.24rem;
  }
  .draw-info {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.45rem;
    width: 5.8rem;
    height: 0.8rem;
    margin: 0.2rem auto;
    margin-bottom: 0.4rem;
    line-height: 0.4rem;
    padding: 0.05rem;
    color: #ffffff;
    font-size: 0.24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .prize-dialog {
  background-color: transparent;
}
.result-box {
  width: 5.4rem;
  background-color: #f2f2f2;
  border-radius: 0.2rem;
  padding: 0.2rem;

  header {
    font-size: 0.36rem;
    color: #333333;
    margin: 0.3rem;
  }
  .content {
    background-color: #ffffff;
    border-radius: 0.1rem;
    padding: 0.3rem;

    .blank-pic {
      margin-top: 0.3rem;
      height: 1.83rem;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .blank-tip {
      font-size: 0.3rem;
      color: #333333;
    }
    .btn-close {
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #e2231a;
      border-radius: 0.05rem;

      font-size: 0.3rem;
      color: #ffffff;
    }
    .award-tip {
      font-size: 0.3rem;
      color: #ff9900;
    }
    .award-prize-name {
      font-size: 0.3rem;
      font-weight: 600;
      color: #e2231a;
    }
  }
}
}

</style>
