import {
  combine,
  combineRelativeCtgy,
  type ElementOfArray,
  getNoReptItem,
  pick,
} from '@/modules/commontype';

export interface SecThrCtgyList {
  secondctgyId: number;
  secctgyName: string;
  firstctgyId: number;
  thirdctgyId: number;
  thirdctgyName: string;
}

export function convert(raw: SecThrCtgyList[]) {
  const secCtgyList = pick(raw, 'secondctgyId', 'secctgyName');
  // 去重后的二级三级分类
  const noReptSecCtgyList = getNoReptItem(secCtgyList, 'secondctgyId');
  const thirdCtgyList = pick(raw, 'thirdctgyId', 'thirdctgyName', 'secondctgyId');
  const relSecThrCtgyList = combineRelativeCtgy(noReptSecCtgyList, 'thirdCtgys', []);
  const lastSecThrCtgyList: typeof relSecThrCtgyList = [];
  type LastSecThrCtgy = ElementOfArray<typeof relSecThrCtgyList>;
  noReptSecCtgyList.forEach((noReptSecCtgy) => {
    const lastThirdList: typeof thirdCtgyList = [];
    thirdCtgyList.forEach((thirdCtgy) => {
      if (noReptSecCtgy.secondctgyId === thirdCtgy.secondctgyId) {
        lastThirdList.push({
          thirdctgyId: thirdCtgy.thirdctgyId,
          thirdctgyName: thirdCtgy.thirdctgyName,
          secondctgyId: thirdCtgy.secondctgyId,
        });
      }
    });
    const lastSecThrCtgy: LastSecThrCtgy = combine(noReptSecCtgy, { thirdCtgys: lastThirdList });
    lastSecThrCtgyList.push(lastSecThrCtgy);
  });
  return lastSecThrCtgyList;
}
