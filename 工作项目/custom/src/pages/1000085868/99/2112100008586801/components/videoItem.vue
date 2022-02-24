<template>
  <div class="video-item" v-show="!isPlaying" @click="startPlay(videoIndex)">
    <div class="showMask">
      <van-icon name="play-circle-o" class="player-icon" />
    </div>
    <img class="cover" :src="videoItem.image">
    <div class="under-title">{{ videoItem.name }}</div>
  </div>
  <div class="player-wrapper" v-show="isPlaying" >
    <video
      ref="vid"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      :src="videoItem.link"
      :poster="videoItem.image"
      preload="auto"
      controls="controls"
      controlslist="nodownload"
      @ended="onEnded"
      class="video"
      :class="{isPlaying}"
    >
    </video>
    <!--      @pause="onPause"-->
    <van-icon name="close" class="close" @click="doPause"/>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { Icon as VanIcon } from 'vant';

const props = defineProps({
  videoItem: {},
  videoIndex: {
    type: Number,
    default: () => 0,
  },
});

const vid = ref(null);

const isPlaying = ref(false);

const emit = defineEmits(['playId']);

const startPlay = () => {
  Array.from(document.getElementsByTagName('video')).forEach((item) => {
    item.pause();
  });
  vid.value.play();
  isPlaying.value = true;
};

const getPrize = (thisId) => {
  if (props.videoItem.canWatch) {
    emit('playId', thisId);
  }
};

const doPause = () => {
  vid.value.pause();
  isPlaying.value = false;
};

// const onPause = () => {
//   isPlaying.value = false;
// };

const onEnded = () => {
  isPlaying.value = false;
  getPrize(props.videoItem.taskId);
};
</script>

<style lang='scss' scoped>

.video-item {
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  position: relative;

  .showMask {
    z-index: 2000;
    left: 0;
    top:0;
    width:100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .player-icon {
      font-size: 0.5rem;
      color: white;
      transition: all 200ms linear;

      &:active{
        opacity: 0.8;
      }
    }
  }

  .cover {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    object-fit: cover;
  }

  .under-title {
    position: absolute;
    bottom: 0;
    width: 3rem;
    height: 0.39rem;
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/142585/24/25405/761/61a9ea10Efd2897f6/47cceba40eed6a1c.png") no-repeat;
    background-size: 100%;
    color: #ffc50b;
    font-size: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
}
.player-wrapper{
  position: fixed;
  z-index: 99999;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .video {
    width: 100%;
    margin: 0 !important;
    //display: none;
  }

  .close{
    position: absolute;
    top:.2rem;
    right: .2rem;
    font-size: 0.5rem;
    color: white;
    opacity: 0.8;
    &:active{
      opacity: 1;
    }
  }
}

</style>
