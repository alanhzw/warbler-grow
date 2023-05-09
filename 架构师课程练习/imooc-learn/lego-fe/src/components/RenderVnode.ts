/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-27 15:44:28
 * @LastEditTime: 2022-05-31 10:08:26
 * @FilePath: \lego-fe\src\components\RenderVnode.ts
 */
import { defineComponent } from 'vue';

const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true,
    },
  },
  render() {
    return this.vNode;
  },
});
export default RenderVnode;
