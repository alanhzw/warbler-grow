import { ref, Ref } from 'vue';

const sku1 = 'https://jvod.300hu.com/vod/product/b3d3830c-d698-4184-948f-5070faf669db/1d825fa24b5746c2b2616245a8bc122d.mp4';
const sku2 = 'https://jvod.300hu.com/vod/product/f0c13124-b12c-4fec-a360-21c22b607844/c16c35159e974b85af91053695652313.mp4';
const sku3 = 'https://jvod.300hu.com/vod/product/f0110364-c287-4419-b72f-3e39e99e88e6/22312890351e4dce970e819119814883.mp4';
const sku4 = 'https://jvod.300hu.com/vod/product/a6cccf92-88c2-430c-a9f8-4065c9484539/79cc8c9777634b92970d907ecb50eb8c.mp4';
const sku5 = 'https://jvod.300hu.com/vod/product/9ecc5e8e-804f-469c-94dd-133a7107382d/ce6f163d28064d30b617e16182fd6fb3.mp4';

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
  },
  {
    video: sku2,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
  },
  {
    video: sku3,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
  },
  {
    video: sku4,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
  },
  {
    video: sku5,
    maskdex: true,
    id: Math.floor((Math.random() * 10000000) + 1),
    playStatus: false,
  },
]);

export default VideoList;
