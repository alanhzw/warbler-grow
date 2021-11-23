<!--
 * @Description:
 *      自检页面
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-20
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\QualityPoints.vue
-->
<template>
  <div class="acceptance-box">
    <div class="roll1-title" v-if="!qualityPointFlg">此项目无质量要点信息</div>
    <!-- <content-item label='施工内容' v-if="qualityPointFlg" :value='abConstructionContent'></content-item> -->
    <!-- <content-item label='管控等级' :value='controlLevel'></content-item> -->
    <clarification-list v-if='qualityPointFlg' :list='list' :editing="editing" ref='ClarificationList' :readonly='readonly' :topIconTitle='topIconTitle' :bottomIconTitle='bottomIconTitle' :showInputer='showInputer' :showSelecter="showSelecter"></clarification-list>
    <div class="clarificaiton-selecter" v-if="!qualityPointFlg">
      <van-collapse v-model="activeNames" :border='false'>
        <!-- <van-collapse-item :name="的" :border='false'  :title="result">
          <content-item label='验收人' :value='cur.checkPersonnel' v-if="curIndex !== 1"></content-item>
          <content-item label='职务' :value='cur.position'></content-item>
          <content-item label='验收时间' :value='cur.confirmTime'></content-item>
          <content-item label='补充说明' :value='cur.explanation'></content-item>
        </van-collapse-item> -->
      </van-collapse>
    </div>
    <common-title title='查看验收照片' v-if='upFiles.length>0'></common-title>
    <div class="img-box" v-if='upFiles.length>0'>
      <div class="standard-item" v-for='(item,index) in upFiles' :key='index'>
        <img :src="item.pic" class="real-img">
      </div>
    </div>

    <!-- 增加故障诊断数据 -->
    <div v-if="showFlg">
    <div class="zhenduan-div">故障诊断</div>
     <div class="order-detail">
      <div class="test1">
        <content-wrapper>
          <content-item label="填报人" :value="diagnosisInfo.reporterName" />
          <content-item label="职务" :value="diagnosisInfo.reporterPost" />
          <content-item label="填报时间" :value="diagnosisInfo.createTime" />
        </content-wrapper>
      </div>
      <div class="test2">
        <content-wrapper>
          <content-item label="问题类型" :value="diagnosisInfo.problemType" />
          <content-item label="现象" :value="diagnosisInfo.solution" />
          <content-item label="原因" :value="diagnosisInfo.reason" />
        </content-wrapper>
      </div>
    </div>
    </div>
    <bottom-button v-if='showButton'>
      <van-button type="info" color="#4FA0F7" v-if='disabled' :disabled='disabled' :class="{disabled:disabled}">确认 ({{countdown}}秒)</van-button>
      <van-button type="info" color="#4FA0F7" v-else @click='submitRecord'>确认</van-button>
    </bottom-button>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  computed,
  onMounted,
} from 'vue'
import ContentItem from '../../components/ContentItem.vue'
import ClarificationList from '../../components/ClarificationList.vue'
import Uploader from '../../components/Uploader.vue'
import BottomButton from '../../components/BottomButton.vue'
import CommonTable from '../../components/CommonTable.vue'
import CommonTitle from '../../components/CommonTitle.vue'
import { getService } from '../../service'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'Inspection',
  components: {
    ContentItem,
    ClarificationList,
    Uploader,
    BottomButton,
    CommonTable,
    CommonTitle,
  },
  props: {
    roll: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const service = getService()
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      activeNames: [],
      upFiles: [],
      showButton: true, //是否展示确认按钮
      countdown: 20, //倒计时
      abConstructionContent: '', //施工内容
      controlLevel: '', //管控等级
      qualityPointFlg: false, //是否有质量要点
      checked: false,
      //列表数据
      list: [],
      editing: -1, //正在修改的项
      readonly: true, //是否只读
      disabled: computed(() => state.countdown > 0), //底部button是否可以点击
      topIconTitle: '要',
      bottomIconTitle: '措',
      showInputer: false, //是否展示填写验收结果
      showSelecter: true, //是否展示下拉列表
      isAllFinish: true, // 是否所有员工都点了完成
      noPointResult: '', //无质量要点的验收结果
      diagnosisInfo:{},
      showFlg:false
    })
    //获取自检信息
    const getQueryPointIsExist = () => {
      service
        .getQueryPointIsExist({
          criterionItemCode: store.state.order.current.standardItemCode,
          trustFormMainTableId: route.params.id,
        })
        .then((data) => {
          state.abConstructionContent = data.abConstructionContent
          state.controlLevel = data.controlLevel
          state.qualityPointFlg = data.qualityPointFlg=='0'?false:true;
          if(!state.qualityPointFlg){
            state.countdown = 0
          }else{
            state.countdown = 20
          }
          state.list = data.qualityPointForMoBileList
          state.upFiles = data.upFiles
          state.list = state.list.map((element) => {
            return {
              ...element,
              dangerRoot: element.technologyRequire,
              countermeasureMeasure: element.mainMeasure,
            }
          })
          // 获取 安全交底记录
          service.getSecurityClarificationRecord({
            trustFormMainTableId: route.params.id
          }).then((res) => {
            res.forEach((ele)=>{
              if(store.state.user.info.transferToUserId){
                if(ele.sysUserId == store.state.user.info.transferToUserId && ele.securityFlg == '1'){
                  state.showButton=false
                }
              }else{
                if(ele.sysUserId == store.state.user.info.userId && ele.securityFlg == '1'){
                  state.showButton=false
                }
              }
            })
          })
        })
    }

    const submitRecord = () =>{
      service.editRecord({
        trustFormMainTableId: route.params.id,
        securityFlg: '1'
      }).then((res) => {
        state.showButton=false
      })
    }

    //故障诊断
    const getDiagnosisInfo = () => {

      service.getDiagnosisInfo({
        // 使用委托单编号
        code:store.state.order.current.clientDocumentNo
        // code:'BGTAABHB2100176'//测试
      }).then(res => {
        if(res.haveFlg == 'Y'){
          state.showFlg = true
          state.diagnosisInfo = res
        }
      })
    }

    //初始化
    onMounted(() => {
      getQueryPointIsExist()
      getDiagnosisInfo()
      const timer = setInterval(() => {
        state.countdown -= 1
        if (state.countdown < 0) {
          window.clearInterval(timer)
        }
      }, 1000)
    })
    return {
      ...toRefs(state),
      submitRecord
    }
  },
})
</script>

