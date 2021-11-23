<!--
 * @Description:
 *      我的页面
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-01
 * @FilePath: \intelligent-overhaul-app\src\view\User\Mine.vue
-->
<template>
  <div class="mine-container">
    <div class="mine-bg">
      <div class="title">
        <!-- <div class="title-top">我的</div>
        <div class="title-left" @click="handleClose">{{btnTitie}}</div> -->
      </div>
      <div>
        <img class="mine-img" :src="info.avatar==null||info.avatar==''? avatar :imgPath+info.avatar">
        <div v-if="info.transferToUserId==''" class="mine-name">{{info.realName}}</div>
        <div v-if="info.transferToUserId!=''" class="mine-name">{{info.realName}} (委托)</div>
        <div class="mine-org">{{info.orgName}}</div>
        <div class="mine-phone">{{info.phoneNumer}}</div>
        <div class="mine-workTypeName">{{info.workTypeName==''||info.workTypeName==null?'无工种信息':info.workTypeName}}</div>
      </div>
    </div>
    <div class="mine-foot">
      <!-- <div v-if="info.transferToUserId==''" class="mine-btn" @click="delegate">委托权限</div> -->
      <div v-if="info.transferToUserId=='' && transferData.list.length>0" class="mine-btn" @click="handleEntrust">身份切换</div>
      <div v-if="info.transferToUserId!=''" class="mine-btn" @click="transferToSelf">切换回自己</div>
    </div>
    <van-popup :overlay-style="{opacity: .4}" v-model:show="transferData.isShow" position="bottom" :style="{ height: '65%' }">
      <div class="entrust-title">
        <div class="entrust-choose">
          请选择
        </div>
        <div class="entrust-total">
          当前有{{transferData.list.length}}个权限委托
        </div>
        <div class="entrust-cancel" @click="handleEntrust">
          取消
        </div>
      </div>
      <div class="entrust-list" v-for="transfer in transferData.list">
        <div class="entrust-listInfo" @click="clickTransfer(transfer)">
          <img class="entrust-img" :src="transfer.avatar">
          <div class="entrust-info">
            <div class="entrust-name">{{transfer.applicantName}}</div>
            <div class="entrust-org">{{transfer.applicantOrganName}}</div>
          </div>
        </div>
      </div>
    </van-popup>



  </div>


</template>
<script>
  import { reactive, ref, toRefs, defineComponent,computed } from "vue";
  import { useRouter} from 'vue-router';
  import { useStore } from 'vuex';
  import { getService,imgPath } from '../../service';
  import { Toast } from 'vant';
  import avatar from '../../assets/default-member.png';

  export default defineComponent({
    name: 'Mine',
    components: {},
    setup(props, { emit }) {
      const btnTitie = "< 返回";
      const store = useStore();
      const service = getService();
      const info = computed(() => store.state.user.info);
      const router = useRouter();

      const transferData = reactive({
        list: [],
        isShow: false,
      })
      const getLeaderTransfer = (transferTo = store.state.user.info.userId) => {
        service.getLeaderTransfer({
          transferTo
        }).then(res => {
          transferData.list = res;
        })
      }
      getLeaderTransfer();


      const handleClose = () => { // 点击返回
        router.back();
      }
      const handleEntrust = () => {
        transferData.isShow = !transferData.isShow;
      }

      const delegate = () => {
        if(transferData.list.length>0){
          Toast.fail({
            message: '请您先完成别人的委托！',
          })
          return;
        }
        router.push('/h5/premission/delegation')
      }

      const clickTransfer = (e) => {
        service.transferToOther({transferUserId:e.applicant}).then(res =>{
          console.log(store.state.user.info)
          console.log('切换前token:'+store.state.user.token)
          store.state.user.info = res.userInfo;
          store.state.user.token = res.authToken;
          console.log(store.state.user.info)
          console.log('切换后token:'+store.state.user.token)
          router.push('/h5')
        })
      }
      const transferToSelf = (e) => {
        service.transferToOther({transferUserId:store.state.user.info.userId}).then(res =>{
          console.log(store.state.user.info)
          console.log('切换前token:'+store.state.user.token)
          store.state.user.info = res.userInfo;
          store.state.user.token = res.authToken;
          console.log(store.state.user.info)
          console.log('切换后token:'+store.state.user.token)
          router.push('/h5')
        })
      }
      return {
        btnTitie,
        handleClose,
        handleEntrust,
        delegate,
        info,
        transferData,
        clickTransfer,
        transferToSelf,
        imgPath,
        avatar
      }
    }
  })
