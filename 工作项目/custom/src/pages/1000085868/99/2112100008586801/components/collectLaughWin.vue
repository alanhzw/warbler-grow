<template>
  <div class="collect-view">
    <div class="collect-View-area">
      <div>【{{laughNum}}】爆笑值</div>
<!--      <div v-if="prizeMsg.status === 1">-->
<!--        <span v-if="pprizeMsg.bean !== 0">获得{{ props.prizeMsg.bean }}京豆和{{ props.prizeMsg.point }}积分</span>-->
<!--        &lt;!&ndash;        <span v-if="props.prizeMsg.bean !== 0 && props.prizeMsg.point !== 0">和</span>&ndash;&gt;-->
<!--        &lt;!&ndash;        <span v-if="props.prizeMsg.point !== 0">{{ props.prizeMsg.point }}积分</span>&ndash;&gt;-->
<!--      </div>-->
<!--      <div v-else-if="props.prizeMsg.status === 2">-->
<!--        <span>获得{{ props.prizeMsg.point }}积分</span>-->
<!--      </div>-->
<!--      <div v-else></div>-->
    </div>
    <div class="collected" @click="closeDialog()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  laughNum: Array,
});
const emit = defineEmits(['closeLaughNum']);
const closeDialog = () => {
  emit('closeLaughNum', 'laughNumDialog');
};
</script>

<style lang="scss">
.collect-view {
  width: 5.8rem;
  height: 7.93rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/174755/11/22235/92921/61add136Ea8abca45/9f54dcc7553e7f65.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .collect-View-area {
    position: absolute;
    top: 3.8rem;
    height: .8rem;
    width: 100%;
    overflow: scroll;
    color: #ffc50b;
    font-size: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: .2rem;
  }
  .collected{
    position: absolute;
    width: 3.5rem;
    height: .7rem;
    bottom: 2rem;
  }
  .close-btn {
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    bottom: 0;
    background: url("../assets/closeBtn.png") no-repeat;
    background-size: 100%;
  }
}
</style>
