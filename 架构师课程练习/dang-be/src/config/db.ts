/*
 * @Author: 一尾流莺
 * @Description:获取数据库的基本配置
 * @Date: 2023-02-21 09:42:25
 * @LastEditTime: 2023-02-22 16:13:13
 * @FilePath: \dang-be\src\config\db.ts
 */
interface DbConfig {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
}

interface EnvConfig {
  dev: DbConfig;
  prod: DbConfig;
}

class Config {
  static config: Config = new Config();
  env!: keyof EnvConfig;
  envConfig!: EnvConfig;
  constructor() {
    this.env = process.env.NODE_ENV === 'prod' ? 'prod' : 'dev';
    this.initConfig();
  }

  // 初始化配置
  initConfig() {
    this.envConfig = {
      dev: {
        host: 'localhost',
        user: 'root',
        password: 'xiaowei123',
        port: 3306,
        database: 'dangdang',
      },
      prod: {
        host: 'www.xxx.com',
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'dangdang',
      },
    };
  }

  // 函数重载实现获取 db 连接配置
  getConfig(): DbConfig;
  getConfig(key: string): DbConfig;
  getConfig(key: any = ''): any {
    if (this.isDbConfigKeys(key) && key.length > 0) {
      return this.envConfig[this.env][key];
    } else {
      return this.envConfig[this.env];
    }
  }

  // 判断是不是符合要求的类型
  isDbConfigKeys(key: any): key is keyof DbConfig {
    return ['host', 'user', 'password', 'database', 'port'].includes(key);
  }
}

export default Config.config;
