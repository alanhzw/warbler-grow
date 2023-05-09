import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import ColorPicker from '@/components/ColorPicker.vue';
import rgbHex from 'rgb-hex';
const defaultColors = [
  '#ffffff',
  '#f5222d',
  '#fa541c',
  '#fadb14',
  '#52c41a',
  '#1890ff',
  '#722ed1',
  '#8c8c8c',
  '#000000',
  '',
];

// 定义 wrapper
let wrapper: VueWrapper<any>;

// 测试 UserProfile.vue
describe('UserProfile.vue', () => {
  beforeAll(() => {
    // 获取组件
    wrapper = mount(ColorPicker, {
      // 传入到组件内部的属性
      props: { value: '#ffffff' },
    });
  });
  // 测试页面是否出现了正确的结构
  it('should render the current interface', async () => {
    // 测试左侧是否为 input , 类型和值是否正确
    expect(wrapper.find('input').exists()).toBeTruthy();
    const input = wrapper.get('input').element;
    expect(input.type).toBe('color');
    expect(input.value).toBe('#ffffff');
    // 测试右侧是否有颜色的列表
    expect(wrapper.findAll('.picked-color-list li').length).toBe(
      defaultColors.length,
    );
    // 检查一个元素的 css backgroundColor 属性是否等于对应的颜色
    const firstItem = wrapper.get('li:first-child div').element as HTMLElement;
    expect('#' + rgbHex(firstItem.style.backgroundColor)).toBe(
      defaultColors[0],
    );
    // 测试最后一个元素是否有特殊的类名
    const lastItem = wrapper.get('li:last-child div').element as HTMLElement;
    expect(lastItem.classList.contains('transparnet-back')).toBeTruthy();
  });
  it('should render username  when login is true', async () => {
    // 测试 input 修改以后,是否发送对应的事件和对应的值
    const blackHex = '#000000';
    const input = wrapper.get('input');
    await input.setValue(blackHex);
    expect(wrapper.emitted()).toHaveProperty('change');
    const events = wrapper.emitted('change')!;
    expect(events[0]).toEqual([blackHex]);
  });
  it('should call logout and show message,call router.push after timeout', async () => {
    // 测试点击右侧颜色列表以后,是否发送对应的值
    const firstItem = wrapper.get('li:first-child div');
    firstItem.trigger('click');
    // 是否发射了事件
    expect(wrapper.emitted()).toHaveProperty('change');
    const events = wrapper.emitted('change')!;
    expect(events[1]).toEqual([defaultColors[0]]);
  });
});
