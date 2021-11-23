<!--
 * @Description:
 *      施工的页面
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-10
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Execution.vue
-->
<template>
  <div class="execution" v-if="haveSelf">
    <div class="btn-size" v-if="showBtn">
      <van-button type="info" @click="addStratRecord">
        <div class="big-size">{{workStatusName}}</div>
        <div class="small-size">{{dataTime}}</div>
      </van-button>
    </div>
    <div class="title mb024 fw500">施工履历</div>
    <div class="list">
      <div class="list-left fw500">序号</div>
      <div class="list-center-left fw500">状态</div>
      <div class="list-center-right fw500">时间</div>
      <div class="list-left fw500">工时</div>
    </div>
    <div class="list">
      <div class="list-left">总计</div>
      <div class="list-center-left"></div>
      <div class="list-center-right"></div>
      <div class="list-left">{{allTime}}</div>
    </div>
    <div class="list" v-for="item in dataList" :key="item.id">
      <div class="list-left">{{item.index}}</div>
      <div class="list-center-left">{{item.type}}</div>
      <div class="list-center-right">{{item.time}}</div>
      <div class="list-left">{{item.times}}</div>
    </div>
    <div class="title fw500" v-if="showBtn">上传施工情报</div>
    <uploader ref='uploader' v-if="showBtn"></uploader>
    <div class="title fw500" v-if="!showBtn && picList.length > 0">施工情报图片</div>
    <div class="execution-list-item" v-if="picList.length > 0">
      <div class="execution-list-divs">
        <div v-for='(pic,ur) in picList' :key="ur">
          <img v-if="pic != ''" :src="imgPath+pic" @click="showImg(imgPath+pic)">
        </div>
      </div>
    </div>
    <bottom-button v-if="showBtn">
      <van-button type="info" color="#ffffff" @click='submit()' class="whiteBtn">自检完成 确认完工</van-button>
    </bottom-button>
  </div>
  <van-popup v-model:show="imgBoxShow">
    <img :src="previewImg" style="width: 6.8rem">
  </van-popup>
  <div v-if="!haveSelf">
    无需参与施工
  </div>
