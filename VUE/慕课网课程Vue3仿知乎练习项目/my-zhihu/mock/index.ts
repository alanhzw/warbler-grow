/*
 * @Description:
 * @Date: 2021-04-09 18:39:14
 * @LastEditTime: 2021-04-10 18:27:56
 * @FilePath: \my-zhihu\mock\index.ts
 */
export default [
  {
    url: '/api/columns',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: [
          {
            id: 1,
            title: 'test1的专栏',
            description: '大苏打速度1',
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
          },
          {
            id: 4,
            title: 'test2的专栏',
            description: '大苏打速度2',
          },
        ],
      };
    },
  },
  {
    url: '/api/column',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: [
          {
            id: 1,
            title: 'test1的专栏',
            description: '大苏打速度1',
            avatar:
              'https://pics1.baidu.com/feed/b64543a98226cffcc05d2449966a0f98f703ea4e.jpeg?token=cb0248258b7abdeee29df6da8bada52e',
          },
        ],
      };
    },
  },
  {
    url: '/api/column/posts',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: [
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
        ],
      };
    },
  },
  {
    url: '/user/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: {
          token: 'asdasdasdasdasdasdasd',
        },
      };
    },
  },
  {
    url: '/user/current',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: {
          column: 1,
          email: '174184746@qq.com',
          name: 'test1',
          id: 'dsdadsa',
        },
      };
    },
  },
];
