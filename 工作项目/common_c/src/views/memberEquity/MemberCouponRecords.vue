<template>
  <!-- 会员权益领取记录 -->
  <div v-if="$store.state.showDetail" class="PointsRecords allpage">
    <van-list>
      <van-sticky>
        <div class="top">
          <div class="top_contain">
            <div class="data_time" @click="dataShow = true">{{ getTime }}
              <van-icon class="arrow_icon" color="#c6c6c6" name="arrow-down"/>
            </div>
          </div>
        </div>
      </van-sticky>
      <van-cell v-for="(item) in list" :key="item.id">
        <div class="product_item">
          <!-- 优惠券 -->
          <van-icon color="#666666" name="coupon-o" size="0.5rem"/>
          <div class="item_details">
            <div class="left_details">
              <div class="font_top">
                <p>{{ item.activityName }}</p>
              </div>
              <p class="font_all">{{ item.createTime }}</p>
            </div>
            <div class="right_details">
              <span class="green">领取成功</span>
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
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IDataTimePicker from '@/components/IDataTimePicker.vue';

export default {
  name: 'MemberCouponRecords',
  components: {
    IDataTimePicker,
  },
  data() {
    return {
      dataShow: false,
      defaultDate: new Date(),
      select: {
        getTime: '', // 当前时间
      },
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
      const res = await PointsService.getMemberCouponRecord(this.select, { needVisable: false });
      this.list = res.data;
      if (this.list.length > 0) {
        this.list.forEach((e) => {
          if (e.realName) {
            e.realNameStr = `${e.realName.slice(0, 1)}**`;
            e.mobileStr = `${(`${e.mobile}`).slice(0, 3)}****${(`${e.mobile}`).slice(7, 11)}`;
          }
        });
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
    typeChange(val, text) {
      this.select.activityType = val || [];
      this.text = text;
      this.typeShow = false;
      this.getList();
    },
    toLogistics(id, groupId, shopId, orderCode, session) {
      // this.$router.push({
      //   name: 'ProductLogistics',
      //   query: {
      //     id,
      //     groupId,
      //     shopId,
      //     orderCode,
      //     session
      //   }
      // })
    },
    closePop() {
      this.dataShow = false;
    },
  },

};
</script>

<style scoped>
.top {
  width: 100%;
  height: 0.9rem;
  font-size: 0.26rem;
  padding-top: 0.3rem;
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

.font_top p {
  display: inline-block;
  width: 60vw;
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

.green {
  padding: 0 5px;
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
</style>
