/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-30 17:04:51
 * @LastEditTime: 2022-06-16 16:47:24
 * @FilePath: \lego-component\tests\unit\LText.spec.ts
 */
import { shallowMount } from '@vue/test-utils';
import LText from '@/components/LText';
import { textDefaultProps } from '../../src/defaultProps';

describe('LText.vue', () => {
  it.only('default LText render', async () => {
    // 传入组件的属性
    const msg = 'test';
    const props = {
      ...textDefaultProps,
      text: msg,
    };
    // 获取组件
    const wrapper = shallowMount(LText, { props });
    // 文本正确
    expect(wrapper.text()).toBe(msg);
    // 标签正确
    expect(wrapper.element.tagName).toBe('DIV');
    const style = wrapper.attributes().style;
    // 包含指定类名
    expect(style.includes('font-size')).toBeTruthy();
    // 不包含指定类名
    expect(style.includes('actionType')).toBeFalsy();
  });
});
