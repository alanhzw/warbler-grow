/*
 * @Author: 一尾流莺
 * @Description:会员试用配置文件
 * @Date: 2021-10-25 09:32:50
 * @LastEditTime: 2021-10-26 16:04:37
 * @FilePath: \interact\src\mobile\pages\trial\config.js
 */

// 通用
import notStartCommon from './common/not-start.png';
import endCommon from './common/end.png';
import applyCommon from './common/apply.png';
import notAllowCommon from './common/not-allow.png';
import noneCommon from './common/none.png';
import backImgCommon from './common/back-img.png';
import mainImgCommon from './common/main-img.png';
import hasApplyCommon from './common/has-apply.png';
import repeatImgCommon from './common/repeat.png';

// 杜蕾斯0
import notStartDurex0 from './durex0/not-start.jpg';
import endDurex0 from './durex0/end.jpg';
import applyDurex0 from './durex0/apply.jpg';
import notAllowDurex0 from './durex0/not-allow.jpg';
import noneDurex0 from './durex0/none.jpg';
import backImgDurex0 from './durex0/back-img.jpg';
import mainImgDurex0 from './durex0/main-img.jpg';
import hasApplyDurex0 from './durex0/has-apply.jpg';
import repeatImgDurex0 from './durex0/repeat.png';

// 杜蕾斯1
import notStartDurex1 from './durex1/not-start-01.png';
import endDurex1 from './durex1/end-01.png';
import applyDurex1 from './durex1/apply-01.png';
import notAllowDurex1 from './durex1/not-allow-01.png';
import noneDurex1 from './durex1/none-01.png';
import backImgDurex1 from './durex1/back-img-01.png';
import mainImgDurex1 from './durex1/main-img-01.png';
import hasApplyDurex1 from './durex1/has-apply-01.png';
import repeatImgDurex1 from './durex1/repeat-01.png';

const trialConfig = {
  // 通用
  LzTplTrial: {
    notStart: notStartCommon,
    end: endCommon,
    apply: applyCommon,
    notAllow: notAllowCommon,
    none: noneCommon,
    hasApply: hasApplyCommon,
    backImg: backImgCommon,
    backColor: '#00147f',
    repeatImg: repeatImgCommon,
    mainImg: mainImgCommon,
    btnTop: '1rem',
    applyBtnStyle: {
      width: '100%',
      height: '1.5rem',
      top: '10.5rem',
      left: '0',
    },
    ruleBtnStyle: {
      width: '2rem',
      height: '1rem',
      top: '0.1rem',
      right: '0rem',
    },
  },
  // 杜蕾斯0
  TrialDurex: {
    notStart: notStartDurex0,
    end: endDurex0,
    apply: applyDurex0,
    notAllow: notAllowDurex0,
    none: noneDurex0,
    hasApply: hasApplyDurex0,
    backImg: backImgDurex0,
    backColor: '#090806',
    repeatImg: repeatImgDurex0,
    mainImg: mainImgDurex0,
    applyBtnStyle: {
      width: '100%',
      height: '1rem',
      top: '9rem',
      left: '0',
    },
    ruleBtnStyle: {
      width: '2rem',
      height: '1rem',
      top: '0.1rem',
      right: '0.3rem',
    },
  },
  // 杜蕾斯1
  TrialDurex1: {
    notStart: notStartDurex1,
    end: endDurex1,
    apply: applyDurex1,
    notAllow: notAllowDurex1,
    none: noneDurex1,
    hasApply: hasApplyDurex1,
    backImg: backImgDurex1,
    backColor: '#090806',
    repeatImg: repeatImgDurex1,
    mainImg: mainImgDurex1,
    applyBtnStyle: {
      width: '100%',
      height: '1rem',
      top: '10.3rem',
      left: '0',
    },
    ruleBtnStyle: {
      width: '2rem',
      height: '1rem',
      top: '0.1rem',
      right: '0.3rem',
    },
  },
  test: {
    notStart: '',
    end: '',
    apply: '',
    notAllow: '',
    none: '',
    hasApply: '',
    backImg: '',
    backColor: '090806',
    repeatImg: '',
    mainImg: '',
    btnTop: '1rem',
    applyBtnStyle: {
      width: '100%',
      height: '1.5rem',
      top: '10.5rem',
      left: '0',
    },
    ruleBtnStyle: {
      width: '2rem',
      height: '1rem',
      top: '0.1rem',
      right: '0rem',
    },
  },
};
export default trialConfig;