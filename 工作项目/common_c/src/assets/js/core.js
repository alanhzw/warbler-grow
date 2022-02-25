import setHeaderShare from '@/utils/jdShare';
import constant from '@/utils/constant';

export default {
  // 是否输入emoji表情
  isEmojiCharacter(substring) {
    for (let i = 0; i < substring.length; i++) {
      const hs = substring.charCodeAt(i);
      if (hs >= 0xd800 && hs <= 0xdbff) {
        if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          const uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (uc >= 0x1d000 && uc <= 0x1f77f) {
            return true;
          }
        }
      } else if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          return true;
        }
      } else {
        if (hs >= 0x2100 && hs <= 0x27ff) {
          return true;
        }
        if (hs >= 0x2B05 && hs <= 0x2b07) {
          return true;
        }
        if (hs >= 0x2934 && hs <= 0x2935) {
          return true;
        }
        if (hs >= 0x3297 && hs <= 0x3299) {
          return true;
        }
        if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
          || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
          || hs == 0x2b50) {
          return true;
        }
      }
    }
  },
  // 年月
  timestampstr(ts) {
    if (ts) {
      const dt = ts === 'now' ? new Date() : new Date(ts);
      const monthFormat = (dt.getMonth() + 1) < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
      const dateFormat = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate();
      const hourFormat = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
      const minFormat = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
      const senFormat = dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : dt.getSeconds();
      return {
        format1: `${dt.getMonth() + 1}月${dt.getDate()}日 ${hourFormat}:${minFormat}`,
        format2: `${dt.getFullYear()}-${monthFormat}-${dateFormat} ${hourFormat}:${minFormat}:${senFormat}`,
        format3: `${dt.getFullYear()}年${monthFormat}月`,
        format4: `${dt.getFullYear()}-${monthFormat}-${dateFormat} ${hourFormat}:${minFormat}`,
        format5: `${dt.getFullYear()}-${monthFormat}-01 00:00:00`,
        format6: `${dt.getFullYear()}/${monthFormat}/${dateFormat}`,
        format7: `${dt.getFullYear()}-${monthFormat}-${dateFormat}`,
        format8: `${dt.getFullYear()}-${monthFormat}`,
      };
    }
    return '';
  },
  // 秒杀处理数据
  dealForm(n, d) {
    // 活动结束 直接结束
    if (d.status === 2) {
      d = {
        ...d,
        time: -1,
        state: 2,
      };
      return d;
    }
    d.newDate = new Date().getTime();
    const timeNow = new Date().getTime();
    // 固定周期
    if (d.beginDate) {
      d.beginDate = d.beginDate.replace(/-/g, '/');
    }
    if (d.endDate) {
      d.endDate = d.endDate.replace(/-/g, '/');
    }
    if (d.startTime) {
      d.startTime = d.startTime.replace(/-/g, '/');
    }
    if (d.endTime) {
      d.endTime = d.endTime.replace(/-/g, '/');
    }
    if (d.nextBeginDate) {
      d.nextBeginDate = d.nextBeginDate.replace(/-/g, '/');
    }
    if (d.hasCycle === 2) {
      // 活动开始时间在周期结束之后，活动结束时间在周期开始之前 （这个活动永远不会开始）
      // 活动开始时间在周期结束之后，没有下个周期
      if (new Date(d.startTime).getTime() > new Date(d.endDate).getTime() && new Date(d.endtTime).getTime() < new Date(d.beginDate).getTime()) {
        d = {
          ...d,
          time: -1,
          state: 2,
          status: 2,
        };
        return d;
      }
      if ((new Date(d.startTime).getTime() > new Date(d.endDate).getTime()) && !d.nextBeginDate) {
        d = {
          ...d,
          time: -1,
          state: 2,
          status: 2,
        };
        return d;
      }
      // 正式逻辑
      d = {
        ...d,
        // 预告时间计算
        // 1. 当前时间在周期开始之前，并，活动开始时间在设置的周期之前  取周期开始时间beginDate
        // 2. 当前时间在周期结束之后，并，活动开始时间在设置的周期之后  取下一周期开始时间nextBeginDate
        // 3. 当前时间在活动开始之前，活动开始时间在设置的周期之间  取活动开始时间 startTime
        createTime: ((timeNow > new Date(d.endDate).getTime() && d.nextBeginDate) || (new Date(d.startTime).getTime() > new Date(d.beginDate).getTime()))
          ? this.timestampstr(new Date(d.nextBeginDate).getTime()).format1
          : ((timeNow < new Date(d.beginDate).getTime()) && (new Date(d.startTime).getTime() < new Date(d.beginDate).getTime()))
            ? this.timestampstr(new Date(d.beginDate).getTime()).format1
            : this.timestampstr(new Date(d.startTime).getTime()).format1,
        // 倒计时结束时间取值
        // 如果活动结束时间在周期结束之前，使用活动结束时间
        // 其他时间使用周期结束时间
        time: d.endDate
          ? ((new Date(d.endTime).getTime() > new Date(d.endDate).getTime())
            ? (new Date(d.endDate).getTime() - timeNow)
            : (new Date(d.endTime).getTime() - timeNow))
          : '',
        // 0 预告 1 进行中  2 已结束
        state: ((new Date(d.beginDate).getTime() > timeNow) || (new Date(d.startTime).getTime() > timeNow)) ? 0
          : timeNow > new Date(d.endDate).getTime() ? (!d.nextBeginDate ? 2 : 0) : 1,
      };
    } else {
      // 每日同步 用活动开始时间，活动结束时间
      d = {
        ...d,
        createTime: timeNow > new Date(d.endTime).getTime() ? this.timestampstr(new Date(d.nextBeginDate).getTime()).format1 : this.timestampstr(new Date(d.startTime).getTime()).format1,
        time: (new Date(d.endTime).getTime()) - (timeNow),
        state: new Date(d.startTime).getTime() > timeNow ? 0
          : timeNow > new Date(d.endTime).getTime() ? 2 : 1,
      };
      // 剩余天数
      if (d.time > 24 * 60 * 60 * 1000) {
        d.day = parseInt(d.time / (24 * 60 * 60 * 1000));
        d.time %= (24 * 60 * 60 * 1000);
      } else {
        d.day = null;
      }
    }
    if (d.time <= 0) {
      clearInterval(n);
    }
    if (d.state === 2) {
      d.status = 2;
    }
    // 设置头部分享
    setHeaderShare({
      // 分享方式，如果不守则，默认值："H5"
      type: constant.SHARE_TYPE,
      // 分享标题，如果不设置，默认值："请您参与活动"
      title: d.activityName,
      // 分享图片, 如果不设置，默认值："defaultShareImg"
      imageUrl: `${constant.IMAGE_PREFIX}${d.showPicsParse}`,
    });
    return d;
  },
  dealFormDetail(n, d) {
    // // 活动结束 直接结束
    // if (d.status === 2) {
    //   d = {
    //     ...d,
    //     time: -1,
    //     state: 2
    //   }
    //   return d;
    // }
    // if(d.startTime){
    //   d.startTime = d.startTime.replace(/-/g, "/");
    // }
    // if(d.endTime){
    //   d.endTime = d.endTime.replace(/-/g, "/");
    // }
    // d = {
    //   ...d,
    //   time: (new Date(d.endTime).getTime()) - (new Date().getTime()),
    //   state: new Date(d.startTime).getTime() > new Date().getTime() ? 0 :
    //          new Date().getTime() > new Date(d.endTime).getTime() ? 2 : 1
    // }
    // if (d.time <= 0) {
    //   clearInterval(n)
    // }
    // return d;

    // 活动结束 直接结束
    if (d.status === 2) {
      d = {
        ...d,
        time: -1,
        state: 2,
      };
      return d;
    }
    d.newDate = new Date().getTime();
    const timeNow = new Date().getTime();
    // 固定周期
    if (d.beginDate) {
      d.beginDate = d.beginDate.replace(/-/g, '/');
    }
    if (d.endDate) {
      d.endDate = d.endDate.replace(/-/g, '/');
    }
    if (d.startTime) {
      d.startTime = d.startTime.replace(/-/g, '/');
    }
    if (d.endTime) {
      d.endTime = d.endTime.replace(/-/g, '/');
    }
    if (d.nextBeginDate) {
      d.nextBeginDate = d.nextBeginDate.replace(/-/g, '/');
    }
    if (d.hasCycle === 2) {
      // 活动开始时间在周期结束之后，活动结束时间在周期开始之前 （这个活动永远不会开始）
      // 活动开始时间在周期结束之后，没有下个周期
      if (new Date(d.startTime).getTime() > new Date(d.endDate).getTime() && new Date(d.endtTime).getTime() < new Date(d.beginDate).getTime()) {
        d = {
          ...d,
          time: -1,
          state: 2,
          status: 2,
        };
        return d;
      }
      if ((new Date(d.startTime).getTime() > new Date(d.endDate).getTime()) && !d.nextBeginDate) {
        d = {
          ...d,
          time: -1,
          state: 2,
          status: 2,
        };
        return d;
      }
      // 正式逻辑
      d = {
        ...d,
        // 倒计时结束时间取值
        // 如果活动结束时间在周期结束之前，使用活动结束时间
        // 其他时间使用周期结束时间
        time: d.endDate
          ? ((new Date(d.endTime).getTime() > new Date(d.endDate).getTime())
            ? (new Date(d.endDate).getTime() - timeNow)
            : (new Date(d.endTime).getTime() - timeNow))
          : '',
        // 0 预告 1 进行中  2 已结束
        state: ((new Date(d.beginDate).getTime() > timeNow) || (new Date(d.startTime).getTime() > timeNow)) ? 0
          : timeNow > new Date(d.endDate).getTime() ? (!d.nextBeginDate ? 2 : 0) : 1,
      };
    } else {
      // 每日同步 用活动开始时间，活动结束时间
      d = {
        ...d,
        time: (new Date(d.endTime).getTime()) - (timeNow),
        state: new Date(d.startTime).getTime() > timeNow ? 0
          : timeNow > new Date(d.endTime).getTime() ? 2 : 1,
      };
      // 剩余天数
      if (d.time > 24 * 60 * 60 * 1000) {
        d.day = parseInt(d.time / (24 * 60 * 60 * 1000));
        d.time %= (24 * 60 * 60 * 1000);
      } else {
        d.day = null;
      }
    }
    if (d.time <= 0) {
      clearInterval(n);
    }
    if (d.state === 2) {
      d.status = 2;
    }
    // 设置头部分享
    setHeaderShare({
      // 分享方式，如果不守则，默认值："H5"
      type: constant.SHARE_TYPE,
      // 分享标题，如果不设置，默认值："请您参与活动"
      title: d.activityName,
      // 分享图片, 如果不设置，默认值："defaultShareImg"
      imageUrl: `${constant.IMAGE_PREFIX}${d.showPicsParse}`,
    });
    return d;
  },
};

