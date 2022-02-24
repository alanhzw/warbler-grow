<template>
  <div class="rules-view">
    <div class="ruleView-area">
      <div v-html="myRule"></div>
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
  width: 5.8rem;
  height: 7.7rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/223123/28/4832/54676/61add135E74808cfe/9bb1b53358446d95.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .ruleView-area{
    position: absolute;
    top: 2.8rem;
    left: 0.5rem;
    height: 3.6rem;
    width: 85%;
    overflow: scroll;
    color: #FFFFFF;
    font-size: 0.23rem;

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
