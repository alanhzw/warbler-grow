<!--
 * @Description:
 *     首页扫一扫,我的,消息的组件
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-20
 * @FilePath: \intelligent-overhaul-app\src\view\Home\Toolbar.vue
-->
<template>
  <div class="home-toolbar">
    <van-badge>
      <img @click="scanQrcode" src="../../assets/icon-qr1.png">
    </van-badge>
    <van-badge>
      <img @click="go2Mine" src="../../assets/icon-user.png">
    </van-badge>
    <van-badge :content="messageCount">
      <img @click="go2Message" src="../../assets/icon-alarm.png">
    </van-badge>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { useRouter} from 'vue-router';
import { useStore } from 'vuex';
import { getService } from '../../service';
import { Dialog, Toast } from 'vant';

// const { ctx } = getCurrentInstance();
const router = useRouter();
const service = getService();
const store = useStore()
// 点击二维码的逻辑处理
const scanQrcode = () => {
  //alert('调用轻推扫一扫');
  qt && qt.scanQRCode({
    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    success: function(res) {
      var result = res.resultStr;// 当needResult 为 1 时，扫码返回的结果
      //alert(result);
      var userType = store.state.user.info.userType
      service.queryQRCodeJumpRole({
        userType: userType,
        id: result,
      }).then(res=>{
        if(res){
          router.push('/h5/order/'+ result +'/detail')
        }else{
          var message = '无法跨部门查看工单'
          if(userType == '2' || userType == '3'){
            message = '无法查看此工单';
          }
          Dialog.alert({
            title: '无权限',
            message: message,
            width: '5.4rem',
            confirmButtonColor: '#045BB8',
            confirmButtonText: '关闭',
            className: 'is-submit-attach',
          })
        }
      })
    }
  });
}

// 进入消息页面
const go2Message = () => {
  router.push('/h5/message');
}

// 进入我的
const go2Mine = () => {
  router.push('/h5/mine');
}
let messageCount = ref('');
</script>

<style lang="scss" scoped>
.home-toolbar {
  display: flex;
  img {
    height: 0.4rem;
    margin-left: 0.4rem;
  }
}
</style>