// dealForm() {
//   this.details.newDate = new Date().getTime();
//   if (this.details.hasCycle === 2) {
//     // 固定周期
//     if(this.details.beginDate){
//       this.details.beginDate = this.details.beginDate.replace(/-/g, "/");
//     }
//     if(this.details.endDate){
//       this.details.endDate = this.details.endDate.replace(/-/g, "/");
//     }
//     this.details = {
//       ...this.details,
//       createTime: this.$core.timestampstr(new Date(this.details.beginDate).getTime()).format1,
//       time: this.details.endDate ? (new Date(this.details.endDate).getTime()) - (new Date().getTime()) : '',
//       state: new Date(this.details.beginDate).getTime() > new Date().getTime() ? 0 :
//             new Date().getTime() > new Date(this.details.endDate).getTime() ? 2 : 1
//     }
//   } else {
//     // 每日同步 用活动开始时间，活动结束时间
//     if(this.details.startTime){
//       this.details.startTime = this.details.startTime.replace(/-/g, "/");
//     }
//     if(this.details.endTime){
//       this.details.endTime = this.details.endTime.replace(/-/g, "/");
//     }
//     this.details = {
//       ...this.details,
//       createTime: this.$core.timestampstr(new Date(this.details.startTime).getTime()).format1,
//       time: (new Date(this.details.endTime).getTime()) - (new Date().getTime()),
//       state: new Date(this.details.startTime).getTime() > new Date().getTime() ? 0 :
//             new Date().getTime() > new Date(this.details.endTime).getTime() ? 2 : 1
//     }
//      // 剩余天数
//     if (this.details.time > 24*60*60*1000) {
//       this.details.day = parseInt(this.details.time / (24*60*60*1000))
//       this.details.time = this.details.time % (24*60*60*1000)
//     } else {
//       this.details.day = null
//     }
//   }

//   if (this.details.time <= 0) {
//     clearInterval(this.setIntervalNum)
//   }
// },
