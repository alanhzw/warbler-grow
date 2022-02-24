import F6 from '@antv/f6';

/**
 * 颜色库
 */
const colors = ['#c91623', '#0295fd', '#404d7f', '#afa1ff', ''];

// 基础颜色，线色
// const baseColor = '#D7DDE4';

// 字号
const fontSize = 14;

// 行高
const lineHeight = 12;

// 文本容器高度
const textWrapperHeight = fontSize + 8;

const fontFamily = '-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Segoe UI,Arial,Roboto,"PingFang SC","Hiragino Sans GB","Microsoft Yahei",sans-serif';
// 圆角
const r = 2;

// 绘制容器
// @ts-ignore
const drawWrapper = (cfg, group) => {
  const w = cfg.size[0];
  const h = cfg.size[1];
  // node容器，用来对齐右侧节点，图标等
  return group.addShape('rect', {
    attrs: {
      x: -w / 2,
      y: 0,
      width: w, // 200,
      height: h, // 60
      radius: r,
      // stroke: '#f00',
    },
    name: 'main-box',
    draggable: true,
  });
};

// 绘制图片
// @ts-ignore
const drawImage = (cfg, group) => {
  const w = cfg.size[0];
  const h = cfg.size[1];
  // 图片
  cfg.img && group.addShape('image', {
    attrs: {
      img: cfg.img,
      width: 60,
      height: 30,
      // 图片居中
      x: -w / 2 + ((w - 60) / 2),
      y: 0,
    },
  });
};

// 绘制文本区域
// @ts-ignore
const drawText = (cfg, group) => {
  const w = cfg.size[0];
  const h = cfg.size[1];
  // 文字背景
  const sharp = group.addShape('rect', {
    attrs: {
      x: -w / 2,
      y: 34,
      width: w, // 200,
      height: textWrapperHeight,
      fill: colors[cfg.depth],
      radius: r,
    },
    name: 'title-box',
    draggable: true,
  });

  // 文字
  group.addShape('text', {
    attrs: {
      x: cfg.depth === 4 ? -w / 2 : 0,
      // y: 34 + fontSize + 4,
      y: fontSize / 2 + 4 + 34,
      // y: (-h / 2 + h - textWrapperHeight) + (textWrapperHeight / 2),
      fontSize,
      fontFamily,
      textBaseline: 'middle',
      text: cfg.name,
      fill: '#fff',
      textAlign: cfg.depth === 4 ? 'left' : 'center',
      fontWeight: '800',
    },
    name: 'title',
  });

  return sharp;
};

// 绘制任务介绍链接
// @ts-ignore
const drawLink = (cfg, group) => {
  const w = cfg.size[0];
  const h = cfg.size[1];

  cfg.intro && group.addShape('text', {
    attrs: {
      x: 0,
      y: 74,
      fontSize: 12,
      // fontFamily,
      text: '了解人物介绍',
      fill: '#92daf6',
      textAlign: 'left',
    },
    name: 'intro',
  });
};

// 绘制折叠指示器
// @ts-ignore
const drawMarker = (cfg, group) => {
  const w = cfg.size[0];
  const h = cfg.size[1];
  cfg.children && group.addShape('marker', {
    attrs: {
      x: w / 2,
      y: 34 + (textWrapperHeight / 2),
      r: 8,
      cursor: 'pointer',
      symbol: cfg.collapsed ? F6.Marker.expand : F6.Marker.collapse,
      stroke: '#666',
      lineWidth: 1,
      fill: '#fff',
    },
    name: 'collapse-icon',
  });
};

const cardNode = {
  name: 'card-node',

  // @ts-ignore
  draw(cfg, group) {
    // 绘制容器
    drawWrapper(cfg, group);

    // 绘制图片
    drawImage(cfg, group);

    // 绘制文本
    const shape = drawText(cfg, group);

    // 绘制链接
    drawLink(cfg, group);

    // 绘制折叠图标
    drawMarker(cfg, group);

    // shape 返回值决定了线以谁为基准点
    return shape;
  },

  // @ts-ignore
  setState(name, value, item) {
    // console.log('item', name, value, item.get('group'));
    if (name === 'collapsed') {
      // @ts-ignore
      const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
      const icon = value ? F6.Marker.expand : F6.Marker.collapse;
      marker?.attr('symbol', icon);
    }
  },
};

export {
  colors,
  cardNode,
};
