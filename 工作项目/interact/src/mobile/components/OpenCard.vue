<!--
 * @Description:
 * @Date: 2021-03-10 13:45:40
 * @LastEditTime: 2021-03-10 14:27:21
 * @FilePath: \yunluhuodong\src\mobile\components\OpenCard.vue
-->
<template>
  <div class="open-card-modal">
    <van-popup class="open-card-popup" v-model="isShowOpenCard">
      <div class="open-card-box">
        <div class="close-icon">
          <img src="../../assets/open-card-closeicon.png" @click="$emit('close')">
        </div>
        <img class="main-pic" src="../../assets/open-card.png">
        <div class="btn">
          <img src="../../assets/open-card-button.png" @click='$emit("openCardFn")'>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'OpenCard',
  props: {
    isShowOpenCard: {
      default: () => false,
    },
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style lang='scss'>
.open-card-modal {
  .open-card-popup {
    width: 100%;
    background-color: transparent;
    overflow: visible;
  }

  .open-card-box {
    width: 100%;
    position: relative;
    .close-icon {
      width: 0.6rem;
      position: absolute;
      top: -0.2rem;
      right: 0.7rem;
      z-index: 2;
      img {
        width: 100%;
      }
    }
    .btn {
      width: 64%;
      position: absolute;
      top: 3.8rem;
      right: 18%;
      z-index: 3;
      img {
        width: 100%;
      }
    }
    .main-pic {
      width: 80%;
      transform: translateX(2%);
    }
  }
}
</style>
