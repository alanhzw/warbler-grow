/*
 * @Description:
 * @Date: 2021-04-13 18:26:04
 * @LastEditTime: 2021-04-14 17:28:29
 * @FilePath: \my-zhihu\src\utils\index.ts
 */

interface checkCoundition {
  format?: string[];
  size?: number;
}
type ErrorType = 'size' | 'format' | null;
export const beforeUploadCheck = (file: File, condition: checkCoundition) => {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = 'format';
  }
  if (!isValidSize) {
    error = 'size';
  }
  return {
    passed: isValidFormat && isValidSize,
    error,
  };
};

interface testProps {
  _id: string;
  name: string;
}

const testData: testProps[] = [
  {
    _id: '1',
    name: 'aaa',
  },
  {
    _id: '2',
    name: 'bbb',
  },
];

const testData2: { [key: string]: testProps } = {
  1: {
    _id: '1',
    name: 'aaa',
  },
  2: {
    _id: '2',
    name: 'bbb',
  },
};

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>): { [key: string]: T } => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current;
    }
    return prev;
  }, {} as { [key: string]: T });
};

export const objToArr = <T>(obj: { [key: string]: T }): T[] => {
  return Object.keys(obj).map((key) => obj[key]);
};

const result = arrToObj(testData);
const result2 = objToArr(testData2);

console.log('🚀🚀~ result:', result);
console.log('🚀🚀~ result2:', result2);