<style lang='scss'>
.acceptance-box {
  padding: 0.32rem 0.32rem 2rem 0.32rem;
  .roll1-title {
    font-size: 0.28rem;

    font-size: 0.28rem;
    text-align: left;
    color: rgba(0, 0, 0, 0.45);
  }
  .is-qualified {
    display: flex;
    justify-content: space-between;

    .is-qualified-title {
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 0.45rem;
      font-size: 0.28rem;
      margin: 0.38rem 0 0 0;
    }
    .is-qualified-switch {
      margin-top: 0.22rem;
      .van-switch {
        width: 1rem;
        height: 0.6rem;
      }
    }
  }
  .disabled {
    background-color: #dddddd !important;
    color: #bbbbbb !important;
    border: none !important;
    border-radius: 4px !important;
  }
  .clarificaiton-inputer {
    .van-cell {
      padding: 0;
    }
    .van-field__control {
      font-size: 0.28rem;
      color: rgba(0, 0, 0, 0.45);
      width: 100%;
      background-color: #f3f3f3;
      border-radius: 4px;
      padding: 0.24rem 0.32rem;
    }
  }
}
.test1{
  padding: 0.01rem 0.32rem;
  position: relative;
  width: 91%;
  background: #F2F2F2;
  margin-top: 0.3rem;
}
.test2{
  padding: 0.01rem 0.32rem;
  position: relative;
  width: 91%;
  background: #F2F2F2;
  margin-top: 0.1rem;
}
.zhenduan-div{
  display: flex;
  margin-top: 0.5rem;
}
</style>