</template>
<script>
import dayjs from "dayjs"
import { reactive, onMounted, ref,toRefs, onBeforeUnmount } from "vue";
import BottomButton from '../../components/BottomButton.vue';
import CommonTitle from '../../components/CommonTitle.vue';
import Uploader from '../../components/Uploader.vue';
import { useRouter, useRoute } from "vue-router";
import { Dialog, Toast } from 'vant';
import { getService,imgPath } from '../../service';
import { useStore } from 'vuex';
// 施工页面
export default {
  name: 'Execution',
  components: { BottomButton, CommonTitle, Uploader },
  setup (props) {
    // let dataList = [{
    //   id: 1,
    //   type: "开工",
    //   time: "2021-04-21 12:00:00",
    //   timeNum: 4.0
    // }, {
    //   id: 2,
    //   type: "暂停",
    //   time: "2021-04-21 12:00:00",
    //   timeNum: 4.0
    // }, {
    //   id: 3,
    //   type: "继续",
    //   time: "2021-04-21 12:00:00",
    //   timeNum: 4.0
    // }, {
    //   id: 4,
    //   type: "完工",
    //   time: "2021-04-21 12:00:00",
    //   timeNum: 4.0
    // },];
    const uploader = ref(null);
    const route = useRoute();
    const store = useStore();
    let timer = '';
    let dataTime = ref(''); // 计时
    let allTime = ref(0);
    let dataList = reactive([]); // 表格数据
    // 开工状态变量 01：开工，02：暂停，03：继续，04：完工
    let workStatus = '';
    let workStatusName = ref('开工');
    let haveSelf = ref(false);
    const state = reactive({
      picList : [],
    })
    const canStart = ref(false);
    const service = getService();

    const getConstructionPersonnelList = ()=> service.getConstructionPersonnelList({
      trustFormMainTableId: route.params.id
    }).then(res => {
      console.log(res)
      for(var i in res){
        if(store.state.user.info.transferToUserId){
          if(res[i].sysUserId == store.state.user.info.transferToUserId){
            haveSelf.value = true;
          }
        }else{
          if(res[i].sysUserId == store.state.user.info.userId){
            haveSelf.value = true;
          }
        }
        
      }
    })
    getConstructionPersonnelList();
    // 获取施工履历
    const getConstructionList = () => service.getConstructionList({
      trustFormMainTableId: route.params.id,
    }).then(res => {
      let constructionDtoList = res.znjxBsnStratRecordList
      // for(var i in res.pic){
      //   if(res.pic[i]){
      //     res.pic[i] = imgPath + res.pic[i];
      //   }
      // }
      state.picList = res.pic
      console.log(res,'111')
      if(constructionDtoList && constructionDtoList.length>0) {
        let tmpStatus = constructionDtoList[constructionDtoList.length-1].state;
        addBtnClick = true;
        if(tmpStatus == "02") {
          workStatus = '03'
          workStatusName.value = '继续'
        } else if (tmpStatus == '03' || tmpStatus == '01') {
          workStatus = '02'
          workStatusName.value = '暂停'
        } else {
          workStatus = '04'
          workStatusName.value = '已完工'
        }

      } else {
        workStatus = '01'
      }
      if(workStatus == '04'){
        // 已完工把按钮隐藏
        showBtn.value = false;
      }
      Object.assign(dataList, constructionDtoList);
      var i = 1;
      var totalTime = 0;
      dataList.forEach(e=>{
        var arr = ['','开工','暂停','继续','完工']
        e.index = i++;
        e.type = arr[Number(e.state)];
        if(e.times == null){
          e.times = '-'
        }
        totalTime = e.totaltimes;
      })

      allTime.value = totalTime;

      // 获取 安全交底记录
        service.getSecurityClarificationRecord({
          trustFormMainTableId: route.params.id
        }).then((res) => {
          if(store.state.user.info.userType=='2'){
            canStart.value = true
          }
          res.forEach((ele)=>{
            if(store.state.user.info.transferToUserId){
              if(ele.sysUserId == store.state.user.info.transferToUserId && ele.clarificationFlg == '1' && ele.securityFlg == '1' && store.state.user.info.userType!='2'){
                canStart.value = true
              }
            }else{
              if(ele.sysUserId == store.state.user.info.userId && ele.clarificationFlg == '1' && ele.securityFlg == '1' && store.state.user.info.userType!='2'){
                canStart.value = true
              }
            }
          })
        })

    })
    let addBtnClick = false; // 是否点击开工按钮
    // 工程委托单 - 开工记录添加
    // "开工状态 01：开工，02：暂停，03：继续，04：完工"
    // 点击这个按钮，开工和继续继续状态来回切换
    const addStratRecord = () => {
      
      if(workStatus == '04'){
        // 提示已完工
        addBtnClick = false;
        Toast.fail('已完工！')
        return;
      }
      if(!canStart.value){
        // 提示请先完成安全交底确认
        addBtnClick = false;
        Toast.fail('请先完成安全交底和质量要点确认！')
        return;
      }
      service.addStratRecord({
      state: workStatus,
      trustFormMainTableId: route.params.id,
    }).then(res => {
      console.log(res)
      if(res == 'error'){
        Dialog.alert({
          title: '无法开工',
          message: '当前有项目处于施工中',
          width: "5.4rem",
          confirmButtonColor: "#000000",
          confirmButtonText: "关闭",
          className: "is-submit-execution",
        })
        return
      }else{
        addBtnClick = true;
        getConstructionList();
      } 
    }).catch(err => {
      console.log(err)
    })
    }

    let showBtn = ref(true); //展示按钮
    // 上传图片
    const addSgInformationg = () => {
      return service.addSgInformationg({
        pic: uploader.value?.photoList.map((item) => {
          return item.url
        }).toString() || '',
        trustFormMainTableId: route.params.id,
      })
    }
    // 确认完工
    const finalAddStratRecord = () => {
      return service.addStratRecord({
        state: '04',
        trustFormMainTableId: route.params.id,
      })
    }
    // 提交
    const submit = async () => {
      if(!addBtnClick) {
        return;
      }
      if(workStatus == '04'){
        // 提示已完工
        Toast.fail('已完工！')
        return;
      }
      try {
        await addSgInformationg();
        await finalAddStratRecord();
        getConstructionList();
        showBtn.value = false;
      } catch(err) {
        console.log(err)
      }
    }
    // 通过委托单ID,查询施工者信息
    const getCommencementRecord = () => {
      service.getCommencementRecord({
        trustFormMainTableId: route.params.id,
      }).then(res => {
        console.log(res,'111')
      })
    }

    const imgBoxShow = ref(false)
    const previewImg = ref("")

    onMounted(() => {
      /* 每秒定时刷新 */
      timer = setInterval(() => {
        dataTime.value = dayjs().format("HH:mm:ss")
        // console.log(dataTime)
      }, 1000)
      getConstructionList();
    })
    onBeforeUnmount(() => {
      console.log(111)
      if (timer) {
        clearInterval(timer);
      }
    })
    return {
      dataList,
      dataTime,
      allTime,
      addStratRecord,
      workStatusName,
      submit,
      showBtn,
      uploader,
      haveSelf,
      ...toRefs(state),
      imgBoxShow,
      previewImg,
      showImg (pic) {
        imgBoxShow.value= true
        previewImg.value = pic
      },
      imgPath,
    }
  }
}
</script>
<style lang="scss">
.execution {
  padding-bottom: 2rem;
  .mb024 {
    margin-bottom: 0.24rem;
  }
  .title {
    margin-left: 0.32rem;
    margin-top: 0.48rem;
    text-align: left;
    font-size: 0.28rem;
  }
  .fw500 {
    font-weight: 500;
  }
  .list {
    margin: 0 0.32rem;
    height: 0.92rem;
    display: flex;
    align-items: center;
  }
  .list:nth-child(odd) {
    background-color: rgba(242, 242, 242);
  }
  .list-left {
    width: 1.04rem;
    font-size: 0.28rem;
  }
  .list-center-left {
    width: 1.04rem;
    padding: 0 0.32rem;
    font-size: 0.28rem;
  }
  .list-center-right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
  }
  .attach-top-uploader {
    border-bottom: none;
    transform: none;
  }
  .attach-bottom {
    display: none;
  }
  .btn-size {
    margin: 0.64rem 0;
    .van-button {
      border-radius: 50% !important;
      height: 2.72rem;
      width: 2.72rem;
      background: linear-gradient(180deg, #6796dd 0%, #4f81cd 100%);
      color: #fff;
      border: none;
    }
    .big-size {
      font-size: 0.36rem;
      margin-bottom: 0.16rem;
    }
    .small-size {
      font-size: 0.28rem;
    }
  }
  .is-submit-execution {
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
  .execution-list-item {
    display: flex;
    flex-direction: column;
    margin: .4rem;
    .execution-list-divs {
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

}
</style>
