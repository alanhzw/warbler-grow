export interface ShareConfig {
  type?: string,
  title?: string,
  content?: string,
  shareUrl?: string,
  // 分享图片
  imageUrl?: string,
  /**
    * 格式： 'Wxfriends,Wxmoments,Sinaweibo,QQfriends,QQzone'
    * Wxfriends - 微信好友
    * Wxmoments - 微信朋友圈
    * Sinaweibo - 新浪微博
    * QQfriends - QQ好友
    * QQzone - QQ空间
    * 默认是： Wxfriends，如果传“”空字符串，则表示全部渠道（包括复制链接，复制链接只能识别当前url，不能识别shareUrl）
  */
  channel?: string,
  // 分享之后（分享以后）
  afterShare?: () => void,
  // 分享之前（点击的时候就调用）
  beforeShare?: ()=> void
}
