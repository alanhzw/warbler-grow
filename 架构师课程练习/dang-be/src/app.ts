import Koa from 'koa';
import routerLoader from '@/common/AllCtrlRouterLoader';
import globalException from '@/common/GlobalException';

const app = new Koa();

// 注册全局异常中间件
app.use(globalException);

// 调用动态加载路由
routerLoader.init(app);
