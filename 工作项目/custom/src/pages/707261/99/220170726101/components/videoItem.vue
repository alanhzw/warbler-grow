<template>
  <div class="showMask" v-show="videoItem.maskdex" @click="startPlay(videoIndex)">
    <div class="icon"></div>
    <div class="icon-text" v-if="videoItem.status === 1">
      <span style="color: #FFFFFF;font-size: .3rem;font-weight: normal">观看视频</span>
      <span>领京豆+积分</span>
    </div>
    <div class="icon-text" v-else-if="videoItem.status === 2">
      <span style="color: #FFFFFF;font-size: .3rem;font-weight: normal">观看视频</span>
      <span>领积分</span>
    </div>
    <div class="icon-text" v-else></div>
  </div>
  <video
    ref="vid"
    x5-video-player-type="h5"
    x5-video-player-fullscreen="true"
    :src="videoItem.video"
    preload="auto"
    @ended="getPrize(videoItem.taskId)"
  >
    <!--    @pause="stopPlay(videoIndex)"-->
  </video>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject, ref, watch } from 'vue';

// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
const props = defineProps({
  videoItem: {},
  videoIndex: {
    type: Number,
    default: () => 0,
  },
  // videoList: [],
});
const vid = ref(null);

const emit = defineEmits(['playNo', 'playId', 'goOpen']);

const startPlay = (index) => {
  if (isOpenCarded) {
    vid.value.play();
    emit('playNo', index);
  } else {
    emit('goOpen');
  }
};
const getPrize = (thisId) => {
  emit('playId', thisId);
};
watch(() => props.videoItem.id, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    vid.value.pause();
  }
});
// const stopPlay = (index) => {
//   emit('playStop', index);
//   vid.value.pause();
// };
</script>

<style lang='scss'>

</style>
