<!--
 * @Description:
 *    上传组件
 * @Author:HJ
 * @Date: 2021-05-15
 * @LastEditTime: 2021-05-31
 * @FilePath: \intelligent-overhaul-app\src\components\Uploader.vue
-->
<template>
  <div class="uploader">
    <div class="attach-top-uploader">
      <van-uploader :after-read="afterRead" v-model="photoList" multiple :before-delete='beforeDelete' :disabled='checked'>
        <div class="uploader-area">
          <van-icon name="plus" />
        </div>
      </van-uploader>
    </div>
    <div class="attach-bottom">
      <div class="attach-bottom-title">无需/无法拍照</div>
      <div class="attach-bottom-switch">
        <van-switch v-model="checked" active-color="#4DD865" inactive-color="#dcdee0" @change="changeChecked" />
      </div>
    </div>
  </div>
</template>

<script>
import { getService } from '../service';
import { Toast } from 'vant';
const service = getService();

export default {
  data () {
    return {
      photoList: [],//照片列表
      checked: false,//滑块开关
    }
  },
  methods: {
    //上传图片完成后的回调
    afterRead (file) {
    let that = this;
      if(file.length>1){
        file.forEach((element,index) => {
          // 此时可以自行将文件上传至服务器
          let fd = new FormData()
          fd.append('file', element.file)
          service.upload(fd,{'Content-Type': 'multipart/form-data'}).then((res) => {
            that.photoList[index].url = res;
            Toast.success({
              message: '上传图片成功'
            })
          })
        });
      }else{
        // 此时可以自行将文件上传至服务器
        let fd = new FormData()
        fd.append('file', file.file)
        service.upload(fd,{'Content-Type': 'multipart/form-data'}).then((res) => {
          that.photoList[that.photoList.length-1].url = res;
          Toast.success({
            message: '上传图片成功'
          })
        })
      }   
    },
    //删除图片之前的确认弹窗回调
    beforeDelete () {
      return true
    },
    //开启无需拍照
    changeChecked () {
      if (this.checked && this.photoList.length > 0) {
        this.$dialog.confirm({
          title: '是否删除照片',
          message: '启动该功能将清空已上传照片',
          width: "5.4rem",
          confirmButtonText: "确定",
          confirmButtonColor: "#045BB8",
          className: "is-delete-attach-img",
        }).then(() => {
          this.checked = true
          this.photoList = []
          this.$emit('changeChecked', this.checked)
        })
          .catch(() => {
            this.checked = false
          })
      }
    }
  }
}
</script>

<style lang='scss'>
.uploader {
  .attach-top-uploader {
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    padding: 0.32rem 0 0.32rem 0.32rem;
    border-bottom: 1px solid #cccccc;
    transform: translateX(-0.32rem);

    .van-uploader__preview-delete {
      position: absolute;
      top: 0;
      left: 0;
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 4px 0 10px 0;
      background-color: #6796dd;

      .van-uploader__preview-delete-icon {
        top: -1px;
        right: 0px;
      }
    }

    .uploader-area {
      width: 1.58rem;
      height: 1.58rem;
      border-radius: 8px;
      border: 1px solid #dddddd;
      color: #cccccc;
      display: flex;
      justify-content: center;
      align-items: center;

      .van-icon-plus {
        font-size: 0.64rem;
      }
    }
  }
  .attach-bottom {
    display: flex;
    justify-content: space-between;

    .attach-bottom-title {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      line-height: 0.45rem;
      font-size: 0.28rem;
      margin: 0.38rem 0 0 0;
    }
    .attach-bottom-switch {
      margin-top: 0.22rem;
      .van-switch {
        width: 1rem;
        height: 0.6rem;
      }
    }
  }
}
.is-delete-attach-img {
  .van-dialog__header {
    font-size: 0.36rem;
    line-height: 0.54rem;
    color: rgba(0, 0, 0);
  }

  .van-dialog__message--has-title {
    font-size: 0.32rem !important;
    color: #888888 !important;
  }

  .van-button__text {
    font-size: 0.36rem;
    line-height: 0.54rem;
  }
}
</style>