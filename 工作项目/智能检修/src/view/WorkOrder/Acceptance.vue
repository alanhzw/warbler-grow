<!--
 * @Description:
 *      验收页面
 * @Author:LJN
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-05
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Acceptance.vue
-->
<template>
  <div class="acceptance-box">
    <!--<content-item label='施工内容' v-if="list.length > 0" :value='abConstructionContent'></content-item>-->
    <div class="roll1-title" v-if="!qualityPointFlg && isInspection">此项目无质量要点信息</div>
    <!-- <content-item label='管控等级' :value='controlLevel'></content-item> -->
    <acceptance-list v-if="isInspection" :list='list' :showIsQualified='showIsQualified' :editing="editing" ref='ClarificationList' :readonly='readonly' :topIconTitle='topIconTitle' :bottomIconTitle='bottomIconTitle' :showInputer='showInputer' :qualityPointFlg="qualityPointFlg" :showSelecter="showSelecter"></acceptance-list>
    <!-- 
    <div class="is-qualified" v-if='!qualityPointFlg && isInspection'>
      <div class="is-qualified-title">是否合格</div>
      <div class="is-qualified-switch">
        <van-switch v-model="noPointResult" active-color="#4DD865" inactive-color="#dcdee0" />
      </div>
    </div> -->
    <common-title title='请上传验收照片' v-if="isInspection  && !isAcceptance"></common-title>
    <uploader ref='uploader' v-if="isInspection  && !isAcceptance"></uploader>

    <div v-if='zijianFiles.length >0'>
      <content-item label='自检照片'></content-item>
      <div class="isAcceptance-imgs">
        <img v-for='(item,index) in zijianFiles' :key='index' :src="item" @click="showImg(item)">
      </div>
    </div>

    <div v-if='upFiles.length >0'>
      <content-item label='验收照片'></content-item>
      <div class="isAcceptance-imgs">
        <img v-for='(item,index) in upFiles' :key='index' :src="item" @click="showImg(item)">
      </div>
    </div>

    <!-- 增加故障诊断数据 -->
    <div v-if="showFlg == true">
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
    <bottom-button v-role="'mobile:acceptanceSubmit'" v-if='isInspection && !isAcceptance'>
      <van-button type="info" color="#4FA0F7" @click='submit()'>提交</van-button>
    </bottom-button>
  </div>
   <van-popup v-model:show="imgBoxShow">
    <img :src="previewImg" style="width: 6.8rem">
  </van-popup>
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
import AcceptanceList from '../../components/AcceptanceList.vue'
import Uploader from '../../components/Uploader.vue'
import BottomButton from '../../components/BottomButton.vue'
import CommonTable from '../../components/CommonTable.vue'
import CommonTitle from '../../components/CommonTitle.vue'
import { getService,imgPath } from '../../service'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { Dialog, Toast } from 'vant'

