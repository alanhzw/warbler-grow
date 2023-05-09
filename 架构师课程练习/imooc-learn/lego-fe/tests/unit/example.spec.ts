/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-30 17:04:51
 * @LastEditTime: 2022-06-01 11:06:23
 * @FilePath: \lego-fe\tests\unit\example.spec.ts
 */
import type { VueWrapper } from '@vue/test-utils';
import axios from 'axios';
import flushPromises from 'flush-promises';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

jest.mock('axios');
//将 mock 对象断言为特定类型 使用 jest.Mocked<T>
const mockAxios = axios as jest.Mocked<typeof axios>;
const msg = 'new message';
let wrapper: VueWrapper<any>;
describe('HelloWorld.vue', () => {
  beforeEach(() => {
    // 获取组件
    wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
  });
  afterEach(() => {
    mockAxios.get.mockReset();
  });
  // 测试点击 button, count 增加
  it('should update the count when clicking the button', async () => {
    // 触发点击事件
    await wrapper.get('.add-count').trigger('click');
    // 数字变为 1 (初始为0)
    expect(wrapper.get('.add-count').text()).toBe('1');
  });
  // 测试 更新表单 点击 add button
  it('should add todo when fill the input and click the add button', async () => {
    const todoContent = 'test todo';
    // 触发 input 事件 , 设置值为 todoContent
    await wrapper.get('input').setValue(todoContent);
    // 断言 input 的值为 todoContent
    expect(wrapper.get('input').element.value).toBe(todoContent);
    // 触发 button 点击事件
    await wrapper.get('.add-todo').trigger('click');
    // 断言 有一个 li
    expect(wrapper.findAll('li')).toHaveLength(1);
    // 断言 li 的内容是 todoContent
    expect(wrapper.get('li').text()).toBe(todoContent);
    // 断言 触发了 名为 send 的 emit 事件
    expect(wrapper.emitted()).toHaveProperty('send');
    // 获取 send 事件的 对象
    const events = wrapper.emitted('send')!;
    // 检查对象内容是否相同使用 toEqual, toBe 要求引用也相同
    expect(events[0]).toEqual([todoContent]);
  });
  // 使用 it.only 来指定测试的 case
  it('should load user message when click the load button', async () => {
    // mock service
    mockAxios.get.mockResolvedValueOnce({
      data: {
        username: 'warbler',
      },
    });
    // 触发点击事件
    await wrapper.get('.load-user').trigger('click');
    // 断言 请求是否被调用
    expect(mockAxios.get).toHaveBeenCalled();
    // 断言 loading 是否出现
    expect(wrapper.find('.loading').exists()).toBeTruthy();
    // 让 promise 完成,并且界面更新完成
    await flushPromises();
    // 断言 loading 消失
    expect(wrapper.find('.loading').exists()).toBeFalsy();
    // 断言 username 显示
    expect(wrapper.get('.user-name').text()).toBe('warbler');
  });
});
