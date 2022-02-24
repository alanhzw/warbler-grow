<template>
  <div v-if="activityInfo.hasGotInfo"
       class="enroll">
    <div class="main-button"
         v-if="activityInfo.isAccord == 2"
         :style="options.disableBtnStyle">不符合活动参与条件</div>
    <div v-else>
      <div v-if="activityInfo.activityType == 501 || activityInfo.activityType == 502">
        <div class="main-button"
             v-lz-click.isMain="'14'"
             v-if="activityInfo.status === 1 && activityInfo.signUp === 2 && levelEnable"
             :style="options.enableBtnStyle"
             @click="enrollBoxShowed = true">报名参与活动</div>
        <div class="main-button"
             v-if="activityInfo.status === 1 && activityInfo.signUp === 1"
             :style="options.disableBtnStyle">报名成功</div>
        <div class="main-button"
             v-if="activityInfo.status === 1 && !levelEnable"
             :style="options.disableBtnStyle">不符合活动参与条件</div>
        <div class="main-button"
             v-if="activityInfo.status === 2"
             :style="options.disableBtnStyle">报名已结束</div>
        <div class="main-button"
             v-if="activityInfo.status === 4 && isBeforeStart"
             :style="options.disableBtnStyle">活动未开始</div>
      </div>
      <div v-if="activityInfo.activityType == 503">
        <div class="main-button"
             v-if="activityInfo.status < 3"
             :style="options.disableBtnStyle">立即领奖</div>
        <div class="main-button"
             v-if="activityInfo.status === 4"
             :style="options.disableBtnStyle">活动已结束</div>
      </div>
      <div v-if="activityInfo.activityType == 506">
        <div class="main-button"
             v-if="activityInfo.status == 1"
             :style="options.disableBtnStyle">活动未开始</div>
        <div class="main-button"
             v-if="activityInfo.status == 2"
             :style="options.disableBtnStyle">领取奖品</div>
        <div class="main-button"
             v-if="activityInfo.status === 4"
             :style="options.disableBtnStyle">活动已结束</div>
      </div>
      <div v-if="activityInfo.activityType == 507">
        <div v-if="activityInfo.status < 3"
             class="phone-input">
          <van-field v-model="phone"
                     label=""
                     placeholder="请输入手机号码"
                     :rules="[{ required: true, message: '请填写用户名' }]" />
          <p class="phone-tip">注：手机号填写错误会影响派单，导致无法收到奖品</p>
        </div>
        <div class="main-button"
             v-if="activityInfo.status == 1"
             :style="options.disableBtnStyle">活动未开始</div>
        <div class="main-button"
             v-if="activityInfo.status == 2"
             :style="options.enableBtnStyle"
             v-lz-click.isMain="'14'"
             @click="enrollTimeRank">立即报名</div>
        <div class="main-button"
             v-if="activityInfo.status == 3"
             :style="options.disableBtnStyle">已报名</div>
        <div class="main-button"
             v-if="activityInfo.status == 4"
             :style="options.disableBtnStyle">报名已截止</div>
        <div class="main-button"
             v-if="activityInfo.status == 6"
             :style="options.disableBtnStyle">活动已结束</div>
      </div>
    </div>
    <bottom-box title="报名参与活动"
                :visible.sync="enrollBoxShowed">
      <address-edit save-button-text="报名"
                    @save="enroll" />
    </bottom-box>
  </div>
</template>
<script>
import BottomBox from '../components/BottomBox';
import areaData from '@/mobile/data/vantArea';
import { ActivityService } from '@/mobile/service';
import LzMsg from '@/mobile/utils/LzMsg';
import { Toast } from 'vant';

export default {
  name: 'Enroll',
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
  data() {
    return {
      phone: '',
      areaData,
      enrollBoxShowed: false,
    };
  },
  computed: {
    isBeforeStart() {
      return new Date() < new Date(this.activityInfo.enrollStartTime);
    },
    levelEnable() {
      return this.activityInfo.grade.split(',').includes(`${this.userInfo.grade}`);
    },
  },
  methods: {
    enrollTimeRank() {
      // if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]{9}$/.test(this.phone))) {
      //   return LzMsg.error('请填写正确的手机号码');
      // }
      ActivityService.enrollQuotaTimeRank({
        activityId: this.activityInfo.activityId, // 活动ID
        phone: this.phone, // 电话号
      }).then(() => {
        this.$emit('update');
      }).catch((e) => {
        LzMsg.error(e.message);
      });
    },
    enroll(data) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      ActivityService[this.settings.apis.addAddr]({
        activityId: this.activityInfo.activityId, // 活动ID
        activityType: this.activityInfo.activityType,
        phone: data.tel, // 电话号
        realName: data.name, // 真实姓名
        province: data.province, // 省
        city: data.city, // 城市
        country: data.county, // 区县
        address: data.addressDetail, // / 详细地址信息
        // recordId: this.prizeInDialog.recordId,
      }).then(() => {
        this.$emit('update');
        Toast.clear();
        this.enrollBoxShowed = false;
      }).catch((e) => {
        Toast.clear();
        LzMsg.error(e.message);
      });
    },
  },
};
</script>
<style lang="scss">
.enroll {
  .phone-input {
    margin: 0 0.25rem;
  }
  .phone-tip {
    text-align: left;
    margin: 0.1rem 0;
    font-size: 0.2rem;
    color: #ffffff;
  }
  .main-button {
    text-align: center;
    margin: 0 auto;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .van-address-edit {
    padding: 0;
    .van-address-edit__fields {
      border-radius: 0;
      &:after {
        content: '请注意：地址填写简略、手机号填写错误会影响派单，导致您无法收到商品！';
        font-size: 0.2rem;
        color: #999999;
        display: block;
        text-align: left;
      }
    }
    .van-cell {
      margin-bottom: 0.1rem;
    }
    .van-address-edit-detail {
      background: transparent;
    }
    .van-address-edit__buttons {
      margin-top: 0.6rem;
      padding: 0;
      .van-button {
        border-radius: 0.08rem;
        margin-bottom: 0;
      }
    }
  }
}
</style>
