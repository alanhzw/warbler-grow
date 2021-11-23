/*
 * @Description:
 * @Date: 2021-04-12 11:29:29
 * @LastEditTime: 2021-04-12 11:34:48
 * @FilePath: \my-zhihu\src\hooks\useDOMCreate.ts
 */
import { onUnmounted } from 'vue';

const useDOMCreate = (nodeId: string): void => {
  const node = document.createElement('div');
  node.id = nodeId;
  document.body.appendChild(node);
  onUnmounted(() => {
    document.body.removeChild(node);
  });
};
export default useDOMCreate;
