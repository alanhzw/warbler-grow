<!--
 * @Description:
 *      自检
 * @Author:SXW
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-20
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Inspection.vue
-->
<template>
  <div class="acceptance-box">
    <div class="roll1-title" v-if="!qualityPointFlg">此项目无质量要点信息</div>
    <!--<content-item label='施工内容' v-if="qualityPointFlg" :value='abConstructionContent'></content-item>-->
    <!-- <content-item label='管控等级' v-if="qualityPointFlg" :value='controlLevel'></content-item> -->
    <inspection-list :list='list' :editing="editing" ref='ClarificationList' :showIsQualified='false' :readonly='readonly' :topIconTitle='topIconTitle' :bottomIconTitle='bottomIconTitle' :showzijianInputer='showzijianInputer' :qualityPointFlg='qualityPointFlg' :showSelecter="showSelecter"></inspection-list>
    <div class="clarificaiton-inputer" v-if='showzijianInputer && !qualityPointFlg'>
      <van-field v-model="noPointResult" placeholder="填写自检结果" />
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
    <common-title title='请上传自检照片' v-if="isAllFinish  && !isInspection"></common-title>
    <uploader ref='uploader' v-if="isAllFinish  && !isInspection"></uploader>
    <div v-if='isInspection'>
      <content-item label='自检照片' v-if="zijianFlag"></content-item>
      <div class="isInspection-imgs">
        <img v-for='(item,index) in upFiles' :key='index' :src="item" @click="showImg(item)">
      </div>
      <content-item label='验收照片' v-if="yanshouFlag"></content-item>
      <div class="isInspection-imgs">
        <img v-for='(item,index) in upFilesYanshou' :key='index' :src="item" @click="showImg(item)">
      </div>
    </div>
    <bottom-button v-if="isAllFinish">
      <van-button type="info" color="#4FA0F7" @click='submit()' v-if='!isInspection'>确认完工</van-button>
      <van-button type="info" color="#4FA0F7" @click='submit()' v-if='!isAllQualified'>重新提交</van-button>
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
import InspectionList from '../../components/InspectionList.vue'
import Uploader from '../../components/Uploader.vue'
import BottomButton from '../../components/BottomButton.vue'
import CommonTable from '../../components/CommonTable.vue'
import CommonTitle from '../../components/CommonTitle.vue'
import { getService,imgPath } from '../../service'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { Dialog, Toast } from 'vant'

export default defineComponent({
  name: 'Inspection',
  components: {
    ContentItem,
    InspectionList,
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
      zijianFlag:false,
      yanshouFlag:false,
      isAllQualified: true,
      upFiles: [],
      upFilesYanshou:[],
      //当前身份 作业长1  班组长2  组员3
      identity: computed(() => store.state.user.info.userType),
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
      //是否进行过挂牌
      isAttach: computed(() => {
        if (state.status.statusOne && state.status.statusOneDate) {
          return true
        } else {
          return false
        }
      }),
      abConstructionContent: '', //施工内容
      controlLevel: '', //管控等级
      qualityPointFlg: true, //是否有质量要点
      checked: false,
      //列表数据
      list: [],
      editing: -1, //正在修改的项
      readonly: true, //是否只读
      disabled: computed(() => state.countdown > 0), //底部button是否可以点击
      countdown: 20, //倒计时
      topIconTitle: '要',
      bottomIconTitle: '措',
      //是否展示填写验收结果
      showInputer: computed(() => {
        if (state.isAllFinish) {
          return true
        }
        return false
      }),
      //是否展示填写自检结果
      showzijianInputer: computed(() => {
        if(state.isAllFinish && state.identity==2){
          return true
        }
        return false
      }),
      //是否展示下拉列表
      showSelecter: computed(() => {
        if (state.isInspection) {
          return true
        } else {
          return false
        }
      }),
      isAllFinish: true, // 是否所有员工都点了完成
      noPointResult: '', //无质量要点的验收结果
      diagnosisInfo:{},
      showFlg:false
    })
    //提交
    const submit = () => {
      if(!state.isAttach){
        Toast.fail({
          message: '请先上传挂牌信息',
        })
        return;
      }

      //获取检查情况
      service.getCheckInspect({
        projectId:state.status.trustFormMainTableId
      }).then(res => {
        if(res.questionCount !=null && res.finishCount!=null){
          if(res.questionCount == res.finishCount){
            if (uploader.value.photoList.length === 0 && uploader.value.checked) {
              Dialog.confirm({
                title: '是否确认完工',
                message: '未上传任何自检照片',
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
                message: '请上传自检照片',
              })
            } else {
              submitSelfCheck()
            }
          }else{
            Toast.fail({
              message: '检查项目尚未全部合格',
            })
          }
        }else{
            Toast.fail({
              message: '检查项目尚未全部合格',
            })
          }
      })
    }
    //提交自检
    const submitSelfCheck = () => {
      if (state.qualityPointFlg) {
        service
          .submitSelfCheck({
            znjxBsnPointCheckReqList: state.list.map((item) => {
              return {
                result: item.result,
                trustFormMainTableId: route.params.id,
                abQualityPointId: item.pointId,
              }
            }),
            pictureList: uploader.value.photoList.map((item) => {
              return item.url
            }),
          })
          .then((res) => {
            if(res==='填报缺陷'){
              Toast.success({
              message: '请前往缺陷管理填报缺陷',
              })
            }else{
              Toast.success({
              message: '提交成功',
              })
            }
            getQueryPointIsExist()
            state.isAllFinish = false
          })
      } else {
        service
          .submitSelfCheckNopoints({
            znjxBsnCheckInformationUpReqList: [
              {
                trustFormMainTableId: route.params.id,
                result: state.noPointResult, //验收结果
                picList: [
                  {
                    upFile: uploader.value.photoList
                      .map((item) => {
                        return item.url
                      })
                      .toString(),
                  },
                ],
              },
            ],
          })
          .then((res) => {
            if(res=='填报缺陷'){
              Toast.success({
              message: '请前往缺陷管理填报缺陷',
              })
            }else{
              Toast.success({
              message: '提交成功',
              })
            }
            getQueryPointIsExist()
            state.isAllFinish = false
          })
      }
    }
    //获取自检信息
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
          state.qualityPointFlg = data.qualityPointFlg === '1' ? true : false
          state.list = data.qualityPointForMoBileList
          state.isAllFinish = data.finishFlg == 'A04' ? true : false
          state.upFiles = data.upFiles.ziJian.map(item => imgPath + item)
          if(data.upFiles.ziJian.length>0){
            state.zijianFlag = true
          }
          state.upFilesYanshou = data.upFiles.yanShou.map(item => imgPath + item)
          if(data.upFiles.yanShou.length>0){
            state.yanshouFlag = true
          }
          data.qualityPointForMoBileList.forEach((element) => {
            element.heckLinkResp.forEach((element2) => {
              if (
                !element2.checkPointResps[0].result &&
                element2.checkPointResps[0].checkLink !== '00'
              ) {
                state.isAllQualified = false
              }
            })
          })
          //测试
          // state.qualityPointFlg = false
          // state.isAllFinish = true
          state.list = state.list.map((element) => {
            return {
              ...element,
              dangerRoot: element.technologyRequire,
              countermeasureMeasure: element.mainMeasure,
              result: '',
              trustFormMainTableId: route.params.id,
              abQualityPointId: element.pointId,
              finallyArr: [],
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
    //
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
    margin-bottom: 0.32rem;
    margin-top: 0.32rem;
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
  .isInspection-imgs {
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
