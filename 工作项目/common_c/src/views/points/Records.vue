<template>
  <!-- 积分兑换记录 -->
  <div v-if="$store.state.showDetail" class="PointsRecords allpage">
    <div class="top">
      <div class="top_contain">
        <div class="data_time" @click="dataShow = true">{{ getTime }}
          <van-icon class="arrow_icon" color="#c6c6c6" name="arrow-down"/>
        </div>
        <div class="select_type" @click="typeShow = true">{{ text }}
          <van-icon class="arrow_icon" color="#c6c6c6" name="arrow-down"/>
        </div>
      </div>
    </div>
    <van-list>
      <!-- <van-sticky>
        <div class="top">
          <div class="top_contain">
            <div class="data_time" @click="dataShow = true">{{getTime}} <van-icon color="#c6c6c6" class="arrow_icon" name="arrow-down" /></div>
            <div class="select_type"  @click="typeShow = true">{{text}} <van-icon color="#c6c6c6" class="arrow_icon" name="arrow-down" /></div>
          </div>
        </div>
      </van-sticky> -->
      <van-cell v-for="(item) in list" :key="item.id">
        <div class="product_item">
          <!-- 实物商品 -->
          <van-icon v-if="item.activityType == 301" color="#666666" name="point-gift-o" size="0.5rem"/>
          <!-- 秒杀 -->
          <van-icon v-else-if="item.activityType == 311 || item.activityType == 312 || item.activityType == 313"
                    color="#666666" name="clock-o" size="0.5rem"/>
          <!-- 优惠券 -->
          <van-icon v-else-if="item.activityType == 302" color="#666666" name="coupon-o" size="0.5rem"/>
          <!-- 京豆 -->
          <img v-else alt=""
               class="bean_icon"
               src="data:image/png;base64,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"/>
          <!-- <van-icon v-else name="gold-coin-o" color="#666666" size="0.5rem"/> -->

          <div class="item_details">
            <div class="left_details">
              <div class="font_top">
                <p v-if="item.dealStatus!=null" class="p1">{{ item.activityName }}</p>
                <p v-else class="p2">{{ item.activityName }}</p>
                <span v-if="item.dealStatus!=null"
                      :class="{'grey': item.dealStatus==0 || item.dealStatus==-1, 'green': item.dealStatus==1 || item.dealStatus==9}">{{ arrfilter.find(v => v.id === item.dealStatus).text }}</span>
              </div>
              <p class="font_all">{{ item.createTime }}</p>
            </div>
            <div v-if="item.activityType === 311 || item.activityType === 301" class="right_details"
                 @click="toLogistics(item.id, item.groupId, item.shopId, item.orderCode, item.session)">
              <span v-if="item.realNameStr">收货人：{{ item.realNameStr }} {{ item.mobileStr }}</span>
              <van-icon name="arrow"/>
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
    <i-selectPointType :defaultType="select.id" :typeShow="typeShow" @closePop="closePop"
                       @typeChange="typeChange"></i-selectPointType>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IDataTimePicker from '@/components/IDataTimePicker.vue';
import ISelectPointType from '@/components/ISelectPointType.vue';

export default {
  name: 'PointsRecords',
  components: {
    IDataTimePicker,
    ISelectPointType,
  },
  data() {
    return {
      dataShow: false,
      defaultDate: new Date(),
      typeShow: false,
      text: '全部',
      select: {
        id: 0,
        activityType: [301, 302, 303, 311, 312, 313],
        getTime: '', // 当前时间
      },
      // arrfilter: ['未发货', '已发货'],
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
      getTime: '',
      list: [],
    };
  },
  created() {
    // 展示时间
    this.getTime = this.$core.timestampstr(new Date().getTime()).format3;
    // 默认当月
    this.select.getTime = this.$core.timestampstr(new Date().getTime()).format5;
    this.getList();
  },
  methods: {
    async getList() {
      const res = await PointsService.getRecord(this.select, {
        needVisable: false,
      });
      if (res.data) {
        this.list = res.data.usercPointExchangeRecordListRespDTO;
        this.list.forEach((e) => {
          if (e.realName) {
            e.realNameStr = `${e.realName.slice(0, 1)}**`;
            e.mobileStr = `${(`${e.mobile}`).slice(0, 3)}****${(`${e.mobile}`).slice(7, 11)}`;
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
      this.select.getTime = this.$core.timestampstr(new Date(val).getTime()).format5;
      this.getList();
      this.dataShow = false;
    },
    // 子组件返回类型
    typeChange(id, val, text) {
      this.typeShow = false;
      this.select.activityType = val || [];
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
  position: fixed;
  top: 0;
  left: 0;
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

.PointsRecords >>> .van-list {
  position: absolute;
  top: 1rem;
  bottom: 2px;
  left: 0;
  right: 0;
  overflow-y: auto;
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
  padding: 0.24rem;
}

.item_details {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.right_details >>> .van-icon {
  padding: 0.04rem;
}

.right_details {
  font-size: 0.24rem;
  color: #a7a7a7;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}

.right_details > span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.font_top {
  font-size: 0.25rem;
  color: #909090;
  height: 0.4rem;
  margin-top: 0.1rem;
  display: flex;
}

.font_top .p1 {
  display: inline-block;
  max-width: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.font_top .p2 {
  display: inline-block;
  width: 80vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  width: 0.5rem;
  height: 0.4rem;
  margin-top: 0.3rem;
  margin-left: 0.2rem;
  padding-right: 0.3rem;
}
</style>
