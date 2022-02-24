/*
 * @Description: 全局js
 * @Author: hanzhiwei
 * @Date: 2020-10-08 15:26:49
 * @LastEditTime: 2021-01-13 19:13:36
 * @FilePath: \SNActivity\src\assets\js\common.js
 */
// 时间格式处理函数
const timeFormat = (value, format) => {
  let date = new Date(Number(value));
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let oneMago = m - 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  let result = '';
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (h < 10) {
    h = '0' + h;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (s < 10) {
    s = '0' + s;
  }
  if (format === 'yyyy') {
    result = y;
  }
  if (format === 'yyyy-mm') {
    result = y + '-' + m;
  }
  if (format === 'yyyy-mm-dd') {
    result = y + '-' + m + '-' + d;
  }
  if (format === 'mm-dd') {
    result = m + '-' + d;
  }
  if (format === 'yyyy-mm-dd-hh-mm') {
    result = y + '-' + m + '-' + d + ' ' + h + ':' + min;
  }
  if (format === 'yyyy-oneMago-dd-hh-mm') {
    result = y + '-' + oneMago + '-' + d + ' ' + h + ':' + min;
  }
  if (format === 'yyyy-mm-dd-hh-mm-ss') {
    result = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
  }
  if (format === 'yyyy-mm-01-00-00-00') {
    result = y + '-' + m + '-' + '01' + ' ' + '00' + ':' + '00' + ':' + '00';
  }
  return result;
};

// 是否输入emoji表情
const isEmojiCharacter = (substring) => {
  for (let i = 0; i < substring.length; i++) {
    let hs = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        let ls = substring.charCodeAt(i + 1);
        let uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      let ls = substring.charCodeAt(i + 1);
      if (ls === 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2b05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (
        hs === 0xa9 ||
        hs === 0xae ||
        hs === 0x303d ||
        hs === 0x3030 ||
        hs === 0x2b55 ||
        hs === 0x2b1c ||
        hs === 0x2b1b ||
        hs === 0x2b50
      ) {
        return true;
      }
    }
  }
};

const banScale = () => {
  let lastTouchEnd = 0;
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
  document.addEventListener(
    'touchend',
    function (event) {
      let now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
};

export { timeFormat, isEmojiCharacter, banScale };
