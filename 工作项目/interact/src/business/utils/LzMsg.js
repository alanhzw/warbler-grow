import { Message } from 'lz-element-ui';
// 在引入按需加载之后出现了，直接导出Message报错的问题
// 可能是由于babel-plugin-component对引入的element的Message资源进行拆解引起的
export default {
  info: Message.info,
  error: Message.error,
  success: Message.success,
};
