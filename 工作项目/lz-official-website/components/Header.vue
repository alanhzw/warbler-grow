<template>
  <header class="header-wrapper" :class="{reverse:reverse}">
    <nav class="nav container">
      <Logo :reverse="reverse" />
      <div class="menu">
        <div class="menu-item" :class="{active:activeIndex==='index'}">
          <a class="menu-item-title" href="/">首页</a>
        </div>
        <div
          class="menu-item"
          :class="{active:activeIndex.startsWith('solution')}"
        >
          <div class="menu-item-title">全域数字资产</div>
          <div class="sub-menu">
            <a
              class="sub-menu-title"
              href="/solution/operate"
              :class="{active:activeIndex==='solution-operate'}"
            >消费者增长运营</a>
            <a
              class="sub-menu-title"
              href="/solution/marketing"
              :class="{active:activeIndex==='solution-marketing'}"
            >全场景互动营销</a>
            <a
              class="sub-menu-title"
              href="/solution/insight"
              :class="{active:activeIndex==='solution-insight'}"
            >全链路消费者洞察</a>
          </div>
        </div>
        <div class="menu-item" :class="{active:activeIndex.startsWith('product')}">
          <div class="menu-item-title">产品介绍</div>
          <div class="sub-menu">
            <a
              class="sub-menu-title"
              href="/product/cjwx"
              :class="{active:activeIndex==='product-cjwx'}"
            >超级无线</a>
            <a
              class="sub-menu-title"
              href="/product/cjhy"
              :class="{active:activeIndex==='product-cjhy'}"
            >超级会员</a>
            <a
              class="sub-menu-title"
              href="/product/cjyx"
              :class="{active:activeIndex==='product-cjyx'}"
            >超级营销</a>
          </div>
        </div>
        <div class="menu-item" :class="{active:activeIndex==='brand-service'}"><a
          class="menu-item-title"
          href="/brand/service"
        >品牌服务</a></div>
        <div class="menu-item" :class="{active:activeIndex==='college-businessCollege'}">
          <a class="menu-item-title" href="/college/businessCollege">鹿研院</a>
        </div>
        <div class="menu-item" :class="{active:activeIndex.startsWith('about')}">
          <div class="menu-item-title">关于我们</div>
          <div class="sub-menu">
            <a
              class="sub-menu-title"
              href="/about/us"
              :class="{active:activeIndex==='about-us'}"
            >关于陆泽</a>
            <a
              class="sub-menu-title"
              href="/about/luzeCulture"
              :class="{active:activeIndex==='about-luzeCulture'}"
            >陆泽动态</a>
            <a
              class="sub-menu-title"
              href="/about/joinUs"
              :class="{active:activeIndex==='about-joinUs'}"
            >加入我们</a>
          </div>
        </div>
      </div>
      <div class="button" :class="reverse?'button-reverse':'button-primary'">
        免费咨询
        <img class="barcode" src="/images/barcode2.jpg" alt="陆泽科技">
      </div>
    </nav>
  </header>
</template>
<script>
import Logo from '~/components/Logo'

export default {
  name: 'Header',
  components: { Logo },
  data () {
    return {
      activeIndex: 'index',
      reverse: true
    }
  },
  computed: {},
  watch: {
    '$route' (to, from) {
      // console.log(to.name)
      this.activeIndex = to.name || ''
    }
  },
  created () {
    // console.log(this.$route.name)
    this.activeIndex = this.$route.name || ''
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      this.reverse = top <= 100
    })
  },
  beforeDestroy () {
    // window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 1rem;
  background-color: white;
  position: fixed;
  left: 0;
  width: 100%;
  top: 0;
  z-index: $--nav-zIndex;
  transition: background-color 200ms linear;
  padding: 0 15px;
  box-sizing: border-box;
  box-shadow: 0 0.02rem 0.08rem rgba(38, 71, 200, 0.15);

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menu {
    border-bottom: none;
    background: none;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    & > .menu-item {
      height: 1rem;
      line-height: 1rem;
      color: $--color-title;
      white-space: nowrap;
      padding: 0 .12rem;
      margin: 0 .10rem;
      cursor: pointer;
      position: relative;

      &:hover, &:active, &.active {
        color: $--color-primary;
      }

      &:hover, &:active {
        .sub-menu {
          display: flex;
        }
      }

      .menu-item-title {
        font-size: 20px;
        display: block;
      }

      .sub-menu {
        display: none;
        position: absolute;
        top: -.2rem;
        left: 50%;
        transform: translateX(-50%) translateY(1rem);
        flex-direction: column;
        line-height: 1;
        text-align: center;
        min-width: 100%;
        border-radius: 0.06rem;
        background-color: $--color-white;
        transition: all 200ms linear;
        padding: .12rem 0;
        filter: drop-shadow(0 0 0.10rem #0000002b);

        &:before {
          content: '';
          position: absolute;
          top: 1px;
          width: 0;
          height: 0;
          border-width: 10px;
          border-style: solid;
          border-color: transparent;
          border-bottom-color: $--color-white;
          display: block;
          left: 50%;
          transform: translateX(-50%) translateY(-100%);
          transition: all 200ms linear;
        }

        .sub-menu-title {
          font-size: 16px;
          color: $--color-title;
          height: 48px;
          display: block;
          padding: 0 12px;
          line-height: 48px;

          &:hover, &:active, &.active {
            color: $--color-primary;
          }
        }
      }
    }
  }

  .button {
    width: 1.20rem;
    height: .32rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .barcode {
      position: absolute;
      top: .5rem;
      left: 50%;
      width: 150px;
      height: 150px;
      transform: translateX(-50%);
      display: none;
    }

    &:hover {
      .barcode {
        display: block;
      }
    }
  }

  &.reverse {
    background: none;
    height: 1rem;
    box-shadow: none;

    .menu {
      & > .menu-item {
        color: $--color-white;

        &:hover, &:active, &.active {
          color: #2dd5ff;
        }
      }

      .sub-menu {
        background-color: #051e97;

        &:before {
          border-bottom-color: #051e97;
        }

        .sub-menu-title {
          color: $--color-white;

          &:hover, &:active, &.active {
            color: #2dd5ff;
          }
        }
      }
    }
  }
}
</style>
