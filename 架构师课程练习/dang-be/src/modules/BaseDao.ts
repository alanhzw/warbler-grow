/*
 * @Author: 一尾流莺
 * @Description:连接数据库 Dao 层
 * @Date: 2023-02-21 17:14:07
 * @LastEditTime: 2023-02-23 14:46:30
 * @FilePath: \dang-be\src\modules\BaseDao.ts
 */
import dbConfig from '@/config/db';
import { type Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import path from 'path';

class BaseDao {
  static baseDao: BaseDao = new BaseDao();
  sequelize!: Sequelize;
  constructor() {
    this.initSeqConf('mysql');
  }

  initSeqConf(dialect: Dialect) {
    const { host, user, password, database, port } = dbConfig.getConfig();
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, // 表示是何种数据库
      define: {
        timestamps: false, // true 表示给模型加上时间戳属性 (createAt,updateAt),false 标识不带时间戳属性
        freezeTableName: true, // true 标识使用给定的表名, false 标识模型后名加s作为表名
      },
      // 数据库连接池
      pool: {
        // 最大连接对象的个数
        max: 10,
        // 最小连接数
        min: 5,
        // 连接池中空闲连接的最大空闲时间,单位为毫秒
        idle: 10000,
        // 表示一条sql查询在获取连接资源之前的最长等待时间,单位为毫秒
        acquire: 1000,
      },
    });
  }

  addModels() {
    const modelPath = path.join(process.cwd(), '/src/modules/decorModel');
    this.sequelize.addModels([modelPath]);
  }
}

const baseDao = BaseDao.baseDao;
baseDao.addModels();
export const { sequelize } = baseDao;
