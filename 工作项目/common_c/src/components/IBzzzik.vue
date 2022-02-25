<template>
  <!-- 倒计时 -->
  <div class="IBzzzik">
    <div class="IBzzzik_top">
      <!-- 活动未开始 -->
      <div v-if="product.state === 0" class="tip_1">
        <div class="tip_1_left">
          <div class="tip_1_left_block">
            <!-- <img :src='clockImg' /> -->
            <span>秒杀预告</span>
          </div>
        </div>
        <div class="tip_1_right">
          <div>{{ product.createTime }}</div>
          <div>{{ product.currentGradeNeedPoint }} 积分</div>
        </div>
      </div>
      <!-- 活动进行中 -->
      <div v-else-if="product.state === 1" class="tip_2">
        <div class="tip_2_left">
          <div class="tip_2_left_block">
            <!-- <img :src='clockImg' /> -->
            <span>距活动结束还剩∶</span>
          </div>
          <van-count-down :time="product.time">
            <template v-slot="timeData">
              <span v-if='product.day' class="day"><span>{{ product.day }}</span>天</span>
              <span class="item"><span>{{ timeData.hours >= 10 ? Math.floor(+timeData.hours / 10) : 0 }}</span><span>{{
                  +timeData.hours % 10
                }}</span> 时</span>
              <span
                class="item"><span>{{ timeData.minutes >= 10 ? Math.floor(+timeData.minutes / 10) : 0 }}</span><span>{{
                  +timeData.minutes % 10
                }}</span> 分</span>
              <span
                class="item"><span>{{ timeData.seconds >= 10 ? Math.floor(+timeData.seconds / 10) : 0 }}</span><span>{{
                  +timeData.seconds % 10
                }}</span> 秒</span>
            </template>
          </van-count-down>
        </div>
        <div class="tip_2_right">{{ product.currentGradeNeedPoint }} 积分</div>
      </div>
      <!-- 活动已结束 -->
      <div v-else class="tip_3">
        <div class="tip_2_left">
          <div class="tip_2_left_block">
            <!-- <img :src='clockImg' /> -->
            <span>距活动结束还剩：</span>
          </div>
          <van-count-down :time="product.time">
            <template v-slot="">
              <span class="item item3"><span>0</span><span>0</span> 时</span>
              <span class="item item3"><span>0</span><span>0</span> 分</span>
              <span class="item item3"><span>0</span><span>0</span> 秒</span>
            </template>
          </van-count-down>
        </div>
        <div class="tip_2_right">{{ product.currentGradeNeedPoint }} 积分</div>
      </div>
    </div>
    <div v-if="product.type === 1" class="IBzzzik_bottom">
      <p>{{ product.activityName }}</p>
      <!-- <p>积分兑换券：{{product.couponQuota}} - {{product.couponDiscount}}</p> -->
    </div>
    <div v-if="product.type === 2" class="IBzzzik_bottom">
      <p>{{ product.activityName }}</p>
      <!-- <p>积分兑换京豆：{{product.sendNumPerson}}</p> -->
    </div>
    <div v-if="product.type === 3" class="IBzzzik_bottom">
      <!-- <p>积分兑换商品：{{product.prizeName}}</p> -->
      <!-- 骁龙专用 -->
      <p v-if="product.typexl">{{ product.rightsName }}</p>
      <p v-else>{{ product.activityName }}</p>
      <p v-if="product.showPrice" class="last_item">{{ product.showPrice }}元</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IBzzzik',
  props: ['product'],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.IBzzzik {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
  margin-top: -0.1rem;
}

.IBzzzik_top {
  width: 100%;
  min-height: 0.9rem;
  color: #ffffff;
}

.tip_1 {
  min-height: 0.9rem;
  background: #ffaba7;
  display: flex;
  justify-content: space-between;
}

.tip_2 {
  min-height: 0.9rem;
  background: #e2231a;
  display: flex;
  justify-content: space-between;
}

.tip_1_left {
  flex-grow: 0.1;
  background: #e2231a;
  font-size: 0.24rem;
  padding: 0.24rem;
}

.tip_1_left_block {
  padding: 0.04rem 0.08rem;
  border: 1px solid #ffffff;
  display: flex;
  border-radius: 0.08rem;
}

.IBzzzik_top img {
  width: 0.28rem;
  height: 0.24rem;
  margin-top: 0.04rem;
  padding-right: 0.06rem;
  display: none;
}

.tip_1_right {
  flex-grow: 4;
  padding: 0.3rem 0.24rem;
  font-size: 0.26rem;
  display: flex;
  justify-content: space-between;
}

.tip_2_left {
  width: 82%;
  font-size: 0.24rem;
  padding: 0.3rem 0 0.3rem 0.3rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tip_2_left .van-count-down {
  display: flex;
  align-items: center;
}

.tip_2_right {
  width: 21%;
  padding: 0.3rem 0.3rem 0.3rem 0.03rem;
  font-size: 0.24rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.tip_2_left_block {

  padding: 0.04rem 0 0.04rem 0.06rem;
  border: 1px solid #ffffff;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 0.24rem;
  border-radius: 0.08rem;
}

.IBzzzik_bottom {
  height: 0.9rem;
  background-color: #ffffff;
  padding: 0 0.3rem 0 0.3rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
}

.IBzzzik_bottom p {
  color: #666666;
  font-size: 0.26rem;
}

.IBzzzik_bottom .last_item {
  color: #a7a7a7;
  font-size: 0.22rem;
  text-decoration: line-through;
}

.item, .day {
  color: #ffffff;
  font-size: 0.24rem;
  line-height: 0.4rem;
}

.item span {
  display: inline-block;
  width: 0.22rem;
  height: 0.4rem;
  margin-left: 0.05rem;
  font-size: 0.2rem;
  color: #e2231a;
  background: #ffffff;
  border-radius: 0.04rem;
}

.day span {
  display: inline-block;
  margin-left: 0.05rem;
  font-size: 0.2rem;
  padding: 0 0.03rem;
  height: 0.4rem;
  color: #e2231a;
  background: #ffffff;
  border-radius: 0.04rem;
}

.tip_3 {
  background: #c5c5c5;
  display: flex;
  justify-content: space-between;
}

.tip_3 .item span {
  color: #c5c5c5 !important;
}

</style>
