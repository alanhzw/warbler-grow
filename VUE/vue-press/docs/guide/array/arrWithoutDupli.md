<!--
 * @Author: 一尾流莺
 * @Description:删除数组中的重复元素
 * @Date: 2021-09-13 17:26:25
 * @LastEditTime: 2021-09-13 18:21:42
 * @FilePath: \vue-press\docs\guide\array\arrWithoutDupli.md
-->

# 删除数组中的重复元素

## 语法

```js
const result = arrWithoutDupli(arr);
```

## 参数

- `arr` (**Array**) ： 要去重的数组。

## 返回值

**Array** ： 返回一个去重后的新数组。

## 源码

```js
const arrWithoutDupli = (arr) => [...new Set(arr)];
```

## 例子

```js
import { arrWithoutDupli } from 'warbler-js';

const fruits = [
  'apple',
  'mango',
  'orange',
  'apple',
  'pineapple',
  'pineapple',
  'peach',
  'mango',
];

const result = arrWithoutDupli(fruits);

console.log(result); //=> ['apple', 'mango', 'orange', 'pineapple', 'peach']
```
