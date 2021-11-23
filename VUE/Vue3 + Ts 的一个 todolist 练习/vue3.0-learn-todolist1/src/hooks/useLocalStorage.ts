/*
 * @Description:
 * @Date: 2021-03-19 15:11:59
 * @LastEditTime: 2021-03-19 15:37:36
 * @FilePath: \vue3.0-learn-todolist1\src\hooks\useLocalStorage.ts
 */
import { Todo } from "../types/todo";
const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos_key", JSON.stringify(todos));
};
const readTodos = (): Todo[] => {
  console.log("123:", JSON.parse(localStorage.getItem("todos_key") || "[]"));
  return JSON.parse(localStorage.getItem("todos_key") || "[]");
};
export { saveTodos, readTodos };
