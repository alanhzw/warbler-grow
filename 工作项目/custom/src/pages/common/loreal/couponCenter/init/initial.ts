import JD from '@/utils/platforms';
import { parsePathByPattern } from '@/utils/client';
import { cjwxRequest } from '@/utils/service';
import { PinRequestParams } from '@/utils/products/types/PinRequestParams';
import constant from '@/utils/constant';
import couponCodeVue from './components/couponCode.vue';
import { BaseInfo } from '../ts/baseInfo';
import { PinResponse } from '@/utils/products/types/PinResponse';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const startUp = (): Promise<void> => cjwxRequest.get('/wxCommonInfo/token');

const pathParams: { [propName: string]: string; } = parsePathByPattern('/m/common/loreal/couponCenter/?venderId=:venderId');

/**
 * 获取pin
 * @param params
 */
const getJdPin = async (params: PinRequestParams): Promise<PinResponse> => {
  const { data } = await cjwxRequest.post('/customer/getMyPing', {
    token: params.token,
    fromType: params.fromType,
    userId: params.venderId,
  });
  // 风控用户跳转
  if (data === '400001') {
    window.location.href = `${window.location.origin}/common/riskInfo?shopId=${params.venderId}`;
  }
  return {
    pin: data.secretPin,
    nickname: data.nickname,
  };
};

// 获取PING
async function getPin(venderId: string) {
  if (isDev) {
    return {
      pin: process.env.VUE_APP_MOCK_PIN,
      nickname: process.env.VUE_APP_MOCK_NANE,
    };
  }
  // 获取getPin所需参数
  const params = await JD.getToken();
  console.log('params', params);
  const jdTokenInSession = sessionStorage.getItem(constant.LZ_JD_CUSTOMER_TOKEN);
  console.log(jdTokenInSession);

  // 获取pin
  const pinResponse = await getJdPin({ ...params, venderId });

  console.log('pinResponse', pinResponse);

  return pinResponse;
}

const init = async () => {
  // 启动检查
  await startUp();
  const { venderId } = pathParams;
  // 获取用户pin
  const userPin = await getPin(venderId);
  sessionStorage.setItem(constant.LZ_JD_USER_PIN, userPin.pin);
  // 商家id
  sessionStorage.setItem(constant.LZ_VENDER_ID, venderId);

  return {
    ...userPin,
    venderId,
  };
};

export {
  init,
  getPin,
};
