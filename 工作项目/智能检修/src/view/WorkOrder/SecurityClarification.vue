<!--
 * @Description:
 *      线下安全交底页面
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-15
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\SecurityClarification.vue
-->
<template>
  <!-- 班组长页面 -->
  <div class="attach" v-if='identity==="2"'>
    <common-title title='请上传线下安全交底及确认照片' v-if="!isAttach"></common-title>
    <common-title title='无照片' v-if="isAttach && attachList.length===0"></common-title>
    <common-title title='线下安全交底及确认照片' class="margin-bottom-32" v-if="isAttach && attachList.length>0"></common-title>
    <uploader ref='uploader' v-if="!isAttach"></uploader>
    <div v-if="isAttach && attachList.length > 0">
      <div class="attach-list-item">
        <!-- <div class="attach-name margin-bottom-32">挂牌人员：{{item.sysUserId}}</div> -->
        <div class="attach-list-divs">
          <div v-for='(pre,ur) in attachList' :key='ur' class="attach-img-item">
            <img v-if="pre.pic != ''" :src="pre.pic" @click="showImg(pre)">
          </div>
        </div>
      </div>
    </div>
    <bottom-button v-if='!isAttach'>
      <van-button type="info" color="#4FA0F7" @click='submit()'>已线下交底</van-button>
    </bottom-button>
  </div>
  <!-- 作业长页面  组员页面 -->
  <div v-if='identity!=="2" ' class="attach-list">
    <common-title title='等待班组长上传照片' v-if="!isAttach"></common-title>
    <common-title title='无照片' v-if="isAttach && attachList.length===0"></common-title>
    <common-title title='线下安全交底及确认照片' class="margin-bottom-32" v-if="isAttach && attachList.length>0"></common-title>
    <div v-if="isAttach && attachList.length > 0">
      <div class="attach-list-item">
        <!-- <div class="attach-name margin-bottom-32">挂牌人员：{{item.sysUserId}}</div> -->
        <div class="attach-list-divs">
          <div v-for='(pre,ur) in attachList' :key='ur' class="attach-img-item">
            <img v-if="pre.pic != ''" :src="pre.pic" @click="showImg(pre)">
          </div>
        </div>
      </div>
    </div>
    <bottom-button v-if='identity==="3" && isAttach && showButton==true'>
      <!-- <van-button type="info" color="#4FA0F7" v-if='disabled' :disabled='disabled' :class="{disabled:disabled}">已线下交底 ({{countdown}}秒)</van-button> -->
      <van-button type="info" color="#4FA0F7" @click='submitRecord'>已线下交底</van-button>
    </bottom-button>
  </div>
  <van-popup v-model:show="imgBoxShow">
    <img :src="previewImg" style="width: 6.8rem">
  </van-popup>
</template>
<script>
import BottomButton from '../../components/BottomButton.vue';
import CommonTitle from '../../components/CommonTitle.vue';
import Uploader from '../../components/ScUploader.vue';
import { Dialog, Toast } from 'vant';
import { getService, imgPath } from '../../service';
import { useStore } from 'vuex';
import { useRouter, useRoute } from "vue-router";
import { ref, toRefs, reactive, computed, onMounted, watch } from 'vue';


