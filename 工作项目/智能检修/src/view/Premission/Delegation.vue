<!--
 * @Description:
 *     权限委托
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\Premission\Delegation.vue
-->
<template>
  <div class="delegation-container">
    <div v-if="listData?.arr && listData?.arr.length > 0 ">
      <div class="container" v-for="(item, index) in listData?.arr" :key="index" @click="clickDetail(item)">
        <div class="container-left">
          <div v-if="item.state == '10' || (item.state=='20' && item.expiryDate== null)" class="circle-blue"></div>
          <div v-else class="circle-gray"></div>
        </div>
        <div class="container-right">
          <div class="title">
            <div class="title-left">权限申请</div>
            <div class="title-center">{{item.state=='10'?'申请中': item.state=='20'?'已委托': item.state=='30'?'已拒绝':item.state=='30'?'已撤销':'已收回'}}</div>
            <div class="title-right">{{item.createTime}}</div>
          </div>
          <div class="content">申请将班组委托至{{item.transferToOrganName}}{{item.transferToName}}管理</div>
        </div>
      </div>
    </div>
    <bottom-button>
      <van-button type="info" color="#4FA0F7" @click="showPopup">申请权限委托</van-button>
    </bottom-button>
    <van-popup :overlay-style="{opacity: .2}" v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
      <Detail v-if="detailShow" :popupId="selectedDetailId" :type="'1'" :state="selectedDetailState" @close="detailClose"/>
    </van-popup>
    <van-popup :overlay-style="{opacity: .4}" v-model:show="isShow" position="bottom" :style="{ height: '75%' }">
      <div class="delegation-dialog">
        <div class="title">
          <div class="title-top">申请权限委托</div>
          <div class="title-left" @click="isShow = false">取消</div>
        </div>
        <div class="content">
          <!-- <div class="content-top" @click="reasonShow = true">
            <div style="display: flex;justify-content: space-between; font-size: .28rem">
              <span style="color: #333333">委托理由</span>
              <p v-if="reason" class="reason">{{reason}}</p>
            </div>
            <div class="content-top-right">
              <span v-if="!reason" style="margin-right: .3rem;font-size: .28rem;color: #8c8c8c">请选择</span>
              <van-icon name="arrow" />
            </div>
          </div> -->
          <div class="content-bottom">
            <!-- 移交理由补充 -->
            <van-field label-width=0 type="textarea" rows="3" v-model="reasonSupplement" placeholder="委托理由" />
          </div>
        </div>
        <div class="bottom-text" v-if="JSON.stringify(selectedWorker.value) != '{}'">
          <div class="bottom-text-top">将把班组管理移交至：</div>
          <div class="bottom-text-bottom">
            <div class="list-left">
              <!-- <div class="img"></div> -->
              <img class="img" :src="selectedWorker.value.avatar==null||selectedWorker.value.avatar==''?avatar:imgPath+selectedWorker.value.avatar">
            </div>
            <div class="list-right">
              <div class="list-right-left">
                <div class="left-top">{{selectedWorker.value.title}}</div>
                <div class="left-bottom">{{selectedWorker.value.realname}}</div>
              </div>
            </div>
          </div>
        </div>
        <bottom-button>
          <van-button type="info" color="#ffffff" class="whiteBtn" @click="clickCancel">取消</van-button>
          <van-button type="info" color="#4FA0F7" @click="principalShow = true" v-if="JSON.stringify(selectedWorker.value) == '{}'">委托至</van-button>
          <van-button type="info" color="#4FA0F7" v-if="JSON.stringify(selectedWorker.value) != '{}'" @click="addTeamLeaderTransfer">确认委托</van-button>
          <!-- :disabled="!reason" -->
        </bottom-button>
        <van-popup :overlay-style="{opacity: .2}" v-model:show="reasonShow" position="bottom" :style="{ height: '75%' }">
          <Reason @handleCloseSelectReason="handleCloseSelectReason" @selectReason="selectReason" :popupList="reasonList.list"/>
        </van-popup>
        <van-popup :overlay-style="{opacity: .2}" v-model:show="principalShow" position="bottom" :style="{ height: '75%' }">
          <PopupSelectPrincipal @handleCloseSelectWorker="handleCloseSelectWorker" @selectWorker="selectWorker" :popupList="allList.list" />
        </van-popup>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, computed, defineComponent } from "vue";
