import 'koa';
import type Router from 'koa-router';

type Params = Record<string, any>;

declare module 'koa' {
  export interface Context {
    params: Params;
  }
  export interface ContextDelegatedRequest {
    rootRouter: Router;
  }
}
