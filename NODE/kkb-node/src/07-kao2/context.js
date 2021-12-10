/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-10 15:56:05
 * @LastEditTime: 2021-12-10 15:56:06
 * @FilePath: \kkb-node\src\06-kao2\context.js
 */
module.exports = {
  get url() {
    return this.request.url;
  },
  get body() {
    return this.response.body;
  },
  set body(val) {
    this.response.body = val;
  },
  get method() {
    return this.request.method
  }
};