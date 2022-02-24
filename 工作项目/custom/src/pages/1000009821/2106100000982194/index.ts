import { createApp } from 'vue';
import '@/style/reset.scss';
import 'animate.css';
import 'swiper/dist/css/swiper.min.css';
// 引入根组件
import { cjwxRequest } from '@/utils/service';
import { init } from '@/utils';
import { initRem } from '@/utils/client';
import root from './App.vue';

// 设置页面title
document.title = 'SK-II NOW';

initRem(375);

const io = new IntersectionObserver((ioes) => {
  ioes.forEach((ioe) => {
    const { intersectionRatio } = ioe;
    if (intersectionRatio > 0 && intersectionRatio <= 1) {
      ioe.target.classList.add(
        ioe.target.getAttribute('data-className') || 'in',
      );
    }
  });
});

const app = createApp(root);

// 注册一个全局自定义指令 `v-scrollIn`
app.directive('scrollIn', {
  // 绑定元素的父组件挂载时调用
  mounted(el, binding) {
    if (binding.value) {
      el.setAttribute('data-className', binding.value);
    }
    io.observe(el);
  },
});

const getOpenCard = async () => {
  const { data } = await cjwxRequest.post('/wx/skii/memship/openCardStatus');
  return data.openStatus;
};

init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityId/?earn=:earn',
  checkOpenCard: false,
}).then(async ({ baseInfo, pathParams }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('pathParams', pathParams);
  app.provide('earn', !!pathParams.earn);
  const openCard = await getOpenCard();
  console.log('openCard', openCard);
  // 如果开卡了，直接跳转到主页
  if (process.env.VUE_APP_MODE === 'prod' && !pathParams.earn && openCard) {
    console.log('跳转到主页了');
    window.location.href = '/wx/skii/memship/home?currentIndex=0&activityId=2106100000982195&showPoup=true';
  } else {
    app.provide('isOpenCard', openCard);
    app.mount('#app');
  }
}).catch((e) => {
  app.mount('#app');
});
