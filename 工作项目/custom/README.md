# custom 前端定制工程

## 工程说明： 使用vue3.0 搭建的C端定制工程

## 工程依赖
1. vant
2. hammer
3. dayjs
4. qs
5. swiper
6. ??
7.
# vue3-jest2

## Project setup

```
yarn

或

npm install
yarn install
```

### Compiles and hot-reloads for development

本地调试的时候使用,需要指定从src开始到index.ts文件所在的文件夹的路径

支持unix,linux,windows的路径分隔符 "/" 和 "\"

```
yarn serve src/pages/xxx/99/xxx

或

npm run serve src/pages/xxx/99/xxx
```

#### 本地测试pin设置：
本地开发需要设置调试用到的pin，需要改写 .env.development 文件中的VUE_APP_MOCK_PIN参数

yarn serve
```
NODE_ENV = development
VUE_APP_CJWX_API_SERVICE=/m/cjwxService
VUE_APP_MOCK_PIN=1mYZ7kDxEwoHJWB0pAPbNE7oeVP9kq2pYSH90mYt4m3fwcJlClpxrfmVYaGKuquQkdK3rLBQpEQH9V4tdrrh0w==
VUE_APP_MOCK_NANE=测试昵称
```

推荐新建.env.development.local文件，在里面重写.env.development中的变量,.local的配置文件优先级最高且不会被上传到git服务器

### Compiles and minifies for production
发布的时候，不需要写src/pages

```
yarn build xxx/99/xxx
yarn build
```

#### 压测地址：
### Run your unit tests
```
https://lzkjdz-isv.isvjcloud.com/m/xxx/99/xxx
yarn test:unit
```
#### 生产地址：

### Run your end-to-end tests
```
https://lzkjdz-isv.isvjcloud.com/m/xxx/99/xxx
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

# 公共方法

## src/utils/platforms/jd.ts共通方法：

1. 跳转到店铺首页 `gotoShopPage`
2. 跳转到sku页面 `gotoSkuPage`

## src/utils/index.ts共通方法：

1. 埋点插件 `eventTracking`

index.ts
```javascript

import { clickTracking } from '@/utils'

init({
    platform: 'jd',
    sysCode: 'cjwx',
    urlPattern: '/m/demo/event-tracking/:activityId',
}).then(async ({ baseInfo, pathParams}) => {
    app.provide('baseInfo', baseInfo);
    // 方式1，省略第二个参数，方法会根据url中的规则解析出对应的值
    app.use(clickTracking);
    // 方式2，从url中获得
    // app.use(clickTracking, {
    //     venderId: pathParams?.venderId,
    //     activityId: pathParams?.activityId,
    // });
    // 方式3，从对象中获得
    // app.use(clickTracking, {
    //     venderId: baseInfo?.venderId,
    //     activityId: baseInfo?.activityId,
    // });
    app.mount('#app');
});

```

初始化的时候，可以传页面共通埋点参数，也可以在绑定指令`v-click-track` 的时候，手动指定

App.vue
```javascript

<template>
  <div>
    <!-- 直接使用字符串作为值，字符会赋值给字段elementId -->
    <Button type="primary" v-click-track="`这里的字符串会赋值给elementId字段`">点击埋点</Button>
    <!-- 使用自定义对象，对象会和默认参数合并 -->
    <Button type="primary" v-click-track="{venderId:'name',elementId:'埋点', activityId:'value'}">点击埋点</Button>
  </div>
</template>

```

指令 `v-click-track` 用来绑定点击埋点指定，值：支持字符串和对象，字符串表示为elementId设置值，对象表示完全自定义参数值


