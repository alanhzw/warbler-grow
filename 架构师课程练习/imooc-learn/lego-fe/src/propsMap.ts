/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-26 11:11:11
 * @LastEditTime: 2022-06-16 14:29:41
 * @FilePath: \lego-fe\src\propsMap.ts
 */
import { h, VNode } from 'vue';

import type { TextComponentProps } from './defaultProps';

const fontFamilyArr = [
  {
    value: '"SimSun","STSong',
    text: '宋体',
  },
  {
    value: '"SimHei","STHeiti',
    text: '黑体',
  },
];

const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    text: h('span', { style: { fontFamily: font.value } }, font.text),
  };
});

// 属性转化成表单 哪个属性使用哪个类型的组件去编辑
export interface PropsToForm {
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: {
    text: string | VNode;
    value: any;
  }[];
  initalTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
  valueProp?: string;
  eventName?: string;
}

// 属性列表转化成表单列表
export type PropsToForms = {
  [p in keyof TextComponentProps]?: PropsToForm;
};

// 属性转化成表单的映射表 key:属性  value:使用的组件
export const mapPropsToForms: PropsToForms = {
  // 比如: text 属性,使用 a-input 这个组件去编辑
  text: {
    component: 'a-textarea',
    extraProps: {
      rows: 3,
    },
    text: '文本',
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: any) => (e ? `${e}px` : ''),
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    initalTransform: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      {
        value: 'left',
        text: '左',
      },
      {
        value: 'center',
        text: '中',
      },
      {
        value: 'right',
        text: '右',
      },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [
      {
        value: '',
        text: '无',
      },
      ...fontFamilyOptions,
    ],
    afterTransform: (e: any) => e,
  },
  color: {
    component: 'color-picker',
    text: '字体颜色',
  },
};
