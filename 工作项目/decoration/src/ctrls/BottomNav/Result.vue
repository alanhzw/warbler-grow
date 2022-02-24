<template>
  <div class="ctrl-bottom-nav-result" :class="{fixed: isMobile}" @click="go2Link($event)" v-lz-click='100' v-lz-floor="floorInfo">
    <nav class="bottom-nav-bar">
      <li v-for="(nav, index) in data.navs" :key="`nav${index}`">
        <img :src="nav.icon">
        <p>{{nav.label}}</p>
      </li>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'CtrlBottomNavResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },

  },
  data () {
    return {
      isMobile: sessionStorage.getItem('LZ_CRM_CLIENT_TYPE') == 2,
    };
  },
  methods: {
    go2Link(evt) {
      if (typeof this.data.link === 'string' && this.data.link !== '') {
        window.location.href = this.data.link;
      }
    },
  },
};
</script>
<style lang="scss">
@import '../style/common_ctrl';

.ctrl-bottom-nav-result {
  @extend .ctrl;
  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

  }

  .bottom-nav-bar {
    display: flex;
    list-style: none;
    width: 100%;
    padding: 0.14rem 0;

    li {
      flex: 1;
      text-align: center;
      font-size: 0.24rem;
      line-height: 0.4rem;

      img {
        height: 0.44rem;
        vertical-align: top;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>
