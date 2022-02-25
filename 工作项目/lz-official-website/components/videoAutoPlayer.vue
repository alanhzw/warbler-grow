<template>
  <div class="video-player1">
    <video
      id="video-auto-play"
      ref="videoPlayer1"
      class="video-js1 vjs-default-skin vjs-big-play-centered"
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
  </div>
</template>

<script>
export default {
  name: 'videoAutoPlayer',
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
    }
    // handleMouseEnter () {
    //   console.log('1')
    //   if (this.player) {
    //     this.player.play()
    //   }
    //   this.$emit('videoTime', this.player.duration())
    // },
    // handleMouseLeave () {
    //   if (this.player) {
    //     this.player.pause()
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.video-player1 {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;

  .video-js1 {
    width: 100%;
    height: 4.22rem;
    top: 50%;
    left: 50%;
    z-index: 10;
  }
}
</style>
