<!--
 * @Description:
 *      指派的页面
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-06-10
 * @FilePath: \intelligent-overhaul-app\src\view\WorkOrder\Appointment.vue
-->
<template>
  <div>
    <div class="appointment">
      <!-- <content-item label="钳工 2人" isBlock /> -->
      <div v-for="(item) in workerData.arr" :key="item.id">
        <div class="worker-title">
          <div class="worker-title-left">
            <div style="font-size: .28rem">
              <span>{{Utils.getWorkTypeName(item.workType)}}</span>
              <span style="margin-left: .2rem">{{item.peopleCount}}人</span>
            </div>
            <div class="worker-selected" v-if="item.workerList?.length > 0">已选择{{item.workerList?.length}}人</div>
          </div>
          <div class="delete-all" v-if="item.workerList?.length > 0" @click="handleDeleteAll(item)">清空</div>
        </div>
        <div v-if="item.workerList?.length > 0">
          <div class="selected-people" v-for="(v,vIndex) in item.workerList" :key="vIndex">
            <div class="people-item">
              <div class="people-item-left">{{vIndex + 1}}</div>
              <div class="people-item-center">{{v.realname}}</div>
              <div v-if="v.isOtherTeam" class="people-item-right">其他组</div>
            </div>
            <div class="item-delete" v-if="!v.noDelete" @click="handleDelete(item,v)">
              <img src="../../assets/delete.png">
            </div>
          </div>
        </div>
        <div class="btn" @click="showPopup(item)">
          <van-icon name="add" color="#1989fa" size="0.4rem" />
          <span style="margin-left: 0.16rem">添加</span>
        </div>
      </div>
      <van-popup :overlay-style="{opacity: .4}" v-model:show="isShow" position="bottom" :style="{height: '70%'}">
        <PopupSelectTypeOfWork ref='popupSelectTypeOfWork' :popupTitle="popupTitle" :popupList="popupList.arr" :otherTeam="otherTeamList.arr" @handleClick="handleClick" />
      </van-popup>
      <div class="line"></div>
      <div class="content-item">
        <span class="label">工程说明</span>
        <span class="value">{{orderInfo.engineeringExplain}}</span>
      </div>
      <content-item label="计划人力需求" isBlock />
      <div class="list">
        <div class="list-left fw500">序号</div>
        <div class="list-center fw500">
          <span>工种</span>
          <span>人数</span>
        </div>
        <div class="list-left fw500">工时</div>
      </div>
      <div class="list" v-for="(item, index) in orderInfo.znjxBsnWtdManpowerNeedList" :key="item.id">
        <div class="list-left">{{index + 1}}</div>
        <div class="list-center">
          <span>{{Utils.getWorkTypeName(item.workType)}}</span>
          <span>{{item.peopleCount}}</span>
        </div>
        <div class="list-left">{{item.hour}}</div>
      </div>
    </div>
    <bottom-button>
      <van-button v-if="orderInfo.orderState?.substr(1)<5" color="#777" :disabled="showFlg" :class="showFlg== true ?'a1':'a2'"  @click="submit">{{orderInfo.orderState.substr(1)>1?'增派':'派单'}}</van-button>
    </bottom-button>
  </div>
