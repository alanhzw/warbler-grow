<template>
  <!-- 详细条件 -->
  <!-- type 3：实物详情  5：加钱购 -->
  <div class="IAllDetial">
    <div v-if="!details.typexl">
      <div v-if="details.type !== 4">
        <p v-if="details.type == 5"
           class="title">
          <span class="line">京东价：{{ details.showPrice }} 元</span>
          <span class="link_product"
                @click="jdPage">查看商品</span>
        </p>
        <div class="title">
          <p class="title_1"
             :style="[{color:$store.state.styleOptions? $store.state.styleOptions.pointFrontColor : '#0083ff'}]">{{ details.currentGradeNeedPoint }}
            <span :style="[{color: $store.state.styleOptions? $store.state.styleOptions.pointFrontColor : '#0083ff'}]"> 积分</span>
            <span v-if="details.type === 5"
                  class="title_1_1"> + {{ details.currentGradeNeedMoney }} 元</span>
          </p>
          <span v-if="details.type != 5 && details.nextGradeNeedPoint"
                class="title_2">下一等级所需 {{ details.nextGradeNeedPoint }} 积分</span>
          <span v-if="details.type == 5 && details.memberDayNeedPoint"
                class="is_daily"><span>{{ details.memberDayName }} {{ details.memberDayNeedPoint }} 积分</span></span>
        </div>
        <p v-if="details.memberDayPoints"
           class="is_daily"><span>{{ details.memberDayName }} {{ details.memberDayPoints }} 积分</span>
        </p>
        <p v-if="details.type == 3 "
           class="product">
          <span>{{ details.activityName }}</span>
          <span class="yj">{{ details.showPrice }} 元</span>
        </p>
        <!-- 积分加钱购 nextMoney需替换 -->
        <p v-else-if="details.type == 5"
           class="product_5">
          <span class="next_level">下一等级所需 {{ details.nextGradeNeedPoint }} 积分 + {{ details.nextGradeNeedMoney }} 元</span>
          <span>{{ details.activityName }}</span>
        </p>
        <p v-else
           class="product">{{ details.activityName }}</p>
      </div>
      <div v-else
           class="block">
        <p class="vip">{{ details.activityName }}</p>
        <!-- <span class="vipTag">会员专享</span> -->
      </div>
    </div>
    <div v-else>
      <!-- 骁龙专用 -->
      <div class="title">
        <p class="title_1">{{ details.currentGradeNeedPoint }}
          <span> 积分</span>
        </p>
        <span class="yj">{{ details.showPrice }} 元</span>
      </div>
      <p v-if="details.type == 3 "
         class="product">
        <span>{{ details.rightsName }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { PointsService } from '@/http';
import Qs from 'qs';

export default {
  name: 'IAllDetial',
  props: ['details', 'jdUrl'],
  data() {
    return {
    };
  },

  methods: {
    // 积分加钱购链接
    jdPage() {
      if (this.jdUrl) {
        window.location.href = this.jdUrl;
      }
    },
  },

};
</script>

<style scoped>
.IAllDetial {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.3rem 0.3rem;
  margin-bottom: 0.2rem;
  margin-top: -0.1rem;
}

.title {
  height: 0.6rem;
  color: #303030;
  text-align: left;
  display: flex;
  justify-content: space-between;
}

.title_1 {
  font-size: 0.48rem;
  color: #0083ff;
}

.title_1 span {
  font-size: 0.36rem;
  color: #0083ff;
  font-style: normal;
}

.title_1_1 {
  font-size: 0.30rem;
  color: #a7a7a7;
  line-height: 0.7rem;
}

.title_1 .add_red {
  font-size: 0.3rem;
  color: #e12325;
}

.title_2 {
  font-size: 0.26rem;
  color: #a7a7a7;
  line-height: 0.6rem;
}

.is_daily {
  margin-top: 0.16rem;
  font-size: 0.2rem;
  text-align: left;
  height: 0.4rem;

}

.is_daily span {
  background: #fef5e4;
  color: #feb25a;
  padding: 0.08rem;
}

.product {
  margin-top: 0.16rem;
  font-size: 0.26rem;
  color: #676767;
  display: flex;
  justify-content: space-between;
}

.product_5 {
  font-size: 0.28rem;
  color: #333333;
  text-align: left;
}

.yj {
  font-size: 0.26rem;
  color: #b4b4b4;
  text-decoration: line-through;
}

.vip {
  color: #303030;
  font-size: 0.3rem;
  text-align: left;
  /* margin-bottom: 0.24rem; */
}

.vipTag {
  font-size: 0.24rem;
  padding: 0.04rem;
  background-color: #fff6e7;
  color: #ff9300;
  float: left;
}

.line {
  font-size: 0.24rem;
  color: #a7a7a7;
  line-height: 0.7rem;
  text-decoration: line-through;
}

.next_level {
  display: block;
  font-size: 0.26rem;
  color: #a7a7a7;
  line-height: 0.7rem;
}

.link_product {
  display: inline-block;
  height: 0.4rem;
  width: 1.2rem;
  line-height: 0.4rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.24rem;
  background-color: #0083ff;
  border-radius: 0.2rem;
  margin-top: 0.1rem;
}
</style>
