/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-10 15:55:48
 * @LastEditTime: 2021-12-10 15:55:49
 * @FilePath: \kkb-node\src\06-kao2\response.js
 */
// response.js
module.exports = {
  get body() {
    return this._body;
  },
  set body(val) {
    this._body = val;
  }
};