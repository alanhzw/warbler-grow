import html2canvas from 'html2canvas'
const screenshot = () => {
  // 获取需要截图的 dom 节点
  const el = document.getElementById('target-id')
  // 第一个参数是节点,第二个参数是一些配置
  // 默认是不对跨域资源做处理, 需要添加额外的配置 useCORS
  html2canvas(el, { width: 375, useCORS: true }).then(canvas => {
    // 获取要显示的节点
    const image = document.getElementById('show-id')
    // 调用 canvas 的 toDataUrl 方法转成 base64 的图片赋值给 src
    image.src = canvas.toDataUrl()
  })
}

<canvas id='canvas-qrcode'></canvas>

import QRCode from 'qrcode'

const qrCode = () => {
  // 获取需要生成二维码的 dom 节点
  const ele = document.getElementById('canvas-qrcode')
  // 生成二维码
  QRCode.toCanvas(ele, 'www.baidu.com', { width: 100 }).then(() => {
    console.log('success')
  })
}



import Clipboard from 'clipboard'

clipboard.on('success', (e) => {
  console.log('复制成功');
  e.clearSelection()
})
clipboard.on('error', (e) => {
  console.log('复制失败');
})





import { saveAs } from 'file-saver'

// 第一个参数是文件, 字符串或blob类型, 第二个参数是文件名
saveAs(file, filename)