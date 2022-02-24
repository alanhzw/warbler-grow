<!--
 * @Description:
 * @Date: 2021-04-30 11:52:23
 * @LastEditTime: 2021-08-30 15:10:24
 * @FilePath: \interact\src\mobile\modules\dettol\Swiper.vue
-->
<template>
  <div class="swiper-box-dettol"
       :style="options.style">
    <div class="swiper-content">
      <div class="header">
        <img src="./assets/swiper-title-prize-show.png">
        <!-- <p class="show-prize">奖品展示</p> -->
      </div>
      <div v-if='activityInfo.prizeLists.length>2'
           @click='transform(1)'
           class="last"><img src="@/assets/swiper-next.png"></div>
      <ul :style="styles"
          class="prize-list">
        <li v-for='(item,index) in activityInfo.prizeLists'
            :key='index'
            class="prize-item">
          <img style='border-radius:4px'
               :src="`${CONST.IMAGE_PREFIX}${item.prizePicture}`">
          <p style="color:#fff;text-align:center">{{item.prizeName}}</p>
          <div class="btn-status"
               v-if="index == 1 || activityInfo.prizeLists.length < 3">
            <div class="enable-btn"
                 v-if='item.prizeStatus == 1'
                 v-lz-click.isMain="'16'"
                 @click='getPrize(item)'>领取 ></div>
            <div class="disabled-btn"
                 v-if='item.prizeStatus == 2'>已领取</div>
            <div class="disabled-btn"
                 v-if='item.prizeStatus == 3'>已领光</div>
            <div v-if='item.prizeStatus == 4'
                 class="disabled-btn">未达领取资格</div>
          </div>
        </li>
      </ul>
      <div v-if='activityInfo.prizeLists.length>2'
           @click='transform(-1)'
           class="next"><img src="@/assets/swiper-last.png"></div>
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
               v-lz-click.isMain="'23'"
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
</template>

<script>
import CONST from '@/utils/constant';
import areaData from '@/mobile/data/vantArea';
import BottomBox from './BottomBox.vue';
import { ActivityService } from '@/mobile/service';
import LzMsg from '@/mobile/utils/LzMsg';

export default {
  data() {
    return {
      offset: -1.6,
      CONST,
      areaData,
      prizeIndex: 0,
      achieveBoxShowed: false,
      prizeDialogShow: false,
      prizeInDialog: {},
      recordId: '',
      gettingFlag: false,
    };
  },
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
    styles() {
      return {
        left: `${this.offset}rem`,
        width: '100rem',
      };
    },
    prizes() {
      const list = Array.isArray(this.activityInfo.prizeLists) ? this.activityInfo.prizeLists : [];
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
  mounted() {
    if (this.activityInfo.prizeLists.length == 1) {
      this.offset = 1.3;
    }
    if (this.activityInfo.prizeLists.length == 2) {
      this.offset = 0;
    }
    if (this.activityInfo.prizeLists.length > 2) {
      this.offset = -1.6;
    }
  },
  methods: {
    toast(str) {
      LzMsg.error(str);
    },
    async getPrize(prizeItem) {
      this.prizeIndex = prizeItem.prizeIndex;
      console.log('🚀🚀~ prizeItem:', prizeItem);
      console.log('🚀🚀~ this.prizeIndex:', prizeItem.prizeIndex);
      if (this.gettingFlag) {
        return;
      }
      this.gettingFlag = true;
      try {
        const { data } = await ActivityService[this.settings.apis.getPrize]({
          activityId: this.activityInfo.activityId, // 活动ID
          prizeIndex: prizeItem.prizeIndex, // 本地的prizeIndex和服务端的prizeIndex可能不一致
          prizeType: prizeItem.prizeType,
        });
        this.$emit('update');
        this.prizeInDialog = { ...this.prizes[this.prizeIndex - 1] };
        this.prizeDialogShow = true;
        this.recordId = data.recordId;
        this.gettingFlag = false;
      } catch (e) {
        this.$emit('update');
        this.gettingFlag = false;
        LzMsg.error(e.message);
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
        prizeIndex: this.prizes[this.prizeIndex - 1].prizeIndex, // 本地的prizeIndex和服务端的prizeIndex可能不一致
      }).then(() => {
        this.$emit('update');
        this.achieveBoxShowed = false;
        this.prizeInDialog = { ...this.prizes[this.prizeIndex - 1] };
        this.prizeDialogShow = false;
      }).catch((e) => {
        LzMsg.error(e.message);
      });
    },
    // 计算偏移量
    transform(param) {
      if (param > 0) {
        const activity = this.activityInfo.prizeLists.shift();
        this.activityInfo.prizeLists.push(activity);
      } else {
        const activity = this.activityInfo.prizeLists.pop();
        this.activityInfo.prizeLists.unshift(activity);
      }
    },
  },
};
</script>

<style lang='scss'>
.swiper-box-dettol {
  padding: 0 1rem;
  position: relative;

  .swiper-content {
    width: 100%;
    overflow-x: hidden;
    height: 4.5rem;

    .header {
      position: absolute;
      left: 1.5rem;
      top: -1.2rem;
      img {
        width: 4.5rem;
      }
    }
    .prize-item {
      float: left;
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      background-color: #fff;
      margin: 0 0.2rem;

      img {
        width: 100%;
      }
    }
    .last {
      position: absolute;
      left: 0.2rem;
      top: 0.7rem;

      img {
        width: 0.3rem;
      }
    }
    .next {
      position: absolute;
      right: 0.2rem;
      top: 0.7rem;
      img {
        width: 0.3rem;
      }
    }
  }
  .prize-list {
    position: relative;
    transition: all 0.3s;
  }
  .show-prize {
    position: absolute;
    font-weight: 700;
    top: -0.3rem;
    left: 0;
    color: #0e822f;
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
  }
  .enable-btn{
    background-image: url('./assets/enableBtn.png');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: #6a4828;
    height: 0.6rem;
    line-height: 0.6rem;
  }
  .disabled-btn{
    background-image: url('./assets/disableBtn.png');
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: #595959;
    height: 0.6rem;
    line-height: 0.6rem;
  }
  .result-box {
  background-image: url('../../../assets/dettol-noprize-bg.png');
  width: 5.4rem;
  background-color: #f2f2f2;
  border-radius: 0.2rem;
  padding: 0.2rem;

  header {
    font-size: 0.36rem;
    color: #fff;
    margin: 0.4rem;
  }
  .close-icon {
    position: absolute;
    right: 0.2rem;
    top: 0.5rem;
    img {
      width: 0.6rem;
    }
  }
  .content {
    background-color: #ffffff;
    border-radius: 0.1rem;
    padding: 0.6rem;

    .blank-pic {
      margin-top: 0.3rem;
      height: 1.83rem;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    .blank-tip {
      font-size: 0.3rem;
      color: #acbdac;
    }
    .btn-close {
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #0e822f;
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
      color: #0e822f;
    }
  }
}
.van-button--danger{
  background-color: #0e822f;
    border: 1px solid #0e822f;
}
}
.prize-dialog {
  background-color: transparent;
}

</style>
