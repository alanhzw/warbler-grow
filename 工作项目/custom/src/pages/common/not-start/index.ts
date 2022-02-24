import QS from 'qs';
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import index from './App.vue';

initRem(750);

const search = QS.parse(window.location.search.slice(1));

const app = createApp(index);

Object.keys(search).forEach((key) => {
  app.provide(key, search[key]);
});

app.mount('#app');
