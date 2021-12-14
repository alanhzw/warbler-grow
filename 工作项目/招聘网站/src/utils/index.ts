import { TOKEN_KEY } from './constant';

export const checkLogin = (): boolean => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  return typeof token === 'string' && token !== '';
};
