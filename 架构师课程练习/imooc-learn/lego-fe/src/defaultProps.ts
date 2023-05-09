/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 17:08:05
 * @LastEditTime: 2022-06-09 18:00:47
 * @FilePath: \lego-fe\src\defaultProps.ts
 */

import { mapValues, without } from 'lodash-es';

// 通用的默认属性类型
export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  top: string;
  left: string;
  right: string;
  bottom: string;
}

// 通用的默认属性
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
};

// l-text 组件特有默认属性类型
export interface TextComponentProps extends CommonComponentProps {
  // basic props - font styles
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

export type PartialTextComponentProps = Partial<TextComponentProps>;

// l-text 组件特有默认属性
export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000000',
  backgroundColor: '',
  ...commonDefaultProps,
};

// 排除非样式属性
export const textStylePropNames = without(
  Object.keys(textDefaultProps),
  'actionType',
  'url',
  'text',
);

// 转换成组件的props属性
export const transformToComponentProps = (props: TextComponentProps) => {
  return mapValues(props, (item) => {
    return {
      type: item.constructor as StringConstructor,
      default: item,
    };
  });
};

// 获取图片原始尺寸
export const getImageDimensions = (url: string | File) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.src = typeof url === 'string' ? url : URL.createObjectURL(url);
    img.addEventListener('load', () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      resolve({ width, height });
    });
    img.addEventListener('eror', () => {
      reject(new Error('there was some problem with the image'));
    });
  });
};
