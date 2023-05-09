/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 11:26:58
 * @LastEditTime: 2022-05-26 17:19:26
 * @FilePath: \lego-fe\src\store\editor.ts
 */

import type { Module } from 'vuex';
import type { GlobalStore } from './index';
import { v4 as uuidv4 } from 'uuid';
import { PartialTextComponentProps, TextComponentProps } from '../defaultProps';

export interface ComponentData {
  // 这个元素的属性
  props: PartialTextComponentProps;
  // id, uuid  v4 生成
  id: string;
  // 业务组件库的名称 l-text , l-image 等
  name: string;
}

export interface EditorStore {
  // 供中间编辑器渲染的数据
  components: ComponentData[];
  // 当前编辑的是哪一个元素 , uuid
  currentElement: string;
}

// 测试数据
const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '20px',
      lineHeight: '1',
      color: '#ff3344',
      textAlign: 'left',
      fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '14px',
      lineHeight: '2',
      color: '#3399',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello3',
      fontSize: '12px',
      fontWeight: '800',
      actionType: 'url',
      url: 'http://www.baidu.com',
    },
  },
];

const editorStore: Module<EditorStore, GlobalStore> = {
  state: {
    // 组件列表
    components: testComponents,
    // 当前操作的组件
    currentElement: '',
  },
  mutations: {
    // 向画布中添加组件
    addComponent(state, props: PartialTextComponentProps) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props,
      };
      state.components.push(newComponent);
    },
    // 切换当前激活的组件
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    // 更新组件属性
    updateComponent(state, { key, value }) {
      const updatedComponent = state.components.find(
        (c) => c.id === state.currentElement,
      );
      if (updatedComponent) {
        updatedComponent.props[key as keyof TextComponentProps] = value;
      }
    },
  },
  getters: {
    // 当前激活的组件
    getCurrentElement: (state) => {
      return state.components.find((c) => c.id === state.currentElement);
    },
  },
};

export default editorStore;
