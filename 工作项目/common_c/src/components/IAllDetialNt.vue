<template>
  <!-- 详细条件 -->
  <!-- type 6：积分加钱购 7：会员专享折扣 -->
  <div class="IAllDetialNt">
    <!-- 积分加钱购 -->
    <div v-if="details.type === 6">
      <div class="title">
        <p class="title_1">{{ details.currentGradeNeedPoint }}
          <span> 积分</span>
          <span class="title_1_1 add_red"> + {{ details.currentGradeNeedMoney }} 元</span>
        </p>
        <span class="title_2 line">京东价：{{ details.showPrice }} 元</span>
      </div>
      <div v-if="details.memberDayNeedPoint"
           class="title">
        <span class="is_daily"><span>【会员日 {{ details.memberDayNeedPoint }} 积分】</span></span>
      </div>
      <p class="remain"
         v-if='type === 1'>活动剩余量：{{ details.activityGiftRemain }}</p>
      <p class="vip">{{ details.rightsName }}</p>
    </div>
    <!-- 会员专享折扣 -->
    <div v-if="details.type === 7">
      <div class="title">
        <p class="add_red_7">
          ￥{{ details.salePrice }} 元
        </p>
        <span class="title_2 line">京东价：{{ details.showPrice }} 元</span>
      </div>
      <div v-if="details.salePrice"
           class="title">
        <span class="is_daily"><span>【会员专享折扣-{{ details.discount }}折】</span></span>
      </div>
      <p class="vip">{{ details.rightsName }}</p>
    </div>
    <!-- 积分兑换礼品卡 -->
    <div v-if="details.type === 8">
      <div class="title">
        <p class="title_1">{{ details.currentGradeNeedPoint }}积分
        </p>
        <span v-if="details.nextGradeNeedPoint"
              class="title_2 line1">下一等级所需 {{ details.nextGradeNeedPoint }} 积分</span>
      </div>
      <div v-if="details.memberDayPoints"
           class="title">
        <span class="is_daily"><span>【会员日 {{ details.memberDayPoints }} 积分】</span></span>
      </div>
      <p class="vip">{{ details.cardName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IAllDetialNt',
  props: ['details', 'jdUrl', 'type'],
  data() {
    return {};
  },
  methods: {
  },
};
</script>

<style scoped>
.IAllDetialNt {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.3rem 0.3rem;
  margin-bottom: 0.2rem;
  margin-top: -0.1rem;
}

.title {
  min-height: 0.6rem;
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
  line-height: 0.3rem;
}

.title_1 .add_red {
  font-size: 0.3rem;
  color: #e12325;
}

.add_red_7 {
  font-size: 0.48rem;
  color: #e12325;
}

.title_2 {
  font-size: 0.26rem;
  color: #a7a7a7;
  line-height: 0.6rem;
  margin-top: 0.2rem;
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
.remain{
  color: #555555;
  font-size: 0.24rem;
  text-align: left;
  line-height: 0.4rem;
}
.vip {
  color: #303030;
  font-size: 0.3rem;
  text-align: left;
  /* margin-bottom: 0.24rem; */
}

.line {
  font-size: 0.24rem;
  color: #a7a7a7;
  line-height: 0.3rem;
  text-decoration: line-through;
}
.line1 {
  font-size: 0.24rem;
  color: #a7a7a7;
}

</style>
