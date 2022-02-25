<template>
  <div class="Birthday">
      <ErrorPage v-if="activityStatus === 99"></ErrorPage>
      <ActivityNotStarted v-if="activityStatus === 0"></ActivityNotStarted>
      <ActivityIsOver v-if="activityStatus === 1"></ActivityIsOver>
      <AlreadyReceived v-if="activityStatus === 2" name="生日礼包每人每年只可领取1次，您已经领取过"></AlreadyReceived>
      <NoCondition v-if="activityStatus === 3"  subtitle="您的生日还未到哦~"></NoCondition>
       <!-- 权益已领光 -->
      <NoPrize v-if="activityStatus === 4"></NoPrize>
      <div v-if="activityStatus === 5" class="b_bottom">
         <img class="m_bottom" src="./assets/ymd.png"/>
         <div class="year_month_day" @click="selectymd">{{ymd}}</div>
         <div class="submit" @click="saveBirthDay"></div>
      </div>
      <!-- 生日信息弹出层 show-cancel-button -->
    <van-dialog v-model="addBirthDetialShow"
                title="填写生日信息" :showConfirmButton='false'>
        <van-datetime-picker v-model="birthInfo"
            ref='datetimePicker'
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :show-toolbar='true'
            title=''
            @confirm="changeymd"
            @cancel="addBirthDetialShow = false"
            visible-item-count='5' />
     </van-dialog>
      <div v-if="activityStatus === 6"  class="gift_list">
         <div class="list_con">
            <List :prizes="list"></List>
         </div>
      </div>
      <!-- 没填写生日 -->
      <!-- <div v-if="activityStatus === 5">
         <div>领取生日礼包需要先填写你的生日信息哦~</div>
         <div class="sel sel1" @click="selectYear">{{year}}</div>
         <div class="sel sel2" @click="selectMonth">{{month}}</div>
         <div class="sel sel3" @click="selectDay">{{day}}</div>
         <div @click="saveBirthDay">提交信息</div>
      </div> -->
      <!-- 年 -->
      <!-- <van-popup class="vpop vpop1" v-model="addBirthDetialShow1" :close-on-click-overlay="false" position="bottom"
               safe-area-inset-bottom
               close-on-popstate
               :style="{ height: '50%' }">
                <van-datetime-picker v-model="data1" class="popup_con"
                    @confirm="savePopup1"
                    @cancel="closePopup"
                    type="date"
                    title=""
                    :min-date="minDate"
                    :max-date="maxDate"
                    visible-item-count='5' />
    </van-popup> -->
    <!-- 月 -->
      <!-- <van-popup class="vpop vpop2" v-model="addBirthDetialShow2" :close-on-click-overlay="false" position="bottom"
               safe-area-inset-bottom
               close-on-popstate
               :style="{ height: '50%' }">
                <van-datetime-picker v-model="data2" class="popup_con"
                    @confirm="savePopup2"
                    @cancel="closePopup"
                    type="date"
                    title=""
                    :min-date="minDate"
                    :max-date="maxDate"
                    visible-item-count='5' />
    </van-popup> -->
    <!-- 日 -->
      <!-- <van-popup class="vpop vpop3" v-model="addBirthDetialShow3" :close-on-click-overlay="false" position="bottom"
               safe-area-inset-bottom
               close-on-popstate
               :style="{ height: '50%' }">
                <van-datetime-picker v-model="data3" class="popup_con"
                    @confirm="savePopup3"
                    @cancel="closePopup"
                    type="date"
                    title=""
                    :min-date="minDate"
                    :max-date="maxDate"
                    visible-item-count='5' />
    </van-popup> -->
      <!-- 领取成功之后，列表 -->
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
import List from './components/List.vue';

