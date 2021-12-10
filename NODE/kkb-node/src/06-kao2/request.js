/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-10 15:55:30
 * @LastEditTime: 2021-12-10 15:55:30
 * @FilePath: \kkb-node\src\06-kao2\request.js
 */
module.exports = {
  get url() {
    return this.req.url;
  },

  get method() {
    return this.req.method.toLowerCase()
  }
};