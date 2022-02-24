/*
 * @Author: 一尾流莺
 * @Description:跟弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-05 19:20:20
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\hooks\usePopup.ts
 */
import { ref } from 'vue';

const usePopup = () => {
  // 是否展示规则弹窗
  const isShowRulePopup = ref(false);
  // 是否我的奖品弹窗
  const isShowMyPrizePopup = ref(false);
  // 是否展示未中奖弹窗
  const isShowNoPrizePopup = ref(false);
  // 是否展示不符合条件弹窗
  const isShowNoPopup = ref(false);
  // 是否展示中奖弹窗
  const isShowSuccessPopup = ref(false);
  // 是否展示中实物弹窗
  const isShowEntityPopup = ref(false);
  // 是否显示入会成功弹窗
  const isShowMemberPopup = ref(false);
  // 是否展示添加地址弹窗
  const isShowAddPopup = ref(false);

  return {
    isShowRulePopup,
    isShowMyPrizePopup,
    isShowNoPrizePopup,
    isShowNoPopup,
    isShowSuccessPopup,
    isShowEntityPopup,
    isShowMemberPopup,
    isShowAddPopup,
  };
};

export default usePopup;
