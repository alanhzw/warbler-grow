// 获取数组元素的类型
export type ElementOfArray<T> = T extends Array<infer E> ? E : never;

export type ItemType<T extends object[]> = {
  [K in keyof ElementOfArray<T>]: ElementOfArray<T>[K];
};

// pick 函数 返回包含指定key的对象数组
export function pick<T extends Array<ItemType<T>>, K extends keyof ElementOfArray<T>>(
  raw: T,
  ...keys: K[]
): Array<Pick<ElementOfArray<T>, K>> {
  return raw.map((item) => {
    const result = keys.reduce((pre, cur) => {
      return {
        ...pre,
        [cur]: item[cur],
      };
    }, {}) as Pick<ElementOfArray<T>, K>;
    return result;
  });
}

// 返回指定 key 的 value 组成的数组
export function pickOneValue<
  T extends Array<ItemType<T>>,
  K extends keyof ElementOfArray<T>,
  E = ElementOfArray<T>,
>(raw: T, key: K) {
  return raw.map(({ [key]: v }: E) => {
    return v;
  });
}

// 一维数组去重
export function duck(raw: any[]) {
  const result: any[] = [];
  return raw.filter((item) => !result.includes(item) && result.push(item));
}

// 获取没有重复的二级分类
export function getNoReptItem<T extends Array<ItemType<T>>, K extends keyof ElementOfArray<T>>(
  raw: T,
  key: K,
) {
  const result: any[] = [];
  // 返回指定 key 的 value 组成的数组
  const oneValues = pickOneValue(raw, key);
  // 去重
  const duckValues = duck(oneValues);
  //
  raw.forEach((item) => {
    if (duckValues.includes(item[key])) {
      duckValues.splice(duckValues.indexOf(item[key]), 1);
      result.push(item);
    }
  });
  return result;
}

export type UnionToFn<U> = U extends any ? (args: U) => void : never;
export type UnionToIntersection<U> = (U extends any ? (args: U) => void : never) extends (
  args: infer I,
) => void
  ? I
  : never;

export function combine<T extends object[]>(...args: T): UnionToIntersection<T[number]>;
export function combine<T extends object[]>(...t: T) {
  return t.reduce((pre, cur) => {
    return {
      ...pre,
      ...cur,
    };
  }, {});
}

export function combineRelativeCtgy<T extends Array<ItemType<T>>>(
  arr: T,
  realKey: string,
  realValues: any,
) {
  return arr.map((item) => {
    return combine(item, { [realKey]: realValues });
  });
}
