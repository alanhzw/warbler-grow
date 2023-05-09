/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 11:26:58
 * @LastEditTime: 2022-05-19 11:40:53
 * @FilePath: \lego-fe\src\store\template.ts
 */

import type { Module } from 'vuex';
import type { GlobalStore } from './index';
export interface TemplateProps {
  templateName: string;
  age: number;
}

export type TemplateList = TemplateProps[];

export interface TemplateStore {
  templateList: TemplateList;
}

const templateList: TemplateList = [
  {
    templateName: 'foo',
    age: 18,
  },
  {
    templateName: 'boo',
    age: 20,
  },
];

const templateStore: Module<TemplateStore, GlobalStore> = {
  state: {
    templateList: templateList,
  },
  getters: {
    getTemplateByName: (state) => (name: string) => {
      return state.templateList.find((t) => t.templateName === name);
    },
  },
};

export default templateStore;
