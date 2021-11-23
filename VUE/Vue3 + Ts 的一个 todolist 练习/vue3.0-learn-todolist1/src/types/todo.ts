/*
 * @Description:
 * @Date: 2021-03-17 19:52:35
 * @LastEditTime: 2021-03-17 20:17:10
 * @FilePath: \vue3.0-learn-todolist1\src\types\todo.ts
 */

//定义一个借口约束state的数据类型
export interface Todo {
  id: number;
  title: string;
  isSelect: boolean;
}
