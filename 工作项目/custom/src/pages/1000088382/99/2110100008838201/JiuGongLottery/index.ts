import { App } from 'vue';
import JiuGongLottery from './JiuGongLottery.vue';

export default {
  install(app: App) {
    app.component('JiuGongLottery', JiuGongLottery);
  },
};
