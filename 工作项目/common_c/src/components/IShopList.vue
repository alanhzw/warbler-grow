<template>
  <div class="IShopList">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="item in list" :key="item.id" class="list">
        <div v-if="item.activeType === 311 || item.activeType === 312 || item.activeType === 311"
             class="list_seckill_title">
          <div class="list_seckill_block">{{ tab }}</div>
          <div :class="[item.textType !==1 ? 'count_down_str1': 'count_down_str2']">
            <span v-if="item.textType ===0">距离活动开始时间还有：</span>
            <span v-if="item.textType ===1">距离活动结束时间还有：</span>
            <span v-if="item.textType ===2">距离活动结束时间还有：</span>
            <van-count-down :time="item.time">
              <template v-slot="timeData">
                <span class="second"><span>{{ timeData.hours >= 10 ? timeData.hours : '0' + timeData.hours }}</span> 时 </span>
                <span class="second"><span>{{
                    timeData.minutes >= 10 ? timeData.minutes : '0' + timeData.minutes
                  }}</span> 分 </span>
                <span class="second"><span>{{
                    timeData.seconds >= 10 ? timeData.seconds : '0' + timeData.seconds
                  }}</span> 秒 </span>
              </template>
            </van-count-down>
          </div>
        </div>
        <div class="list_seckill_product" @click="clickBtn(item)">
          <div class="image_box">
            <img :src="item.image" class="image"/>
          </div>
          <div class="product_box">
            <div class="product_name">{{ item.productName }}</div>
            <div class="points">{{ item.points }}积分</div>
            <div class="product_msg">
              <div class="product_msg_left">
                <p class="p1">￥{{ item.lineMoney }}</p>
                <p class="p2">剩余：{{ item.residue }}份</p>
              </div>
              <van-button :color="item.textType !==1 ? '#cccccc' : '#e2231a'" class="product_msg_right" round
                          size="small" type="info">{{ texts[item.textType] }}
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  name: 'IShopList',
  props: ['list', 'tab', 'finished'],
  data() {
    return {
      loading: false,
      texts: ['未开始', '抢购', '已结束'],
    };
  },
  created() {

  },
  methods: {
    onLoad() {
      this.$emit('loadMore');
    },
    clickBtn(value) {
      this.$emit('seckill', value);
    },
  },
};
</script>

<style scoped>
.IShopList {
  margin-top: 0.2rem;
}

.list {
  padding: 0.24rem;
}

.list_seckill_title {
  display: flex;
  justify-content: flex-start;
  font-size: 0.24rem;
}

.list_seckill_block {
  border: 1px solid #ff3333;
  color: #ff3333;
  padding: 0 0.05rem;
  margin-right: 0.1rem;
}

.count_down_str1, .count_down_str2 {
  font-size: 0.24rem;
}

.list_seckill_product {
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
}

.image_box {
  width: 33%;
}

.image {
  width: 100%;
}

.product_box {
  margin-left: 1%;
  width: 65%;
  font-size: 0.26rem;
}

.product_name {
  height: 34px;
  width: 100%;
  text-align: left;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.points {
  color: #3399ff;
  font-size: 0.4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: left;
  margin-top: 0.1rem;
}

.product_msg {
  width: 100%;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
}

.product_msg_left {
  font-size: 0.24rem;
}

.product_msg_left .p1 {
  color: #999999;
  text-decoration: line-through;
  text-align: left;
}

.product_msg_left .p2 {
  color: #999999;
  text-align: left;
  margin-top: 0.1rem;
}

.product_msg_right {
  margin-top: 0.2rem;
}

.product_msg >>> .van-button--small {
  width: 1.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
}

.count_down_str1 {
  color: #999999;
}

.count_down_str2 {
  color: #333333;
}

.count_down_str1 >>> .van-count-down {
  display: inline-block;
  color: #a9a9a9;
}

.count_down_str2 >>> .van-count-down {
  display: inline-block;
  color: #ff3333;
}

.count_down_str1 .second span {

  border: 1px solid #e6e6e6;
  color: #a9a9a9;
  padding: 0 0.02rem;
}

.count_down_str2 .second span {
  border: 1px solid #e6e6e6;
  color: #ff3333;
  padding: 0 0.02rem;
}

</style>