</script>
<style lang='scss'>
.mine-container {
  .mine-bg{
    width: 100%;
    height: 6.73rem;
    background: #FFFFFF;
    background-image: url(/src/assets/mine-bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    // opacity: 0.8;

    .title {
      height: .88rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index: 10;
      background: rgba(255, 255, 255, 0);
      .title-top {
        font-size: .36rem;
        font-weight: 500;
        color: #FFFFFF;
        font-family: PingFangSC-Medium, PingFang SC;
      }
      .title-left {
        position: absolute;
        left: .3rem;
        font-size: .32rem;
        color: #FFFFFF;
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }
    .mine-img {
      width: 1.64rem;
      height: 1.64rem;
      border-radius: 50%;
      margin-top: 1.87rem;
    }
    .mine-name {
      height: .28rem;
      font-size: .28rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: .42rem;
      text-align:center;
      margin-top: .1rem;
    }
    .mine-org{
      height: .24rem;
      font-size: .24rem;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #FFFFFF;
      line-height: .36rem;
      margin-top: .16rem;
    }
    .mine-phone{
      height: .28rem;
      font-size: .28rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: .42rem;
      margin-top: .32rem;
    }
    .mine-workTypeName{
      padding: 0 0.1rem;
      display: inline-block;
      height: .32rem;
      background: #6796DD;
      border-radius: .16rem;
      margin: 0 auto;

      font-size: .22rem;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: .33rem;
      margin-top: .16rem;
    }
  }

  .mine-foot{
    width: 7.5rem;
    height: 6.6rem;
    background: #FFFFFF;

    .mine-btn{
      width: 6.86rem;
      height: .92rem;
      background: #FFFFFF;
      border-radius: .08rem;
      border: .01rem solid #DDDDDD;
      margin: 0 auto .16rem auto;

      font-size: .32rem;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: #000000;
      line-height: .92rem;
    }
  }


    .entrust-title{
      width: 100%;
      height: 1rem;
      border-bottom: .01rem solid rgba(0,0,0,.1);

      .entrust-choose{
        height: .36rem;
        font-size: .36rem;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #000000;
        line-height: .54rem;
        margin-top: .2rem;
      }
      .entrust-total{
        height: .24rem;
        font-size: .24rem;
        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
        font-weight: 400;
        color: #737373;
        line-height: .36rem;
        margin-top: .12rem;
      }
      .entrust-cancel{
        float: right;
        width: 1.2rem;
        height: .32rem;
        font-size: .32rem;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #045BB8;
        line-height: .48rem;
        margin-top: -0.55rem;
      }
    }

    .entrust-list  {
      width: 100%;
      height: 1.21rem;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;

      .entrust-listInfo{
        width: 100%;
        height: 1.2rem;

        .entrust-img{
          float: left;
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          margin-top: .16rem;
          margin-left: .32rem;
        }

        .entrust-info{
          float: left;
          width: 6.14rem;
          height: 1.2rem;
          border-bottom: .01rem solid rgba(0,0,0,.1);
          margin-left: .24rem;

          .entrust-name{
            text-align: left;
            height: .28rem;
            font-size: .28rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #000000;
            line-height: .42rem;
            margin-top:.24rem;
          }

          .entrust-org{
            text-align: left;
            height: .24rem;
            font-size: .24rem;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #737373;
            line-height: .36rem;
            margin-top:.12rem;
          }
        }
      }
    }


}
</style>
