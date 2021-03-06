<!--
 * @Author: 一尾流莺
 * @Description:删除对象数组中的重复元素
 * @Date: 2021-09-13 17:26:25
 * @LastEditTime: 2021-09-13 18:21:26
 * @FilePath: \vue-press\docs\guide\array\arrObjectWithoutDupli.md
-->

# 删除对象数组中的重复元素

## 语法

```js
const result = arrObjectWithoutDupli(arr，key)
```

## 参数

- `arr` (**Array**) ： 要去重的数组。
- `key` (**String**) ： 根据对象的 `key` 去重。

## 返回值

**Array** ： 返回一个去重后的新数组。

## 源码

```js
const arrObjectWithoutDupli = (arr, key) =>
  arr.reduce((cur, next) => {
    if (!obj[next[key]]) {
      obj[next[key]] = cur.push(next);
    }
    return cur;
  }, []);
```

## 例子

```js
import { arrObjectWithoutDupli } from 'warbler-js';
const fruits = [
  { name: 'Grapes', quantity: 2 },
  { name: 'Bananas', quantity: 5 },
  { name: 'Apples', quantity: 10 },
  { name: 'Grapes', quantity: 4 },
  { name: 'Grapes', quantity: 6 },
];
const result = arrObjectWithoutDupli(fruits, 'name');
console.log(result); // =>
// [
//     {name: 'Grapes', quantity: 2},
//     {name: 'Bananas', quantity: 5},
//     {name: 'Apples', quantity: 10},
// ];
```
