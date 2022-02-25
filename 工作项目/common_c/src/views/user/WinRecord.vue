<template>
  <!-- 活动获奖记录 -->
  <div v-if="$store.state.showDetail" class="PointsRecords allpage">
    <van-list>
      <van-sticky>
        <div class="top">
          <div class="top_contain">
            <div class="data_time" @click="dataShow = true">{{ getTime }}
              <van-icon class="arrow_icon" color="#c6c6c6" name="arrow-down"/>
            </div>
            <!-- <div class="select_type"  @click="typeShow = true">{{text}} <van-icon color="#c6c6c6" class="arrow_icon" name="arrow-down" /></div> -->
          </div>
        </div>
      </van-sticky>
      <van-cell v-for="(item) in list" :key="item.id">
        <div class="product_item">
          <!-- 实物商品 -->
          <van-icon v-if="item.giftType == 7" color="#666666" name="point-gift-o" size="0.42rem"/>
          <!-- 优惠券 -->
          <van-icon v-else-if="item.giftType == 1" color="#666666" name="coupon-o" size="0.42rem"/>
          <!-- 京豆 -->
          <img v-else-if="item.giftType == 6" alt=""
               class="bean_icon"
               src="data:image/png;base64,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"/>
          <!-- <van-icon v-else name="gold-coin-o" color="#666666" size="0.42rem"/> -->
          <i v-else class="iconfont icon-icon-06" color="#666666" size="0.41rem"></i>

          <div class="item_details">

            <div class="font_top">
              <p class="p1">{{ item.giftName }}<span class="p6">（{{ item.activityName }}）</span></p>
              <!-- <p v-else class="p2">{{item.giftName}}</p> -->
              <span v-if="item.dealStatus!=null"
                    :class="{'grey': item.dealStatus==0 || item.dealStatus==-1, 'green': item.dealStatus==1 || item.dealStatus==9}">{{
                  arrfilter.find(v => v.id === item.dealStatus).text
                }}</span>
            </div>
            <div class="right_details">
              <p class="font_all">{{ item.createTime }}</p>
              <div @click="toLogistics(item.id, item.groupId, item.shopId, item.orderCode, item.session)">
                <span
                  v-if="item.realNameStr && item.giftType == 7">收货人：{{ item.realNameStr }} {{ item.mobileStr }}</span>
                <van-icon v-if="item.giftType == 7" name="arrow"/>
              </div>
            </div>

          </div>
        </div>
      </van-cell>
      <div v-if="list.length === 0" class="no_data">
        <img alt=''
             class="no_data_image"
             src='//img10.360buyimg.com/imgzone/jfs/t1/113809/33/5516/2214/5eb3a736Edd8d29bb/59c71b2a8ef678f1.png'>
        <p>暂无数据</p>
      </div>

    </van-list>

    <!-- 时间弹出 -->
    <i-dataTimePicker :dataShow="dataShow" :defaultDate="defaultDate" @closePop="closePop"
                      @timeChange="timeChange"></i-dataTimePicker>
    <!-- 选择弹出 -->
    <!-- <i-selectPointType :typeShow="typeShow" :defaultType="select.id" @closePop="closePop" @typeChange="typeChange"></i-selectPointType> -->
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IDataTimePicker from '@/components/IDataTimePicker.vue';
// import ISelectPointType from '@/components/ISelectPointType.vue'
export default {
  name: 'WinRecord',
  components: {
    IDataTimePicker,
    // ISelectPointType
  },
  data() {
    return {
      dataShow: false,
      defaultDate: new Date(),
      typeShow: false,
      text: '全部',
      select: {
        month: '', // 当前时间
      },
      arrfilter: [{
        id: 0,
        text: '待发货',
      }, {
        id: 1,
        text: '已发货',
      }, {
        id: 9,
        text: '已完成',
      }, {
        id: -1,
        text: '已取消',
      }],
      activityTypes: [{
        label: '大转盘抽奖',
        value: 13,
      }, {
        label: '日历签到',
        value: 15,
      }, {
        label: '每日抢好礼',
        value: 16,
      }, {
        label: '积分抽奖',
        value: 26,
      }, {
        label: '关注店铺有礼',
        value: 17,
      }, {
        label: '加购商品有礼',
        value: 6,
      }, {
        label: '邀请开卡有礼',
        value: 65,
      }, {
        label: '消费满额有礼',
        value: 501,
      }, {
        label: '消费满额抽奖',
        value: 502,
      }],
      getTime: '',
      list: [],
    };
  },
  created() {
    // 展示时间
    this.getTime = this.$core.timestampstr(new Date().getTime()).format3;
    // 默认当月
    this.select.month = this.$core.timestampstr(new Date().getTime()).format5;
    this.getList();
  },
  methods: {
    async getList() {
      const res = await PointsService.getPrizeRecord(this.select, {
        needVisable: false,
      });
      if (res.data) {
        this.list = res.data;
        this.list.forEach((e) => {
          e.activityName = this.activityTypes.find((v) => +v.value == +e.activityType)?.label;
          e.createTime = e.createTime && e.createTime.slice(0, 16);
          if (e.realName) {
            e.realNameStr = e.realName && (`${e.realName.slice(0, 1)}**`);
            e.mobileStr = e.mobile && (`${(`${e.mobile}`).slice(0, 3)}****${(`${e.mobile}`).slice(7, 11)}`);
          }
        });
      } else {
        this.list = [];
      }
    },
    // 子组件返回时间
    timeChange(val) {
      // 默认时间 便于下次传递
      this.defaultDate = val;
      // 展示时间
      this.getTime = this.$core.timestampstr(new Date(val).getTime()).format3;
      // 用于检索
      this.select.month = this.$core.timestampstr(new Date(val).getTime()).format5;
      this.getList();
      this.dataShow = false;
    },
    // 子组件返回类型
    typeChange(id, val, text) {
      this.typeShow = false;
      this.select.defaultType = id;
      this.text = text;
      this.getList();
    },
    toLogistics(id, groupId, shopId, orderCode, session) {
      if (!orderCode) {
        this.$toast('订单编号为空，无法查询');
        return;
      }
      this.$router.push({
        name: 'ProductLogistics',
        query: {
          id,
          groupId,
          shopId,
          orderCode,
          session,
        },
      });
    },
    closePop() {
      this.dataShow = false;
      this.typeShow = false;
    },
  },

};
</script>

