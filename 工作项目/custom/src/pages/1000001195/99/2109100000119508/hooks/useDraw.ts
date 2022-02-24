/*
 * @Author: 一尾流莺
 * @Description:抽奖内容
 * @Date: 2021-09-01 14:23:25
 * @LastEditTime: 2021-09-05 21:12:15
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\hooks\useDraw.ts
 */
import { ref } from 'vue';
import { Toast } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';
import initDrawList from '../config/drawList';
import { apisOptions } from '../config/index';

const useDrawList = (baseInfo: BaseInfo, canDrawTimes: any, drawStatus:any, isShowNoPopup:any, isShowSuccessPopup:any, isShowEntityPopup:any, isShowNoPrizePopup:any, main:any, handlerGetStatus:any) => {
  // 开卡链接
  const openCardLink = `https://shopmember.m.jd.com/shopcard?venderId=1000001195&shopId=1000001195&venderType=5&channel=7025&returnUrl=${window.location.href}`;

  // 抽奖结果
  const drawResult = ref(6);
  // giftId
  const giftId = ref('');
  // 奖品列表
  const drawList = ref(initDrawList);
  // 标志变量  指示当前是否正在抽奖
  const isDraw = ref(false);
  // 当前时间
  let startTime = Date.now();
  // 时间累加器
  let t = 0;
  // 默认转五圈
  let loopSum = 5;
  // 用于高亮显示的奖品id
  let loopId = 1;
  // 抽奖接口
  const postDraw = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post(apisOptions.draw, {
        activityId: baseInfo.activityId,
        pin: baseInfo.pin,
      });
      const { data } = res;
      if (res.result) {
        if (data.drawOk) {
          drawResult.value = data.position;
          giftId.value = data.addressId;
        } else {
          drawResult.value = 6;
        }
        main();
        handlerGetStatus();
      }
      // 测试代码
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
    } catch (error) {
      if (error && error.message) {
        Toast.fail(error.message);
      }
    } finally {
      Toast.clear();
    }
  };

  // 抽奖
  const handlerDraw = async (id: number) => {
    // id为9的时候是点击了抽奖按钮
    if (id !== 9) {
      return;
    }
    // 如果正在抽奖 返回
    if (isDraw.value) {
      Toast.fail('正在抽奖,请等待抽奖结果~');
      return;
    }
    // 不符合条件
    if (drawStatus.value === 3) {
      isShowNoPopup.value = true;
      return;
    }
    // 未开卡
    if (drawStatus.value === 4) {
      window.location.href = openCardLink;
      return;
    }
    // 如果没有抽奖次数
    // canDrawTimes.value = 1;
    if (canDrawTimes.value < 1) {
      Toast.fail('抱歉,您的抽奖次数已用尽~');
      return;
    }
    await postDraw();
    // 接口报错了
    if (drawResult.value < 0) {
      return;
    }
    loopSum = 5;
    // 指示当前开始抽奖
    isDraw.value = true;
    function foo():number {
      // 切换高亮奖品
      loopId += 1;
      // 重置高亮奖品,减少循环圈数
      if (loopId > 8) {
        loopSum -= 1;
        loopId = 1;
      }
      // 切换奖品高亮状态
      drawList.value.forEach((item) => {
        if (item.id === loopId) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
      // 不是最后一圈的时候就一直转
      if (loopSum < 1 && loopId === drawResult.value) {
        isDraw.value = false;

        return drawResult.value;
      }
      return 100;
    }
    // 需要循环的方法
    function loop(timeInterval: any) {
      let result;
      // 累加时间
      t += timeInterval;
      // 时间达到后执行
      if (t > 100) {
        result = foo();
        // 重置时间累加器
        t = 0;
      }
      return result;
    }

    // raf
    function handleTicker() {
      const finallyId = loop(Date.now() - startTime) || -1;
      startTime = Date.now();
      // 圈数大于0的时候就一直转
      if (loopSum > 0 || (loopSum < 1 && finallyId !== loopId)) {
        requestAnimationFrame(handleTicker);
      } else {
        setTimeout(() => {
          if (finallyId === 2) {
            isShowEntityPopup.value = true;
          } else if (finallyId === 6) {
            isShowNoPrizePopup.value = true;
          } else {
            isShowSuccessPopup.value = true;
          }
        }, 300);
      }
    }
    requestAnimationFrame(handleTicker);
  };

  return {
    drawList,
    handlerDraw,
    drawResult,
    giftId,
  };
};

export default useDrawList;
