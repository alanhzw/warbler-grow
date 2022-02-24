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
  width: 5.82rem;
  height: 8rem;
  position: relative;
  background: url("../assets/ruleWin.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .ruleView-area{
    position: absolute;
    top: 1rem;
    left: .7rem;
    height: 5.4rem;
    width: 79%;
    overflow: scroll;
    color: #54320b;
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
