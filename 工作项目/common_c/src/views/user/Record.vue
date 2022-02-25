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
    <van-list v-model="loading" :finished="finished" :immediate-check='checkDate' finished-text="没有更多了"
                @load="getList">
      <!-- <van-sticky>
        <div class="top">
          <div class="top_contain">
            <div class="data_time" @click="dataShow = true">{{getTime}} <van-icon color="#c6c6c6" class="arrow_icon" name="arrow-down" /></div>
            <div class="select_type"  @click="typeShow = true">{{text}} <van-icon color="#c6c6c6" class="arrow_icon" name="arrow-down" /></div>
          </div>
        </div>
      </van-sticky> -->
      <van-cell v-for="(item) in list" :key="item.receiveTime">
        <div class="product_item">
          <!-- 优惠券 -->
          <i v-if="item.assetsType === 1" class="iconfont icon-icon-26" color="#666666" size="0.41rem"></i>
          <!-- 京豆 -->
          <i v-if="item.assetsType === 2" class="iconfont icon-icon-27" color="#666666" size="0.41rem"></i>
          <!-- 实物商品 -->
          <i v-if="item.assetsType === 3" class="iconfont icon-icon666-30" color="#666666" size="0.41rem"></i>
          <!-- 积分 -->
          <i v-if="item.assetsType === 4" class="iconfont icon-icon7ge3-30" color="#666666" size="0.41rem"></i>
          <!-- 促销令牌 -->
          <i v-if="item.assetsType === 5" class="iconfont icon-icon666-31" color="#666666" size="0.41rem"></i>
          <!-- 红包 -->
          <i v-if="item.assetsType === 6" class="iconfont icon-icon-23" color="#666666" size="0.41rem"></i>
          <!-- 礼品卡 -->
          <i v-if="item.assetsType === 7" class="iconfont icon-icon666-32" color="#666666" size="0.41rem"></i>
          <!-- E卡 -->
          <i v-if="item.assetsType === 8" class="iconfont icon-icon3-37" color="#666666" size="0.41rem"></i>
          <!-- 京东EPLUS" -->
          <i v-if="item.assetsType === 9" class="iconfont icon-icon666-17" color="#666666" size="0.41rem"></i>
          <!-- 爱奇艺会员 -->
          <i v-if="item.assetsType === 10" class="iconfont icon-icon666-16" color="#666666" size="0.41rem"></i>
          <div class="item_details">
            <div class="top_details">
              <div class="font_top">
                <p class="font_all">{{ item.receiveTime }}</p>
                <p class="p1">{{ item.activityTypeName }}</p>
              </div>
            </div>
            <div class="bottom_details">
              <div class="p3">{{item.prizeName}}</div>
              <div v-if="item.assetsType === 3" @click="toLogistics(item)" class="bottom_right">
                <span class="line_details">详情</span>
                <van-icon name="arrow"/>
              </div>
               <div v-if="item.assetsType === 7" @click="toCardDetails(item)" class="bottom_right">
                <span class="line_details">详情</span>
                <van-icon name="arrow"/>
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
    <i-selectPointTypeInteract :defaultType="select.id" :typeShow="typeShow" @closePop="closePop"
                       @typeChange="typeChange"></i-selectPointTypeInteract>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import IDataTimePicker from '@/components/IDataTimePicker.vue';
import ISelectPointTypeInteract from '@/components/ISelectPointTypeInteract.vue';

export default {
  name: 'PointsRecords',
  components: {
    IDataTimePicker,
    ISelectPointTypeInteract,
  },
  data() {
    return {
      dataShow: false,
      defaultDate: new Date(),
      typeShow: false,
      text: '全部',
      select: {
        id: 0,
        assetsType: '',
        selectTime: '', // 当前时间
      },
      getTime: '',
      list: [],
      pageNo: 1,
      state: false,
      finished: false,
      loading: false,
      checkDate: false,
    };
  },
  created() {
    // 展示时间
    this.getTime = this.$core.timestampstr(new Date().getTime()).format3;
    // 默认当月
    this.select.selectTime = this.$core.timestampstr(new Date().getTime()).format8;
    this.getList();
  },
  methods: {
    async getList() {
      if (this.state) {
        return;
      }
      this.state = true;
      this.loading = true;
      try {
        const res = await PointsService.getRecordNew({
          ...this.select,
          pageNo: this.pageNo,
          pageSize: 10,
        }, {
          needVisable: false,
        });
        if (res.data) {
          if (res.data.length < 10) {
          // console.log(this.pageNo, '加载完成')
            this.finished = true;
            this.pageNo = 1;
          } else {
          // console.log(this.pageNo, '加载更多')
            this.finished = false;
            this.pageNo += 1;
          }
          this.list = [...this.list, ...res.data];
        } else {
          this.list = [];
        }
      } catch {
        this.finished = true;
      } finally {
        this.state = false;
        this.loading = false;
      }
    },
    // 子组件返回时间
    timeChange(val) {
      // 默认时间 便于下次传递
      this.defaultDate = val;
      // 展示时间
      this.getTime = this.$core.timestampstr(new Date(val).getTime()).format3;
      // 用于检索
      this.select.selectTime = this.$core.timestampstr(new Date(val).getTime()).format8;
      this.pageNo = 1;
      this.list = [];
      this.getList();
      this.dataShow = false;
    },
    // 子组件返回类型
    typeChange(id, val, text) {
      this.typeShow = false;
      this.select.assetsType = val || '';
      this.select.defaultType = id;
      this.text = text;
      this.pageNo = 1;
      this.list = [];
      this.getList();
    },
    toLogistics({
      id, groupId, shopId, orderCode, session,
    }) {
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
    toCardDetails({
      prizeName, cardDesc, cardNumber, cardPassword, prizePicture,
    }) {
      this.$router.push({
        name: 'CardRecord',
        query: {
          prizeName,
          cardDesc,
          cardNumber,
          cardPassword,
          prizePicture,
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
<style>
.iconfont{
  line-height: 1rem;
}
</style>
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
.bottom_right {
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
  justify-content: space-between;
}

.van-cell:not(:last-child)::after {
  right: 0.24rem;
  border-bottom: 1px solid #c5c5c5;
}

.item_details {
  width: 94%;
}

.bottom_details >>> .van-icon {
  margin-top: 0.12rem;
}

.bottom_details {
  font-size: 0.24rem;
  color: #a7a7a7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.bottom_details > span {
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
  justify-content: space-between;
}

.font_top .p1 {
  text-align: right;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.p3 {
  color: #333;
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
.line_details {
  color: #027DB4;
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
