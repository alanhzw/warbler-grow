import { AxiosRequestConfig } from 'axios';

/**
 * 把axios的.then里面的返回值参数从AxiosResponse<R>转换成any，这样使用service的时候
 * 就不会出现类型转换的问题了。
 */
declare module 'axios' {
  interface AxiosInstance {
    getUri(config?: AxiosRequestConfig): string;
    request<T = any, R = any> (config: AxiosRequestConfig): Promise<R>;
    get<T = any, R = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = any, R = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
    options<T = any, R = any>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    patch<T = any, R = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  }
}
