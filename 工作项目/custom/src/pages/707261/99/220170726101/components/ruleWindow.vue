<template>
  <div class="rules-view">
    <div class="ruleView-area">
      <div v-html="props.myRule"></div>
    </div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  myRule: String,
});

const emit = defineEmits(['closeRule']);

const closeDialog = () => {
  emit('closeRule', 'ruleDialog');
};

</script>

<style lang='scss'>
.rules-view{
  width: 5.14rem;
  height: 8.2rem;
  position: relative;
  background: url("../assets/ruleView.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .ruleView-area{
    position: absolute;
    top: 1.4rem;
    left: 0.4rem;
    height: 5.6rem;
    width: 90%;
    overflow: scroll;
    color: #FFFFFF;
    font-size: 0.23rem;
    font-family: Qualcomm, Qualcomm, l;

    >div{
      padding-right: .11rem;
    }
  }
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
