import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import UserProfile from '@/components/UserProfile.vue';
import { message } from 'ant-design-vue';
import store from '@/store/index';
// 使用 provide 挂载真实的 vuex store ,就无需 mock了

// 模拟第三方库 ant-design-vue
jest.mock('ant-design-vue', () => ({
  message: {
    success: jest.fn(),
  },
}));

// 用来模拟 vue-router 的 push 方法
const mockRoutes: string[] = [];

// 模拟外部模块 vue-router
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: (url: string) => mockRoutes.push(url),
  }),
}));

// 模拟组件
const mockComponent = {
  template: '<div><slot></slot></div>',
};

// 模拟剧名插槽的组件
const mockComponent2 = {
  template: '<div><slot></slot><slot name="overlay"></slot></div>',
};

// 全局组件列表
const globalComponents = {
  'a-button': mockComponent,
  'a-dropdown-button': mockComponent2,
  'router-link': mockComponent,
  'a-menu': mockComponent,
  'a-menu-item': mockComponent,
};

// 定义 wrapper
let wrapper: VueWrapper<any>;

describe('UserProfile.vue', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    // 获取组件
    wrapper = mount(UserProfile, {
      // 传入到组件内部的属性
      props: { user: { isLogin: false } },
      // 定义全局组件
      global: {
        components: globalComponents,
        provide: {
          store,
        },
      },
    });
  });
  // 测试没有登录的时候
  it('should render login button when login is false', async () => {
    console.log(wrapper.html());
    // 断言 div 上的文字是 登录
    expect(wrapper.get('div').text()).toBe('登录');
    // 触发点击事件
    await wrapper.get('div').trigger('click');
    // 断言 message.success 被触发了
    expect(message.success).toHaveBeenCalled();
    // 断言 vuex store 发生了变化
    expect(store.state.user.userName).toBe(warbler);
  });
  // 测试已经登录的时候
  it('should render username  when login is true', async () => {
    // 修改传入组件内部的属性
    await wrapper.setProps({
      user: { isLogin: true, username: 'warbler' },
    });
    console.log(wrapper.html());
    // 断言 .user-profile-component 的内容是 warbler
    expect(wrapper.get('.user-profile-component').html()).toContain('warbler');
    // 断言 .user-profile-dropdown 存在
    expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy();
  });
  // 测试登出的时候
  it('should call logout and show message,call router.push after timeout', async () => {
    // 触发点击事件
    await wrapper.get('.user-profile-dropdown div').trigger('click');
    // 断言 修改了 store 的值
    expect(store.state.user.isLogin).toBeFalsy();
    // 断言 message 被触发了一次
    expect(message.success).toHaveBeenCalledTimes(1);
    // 消除所有 timer
    jest.runAllTimers();
    // 断言 触发了 vue-router 的 push 方法
    expect(mockRoutes).toEqual(['/']);
  });
  afterEach(() => {
    // 重置mock
    (message as jest.Mocked<typeof message>).success.mockReset();
  });
});
