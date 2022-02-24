<template>
 <div>
   <div class='tips'>全部框架建议横屏观看</div>
   <div id="container" class="container" :style="style"></div>
   <van-popup v-model:show="introShow" closeable close-icon-position="bottom-left">
    <div class="dialog">
      <div class="dialog-header">
        <div class="avatar">
          <img :src="introContent.avatar"/>
        </div>
        <div class="name" v-text="introContent.name"></div>
      </div>
      <div class="dialog-body" v-html="introContent.desc"></div>
    </div>
   </van-popup>
 </div>
</template>

<script lang="ts" setup>
import F6 from '@antv/f6';
import TreeGraph from '@antv/f6/dist/extends/graph/treeGraph';
import { nextTick, onMounted, ref } from 'vue';
import { Popup as VanPopup } from 'vant';
import CLIENT_TYPE, { getClientType } from '@/utils/platforms/clientType';
import { loadScript } from '@/utils/client';
import { isMiniProgram, setHeaderShare } from '@/utils';
import { cardNode } from './cardNode';
import { datasource } from './data';

F6.registerGraph('TreeGraph', TreeGraph);
F6.registerNode(cardNode.name, cardNode);

/**
 * 页面全局样式
 */
const style = ref({
  width: 750,
  height: 750,
});

/**
 * 基础图形实例
 */
const graph = ref();

/**
 * 人物介绍弹窗
 */
const introShow = ref(false);

/**
 * 人物介绍
 */
const introContent = ref({});

// 文本容器高度
const textWrapperHeight = 20;

/**
 * 节点宽度
 */
const nodeWidth = [176, 150, 285, 180, 140];

/**
 * 布局
 */
const layout = {
  type: 'mindmap',
  direction: 'H',
  // getHeight: () => 16,
  // getWidth: () => 16,
  // 节点纵向间距的回调函数
  getVGap: () => 25,
  // 节点横向间距的回调函数
  getHGap: () => 120,
  // 向右展开
  getSide: () => 'right',
};

/**
 * 交互模式
 */
const modes = {
  default: [
    'drag-canvas',
    'zoom-canvas',
  ],
};

/**
 * 连接线 方式
 */
const defaultEdge = {
  // type: 'polyline', //  多段线段构成的折线，连接两个端点：
  type: 'cubic-horizontal', // 水平方向的三阶贝塞尔曲线，不考虑用户从外部传入的控制点
  style: {
    // endArrow: true,
    stroke: '#4f5551',
  },
};

/**
 * 人物介绍点击
 * @param model
 */
const onIntroClick = (model:any) => {
  // console.log('model', model);
  introContent.value = model.intro;
  introShow.value = true;
};

/**
 * 计算node
 * @param node
 */
const renderNode = (node :any) => {
  let height = textWrapperHeight;
  const width = nodeWidth[node.depth];
  // 如果含有图片，则需要增加30高度
  if (node.img) {
    height += 32;
  }
  return {
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
    type: cardNode.name,
    size: [width, height],
    position: 'left',
  };
};

/**
 * 重绘图
 */
const renderResize = () => {
  // 判断横竖屏
  const width: number = document.documentElement.clientWidth;
  const height: number = document.documentElement.clientHeight;
  graph.value.changeSize(width, height);
  graph.value.fitCenter();
  graph.value.fitView();
};

/**
 * 初始化图
 */
const updateChart = () => {
  const { width, height } = style.value;

  const f6Options = {
    container: 'container',
    width,
    height,
    fitView: true,
    defaultEdge,
    layout,
    modes,
    fitViewPadding: 20,
  };

  // 创建F6实例
  graph.value = new F6.TreeGraph(f6Options);
  graph.value.on('node:tap', (e: any) => {
    if (e.target.get('name') === 'collapse-icon' || e.target.get('name') === 'title' || e.target.get('name') === 'title-box') {
      e.item.getModel().collapsed = !e.item.getModel().collapsed;
      graph.value.setItemState(e.item, 'collapsed', e.item.getModel().collapsed);
      graph.value.layout();
    }
    // 点击人物介绍
    if (e.target.get('name') === 'intro') {
      onIntroClick(e.item.getModel());
    }
  });
  graph.value.node(renderNode);
  graph.value.data(datasource);
  graph.value.render();
  graph.value.fitView();

  window.addEventListener('resize', renderResize, false);
};

/**
 * 页面加载
 */
const onLoad = async () => {
  // 注册自定义树，节点等
  style.value = {
    width: window.screen.availWidth,
    height: window.screen.availHeight,
  };
  updateChart();
  // 显示控制台
  await loadScript('https://cdn.bootcdn.net/ajax/libs/vConsole/3.7.0/vconsole.min.js');
  if (window.VConsole && window.location.href.split('?')[1]?.includes('debug')) {
    const vc = new window.VConsole();
  }
  // await loadScript('https://wq.360buyimg.com/js/common/dest/wq.wxapi.core.8d12715068.js');
  // // eslint-disable-next-line no-undef
  // JD.wxapi.ready(() => {
  //   // eslint-disable-next-line no-undef
  //   wx.onMenuShareAppMessage({
  //     title: '京东组织架构结构图', // 分享标题
  //     desc: '京东组织架构结构图',
  //     link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
  //     imgUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/207909/39/11719/668905/61ada3aaEbbbd8ad9/15ae41e69d9b4c8f.png', // 分享图标
  //   });
  //   // eslint-disable-next-line no-undef
  //   wx.onMenuShareTimeline({
  //     title: '京东组织架构结构图', // 分享标题
  //     link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
  //     imgUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/207909/39/11719/668905/61ada3aaEbbbd8ad9/15ae41e69d9b4c8f.png', // 分享图标
  //   });
  // });
  setHeaderShare({
    type: '2',
    title: '京东组织架构结构图',
    content: '京东组织架构结构图',
    imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/143818/24/22948/57663/61b2fea2E10d47fef/32b963b3cce9497e.png',
  });
};

/**
 * 挂载完成
 */
onMounted(() => nextTick(onLoad));

</script>

<style lang="scss">
body{
  padding: 0;
  margin: 0;
  background-color: #2c2c2f;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.container{
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.dialog{
  width: 6.80rem;
  height: 8rem;
  max-height: 95vh;
  max-width: 90vw;
  background: white;
  border-radius: 5px;
  /*box-shadow: 0 0 10px black;*/
  background: url("https://img10.360buyimg.com/imgzone/jfs/t1/213583/35/6350/25037/61a7290cEa29a8536/5b4eeeea76488561.png") no-repeat center;
  /*background-size: 6.80rem 8rem;*/
  background-size: contain;
  padding: 1rem .6rem;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .dialog-header{
    display: flex;
    gap: .2rem;
    align-items: center;
    justify-content: center;
    padding: .2rem;
    .avatar{
      width: 2rem;
      height: 2rem;
      overflow: hidden;
      position: relative;
      img{
        height: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .name{
      font-size: .3rem;
      font-weight: 800;
    }
  }
  .dialog-body {
    padding: 0 0.1rem;
    overflow-y: auto;
    line-height: 1.5;
  }
}

.van-popup__close-icon--bottom-left{
  left:50% !important;
  bottom: 0 !important;
  opacity: 0 !important;
  transform: translateX(-50%);
}
.tips{
  font-size: .24rem;
  color: #fff;
}
</style>
