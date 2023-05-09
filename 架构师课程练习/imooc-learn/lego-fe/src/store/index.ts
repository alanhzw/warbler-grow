/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 10:48:28
 * @LastEditTime: 2022-05-19 15:05:55
 * @FilePath: \lego-fe\src\store\index.ts
 */
import { createStore } from 'vuex';
import user from './user';
import template from './template';
import editor from './editor';
import type { EditorStore } from './editor';
import type { UserStore } from './user';
import type { TemplateStore } from './template';

export interface GlobalStore {
  user: UserStore;
  template: TemplateStore;
  editor: EditorStore;
}

const store = createStore<GlobalStore>({
  modules: {
    user,
    template,
    editor,
  },
});

export default store;
