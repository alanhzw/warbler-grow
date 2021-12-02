/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-25 23:45:43
 * @LastEditTime: 2021-12-02 14:45:37
 * @FilePath: \webpack-01\src\index.js
 */
// import less from './style/index.less'
import pic from './images/main.jpg'


// 静态资源
// 图片 第三方字体文件
// 资源压缩 优化
// image-webpack-loader

// 图片资源的使用场景
// html img标签
const img = new Image()
img.src = pic
const tag = document.getElementById("app")
tag.appendChild(img)
// css 背景图
//   div {
//   height: 100px;
//   background: blue;
//   display: flex;
//   background: url(../images/main.jpg) 0 0 no - repeat;
// }
// 这样路径是有问题的

// js dom操作