import BottomButton from '../../components/BottomButton.vue';
import PopupSelectPrincipal from '../../components/PopupSelectPrincipal.vue';
import Reason from './Reason.vue';
import Detail from './Detail.vue';
import { getService } from '../../service';
import { useStore } from 'vuex';
import { Dialog, Toast } from 'vant'
import avatar from '../../assets/default-member.png';

export default defineComponent({
  name: 'Delegation',
  components: {BottomButton, PopupSelectPrincipal,Detail,Reason},
  props: {
    
  },
  setup(props) {
    const store = useStore();
    const orderInfo = computed(() => store.state.user.info);
    const service = getService();
    let listData = reactive({ // 申请列表数据
      arr: [
      // {
      //   type: "申请中",
      //   time: "10:51",
      //   detail: "申请将班组委托至第四班组王大明管理"
      // },
      // {
      //   type: "申请中",
      //   createTime: "10:59",
      //   detail: "申请将班组委托至第四班组王大明管理"
      // }
    ]
    })
    
    // 权限委托 - 获取移交申请消息列表
    const getTransferList = () => service.getTransferList({
      applicant: orderInfo.value.userId
    }).then(res => {
      // console.log(res,'111')
      listData.arr = res.records;  // 先注释掉
    })
    
    let isShow = ref(false); // 申请权限委托弹出层展示
    const showPopup = () => {
      for(var i of listData.arr){
        if(i.state == '10'){
          Toast.fail({
            message: '您已经申请，请耐心等待！',
          })
          return;
        }else if(i.state=='20' && i.expiryDate==null){
          Toast.fail({
            message: '您的权限已委任,请先收回！',
          })
          return;
        }
      }
      isShow.value = true
    }
    let detailShow = ref(false);
    
    let reason = ref(''); // 移交理由
    let reasonSupplement = ref(''); // 理由补充
    let principalShow = ref(false); // 选择委托人弹出层
    let reasonShow = ref(false);
    let allList = reactive({
      list: []
    }); // 弹窗里的list数据
    let reasonList = reactive({
      list: []
    });
    // 权限委托 - [选人]获取作业区分组及组员
    const getWorkRegionDetailList = () => service.getWorkRegionDetailList().then(res => {
      allList.list = res[0].allDepartTreeListList;
      console.log(allList.list)
    })
    let selectedWorker = reactive({
      value: {}
    }); // 选中的员工
    const selectWorker = (v) => {
      console.log(v)
      selectedWorker.value = v;
      principalShow.value = false;
    }
    
    const getReasonList = () => service.getReasonList().then(res => {
      reasonList.list = res;
      console.log(reasonList.list)
    })
    // 选中的理由
    const selectReason = (v) => {
      console.log(v)
      reason.value = v;
      reasonShow.value = false;
    }
    
    const clickCancel = () => {
      isShow.value = false;
      selectedWorker.value = {};
      reasonSupplement.value = '';
      reason.value = '';
      getTransferList();
    }
    // 关闭选择班组弹窗
    const handleCloseSelectWorker = () => {
      principalShow.value = false;
    }
    // 关闭选择委任理由弹窗
    const handleCloseSelectReason = () => {
      reasonShow.value = false;
    }
    // 权限委托 - 权限委托申请添加
    const addTeamLeaderTransfer = () => {
      
      service.addTeamLeaderTransfer({
        applicant: store.state.user.info.userId,
        applicantOrgan: store.state.user.info.orgCode,
        transferReason: reason.value,
        supplement: reasonSupplement.value,
        state: '10',
        transferTo: selectedWorker.value.id,
        transferToOrgan: selectedWorker.value.orgCode
      }).then(res => {
        // console.log(res,'111')
        if(res=="添加成功！"){
          clickCancel();
        }else{
          Toast.fail({
            message: res,
          })
        }
      })
    }
    let selectedDetailId = reactive({
      value: {}
    });
    let selectedDetailState = reactive({
      value: {}
    });
    const clickDetail = (e) => {
      selectedDetailId.value = e.id;
      selectedDetailState.value = e.state;
      detailShow.value = true;
    }
    function detailClose (){
      detailShow.value = false;
      getTransferList();
    }
    onMounted(() => {
      getTransferList();
      getWorkRegionDetailList();
      getReasonList();
    })

    return {
      listData,
      isShow,
      showPopup,
      reason,
      reasonSupplement,
      principalShow,
      addTeamLeaderTransfer,
      allList,
      selectedWorker,
      selectWorker,
      handleCloseSelectWorker,
      clickCancel,
      selectedDetailId,
      detailShow,
      clickDetail,
      detailClose,
      reasonShow,
      selectReason,
      reasonList,
      handleCloseSelectReason,
      avatar
    }
  }
})
</script>

