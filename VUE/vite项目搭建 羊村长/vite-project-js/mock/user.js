/*
 * @Description:
 * @Date: 2021-03-21 15:43:57
 * @LastEditTime: 2021-07-08 15:26:49
 * @FilePath: \vite-project-js\mock\user.js
 */
export default [
  {
    url: '/api/getUsers',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: ['tom', 'jerry'],
      };
    },
  },
  {
    url: '/api/getFloors',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: {
          floorInfo: '楼层'
        },
      };
    },
  },
];