export default defineComponent({
  name: 'Acceptance',
  components: {
    ContentItem,
    AcceptanceList,
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
    const uploader = ref(null)
    const service = getService()
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      showIsQualified: computed(() => {
        return state.isInspection && !state.isAcceptance
      }), //是否展示合不合格的开关
      //当前身份 作业长1  班组长2  组员3
      identity: computed(() => store.state.user.info.userType),
      upFiles: [],
      zijianFiles: [],
      //各个阶段的状态
      status: {},
      //是否进行过自检
      isInspection: computed(() => {
        if (state.status.statusFive && state.status.statusFiveDate) {
          return true
        } else {
          return false
        }
      }),
      //是否进行过验收
      isAcceptance: false,
      noPointResult: false, //没有质量要点是否合格
      abConstructionContent: '', //施工内容
      controlLevel: '', //管控等级
      qualityPointFlg: false, //是否有质量要点
      checked: false,
      //列表数据
      list: [],
      editing: -1, //正在修改的项
      readonly: true, //是否只读
      disabled: computed(() => state.countdown > 0), //底部button是否可以点击
      countdown: 20, //倒计时
      topIconTitle: '要',
      bottomIconTitle: '措',
      showInputer: false,
      // showSelecter: false,
      showSelecter: computed(() => {
        if (state.isInspection) {
          return true
        } else {
          return false
        }
      }),
      diagnosisInfo:{},
      showFlg:false
    })
    //提交
    const submit = () => {
      if (uploader.value.photoList.length === 0 && uploader.value.checked) {
        Dialog.confirm({
          title: '是否确认完工',
          message: '未上传任何验收照片',
          width: '5.4rem',
          confirmButtonColor: '#045BB8',
          confirmButtonText: '确定',
          className: 'is-submit-attach',
        })
          .then(() => {
            //todos  确定的回调
            submitSelfCheck()
          })
          .catch(() => {
            //todos  取消的回调
          })
      } else if (
        uploader.value.photoList.length === 0 &&
        !uploader.value.checked
      ) {
        Toast.fail({
          message: '请上传验收照片',
        })
      } else {
        submitSelfCheck()
      }
    }
    //提交验收
    const submitSelfCheck = () => {
      if (state.qualityPointFlg) {
        for(var ele of state.list){
          if(!ele.checked && !ele.explanation){
            Toast.fail('请填写不合格原因');
            return
          }
        }
        
        service.addPoint({
            znjxBsnPointCheckReqList: state.list.map((item) => {
              return {
                result: item.checked == true? '10':'20',
                explanation: item.checked == true?'合格':item.explanation,
                trustFormMainTableId: route.params.id,
                abQualityPointId: item.pointId,
              }
            }),
            pictureList: uploader.value.photoList.map((item) => {
              return item.url
            }),
            type: state.identity == '1' ? 10 : state.identity == 'F2' ? 20 : 30,
          })
          .then((res) => {
            if (res == '尚未进行故障填报') {
              Toast.fail({
                message: '班组长尚未进行故障填报!请联系班组长',
              })
            } else {
              Toast.success({
                message: '提交成功!',
              })
              getQueryPointIsExist()
            }
          })
      } else {
        if(uploader.value.photoList.length==0  && !uploader.value.checked){
          Toast.fail('请上传验收照片');
          return
        }
        service.addNoQualityPoints(
              {
                trustFormMainTableId: route.params.id,
                result: state.list[0].checked == true ?'10':'20', //验收结果
                notes: state.list[0].checked == true?'合格':state.list[0].explanation,
                type: state.identity == '1' ? 10 : state.identity == 'F2' ? 20 : 30,
                picList: [
                  {
                    upFile: uploader.value.photoList
                      .map((item) => {
                        return item.url
                      })
                      .toString(),
                  },
                ],
              })
          .then((res) => {
            if (res == '尚未进行故障填报') {
              Toast.fail({
                message: '班组长尚未进行故障填报!请联系班组长',
              })
            } else {
              Toast.success({
                message: '提交成功!',
              })
              getQueryPointIsExist()
            }
          })
      }
    }
    //获取验收信息
    const getQueryPointIsExist = () => {
      service
        .getQueryPointIsExist({
          criterionItemCode: store.state.order.current.standardItemCode,
          trustFormMainTableId: route.params.id,
        })
        .then((data) => {
          state.status = data.progressStatus
          state.abConstructionContent = data.abConstructionContent
          state.controlLevel = data.controlLevel
          state.qualityPointFlg = data.qualityPointFlg=='0'?false:true
          state.list = data.qualityPointForMoBileList
          // state.showSelecter = data.qualityPointForMoBileList;
          state.upFiles = data.upFiles.yanShou.map(item => imgPath + item)
          state.zijianFiles = data.upFiles.ziJian.map(item => imgPath + item)
          if(data.qualityPointForMoBileList){
            for(var item of data.qualityPointForMoBileList){
              if(item.heckLinkResp){
                var zijianLength = 0;
                var yanshou1Length = 0;
                var yanshouF2Length = 0;
                var yanshouF1Length = 0;
                for(var ele of item.heckLinkResp){
                  if(state.identity == '1'){
                    if(ele.checkLink=='00'){
                      zijianLength = ele.checkPointResps.length || 0
                    }else if(ele.checkLink=='10'){
                      yanshou1Length = ele.checkPointResps.length || 0
                    }
                  }else if(state.identity == 'F2'){
                    var statusFlg = store.state.order.current.qualityGrade
                    if(statusFlg == 'C' || statusFlg == null || statusFlg == ''){
                      return state.isAcceptance = true;
                    }
                    if(ele.checkLink=='10'){
                      var point = ele.checkPointResps.filter(item => item.result == '10')
                      yanshou1Length = point.length || 0
                    }else if(ele.checkLink=='20'){
                      yanshouF2Length = ele.checkPointResps.length || 0
                    }
                  }else if(state.identity == 'F1'){
                    if(store.state.order.current.qualityGrade == 'B'){
                      return state.isAcceptance = true;
                    }
                    if(ele.checkLink=='20'){
                      var point = ele.checkPointResps.filter(item => item.result == '10')
                      yanshouF2Length = point.length || 0
                    }else if(ele.checkLink=='30'){
                      yanshouF1Length = ele.checkPointResps.length || 0
                    }
                  }
                }
                if(state.identity == '1'){
                  if(zijianLength>yanshou1Length){
                    state.isAcceptance = false;
                  }else{
                    state.isAcceptance = true;
                  }
                }else if(state.identity == 'F2'){
                  if(yanshou1Length>yanshouF2Length){
                    state.isAcceptance = false;
                  }else{
                    state.isAcceptance = true;
                  }
                }else if(state.identity == 'F1'){
                  if(yanshouF2Length>yanshouF1Length){
                    state.isAcceptance = false;
                  }else{
                    state.isAcceptance = true;
                  }
                }
                
              }else{
                state.isAcceptance = false;
                break;
              }
            }
          }else{
            state.isAcceptance = false;
          }
          
          state.list = state.list.map((element) => {
            return {
              ...element,
              dangerRoot: element.technologyRequire,
              countermeasureMeasure: element.mainMeasure,
              explanation: '',
              checked: false,
            }
          })
        })
    }
    const imgBoxShow = ref(false)
    const previewImg = ref("")

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
    
    onMounted(() => {
      getQueryPointIsExist()
      getDiagnosisInfo()
    })
    return {
      ...toRefs(state),
      submit,
      uploader,
      imgBoxShow,
      previewImg,
      showImg (item) {
        imgBoxShow.value= true
        previewImg.value = item
      }
    }
  },
})
</script>

<style lang='scss'>
.acceptance-box {
  padding: 0.32rem 0.32rem 2rem 0.32rem;
  .roll1-title {
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
  .isAcceptance-imgs {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    img {
      width: 80px;
      height: 80px;
      margin: 0 8px 8px 0;
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