<style lang='scss'>
.delegation-container {
  .disabled {
    background-color: #dddddd !important;
    color: #bbbbbb !important;
    border: none !important;
    border-radius: 4px !important;
  }
  .container {
    display: flex;
    height: 1.35rem;
    .container-left {
      width: .72rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .circle-blue {
        width: .24rem;
        height: .24rem;
        background-color: #4FA0F7;
        border-radius: 50%;
      }
      .circle-gray {
        width: .24rem;
        height: .24rem;
        background-color: #E5E5E5;
        border-radius: 50%;
      }
    }
    .container-right {
      padding-top: .32rem;
      flex: 1;
      border-bottom: 1px solid rgba(0,0,0,.1);
      .title {
        display: flex;
        align-items: center;
        .title-left {
          width: 1.12rem;
          font-size: .28rem;
        }
        .title-center {
          width: .72rem;
          font-size: .24rem;
          margin-left: .24rem;
        }
        .title-right {
          flex: 1;
          padding-right: .32rem;
          font-size: .24rem;
          text-align: right;
        }
      }
      .content {
        font-size: .24rem;
        text-align: left;
        margin-top: .12rem;
      }
    }
  }
  & > .bottom-button .content {
    border-top: none;
  }
  .delegation-dialog {
    & > .title {
    height: .88rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,.1);
    // position: fixed;
    // z-index: 10;
    background-color: #fff;
    .title-top {
      font-size: .36rem;
      font-weight: 500;
      color: #000;
    }
   .title-left {
      position: absolute;
      right: .3rem;
      font-size: .32rem;
      color: #045BB8;
    }
  }
    & > .content {
      padding-left: .32rem;
      .content-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.06rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        padding-right: .32rem;
        .reason {
          width: 4rem;
          margin-left: .88rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: right;
          color: #8c8c8c;
        }
        .content-top-right {
          display: flex;
          align-items: center;
        }
      }
      .content-bottom {
        .van-cell {
          padding-left: 0;
        }
      }
    }
    .bottom-text {
      margin-top: .39rem;
      padding-left: .32rem;
      padding-top: .4rem;
      border-top: 1px solid rgba(0,0,0,.1);
      .bottom-text-top {
        text-align: left;
        margin-bottom: .32rem;
      }
      .bottom-text-bottom {
        display: flex;
        .list-left {
        // width: 1.36rem;
        // height: 1.11rem;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        .img {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          // background: #D8D8D8;
        }
      }
      .list-right {
        padding-right: .32rem;
        flex: 1;
        display: flex;
        align-items: center;
        text-align: left;
        margin-left: .24rem;
        .left-bottom {
          font-size: .24rem;
        }
      }
    }
    }
  }
}
</style>