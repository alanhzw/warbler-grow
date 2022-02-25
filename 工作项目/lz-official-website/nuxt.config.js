export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '陆泽科技-全域消费者增长服务商',
    htmlAttrs: {
      lang: 'zh',
      style: 'font-size:62.5px'
    },
    meta: [
      { charset: 'utf-8' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge,chrome=1'
      },
      {
        name: 'renderer',
        content: 'webkit'
      },
      {
        name: 'viewport',
        content: 'width=1200,user-scalable=0'
      },
      {
        hid: 'Keywords',
        name: 'Keywords',
        content: '陆泽,京东,超级,短信,营销,活动,互动,电商'
      },
      {
        hid: 'description',
        name: 'description',
        content: '陆泽科技有限公司是国内领先的消费者增长运营解决方案提供商，为400+一线品牌提供数据驱动的营销增长服务，更全面、准确、快速地了解消费者，赋能人、货、场及其关系的重构，助力品牌解决用户运营痛点，促进全链路数据及流量打通，逐步提高企业的精细化运营，实现GMV增长。公司以“做品牌信赖的服务商”为使命，致力于成为更多行业标杆品牌的用户营销首选服务商。'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preload',
        href: '/css/debounce.css',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: '/css/swiper-bundle.min.css'
      },
      {
        rel: 'stylesheet',
        href: '/video-js-7.16.0/video-js.min.css'
      },
      {
        rel: 'stylesheet',
        href: '/css/animate.min.css'
      }
    ],
    script: [
      {
        src: '/js/htmlFontSize.js',
        charset: 'utf-8'
      },
      {
        src: '/js/swiper-bundle.min.js',
        charset: 'utf-8'
      },
      {
        src: '/video-js-7.16.0/video.min.js',
        charset: 'utf-8'
      },
      {
        src: '/video-js-7.16.0/lang/zh-CN.js',
        charset: 'utf-8'
      },
      {
        src: '/js/wow.min.js',
        charset: 'utf-8'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/base.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '@/plugins/axios',
    // '@/plugins/filters',
    // '@/plugins/route',
    {
      src: '@/plugins/scrollTo',
      mode: 'client'
    },
    {
      src: '@/plugins/seamless-scroll',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
    // https://www.npmjs.com/package/@nuxtjs/proxy
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // https://github.com/nuxt-community/style-resources-module
  styleResources: {
    scss: './assets/css/variables.scss'
  },

  // https://sitemap.nuxtjs.org/
  sitemap: {
    hostname: 'http://www.lucidata.cn/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: process.env.NODE_ENV === 'production' ? 'package' : null,
    // buildDir: 'package',
    transpile: [
      'vue-scroll-to', 'vue-seamless-scroll'
    ],
    extractCSS: { allChunks: true },
    // analyze: {
    //   analyzerMode: 'static'
    // },
    splitChunks: {
      layouts: false,
      pages: true,
      commons: false
    }
  }
}
