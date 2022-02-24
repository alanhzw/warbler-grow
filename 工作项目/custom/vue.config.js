const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');
const fs = require('fs');

const config = {
  chainWebpack: (conf) => {
    conf.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => Object.assign(options, {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: 'vant',
              libraryDirectory: 'es',
              style: true,
            }),
          ],
        }),
        compilerOptions: {
          module: 'es2015',
        },
      }));
  },
};

const cmd = process.argv[2];

// 打包时针对某个定制单独打包
if (cmd === 'build') {
  // 获取目标目录
  const targetDir = process.argv[process.argv.length - 1];
  const publicPath = `${process.env.PUBLIC_PATH_PREFIX}${targetDir}`;
  const pageRoot = `src/pages/${targetDir}`;
  // 没有入口文件 报错
  if (!fs.existsSync(`${pageRoot}/index.ts`)) {
    throw new Error('no entry');
  }
  Object.assign(config, {
    publicPath,
    outputDir: `dist/${targetDir}`,
    productionSourceMap: false,
    pages: {
      index: {
        // page 的入口
        entry: pageRoot,
        // 模板来源，如果当前文件夹中有入口文件则使用当前文件下面的，否则使用公用的
        template: fs.existsSync(`${pageRoot}/index.html`) ? `${pageRoot}/index.html` : 'public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        // title: 'Index Page',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
      },
    },
    chainWebpack: (conf) => {
      // 设置图片不转base64格式  图片少 且对图片质量要求高
      const imagesRule = conf.module.rule('images');
      imagesRule.uses.clear(); // 清除原本的images loader配置
      imagesRule
        .test(/\.(jpg|gif|png|svg)$/)
        .exclude
        .add(path.join(__dirname, '../node_modules')) // 去除node_modules里的图片转base64配置
        .end()
        .use('url-loader')
        .loader('url-loader')
        .options({ name: 'img/[name].[hash:8].[ext]', limit: 1 });
    },
    configureWebpack: (conf) => {
      conf.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    },
  });
} else {
  // 格式为 src/pages/${brandName}/{path1}/{path2}/.../{path}
  // 截取 src/pages/之后的部分
  console.log('process.argv[process.argv.length - 1]',process.argv[process.argv.length - 1])
  const targetDir = process.argv[process.argv.length - 1].slice(10).replace(/[\\]+/gi, '/').replace(/^\//,'');
  console.log('🚀 ~ targetDir', targetDir);
  const publicPath = `${process.env.PUBLIC_PATH_PREFIX}${targetDir}`;
  Object.assign(config, {
    publicPath,
    devServer: {
      disableHostCheck: true,
      // 直接使用压测环境地址作为测试地址
      proxy: {
        '^/m/cjwxService': { // 这里最好有一个 /
          // 如果压测环境不能访问，可以使用本地启动的服务
          target: process.env.VUE_APP_CJWX_API_PROXY_SERVICE,
          ws: true, // 如果要代理 websockets，配置这个参数
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 是否跨域
          logLevel: 'debug',
          pathRewrite: {
            '^/m/cjwxService': '',
          },
        },
      },
    },
    chainWebpack(cfg) {
      cfg.plugin('html').tap((options) => {
        const indexPath = `src/pages/${targetDir}/index.html`;
        options[0].template = fs.existsSync(indexPath) ? indexPath : 'public/index.html';
        return options;
      });
    },
  });
}

module.exports = config;
