/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 17:44:44
 * @LastEditTime: 2022-06-10 15:39:41
 * @FilePath: \lego-component\src\hooks\useComponentCommon.ts
 */
import { computed } from 'vue';
import { pick } from 'lodash-es';
import { CommonComponentProps } from '../defaultProps';

// 使用 lodash 的 pick 方法挑选出样式属性,并返回一个点击事件处理函数
const useComponentCommon = (
  props: Readonly<Partial<CommonComponentProps & { isEditing: boolean }>>,
  picks: string[],
) => {
  const styleProps = computed(() => pick(props, picks));
  const handleClick = () => {
    if (props.actionType === 'url' && props.url && !props.isEditing) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handleClick,
  };
};

export default useComponentCommon;
