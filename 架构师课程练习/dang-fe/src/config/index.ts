interface BaseConf {
  baseApi: string;
  mockApi: string;
}

interface EnvConf {
  development: BaseConf;
  production: BaseConf;
}

class AllConf {
  env!: keyof EnvConf;
  isMock: boolean = false;
  baseApi!: string;
  mockApi!: string;
}

class EnvConfigClass {
  static envConfigClass: EnvConfigClass = new EnvConfigClass();
  readonly curEnv = (import.meta.env.MODE as keyof EnvConf) || 'production';
  envConf!: EnvConf;
  allConfig!: AllConf;
  constructor() {
    this.initEnvConfig();
    this.getAllConf();
  }
  initEnvConfig() {
    this.envConf = {
      development: {
        baseApi: '/dang',
        mockApi: 'www.baidu.com',
      },
      production: {
        baseApi: '/dang',
        mockApi: 'www.baidu.com',
      },
    };
  }
  getAllConf() {
    this.allConfig = {
      env: this.curEnv,
      isMock: false,
      ...this.envConf[this.curEnv],
    };
  }
}

export default EnvConfigClass.envConfigClass.allConfig;
