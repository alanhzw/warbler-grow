import AMap from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';

let AMAP: any = null;

export const getAmap = async (): Promise<any> => {
  // return
  if (!AMAP) {
    AMAP = await AMap.load({
      key: 'ffb88befc49ff6e8c46c2b54dfb95d49',
      version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        'AMap.CitySearch',
        'AMap.Autocomplete',
        'AMap.PlaceSearch',
        'AMap.Geocoder',
        'AMAP.Marker',
        'AMAP.LngLat',
      ],
    });
  }
  return AMAP;
};
