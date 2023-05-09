// 整个项目的入口文件
import type { App } from 'vue';

import LText from './components/LText';

const components = [LText];

const install = (app: App) => {
  components.forEach((c) => {
    app.component('l-text', c);
  });
};

export { LText, install };

export default {
  install,
};
