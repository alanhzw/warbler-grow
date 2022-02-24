import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// element-plus 1.2.0 之后使用了.mjs 引入的时候resolve不到这个文件，引入的时候要写后缀，并且在声明文件中添加mjs
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs';
import '@/styles/element.scss';
import store from './store';
import App from './App.vue';
import routes from './routes';

export function initRem(uiPageWidth = 1920, rate = 1): void {
  const docEl: HTMLElement = document.documentElement;
  const bodyEl: HTMLElement = document.body;
  const recalc = () => {
    const { clientWidth, clientHeight } = docEl;

    docEl.style.fontSize = `${rate * (clientWidth / uiPageWidth)}px`;
    // 重制body的字号为16px，避免html的字号对px的影响
    // 总感觉这段代码会有问题
    bodyEl.style.fontSize = '16px';
  };

  document.addEventListener('DOMContentLoaded', recalc, false);
  window.onresize = recalc;
  recalc();
}

initRem();

createApp(App)
  .use(ElementPlus, { locale: zhCn })
  .use(store)
  .use(routes)
  .mount('#app');
