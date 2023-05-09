/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 11:26:58
 * @LastEditTime: 2022-05-19 11:40:48
 * @FilePath: \lego-fe\src\store\user.ts
 */

import type { Module } from 'vuex';
import type { GlobalStore } from './index';
export interface UserProps {
  username: string;
  age: number;
}

export type UserList = UserProps[];

export interface UserStore {
  userList: UserList;
}

const userList: UserList = [
  {
    username: 'foo',
    age: 18,
  },
  {
    username: 'boo',
    age: 20,
  },
];

const userStore: Module<UserStore, GlobalStore> = {
  state: {
    userList: userList,
  },
  getters: {
    getUserByName: (state) => (name: string) => {
      return state.userList.find((u) => u.username === name);
    },
  },
};

export default userStore;
