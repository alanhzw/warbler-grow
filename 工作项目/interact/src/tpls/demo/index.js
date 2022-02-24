// Demo组件被import的时候执行的内容在这个文件夹中
// 首先引入组件
import Demo from './Demo';

// // 提供install方法，用于按需引入
// Demo.install = Vue => Vue.component(Demo.name, Demo);

// export default Demo;

// const Demo = () => import('./Demo');
export default {
  install(Vue) {
    Vue.component('LzTplDemo', Demo);
    // Vue.component('LzTplDemo', () => import('./Demo'));
  },
};
