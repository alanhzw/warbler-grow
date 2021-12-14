<!--
 * @Description:按钮组件
 * @Autor: hanzhiwei
 * @Date: 2020-12-28 19:08:36
 * @LastEditTime: 2020-12-31 17:35:14
 * @FilePath: \SNActivity\src\components\pointsExchange\Button.vue
-->
<template>
  <div class="button-box">
    <van-button :color="btnsState[activityInfo.status][0]" block elemName='立即兑换' :primaryKey="1" elemId="001" @click="exChangePrice()">
      <span :style="[{color: btnsState[activityInfo.status][1]}]">{{btnsState[activityInfo.status][2]}}</span>
    </van-button>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  mounted () {

  },
  methods: {
    exChangePrice () {
      this.$emit('exChangePrice');
    }
  },
  data () {
    return {
      btnsState: [
        ['', '', ''], // 0
        ['#66b5ff', '#99ceff', '活动未开始'], // 1
        ['#66b5ff', '#99ceff', '活动已结束'], // 2
        ['#66b5ff', '#99ceff', '权益已兑完'], // 3
        ['#66b5ff', '#99ceff', '已兑换'], // 4
        ['#f2f9ff', '#9dd0ff', '积分不足'], // 5
        ['#f2f9ff', '#9dd0ff', '不符合活动条件'], // 6
        ['#0083ff', '#ffffff', '立即兑换'], // 7
        ['#f2f9ff', '#9dd0ff', '会员信息不存在'], // 8
        ['#f2f9ff', '#9dd0ff', '活动不存在'], // 9
        ['#f2f9ff', '#9dd0ff', '奖品不存在'], // 10
        ['#f2f9ff', '#9dd0ff', '等级未达到要求'], // 11
        ['#0083ff', '#ffffff', '去购买'], // 12
        ['#f2f9ff', '#9dd0ff', '已兑完'], // 13
        ['#f2f9ff', '#9dd0ff', '商品信息不存在'], // 14
        ['#f2f9ff', '#9dd0ff', '活动已终止'], // 15
        ['#0083ff', '#ffffff', '立即领取'], // 16
        ['#f2f9ff', '#9dd0ff', '不符合活动条件'], // 17
        ['#66b5ff', '#99ceff', '权益已领完'], // 18
        ['#f2f9ff', '#9dd0ff', '已领取'], // 19
      ],
    };
  },
};
</script>

<style lang="scss">
.button-box {
  position: fixed;
  width: 100%;
  bottom: 0;

  .van-button {
    height: 1rem;
    border-radius: 0;

    .van-button__text span {
      display: inline-block;
      line-height: 0.6rem;
    }
  }
}
</style>;