/*
 * @Author: YC
 * @Date: 2020-12-01 14:31:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 10:15:59
 * @Description:
 */
import Vue from 'vue';
import MemberCard from './MemberCard';
import Text from './Text';
import Hotzone from './Hotzone';
import OpenCard from './OpenCard';
import UpgradeGift from './UpgradeGift';
import SingleRowFigure from './SingleRowFigure';
import DoubleRowFigure from './DoubleRowFigure';
import Swipe from './Swipe';
import SlideFigure from './SlideFigure';
import FloorTitle from './FloorTitle';
import Tags from './Tags';
import FloatIcon from './FloatIcon';
import Countdown from './Countdown';
import MemberCoupon from './MemberCoupon';
import PointMoneyBuy from './PointMoneyBuy';
import PointExchange from './PointExchange';
import PointSeckill from './PointSeckill';
import MemberRight from './MemberRight';
import MemberDiscount from './MemberDiscount';
import BottomNav from './BottomNav';


const deepCopy = obj => JSON.parse(JSON.stringify(obj));
const factory = (Ctrl) => {
  // console.log(`注册组件：${Ctrl.info.name}`);
  const components = {};
  Object.keys(Ctrl.components).forEach((component) => {
    const componentName = `${Ctrl.info.name}_${component}`;
    if (typeof Vue.component(componentName) === 'function') {
      throw new Error(`组件重名[${Ctrl.info.name}]，请修改组件信息中的组件名称`);
    } else {
      Vue.component(componentName, Ctrl.components[component]);
      components[component] = componentName;
    }
  });
  return {
    info: {
      enableBI: false,
      ...Ctrl.info,
    },
    components,
    createFloor(options = {
      floorId: null,
      componentInfo: {},
      data: {},
      extra: {
        isShowFloor: 1,
        floorKey: '', // floor的唯一标识
        floorTitle: '', // floor title
        isSaved: 0, // 是否已保存 0 - 未保存、 1 - 已保存
        upCrowd: 0, // 是否启用BI 0 - 不启用、 1 - 启用
        crowdData: [], // BI 人群数据
        strategyData: [], // 京东BI数据
        targetedActivityId: '', // 京东BI活动ID
        targetedType: 1,
      },
    }) {
      return Promise.resolve({
        floorId: options.floorId,
        info: this.info,
        componentInfo: options.componentInfo,
        components,
        data: Object.assign({
          floorName: '',
        }, deepCopy(Ctrl.initData), deepCopy(options.data)), // 此处不使用深拷贝会使得指针类型的数据出现多个同类组件共享的情况
        funs: Ctrl.funs,
        validators: Ctrl.validators,
        extra: options.extra,
      });
    },
  };
};

const ctrls = {
  MemberCardCtrl: factory(MemberCard),
  TextCtrl: factory(Text),
  HotzoneCtrl: factory(Hotzone),
  SingleRowFigureCtrl: factory(SingleRowFigure),
  DoubleRowFigureCtrl: factory(DoubleRowFigure),
  SwipeCtrl: factory(Swipe),
  SlideFigureCtrl: factory(SlideFigure),
  FloorTitleCtrl: factory(FloorTitle),
  TagsCtrl: factory(Tags),
  FloatIconCtrl: factory(FloatIcon),
  CountdownCtrl: factory(Countdown),
  BottomNav: factory(BottomNav),
};
if (process.env.VUE_APP_PLATEFORM !== 'tmall') {
  Object.assign(ctrls, {
    OpenCardCtrl: factory(OpenCard),
    UpgradeGiftCtrl: factory(UpgradeGift),
    MemberCouponCtrl: factory(MemberCoupon),
    PointExchangeCtrl: factory(PointExchange),
    PointSeckillCtrl: factory(PointSeckill),
    PointMoneyBuyCtrl: factory(PointMoneyBuy),
    MemberRight: factory(MemberRight),
    MemberDiscount: factory(MemberDiscount),
  });
}
export default ctrls;
