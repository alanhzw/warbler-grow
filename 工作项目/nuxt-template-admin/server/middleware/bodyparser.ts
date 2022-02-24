/*
 * @Author: 一尾流莺
 * @Description:解析post参数
 * @Date: 2021-12-17 15:00:26
 * @LastEditTime: 2021-12-20 16:53:03
 * @FilePath: \nuxt-template-admin\server\middleware\bodyparser.ts
 */
import type { IncomingMessage, ServerResponse } from 'http';

export interface SuperIncomingMessage extends IncomingMessage {
  query: Record<string, any>;
  body: string;
}
export default async (req: SuperIncomingMessage, res: ServerResponse) => {
  // 服务器端的请求已经自带 req.body  不需要处理
  if (req.method === 'POST' && !req.body) {
    let reqData = [];
    let size = 0;
    await new Promise<void>((resolve, reject) => {
      req.on('data', (data: Buffer) => {
        reqData.push(data);
        size += data.length;
      });
      req.on('end', () => {
        const data = Buffer.concat(reqData, size);
        req.body = data.toString();
        resolve();
      });
    });
  }
};
