import globalException from './GlobalException';
import type Koa from 'koa';
import path from 'path';
import fs from 'fs';
import Router from 'koa-router';
import json from 'koa-json';
import body from 'koa-body';
class AllCtrlRouterLoader {
  app!: Koa;
  static allCtrlRouterLoader: AllCtrlRouterLoader = new AllCtrlRouterLoader();
  init(app: Koa) {
    this.app = app;
    this.loadMiddleWare();
    this.storeRootRouterToCtx();
    this.loadAllCtrlRouterWrapper();
    this.listen();
  }

  loadMiddleWare() {
    this.app.use(json());
    this.app.use(body());
    this.app.use(globalException);
  }

  storeRootRouterToCtx() {
    const rootRouter = new Router();
    // 定义路由前缀 , 一级路径
    rootRouter.prefix('/dang');
    this.app.context.rootRouter = rootRouter;
    this.app.use(rootRouter.routes());
  }

  loadAllCtrlRouterWrapper() {
    // 获取所有路由文件的绝对路径
    const filePaths = this.getAbsoluteFilePaths();
    // 加载所有的二级路由到一级路由
    filePaths.forEach((filePath) => {
      require(filePath);
    });
  }

  listen() {
    this.app.listen(3002);
    console.log('程序运行在3002端口');
  }

  getFileNames(dir: string) {
    return fs.readdirSync(dir);
  }

  isCtrlFile(file: string) {}

  getAbsoluteFilePaths() {
    // 获取路由文件所在目录
    const dir = path.join(process.cwd(), '/src/controller');
    // 获取所有的文件名称
    const allFiles = this.getFileNames(dir);
    // 拼接所有文件的绝对路径
    const allFullFilePaths: string[] = [];
    allFiles.forEach((file) => {
      allFullFilePaths.push(path.join(dir, file));
    });
    return allFullFilePaths;
  }
}

export default AllCtrlRouterLoader.allCtrlRouterLoader;
