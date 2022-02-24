<template>
  <div class="GuessYes-view">
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

const emit = defineEmits(['closeYes']);

const closeDialog = () => {
  emit('closeYes', 'YesDialog');
};

</script>

<style lang='scss'>
.GuessYes-view{
  width: 5.8rem;
  height: 7.7rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/173657/33/21887/105645/61af55b7E11993693/0e826094c24a53fe.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .knowed{
    margin: 5.5rem auto 0;
    width: 3.5rem;
    height: 0.7rem;
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
