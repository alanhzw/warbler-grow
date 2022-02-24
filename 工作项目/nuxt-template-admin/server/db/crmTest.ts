/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-20 15:56:51
 * @LastEditTime: 2021-12-27 12:11:37
 * @FilePath: \nuxt-template-admin\server\db\crmTest.ts
 */
import mysql from "mysql";
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "test-mysql.dianpusoft.cn",
  port: 30001,
  user: "dbuser",
  password: "lzKJDb1013!k",
  database: "s_template",
});

const executeSql = (sql: string) =>
  new Promise((resolve, reject) => {
    pool.query(sql, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

export default {
  // 获取模板列表
  async getTemplateList(query: Record<string, any>) {
    let sql = "SELECT * FROM s_template_templates where 1 = 1";
    if (query?.tType > 0) {
      sql += ` and  tType = ${query.tType}`;
    }
    if (query.templateName) {
      sql += ` and templateName like '%${query.templateName}%'`;
    }
    if (query.templateKey) {
      sql += ` and templateKey = '${query.templateKey}'`;
    }
    return await executeSql(sql);
  },
  // 获取模板详情
  async getTemplateDetail(templateId: string): Promise<unknown> {
    return await executeSql(`SELECT * FROM s_template_templates where templateId = ${templateId}`);
  },
  // 获取模板类型
  async getTemplateTypes(): Promise<unknown> {
    return await executeSql(`SELECT * FROM s_template_template_type`);
  },
};
