import { App } from 'vue';
import type { DirectiveBinding } from 'vue';
import { insertCrmPageVisit } from '@/utils/trackEvent/cjwxReport';
import constant from '@/utils/constant';

interface ClickTrackArgsType {
  venderId?: string,
  activityId?: string,
}

/**
 * 指令名称
 */
const directiveName = 'click-track';

/**
 * 点击事件
 * @param event Event
 */
const onClick = (event: Event) => {
  const target = event.target as Element;
  const trackValue = target.getAttribute('data-click-track-value') || '{}';
  const postData = JSON.parse(trackValue);
  postData.pageId = postData.activityId;
  insertCrmPageVisit(postData);
  console.log('点击埋点', postData);
};

/**
 * 注册事件
 * @param el
 * @param binding
 * @param options
 */
const attachEvents = (el: HTMLElement, binding: DirectiveBinding, options: ClickTrackArgsType) => {
  el.removeEventListener('click', onClick);
  el.addEventListener('click', onClick);
  const value = { elementId: el.id || el.innerText, ...options };
  if (typeof binding.value === 'string') {
    Object.assign(value, { elementId: binding.value });
  } else if (typeof binding.value === 'object') {
    Object.assign(value, binding.value);
  }
  el.setAttribute('data-click-track-value', JSON.stringify(value));
};

/**
 * 解绑事件
 * @param el Element
 *
 */
const unbind = (el: Element) => {
  el.removeEventListener('click', onClick);
};

export default {
  install: (app: App, options: ClickTrackArgsType): void => {
    const defaultValue = { activityId: sessionStorage.getItem(constant.LZ_ACTIVITY_ID), venderId: sessionStorage.getItem(constant.LZ_VENDER_ID) };
    app.directive(directiveName, {
      mounted(el, binding) {
        attachEvents(el, binding, options || defaultValue);
      },
      updated(el, binding) {
        attachEvents(el, binding, options || defaultValue);
      },
      // 卸载绑定元素的父组件时调用
      unmounted(el: Element) {
        unbind(el);
      },
      deep: true,
    });
  },
};
