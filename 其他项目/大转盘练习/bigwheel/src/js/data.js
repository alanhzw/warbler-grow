/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-01 18:56:46
 * @LastEditTime: 2021-03-03 11:10:41
 * @FilePath: \bigwheel\src\js\data.js
 */
const SettingsMap = {
  4: {
    dataList: [
      {
        data: "奖品1",
      },
      {
        data: "奖品2",
      },
      {
        data: "奖品3",
      },
      {
        data: "奖品4",
      },
    ],
    rotate: 90,
    skewY: 0,
  },
  6: {
    dataList: [
      {
        data: "奖品1",
      },
      {
        data: "奖品2",
      },
      {
        data: "奖品3",
      },
      {
        data: "奖品4",
      },
      {
        data: "奖品5",
      },
      {
        data: "奖品6",
      },
    ],
    rotate: 60,
    skewY: 30,
  },
  8: {
    dataList: [
      {
        data: "奖品1",
      },
      {
        data: "奖品2",
      },
      {
        data: "奖品3",
      },
      {
        data: "奖品4",
      },
      {
        data: "奖品5",
      },
      {
        data: "奖品6",
      },
      {
        data: "奖品7",
      },
      {
        data: "奖品8",
      },
    ],
    rotate: 45,
    skewY: 45,
  },
  10: {
    dataList: [
      {
        data: "奖品1",
      },
      {
        data: "奖品2",
      },
      {
        data: "奖品3",
      },
      {
        data: "奖品4",
      },
      {
        data: "奖品5",
      },
      {
        data: "奖品6",
      },
      {
        data: "奖品7",
      },
      {
        data: "奖品8",
      },
      {
        data: "奖品9",
      },
      {
        data: "奖品10",
      },
    ],
    rotate: 36,
    skewY: 54,
  },
  12: {
    dataList: [
      {
        data: "奖品1",
      },
      {
        data: "奖品2",
      },
      {
        data: "奖品3",
      },
      {
        data: "奖品4",
      },
      {
        data: "奖品5",
      },
      {
        data: "奖品6",
      },
      {
        data: "奖品7",
      },
      {
        data: "奖品8",
      },
      {
        data: "奖品9",
      },
      {
        data: "奖品10",
      },
      {
        data: "奖品11",
      },
      {
        data: "奖品12",
      },
    ],
    rotate: 30,
    skewY: 60,
  },
};
export default {
  async getWheelSettings(type) {
    return type in SettingsMap ? SettingsMap[type] : {};
  },
};
