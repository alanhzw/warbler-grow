import LzEvent from 'lz-event-tracking/lib/vue';
import QS from 'qs';

Window.MD_LOADING = true;
// 暂时屏蔽

const handler = {
  set(obj, prop, val) {
    if (prop === 'MD_LOADING' && val === false && Window.firstTime === 1) {
      Window.firstTime = 2;
      const searchStr = window.location.search.slice(1);
      const searchParams = QS.parse(searchStr);
      const searchStrInHash = window.location.hash.split('?')[1];
      const searchParamsInHash = QS.parse(searchStrInHash);
      const shopId = sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId') || searchParams.shopId || searchParamsInHash.shopId;
      sessionStorage.setItem('LZ_CRM_CUSTOMER_ShopId', shopId);
      LzEvent.setBaseInfo({
        shopId: shopId, // 店铺标识，不可以为空
        customerId: JSON.parse(sessionStorage.getItem('LZ_CRM_CUSTOMER_USER')).customerId, // C端用户唯一身份标识customerId，不可以为空
        nickName: JSON.parse(sessionStorage.getItem('LZ_CRM_CUSTOMER_USER')).nickname, // 用户昵称，不可以为空
      });
    }
    obj[prop] = val;
    return true;
  },
};

const MD_Mixin = {
  beforeRouteEnter(to, from, next) {
    Window.MD_LOADING = true;
    next();
  },
  created() {
    // 第一次进入页面
    // 这会不会是进入没有的原因
    Window = new Proxy(Window, handler);
  },
};
export {
  MD_Mixin,
};
