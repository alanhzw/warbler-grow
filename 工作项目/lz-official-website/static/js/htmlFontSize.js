/**
 * 这一段每个页面都要，用来处理不同大小页面的兼容
 * */
(function (doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    }
    if (clientWidth >= 1920) {
      docEl.style.fontSize = '100px'
    } else
    if (clientWidth <= 1200) {
      docEl.style.fontSize = '62.5px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px'
    }
  }
  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
