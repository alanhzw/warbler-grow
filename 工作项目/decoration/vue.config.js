const path = require('path');

console.log('--------ENV-----------');
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('VUE_APP_PLATFORM', process.env.VUE_APP_PLATFORM);
console.log('VUE_APP_MODE', process.env.VUE_APP_MODE);
console.log('VUE_APP_PUBLICPATH', process.env.VUE_APP_PUBLICPATH);
console.log('----------------------');

const pages = {
  b: {
    index: {
      entry: './src/business/business.js',
      template: './public/web.html',
    },
  },
  c: {
    index: {
      entry: './src/mobile/mobile.js',
      template: './public/mobile.html',
    },
  },
  tmall_b: {
    index: {
      entry: './src/business/business.js',
      template: './public/web.html',
    },
  },
  tmall_c: {
    index: {
      entry: './src/mobile/mobile.js',
      template: './public/mobile.html',
    },
  },
};

module.exports = {
  filenameHashing: false, // 文件名添加哈希
  productionSourceMap: process.env.NODE_ENV !== 'production',
  lintOnSave: false,
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        moment: 'dayjs', // 使用dayjs 替换moment
        '@': path.resolve(__dirname, 'src/'),
        '@admin': path.resolve(__dirname, 'src/admin'),
        '@business': path.resolve(__dirname, 'src/business'),
        '@mobile': path.resolve(__dirname, 'src/mobile'),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 200000000 }));
  },
  pages: pages[process.env.VUE_APP_PLATFORM],
  outputDir: `dist/${process.env.VUE_APP_PLATFORM}`,
  publicPath: process.env.VUE_APP_PUBLICPATH,
  devServer: {
    port: process.env.VUE_APP_DEV_SERVER_PORT,
    disableHostCheck: true,
    // sockHost: 'lzkplcrm-isv.isvjcloud.com',
    // proxy: {
    //   // 云鹿侧代理
    //   '/api/b': {
    //     target: 'https://subapps-test.dianpusoft.cn/crm/common/api',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/b': '', // 代理的路径
    //     },
    //   },
    //   // 通用的装修后台接口代理
    //   '/decoration': {
    //     target: 'https://subapps-test.dianpusoft.cn/deco/api', // 代理接口
    //     changeOrigin: true,
    //   },
    //   // 通用的装修后台接口代理
    //   '^/decoration/api': {
    //     target: 'http://116.196.106.97:30008/decoration/api', // 代理接口
    //     changeOrigin: true,
    //   },
    // },
  },
};