<style scoped>
.top {
  width: 100%;
  height: 0.9rem;
  font-size: 0.26rem;
  /* padding-top: 0.3rem; */
  border-bottom: 1px solid #c5c5c5;
}

.top_contain {
  padding: 0 0.24rem;
  width: 100%;
  height: 0.9rem;
  display: flex;
  background: #ffffff;
  line-height: 0.9rem;
  justify-content: space-between;
  box-sizing: border-box;
  color: #353535;
}

.data_time {
  display: flex;
}

.select_type {
  display: flex;
}

.arrow_icon {
  margin-left: 0.1rem;
  padding-top: 0.3rem;
}

.PointsRecords >>> .van-cell {
  height: 1.0rem;
  padding: 0 0.24rem;
  box-sizing: border-box;
}

.product_item {
  width: 100%;
  height: 1.0rem;
  display: flex;
  justify-content: start;
}

.van-cell:not(:last-child)::after {
  right: 0.24rem;
  border-bottom: 1px solid #c5c5c5;
}

.product_item >>> .van-icon {
  padding: 0.12rem 0.24rem 0.24rem 0rem;
}

.item_details {
  width: 100%;
}

.right_details >>> .van-icon {
  padding: 0.04rem;
}

.right_details {
  font-size: 0.24rem;
  color: #a7a7a7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.right_details > span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.font_top {
  width: 100%;
  font-size: 0.25rem;
  color: #909090;
  height: 0.4rem;
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-between;
}

.font_top .p1 {
  color: #333333;
  display: inline-block;
  max-width: 5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.font_top .p6 {
  color: #909090;
}

.font_top span {
  font-size: 0.22rem;
  margin-left: 0.1rem;
  padding: 0 0.04rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.grey {
  background: #f2f2f2;
  color: #a5a5a5;
}

.green {
  background: #e0f1e9;
  color: #5cca99;
}

.font_all {
  font-size: 0.24rem;
  color: #a7a7a7;
}

.no_data {
  margin-top: 2rem;
}

.no_data_image {
  width: 2rem;
  height: 2rem;
}

.no_data p {
  margin: 0;
  text-align: center;
  font-size: 0.25rem;
  color: #c9c9c9;
}

.bean_icon {
  width: 0.4rem;
  height: 0.36rem;
  margin-top: 0.1rem;
  margin-left: 0;
  padding-right: 0.3rem;
}
</style>
