/*
 * @Author: 一尾流莺
 * @Description:活动规则弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-11-29 11:54:21
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\popup\useRulePopup.ts
 */
import { ref } from 'vue';

const useRulePopup = () => {
  // 是否展示活动规则弹窗
  const isShowRulePopup = ref(false);

  // 打开活动规则弹窗
  const openRulePopup = () => {
    isShowRulePopup.value = true;
  };

  // 关闭活动规则弹窗
  const closeRulePopup = () => {
    isShowRulePopup.value = false;
  };
  return {
    isShowRulePopup,
    openRulePopup,
    closeRulePopup,
  };
};

export default useRulePopup;
