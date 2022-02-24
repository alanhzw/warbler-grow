import { ref, Ref } from 'vue';

const sku1 = 'https://jvod.300hu.com/vod/product/d14ef6fe-7dc8-488e-b561-ba22b2097bd8/16ab7a987c0d4392962922645cd9c02b.mp4';
const sku2 = 'https://jvod.300hu.com/vod/product/353f1b6e-f427-4b90-b0fe-4c0b99f55d6a/f812868b32234e7ca33c067dfa5eebb5.mp4';
const sku3 = 'https://jvod.300hu.com/vod/product/2ed22c30-d143-4c66-b2b9-5acb6ec4aa9c/02154e26840548dbaed6b35fa031b672.mp4';
const sku4 = 'https://jvod.300hu.com/vod/product/30572738-0301-4caa-ba02-a74e2747d3a0/9ed85ecc9ba64edba33ebc61ef2fffed.mp4';
const sku5 = 'https://jvod.300hu.com/vod/product/f2479473-fc44-466c-a199-99f528812305/9ac75f0575ff47869078eb7a33033922.mp4';
const page1 = 'https://img10.360buyimg.com/imgzone/jfs/t1/137723/14/23809/745619/61ada452E3d421968/1b2d86375c99e935.png';
const page2 = 'https://img10.360buyimg.com/imgzone/jfs/t1/137723/14/23809/745619/61ada452E3d421968/1b2d86375c99e935.png';
const page3 = 'https://img10.360buyimg.com/imgzone/jfs/t1/137723/14/23809/745619/61ada452E3d421968/1b2d86375c99e935.png';
const page4 = 'https://img10.360buyimg.com/imgzone/jfs/t1/137723/14/23809/745619/61ada452E3d421968/1b2d86375c99e935.png';
const page5 = 'https://img10.360buyimg.com/imgzone/jfs/t1/137723/14/23809/745619/61ada452E3d421968/1b2d86375c99e935.png';

export interface VidItem {
  video: string;
  maskdex: boolean;
  id: number;
  playStatus: boolean;
}
export type VideoList = Ref<Array<VidItem>>

// 商品列表  固定的六个
const VideoList:VideoList = ref([
  {
    video: sku1, // 商品图
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
    pageImg: page1,
  },
  {
    video: sku2,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
    pageImg: page2,
  },
  {
    video: sku3,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
    pageImg: page3,
  },
  {
    video: sku4,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
    pageImg: page4,
  },
  {
    video: sku5,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
    pageImg: page5,
  },
]);

export default VideoList;
