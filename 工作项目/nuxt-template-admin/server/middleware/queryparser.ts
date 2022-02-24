/*
 * @Author: 一尾流莺
 * @Description:解析get参数
 * @Date: 2021-12-16 18:51:37
 * @LastEditTime: 2021-12-28 14:01:54
 * @FilePath: \nuxt-template-admin\server\middleware\queryparser.ts
 */
import type { IncomingMessage, ServerResponse } from "http";
import qs from "qs";
export interface SuperIncomingMessage extends IncomingMessage {
  query: Record<string, any>;
  body: string;
}
export default async (req: SuperIncomingMessage, res: ServerResponse) => {
  if (req.method === "GET") {
    // 获取到url /api/types/gettypes?a=aaa&b=2
    const { url } = req;
    // 把参数解析成字符串 a=aaa&b=2
    const paramsStr = url.split("?")[1] || "";
    // 把字符串解析成数组  [ 'a=aaa', 'b=2' ]
    // const paramsArr = paramsStr.split("&") || [];
    // 把数组解析成对象  { a: 'aaa', b: '2' }
    // const params = paramsArr.reduce((pre, cur) => {
    //   const [key, value] = cur.split("=");
    //   pre[key] = decodeURIComponent(value) || null;
    //   return pre;
    // }, {});
    // 把对象赋值给 req.query
    req.query = qs.parse(paramsStr);
  }
};