</template>
<script>
import { reactive, ref, toRefs, defineComponent, computed, onMounted } from "vue";
import { useStore } from 'vuex';
import { getService, imgPath } from '../../service';
import ContentItem from '../../components/ContentItem.vue';
import CommonTitle from '../../components/CommonTitle.vue';
import ContentWrapper from '../../components/ContentWrapper.vue';
import BottomButton from '../../components/BottomButton.vue';
import PopupSelectTypeOfWork from '../../components/PopupSelectTypeOfWork.vue';
import { Dialog, Toast } from 'vant';
import Utils from '../../utils';
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: 'Appointment',
  components: { ContentItem, ContentWrapper, CommonTitle, BottomButton, PopupSelectTypeOfWork },
  setup (props) {
    const popupSelectTypeOfWork = ref(null)
    const service = getService();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const orderInfo = computed(() => store.state.order.current);
    const setCurrentOrder = (order) => store.commit('order/setCurrentOrder', order);
    
    let arrCopy = []
    try {
      arrCopy = JSON.parse(JSON.stringify(orderInfo.value.znjxBsnWtdManpowerNeedList)) //拷贝一份信息
    } catch (error) {
      console.log('🚀🚀~ error:', error);
    }
    let workerData = reactive({ // 已选派单人员的数据
      arr: arrCopy,
    });
    // 删除
    const handleDelete = (list, v) => {
      if (v.noDelete) {
        return;
      }
      // console.log(list);
      // console.log(v)
      let filterArr = list.workerList.filter(item => item.id !== v.id);
      workerData.arr.forEach(item => {
        if (item.workType === list.workType) {
          item.workerList = filterArr;
        }
      });
      // 修改弹窗中其他组的已选人员的状态
      // popupSelectTypeOfWork.value.PopupSelectTeamCon.arr.forEach(item => {
      //   if(v.isOtherTeam && v.id === item.id) {
      //     item.isSelect = false;
      //   }
      // })

      list.otherWorkerData?.arr?.forEach(item => {
        if(v.isOtherTeam && v.id === item.id) {
          item.isSelect = false;
        }
      })
      // console.log(popupSelectTypeOfWork.value.PopupSelectTeamCon,'子组件');
    };
    // 删除全部
    const handleDeleteAll = (list) => {
      // console.log(workerData.arr)
      workerData.arr.forEach(item => {
        if (item.workType === list.workType) {
          let arr = item.workerList.filter(e => e.noDelete);
          item.workerList = arr;
        }
      });
      list.otherWorkerData?.arr.forEach(item => {
        item.isSelect = item.noDelete ? true : false;
      })
    }
    let popupTitle = reactive({ //弹出层标题
      workType: '',
      num: 0,
    });
    let popupList = reactive({ //弹出层数据
      arr: []
    });
    let otherTeamList = reactive({ //弹出层中其他班组数据
      arr: []
    });
    let isShow = ref(false); // 弹出层展示
    const showPopup = (v) => {
      console.log(v,'数据')
      // console.log(workerData.arr,'workerData.arr数据')
      let nowTeam = v.workerList?.filter(v => !v.isOtherTeam); //当前班组的
      // console.log(nowTeam, '班组')
      let otherTeam = v.workerList?.filter(v => v.isOtherTeam); //其他班组的
      // console.log(otherTeam,'其他班组')
      otherTeamList.arr = v.otherWorkerData?.arr || [];
      // console.log(otherTeamList,'111')
      // if(popupSelectTypeOfWork.value) {
      //   popupSelectTypeOfWork.value.PopupSelectTeamCon.arr = otherTeamList.arr;
      // } 
      // 调接口获取弹窗数据列表，添加字段isSelect，判断是否选中
      service.getTeamLeaderConfirmList({
        workType: v.workType
      }).then(res => {
        res.forEach(item => {
          // 弹窗中选中的
          let selectedWorker = nowTeam?.find(x => x.id === item.id);
          item.isSelect = selectedWorker ? true : false;
          let noDeleteWorker = nowTeam?.find(x => x.id === item.id && x.noDelete); //不可以删除的
          item.noDelete = noDeleteWorker ? true : false;
          // item.avatar = imgPath + item.avatar;
        });
        popupList.arr = res;
      })
      popupTitle.workType = v.workType; // 弹窗标题
      popupTitle.num = v.peopleCount; // 弹窗人数
      isShow.value = true;
    }
    const popupSelectTypeOfWorkCon = ref(null) // 获取子组件的值
    const handleClick = (v) => { // 点击完成
      showFlg.value = false
      // console.log(v,'111')
      // console.log(workerData,'222')
      let filterArr = v.list.filter(v => v.isSelect); //选中的
      let otherTeamFilterArr = v.otherTeam.arr?.filter(v => v.isSelect) || []; //其他班组选中的
      let allSelectArr = [...filterArr, ...otherTeamFilterArr]
      workerData.arr.forEach(item => {
        if (item.workType === popupTitle.workType) {
          for(var i in allSelectArr){
            var isNew = true;
            if(item.workerList){
              for(var j in item.workerList){
                if(item.workerList[j].id == allSelectArr[i].id){
                  isNew = false;
                  break;
                }
              }
            }
            if(!item.workerList){
              item.workerList = []
            }
            if(isNew){
              item.workerList.push(allSelectArr[i]);
            }
          }
          //item.workerList = allSelectArr;  // 点击完成的时候在选中的工种中添加选中的工人信息
          item.otherWorkerData = v.otherTeam || {}; // 维护弹窗中不同工种的其他班组的信息
        }
      });
      // console.log(workerData,'222')
      isShow.value = v.isShow;
    }

    let showFlg = ref(false); 
    // 派单
    const submit = () => {
      // console.log(workerData.arr, '1111')
      // console.log(secondSend)
      let arr = [];
      let returnFlg = false;
      workerData.arr.forEach(item => {
        if (item.workerList?.length > 0) {
          returnFlg = true;
          item.workerList.forEach(e => {
            showFlg.value = true
            let obj = {};
            obj.trustFormMainTableId = item.trustFormMainTableId;
            obj.sysUserId = e.id;
            obj.workType = item.workType;
            arr.push(obj);
          })
        }
      })
      if(!returnFlg){
        Toast.fail({
            message: '指派人员不能为空'
          })
        return;
      }
      // console.log(arr, '2222')
      if(secondSend) {
        service.addAgainOrderSendToPersonnelConfirm({
          znjxBsnConstructionPersonnelReqList: arr
        }).then(res => {
          Toast.success({
            message: '增派成功'
          })
          console.log(res, '增派成功')
          //派完单后给全局变量重新赋值
          service.getOrderDetail({
            trustFormMainTableId: route.params.id,
          }).then(res => {
            setCurrentOrder(res);
            router.push(`/h5/order/${route.params.id}/Detail`)
          })
        })
      } else {
        service.addTeamWorker({
          znjxBsnConstructionPersonnelReqList: arr
        }).then(res => {
          Toast.success({
            message: '派单成功'
          })
          showFlg.value = true
          console.log(res, '派单成功')
          //派完单后给全局变量重新赋值
          service.getOrderDetail({
            trustFormMainTableId: route.params.id,
          }).then(res => {
            setCurrentOrder(res);
            router.push(`/h5/order/${route.params.id}/Detail`)
          })
        })
      }
    }
    let secondSend = false;
    // 委托单 - 班长已指定人员信息加载
    const getConstructionPersonnelList = () => {
      service.getConstructionPersonnelList({
        trustFormMainTableId: route.params.id
      }).then(res => {
        console.log(res)
        if(res.length > 0) {
          showFlg.value = true
          workerData.arr.forEach(item => {
            item.workerList = [];  // 点击完成的时候在选中的工种中添加选中的工人信息
            res.forEach(e => {
              e.isSelect = true;
              e.id = e.sysUserId;
              e.noDelete = true; // 不可以删掉已经派单的人
              if(item.workType == e.workType) {
                item.workerList.push(e)
              }
            });
          });
          console.log(workerData.arr,'回显')
          secondSend = true;
        }
      })
    }
    onMounted(() => {
      getConstructionPersonnelList();
    })
    return {
      Utils,
      orderInfo,
      popupTitle,
      isShow,
      showPopup,
      popupList,
      popupSelectTypeOfWorkCon,
      popupSelectTypeOfWork,
      handleClick,
      workerData,
      handleDelete,
      handleDeleteAll,
      otherTeamList,
      submit,
      showFlg
    }
  }
})
</script>
<style lang="scss" scoped>
.appointment {
  padding: 0.08rem 0.32rem 2rem 0.32rem;
  .fw500 {
    font-weight: 500;
  }
  .worker-title {
    display: flex;
    margin-top: 0.32rem;
    margin-bottom: 0.24rem;
    .worker-title-left {
      flex: 1;
      display: flex;
      align-items: center;
      .worker-selected {
        font-size: 0.24rem;
        margin-left: 0.24rem;
        color: #8c8c8c;
      }
    }
    .delete-all {
      font-size: 0.28rem;
      color: #045bb8;
      width: 0.56rem;
    }
  }
  .selected-people {
    display: flex;
    align-items: center;
    height: 0.92rem;
    margin-bottom: 0.16rem;
    .people-item {
      height: 0.92rem;
      flex: 1;
      background: #f7f9fd;
      border-radius: 8px;
      border: 1px solid #dddddd;
      display: flex;
      align-items: center;
      padding: 0 0.24rem;
      .people-item-left {
        font-size: 0.28rem;
      }
      .people-item-center {
        font-size: 0.28rem;
        margin-left: 0.16rem;
      }
      .people-item-right {
        flex: 1;
        font-size: .28rem;
        text-align: right;
      }
    }
    .item-delete {
      width: 0.28rem;
      height: 0.28rem;
      margin-left: 0.34rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .btn {
    width: 6.86rem;
    height: 0.92rem;
    line-height: 0.92rem;
    border: 1px dashed #bbbbbb;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.32rem;
  }

  .line {
    width: 6.86rem;
    height: 0.01rem;
    background: #000000;
    opacity: 0.1;
    margin-top: 0.48rem;
  }

  .content-item {
    display: flex;
    font-size: 0.28rem;
    line-height: 0.4rem;
    text-align: left;
    margin-top: 0.32rem;
    margin-bottom: 0.32rem;

    .label {
      width: 1.7rem;
      margin-right: 0.32rem;
      font-weight: 500;
    }

    .value {
      flex: 1;
      font-weight: 400;
    }
  }
  .list {
    width: 100%;
    height: 0.92rem;
    display: flex;
    align-items: center;
    // transform: translateX(-0.32rem);
  }
  .list:nth-child(odd) {
    background-color: rgba(242, 242, 242);
  }
  .list-left {
    width: 1.04rem;
    font-size: 0.28rem;
  }
  .list-center {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 0.5rem;
    font-size: 0.28rem;
  }
}
.a1{
  background-color: #DDDDDD;
}
.a2{
  background-color: #6796DD !important;
}
</style>