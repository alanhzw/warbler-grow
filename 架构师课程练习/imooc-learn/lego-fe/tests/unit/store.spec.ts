import store from '@/store/index';
import { testData } from '@/store/template';
import { testComponents, ComponentData } from '@/store/editor';
import { TextComponentProps } from '../../src/defaultProps';
import { clone, last } from 'lodash-es';
const cloneComponent = clone(testComponents);

// 测试 vuex store
describe('test vuex store', () => {
  // 测试 vuex 有三个模块
  it('should have three modules', () => {
    expect(store.state).toHaveProperty('user');
    expect(store.state).toHaveProperty('template');
    expect(store.state).toHaveProperty('editor');
  });
  // 测试 user 模块
  describe('test user module', () => {
    // 测试 login mutation
    it('test login mutation', () => {
      // 执行 login mutation
      store.commit('login');
      // 断言 isLogin 为 true
      expect(store.state.user.isLogin).toBeTruthy();
    });
    // 测试 logout mutation
    it('test logout mutation', () => {
      // 执行 logout mutation
      store.commit('logout');
      // 断言 isLogin 为 false
      expect(store.state.user.isLogin).toBeFalsy();
    });
  });
  // 测试 template 模块
  describe('test template module', () => {
    // 测试默认模板
    it('should have default templates', () => {
      // 断言 初始数据是否正确
      expect(store.state.template.data).toHaveLength(testData.length);
    });
    // 测试 getters
    it('should get the current template by Id', () => {
      // 获取 getters
      const selectTemplate = store.getters.getTemplateById(1);
      // 断言 getters 是否正确
      expect(selectTemplate.title).toBe('test title 1');
    });
  });
  // 测试 editor 模块
  describe('test editor module', () => {
    // 测试初始数据
    it('should have default components', () => {
      expect(store.state.editor.components).toHaveLength(testComponents.length);
    });
    //
    it('should get current component when set active one component', () => {
      // 执行 setActive commit
      store.commit('setActive', testComponents[0].id);
      // 断言 currentElement 为 新增的 currentElement
      expect(store.state.editor.currentElement).toBe(testComponents[0].id);
      // 获取 getters 当前 currentElement 对应的组件对象
      const currentElement = store.getters.getCurrentElement;
      // 断言 当前id 等于 新增的组件 id
      expect(currentElement.id).toBe(testComponents[0].id);
    });
    // 测试 addComponent commit
    it('add component should works fine', () => {
      const payload: Partial<TextComponentProps> = {
        text: 'text1',
      };
      // 执行 addComponent commit
      store.commit('addComponent', payload);
      // 断言 数据的长度 + 1
      expect(store.state.editor.components).toHaveLength(
        cloneComponent.length + 1,
      );
      // 取到数据最后一项
      const lastItem = last(store.state.editor.components);
      // 判断文本是否正确
      expect(lastItem?.props.text).toBe('text1');
    });
    // 测试 update commit
    it('update component should works fine', () => {
      const newProps = {
        key: 'text',
        value: 'update',
      };
      // 执行 update commit
      store.commit('updateComponent', newProps);
      // 获取 getters 当前 currentElement 对应的组件对象
      const currentElement = store.getters.getCurrentElement;
      // 断言 文本是否正确完成修改
      expect(currentElement.props.text).toBe('update');
    });
  });
});