// 安全交底页面
export default {
  components: { BottomButton, CommonTitle, Uploader },
  name: 'SecurityClarification',
  setup (props) {
    const uploader = ref(null);
    const service = getService();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      //当前身份 作业长1  班组长2  组员3
      identity: computed(() => store.state.user.info.userType),
      disabled: computed(() => state.countdown > 0),//底部button是否可以点击
      countdown: 20,//倒计时
      showButton: true, //是否展示确认按钮
      attachList: [],
      //各个阶段的状态
      status: {},
      //是否进行过交底
      isAttach: computed(() => {
        if (state.status.statusThree && state.status.statusThreeDate) {
          return true
        } else {
          return false
        }
      }),
    });
    //提交
    const submit = () => {
      if (uploader.value.photoList.length === 0 && uploader.value.checked) {
        Dialog.confirm({
          title: '是否提交',
          message: '未上传任何照片',
          width: "5.4rem",
          confirmButtonColor: "#045BB8",
          confirmButtonText: "确定",
          className: "is-submit-attach",
        }).then(() => {
          alert("线下安全交底");
          //todos  确定的回调
          submitAttach()
        }).catch(() => {
          //todos  取消的回调
        })
      } else if (uploader.value.photoList.length === 0 && !uploader.value.checked) {
        Toast.fail({
          message: '请上传照片'
        })
      } else {
        submitAttach()
      }
    }
    //提交
    const submitAttach = () => {
      service.submitOfflinePic({
        id: null,
        pic: uploader.value.photoList.map((item) => {
          return item.url
        }).toString(),
        trustFormMainTableId: route.params.id
      }).then(res => {
        Toast.success({
          message: '提交成功'
        })
        getAttach()
      })
    }

    const submitRecord = () =>{
      service.editRecord({
        trustFormMainTableId: route.params.id,
        clarificationFlg: '1'
      }).then((res) => {
        state.showButton=false
      })
    }
    //获取信息
    const getAttach = () => {
      service.getOfflingInfo({
        trustFormMainTableId: route.params.id
      }).then((data) => {
        state.status = data.progressStatus
        data.znjxBsnOfflineSecurityClarifications.forEach((item) => {
            if(item.pic) {
              item.pic = imgPath + item.pic
            }
        })
        state.attachList = data.znjxBsnOfflineSecurityClarifications
        // 获取 安全交底记录
        service.getSecurityClarificationRecord({
          trustFormMainTableId: route.params.id
        }).then((res) => {
          res.forEach((ele)=>{
            if(store.state.user.info.transferToUserId){
              if(ele.sysUserId == store.state.user.info.transferToUserId && ele.clarificationFlg == '1'){
                state.showButton=false
              }
            }else{
              if(ele.sysUserId == store.state.user.info.userId && ele.clarificationFlg == '1'){
                state.showButton=false
              }
            }
          })
        })
      })
    }

    onMounted(() => {
      getAttach()
      const timer = setInterval(() => {
        state.countdown -= 1
        if (state.countdown < 0) {
          window.clearInterval(timer)
        }
      }, 1000);
    })
    const imgBoxShow = ref(false)
    const previewImg = ref("")

    return {
      ...toRefs(state),
      submit,
      uploader,
      imgBoxShow,
      previewImg,
      showImg (pre) {
        imgBoxShow.value= true
        previewImg.value = pre.pic
      },
      submitRecord

    }
  }
}
</script>
<style lang="scss">
.van-dialog {
  border-radius: 0.14rem;
  .van-dialog__message--has-title {
    padding-bottom: 0.32rem;
  }
}
.attach {
  padding: 0.32rem;
  .margin-bottom-32 {
    margin-bottom: 0.28rem;
  }
}
.is-submit-attach {
  .van-dialog__header {
    font-size: 0.36rem;
    line-height: 0.54rem;
    color: rgba(0, 0, 0);
  }

  .van-dialog__message--has-title {
    font-size: 0.3rem !important;
    color: #888888 !important;
  }

  .van-button__text {
    font-size: 0.36rem;
    line-height: 0.54rem;
  }
}
.attach-list {
  padding: 0.32rem;

  .disabled {
    background-color: #dddddd !important;
    color: #bbbbbb !important;
    border: none !important;
    border-radius: 4px !important;
  }
}
.attach-list-item {
  display: flex;
  flex-direction: column;
  .attach-img-item {
  }
  .attach-name {
    text-align: left;
    font-size: 0.28rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
    line-height: 0.42rem;
  }
  .attach-list-divs {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    img {
      width: 80px;
      height: 80px;
      margin: 0 0px 8px 0;
    }
  }
}
</style>
