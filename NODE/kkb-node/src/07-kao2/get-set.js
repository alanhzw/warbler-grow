/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-09 21:51:35
 * @LastEditTime: 2021-12-09 22:00:46
 * @FilePath: \kkb-node\src\06-kao2\get-set.js
 */
const person = {
  info: {
    name: '一尾流莺'
  },
  get name() {
    return this.info.name
  },
  set name(val) {
    this.info.name = val
  }
}
console.log('🚀🚀~person.name :', person.name);
person.name = "warbler"
console.log('🚀🚀~person.name :', person.name);
