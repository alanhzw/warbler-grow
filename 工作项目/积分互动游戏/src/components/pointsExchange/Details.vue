<!--
 * @Description:详情组件
 * @Autor: hanzhiwei
 * @Date: 2020-12-28 19:05:28
 * @LastEditTime: 2021-01-11 10:20:24
 * @FilePath: \SNActivity\src\components\pointsExchange\Details.vue
-->
<template>
  <div class="details-box">
    <div class="content">
      <div class="top">
        <div class="left">
          <p class="point-num">{{activityInfo.currentGradeNeedPoint}}<span class="points-text"> 积分</span>
          </p>
        </div>
        <div class="right">
          下一等级所需 {{activityInfo.nextGradeNeedPoint}} 积分
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          {{activityInfo.activityName}}
        </div>
        <div class="right" v-if="options.type === 1">
          ￥{{activityInfo.showPrice}}
        </div>
      </div>
    </div>
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
  data () {
    return {

    };
  },

  methods: {

  },
};
</script>

<style lang="scss">
.details-box {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem;
  margin-bottom: 0.2rem;

  .content {
    .top {
      display: flex;
      justify-content: space-between;

      .left {
        .point-num {
          font-size: 0.48rem;
          color: #0083ff;
        }

        .points-text {
          font-size: 0.36rem;
          color: #0083ff;
          font-style: normal;
        }
      }

      .right {
        font-size: 0.26rem;
        color: #e12325;
        line-height: 0.6rem;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;

      .left {
        margin-top: 0.16rem;
        font-size: 0.26rem;
        color: #676767;
      }

      .right {
        margin-top: 0.16rem;
        font-size: 0.26rem;
        color: #b4b4b4;
        text-decoration: line-through;
      }
    }
  }
}
</style>