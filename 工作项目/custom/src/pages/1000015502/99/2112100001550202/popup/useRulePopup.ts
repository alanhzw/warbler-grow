/*
 * @Author: 一尾流莺
 * @Description:跟活动规则弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-17 11:35:49
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\hooks\useRulePopup.ts
 */
import { ref } from 'vue';

const useRulePopup = () => {
  // 是否展示规则弹窗
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
