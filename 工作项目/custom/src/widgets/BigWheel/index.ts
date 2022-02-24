import { App } from 'vue';
import BigWheel from './BigWheel.vue';
import Prize from './Prize';

export default {
  install(app: App) {
    app.component('BigWheel', BigWheel);
    app.component('BigWheelPrize', Prize);
  },
};
