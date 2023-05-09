/**
 * 动态管理图片
 */
import goodStorage from "good-storage";

export class ImgUtil {
  // 声明图片列表
  static imgList: Record<string, string> = {};

  // 缓存图片列表
  static storageImgList() {
    this.imgList = goodStorage.get("imgList") || {};
    if (this.isEmpty()) {
      this.loadAllImg();
      goodStorage.set("imgList", this.imgList);
    }
  }

  // 判断图片列表是否为空
  static isEmpty() {
    return !Object.getOwnPropertyNames(this.imgList).length;
  }

  // 获取图片
  static getImg(imgName: string) {
    return ImgUtil.imgList[imgName];
  }

  // 加载全部图片
  static loadAllImg() {
    // 获取项目中所有图片
    const imgMap: Record<string, any> = import.meta.glob("../assets/**/*.png", {
      eager: true,
    });

    // 声明绝对路径
    let absolutePath: string = "";
    // 声明图片名称
    let imgName: string = "";
    // 遍历所有图片
    for (const path in imgMap) {
      if (Object.prototype.hasOwnProperty.call(imgMap, path)) {
        // 获取图片的相对路径
        absolutePath = imgMap[path].default;
        if (absolutePath) {
          // 获取图片的名称
          imgName = absolutePath.substring(absolutePath.lastIndexOf("/") + 1);
          // 图片列表赋值 key:文件名 value:文件的相对路径
          this.imgList[imgName] = absolutePath;
        }
      }
    }
  }
}