export default {
  name: 'Birthday',
  components: {
    ErrorPage,
    ActivityNotStarted,
    ActivityIsOver,
    AlreadyReceived,
    NoCondition,
    NoPrize,
    List,
  },
  data() {
    return {
      activityStatus: 5,
      form: {},
      list: [],
      addBirthDetialShow: false,
      ymd: '年 月 日',
      //   data1: new Date(),
      //   data2: new Date(2020, 0, 1),
      //   data3: new Date(2020, 0, 1),
      //   year: '选择年',
      //   month: '选择月',
      //   day: '选择日',
      //   addBirthDetialShow1: false,
      //   addBirthDetialShow2: false,
      //   addBirthDetialShow3: false,
      birthInfo: new Date(),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    selectymd() {
      this.addBirthDetialShow = true;
    },
    changeymd() {
      // const datetimePicker = this.$refs.datetimePicker.getPicker().getValues();
      // this.ymd = datetimePicker.join('-');
      this.ymd = this.$moment(this.birthInfo).format('YYYY-MM-DD');
      this.addBirthDetialShow = false;
    },
    // selectYear() {
    //   this.addBirthDetialShow1 = true;
    // },
    // selectMonth() {
    //   this.addBirthDetialShow2 = true;
    // },
    // selectDay() {
    //   this.addBirthDetialShow3 = true;
    // },
    // savePopup1(val) {
    //   console.log(val);
    //   this.year = new Date(val).getFullYear();
    //   this.addBirthDetialShow1 = false;
    // },
    // savePopup2(val) {
    //   console.log(val);
    //   console.log(new Date(this.data2));
    //   this.month = `${new Date(val).getMonth() + 1}月`;
    //   this.addBirthDetialShow2 = false;
    // },
    // savePopup3(val) {
    //   console.log(val);
    //   this.day = `${new Date(val).getDate()}月`;
    //   this.addBirthDetialShow3 = false;
    // },
    // closePopup() {
    //   this.addBirthDetialShow1 = false;
    //   this.addBirthDetialShow2 = false;
    //   this.addBirthDetialShow3 = false;
    // },
    async getDetails() {
      try {
        const { data } = await PointsService.getBirthDayGiftList({});
        if (data.memberActivityStatus === 1) {
          // 未开始
          this.activityStatus = 0;
        } else if (data.memberActivityStatus === 2) {
          // 已结束
          this.activityStatus = 1;
        } else if (data.memberActivityStatus === 19) {
          // 已领取
          this.activityStatus = 2;
        } else if (!data.birthDay) {
          // 没输入过生日，显示输入生日页面
          this.activityStatus = 5;
        } else if (data.memberActivityStatus === 17) {
          // 生日未到
          this.activityStatus = 3;
        } else if (data.memberActivityStatus == 18) {
          // 权益已领光
          this.activityStatus = 4;
        } else if (data.memberActivityStatus == -1) {
          // 活动太火爆了
          this.activityStatus = 99;
        } else if (data.memberActivityStatus === 7) {
          // 可领取
          this.getGifts();
        }
      } catch (err) {
        console.log(err.message);
      } finally {

      }
    },
    // 领取礼包
    async getGifts() {
      console.log(12);
      try {
        const { data } = await PointsService.getBirthDayGiftResult({});
        this.list = data.giftList;
        this.activityStatus = 6;
      } catch (err) {
        this.$toast(err.message);
      } finally {

      }
    },
    async saveBirthDay() {
      if (this.ymd == '年 月 日') {
        this.$toast('请填写生日信息');
        return;
      }
      if (this.state == 2) {
        return;
      }
      this.state = 2;
      try {
        await PointsService.saveBirthDay({
          birthDay: this.ymd,
        });
        await this.getGifts();
        this.getDetails();
      } catch (err) {
        this.$toast(err.message);
      } finally {
        this.state = 1;
      }
    },
  },
};
</script>

<style scoped>
.Birthday {
  width: 100%;
  box-sizing: border-box;

}
.Birthday >>> .van-dialog {
    left: 8% !important;
}
.vpop >>> .popup_con{
   width: 100%;
}
.vpop >>> .popup_con .van-picker__columns{
   width: 100%;
   display: unset!important;
   position: unset!important;
}
.Birthday >>> .van-picker {
  display: flex;
  flex-flow: column;
}
.Birthday >>> .van-picker__cancel, .Birthday >>> .van-picker__confirm {
  width: 50%;
}
.Birthday >>> .van-picker__confirm {
  color: #f2280c;
  border-left: 1px solid #ebedf0;
}
.Birthday >>> .van-picker .van-picker__toolbar{
  border-top: 1px solid #ebedf0;
  order: 2;
}
.vpop >>> .van-picker__frame {
    top: 54%;
}
.vpop1 >>> .van-picker__columns .van-picker-column:nth-child(1) {
    width: 100%;
}
.vpop2 >>> .van-picker__columns .van-picker-column:nth-child(1) {
    display: none;
}
.vpop2 >>> .van-picker__columns .van-picker-column:nth-child(2) {
    width: 100%;
}
.vpop3 >>> .van-picker__columns .van-picker-column:nth-child(1) {
    display: none;
}
.vpop3 >>> .van-picker__columns .van-picker-column:nth-child(2) {
    display: none;
}
.vpop3 >>> .van-picker__columns .van-picker-column:nth-child(3) {
    width: 100%;
}
.popup_con {
  position: absolute;
  top: 0;
  bottom: 0;
}
.sel{
  margin: 20px;
}

.b_bottom {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('./assets/b_bg.png');
    background-repeat: no-repeat;
    background-size: contain;
}
.m_bottom {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
.year_month_day {
    position: absolute;
    bottom: 2.4rem;
    font-size: 0.25rem;
    width: 4rem;
    text-align: right;
    right: 1rem;
}
.submit {
    position: absolute;
    bottom: 1rem;
    left: 0.25rem;
    width: 7rem;
    height: 0.9rem;
    text-align: right;
    right: 1rem;
}
.gift_list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('./assets/list_bg.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #ffc9ca;
}
.list_con {
    width: 4.2rem;
    height: 3rem;
    position: absolute;
    top: 8rem;
    left: 23%;
}
</style>
