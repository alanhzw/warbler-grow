<template>
  <div v-if="visible" class="video-player">
    <video
      id="video-play"
      ref="videoPlayer"
      class="video-js vjs-default-skin vjs-big-play-centered"
      preload="auto"
    >
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a
          href="https://videojs.com/html5-video-support/"
          target="_blank"
        >supports HTML5 video</a>
      </p>
    </video>
    <!--这里是半透明背景层-->
    <div class="close" @click.self="close">关闭</div>
    <div class="over" @click.self="close"></div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: Boolean,
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      cdnHost: 'http://luzekeji.f3322.net:8888/'
    }
  },
  computed: {
    poster () {
      return this.data?.cover
    },
    sources () {
      const list = []
      if (this.data) {
        list.push({
          src: this.cdnHost + this.data.path + '/index.m3u8',
          type: 'application/x-mpegURL'
        })
        list.push({
          src: this.cdnHost + this.data.path + '/index.mp4',
          type: 'video/mp4'
        })
      }
      return list
    }
  },
  watch: {
    visible (val) {
      if (val) {
        document.body.classList.add('lock-scroll')
        document.body.appendChild(this.$el)
        if (this.sources.length) {
          this.$nextTick(() => {
            this.player = window.videojs(
              this.$refs.videoPlayer,
              {
                controls: true,
                autoplay: true,
                poster: this.poster,
                sources: this.sources,
                preload: 'auto'
              },
              function onPlayerReady () {
                console.log('onPlayerReady', this)
              }
            )
          })
        }
      } else {
        document.body.classList.remove('lock-scroll')
      }
    }
  },
  mounted () {},
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  },
  destroyed () {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    show () {
      this.$emit('change', true)
    },
    close () {
      this.$emit('change', false)
    },
    handleMouseEnter () {
      if (this.player) {
        this.player.play()
      }
      this.$emit('videoTime', this.player.duration())
    },
    handleMouseLeave () {
      if (this.player) {
        this.player.pause()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-player {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;

  .close {
    top: 0.2rem;
    right: 0.2rem;
    z-index: 11;
    position: absolute;
    font-size: 0.2rem;
    padding: 0.1rem;
    border-radius: 0.1rem;
    border: solid 1px white;
    color: white;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 100ms linear;

    &:hover {
      opacity: 1;
    }
  }

  .video-js {
    width: 10.24rem;
    height: 5.32rem;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    position: absolute;
    box-shadow: 0 0 20px black;
    border-radius: 2px;
    overflow: hidden;
    transition: all 200ms linear;
  }

  .over {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
}
</style>
