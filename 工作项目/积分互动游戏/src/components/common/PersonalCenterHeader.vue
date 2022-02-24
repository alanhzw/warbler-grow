<!--
 * @Description:个人中心头部组件
 * @Autor: hanzhiwei
 * @Date: 2021-01-04 16:20:56
 * @LastEditTime: 2021-01-05 17:46:08
 * @FilePath: \SNActivity\src\components\common\PersonalCenterHeader.vue
-->
<template>
  <div class="personal-center-header">
    <img class="header-bg" src="../../assets/img/center-bg.png">
    <div class="header-content">
      <img class="header-card" src="../../assets/img/center-header.png">
      <div class="top">
        <img class="header-img" v-if='userInfo.imageUrl' :src="userInfo.imageUrl">
        <img class="header-img" v-else :src="imageUrl">
        <div class="info">
          <p class="name">
            {{userInfo.nickname}}
            <van-icon size="0.24rem" name="arrow" />
          </p>
          <p class="grade">
            <img class="grade-icon" :src="vImages[userInfo.grade]">
            {{userInfo.gradeName}}
          </p>
        </div>
      </div>
      <div class="bottom" @click="toHistory()">
        <p class="text">{{userInfo.curPoint}}</p>
        <img class="points-icon" src="../../assets/img/center-points.png" alt="">
        <van-icon size="0.24rem" class="right-icon" name="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    userInfo: {
      default: () => ({}),
    },
    unionld: {
      default: () => (''),
    },
    shopId: {
      default: () => ('{}'),
    },
  },
  data () {
    return {
      imageUrl: require('../../assets/img/defaultHeader.png'), // 默认的头像
      vImages: {
        1000000010: require('../../assets/img/v1.png'),
        1000000020: require('../../assets/img/v2.png'),
        1000000030: require('../../assets/img/v3.png'),
        1000000040: require('../../assets/img/v4.png'),
        1000000050: require('../../assets/img/v5.png'),
      },
    };
  },
  methods: {
    // 跳转到积分流水页
    toHistory () {
      this.$router.push({
        name: 'PointsHistory',
        query: {
          shopId: this.shopId,
          unionld: this.unionld
        }
      });
    }
  },
  mounted () {

  }
};
</script>

<style lang="scss">
.personal-center-header {
  width: 100%;
  height: 3.58rem;
  background: #ffffff;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  .header-bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: -1.5rem;
    z-index: 1;
  }

  .header-content {
    position: absolute;
    top: 0.31rem;
    left: 0.3rem;
    right: 0.3rem;
    z-index: 2;

    .header-card {
      width: 100%;
      border-radius: 10px;
    }

    .top {
      width: 100%;
      padding: 0.5rem;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: flex-start;

      .header-img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
      }

      .info {
        width: 70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.2rem;
        height: 0.8rem;
        position: relative;

        .name {
          margin: 0;
          font-size: 0.3rem;
          color: #ffffff;
          text-align: left;
          margin-bottom: 0.02rem;
          display: flex;
          line-height: 0.4rem;

          .van-icon {
            margin-top: 0.08rem;
            margin-left: 0.1rem;
          }
        }

        .grade {
          height: 0.38rem;
          font-size: 0.24rem;
          line-height: 0.38rem;
          color: #ffffff;
          padding: 0.01rem 0.12rem 0.01rem 0.02rem;
          box-sizing: border-box;
          border-radius: 0.17rem;
          display: flex;
          position: absolute;
          top: 0.38rem;
          background: #96a4b3;

          .grade-icon {
            width: 0.31rem;
            height: 0.31rem;
            margin-top: 0.01rem;
            margin-left: 0.01rem;
            margin-right: 0.1rem;
          }
        }
      }
    }

    .bottom {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 1rem;
      top: 1.5rem;
      color: #ffffff;

      .text {
        font-size: 0.7rem;
      }

      .points-icon {
        width: 0.5rem;
        height: 0.6rem;
        padding-top: 0.08rem;
        padding-left: 0.24rem;
      }

      .right-icon {
        top: 0.3rem;
        left: 0.2rem;
      }
    }
  }
}
</style>