<template>
  <div class="noLoEnough-view">
    <!--    <div class="noLotteryView-area">-->
    <!--      <div v-html="myRule"></div>-->
    <!--    </div>-->
    <div class="knowed" @click="closeDialog()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

// const props = defineProps({
//   myRule: String,
// });

const emit = defineEmits(['closeLE']);

const closeDialog = () => {
  emit('closeLE', 'noLEDialog');
};

</script>

<style lang='scss'>
.noLoEnough-view{
  width: 5.8rem;
  height: 7.7rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/205106/26/17344/98638/61add135Ecdfeadca/36942f62fe01ccc9.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .knowed{
    margin: 5rem auto 0;
    width: 3rem;
    height: 0.6rem;
  }
  //.noLotteryView-area{
  //  position: absolute;
  //  top: 2.8rem;
  //  left: 0.5rem;
  //  height: 3.6rem;
  //  width: 85%;
  //  overflow: scroll;
  //  color: #FFFFFF;
  //  font-size: 0.23rem;
  //
  //  >div{
  //    padding-right: .11rem;
  //  }
  //}
  .close-btn{
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    bottom: 0;
    background: url("../assets/closeBtn.png") no-repeat;
    background-size: 100%;
  }
}
</style>
