/*
 * @Description:
 * @Date: 2021-03-31 18:37:05
 * @LastEditTime: 2021-04-12 18:31:27
 * @FilePath: \my-zhihu\src\data\testData.ts
 */
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
  // post: PostProps[];
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

export interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}

export type RulesProp = RuleProp[];

export type TagType = 'input' | 'textarea';

export const currentUser: UserProps = {
  isLogin: true,
  name: 'hzw',
};

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '大苏打速度1',
    avatar:
      'https://pics1.baidu.com/feed/b64543a98226cffcc05d2449966a0f98f703ea4e.jpeg?token=cb0248258b7abdeee29df6da8bada52e',
  },
  {
    id: 2,
    title: 'test1的专栏',
    description: '大苏打速度1',
  },
  {
    id: 3,
    title: 'test1的专栏',
    description: '大苏打速度1',
    avatar:
      'https://pics1.baidu.com/feed/b64543a98226cffcc05d2449966a0f98f703ea4e.jpeg?token=cb0248258b7abdeee29df6da8bada52e',
  },
  {
    id: 4,
    title: 'test2的专栏',
    description: '大苏打速度2',
    avatar:
      'https://pics1.baidu.com/feed/b64543a98226cffcc05d2449966a0f98f703ea4e.jpeg?token=cb0248258b7abdeee29df6da8bada52e',
  },
];

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '1111111111111111',
    content: '11111111111111111',
    image: '',
    createdAt: '111111111',
    columnId: 1,
  },
  {
    id: 2,
    title: '22222222222222222',
    content: '222222222222222222',
    image: '',
    createdAt: '22222222222222',
    columnId: 1,
  },
  {
    id: 3,
    title: '333333333333333',
    content: '333333333333333',
    image: '',
    createdAt: '3333333333333333',
    columnId: 2,
  },
  {
    id: 4,
    title: '4444444444444',
    content: '44444444444444',
    image: '',
    createdAt: '44444444444444',
    columnId: 2,
  },
];

export const emailRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱不能为空',
  },
  {
    type: 'email',
    message: '电子邮箱格式不对',
  },
];
export const titleRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱不能为空',
  },
];
export const passwordRules: RulesProp = [
  {
    type: 'required',
    message: '密码不能为空',
  },
  {
    type: 'custom',
    message: '密码重复了',
    validator: (): boolean => {
      return true;
    },
  },
];
export const contentRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱不能为空',
  },
];

export const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
